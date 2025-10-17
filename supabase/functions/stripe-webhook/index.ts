import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'Bolt Integration',
    version: '1.0.0',
  },
});

const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204 });
    }

    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      console.error('❌ No signature found in webhook request');
      return new Response('No signature found', { status: 400 });
    }

    const body = await req.text();

    let event: Stripe.Event;

    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, stripeWebhookSecret);
      console.log(`✅ Webhook verified: ${event.type}`);
    } catch (error: any) {
      console.error(`❌ Webhook signature verification failed: ${error.message}`);
      return new Response(`Webhook signature verification failed: ${error.message}`, { status: 400 });
    }

    EdgeRuntime.waitUntil(handleEvent(event));

    return Response.json({ received: true });
  } catch (error: any) {
    console.error('❌ Error processing webhook:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function handleEvent(event: Stripe.Event) {
  console.log(`📥 Processing event: ${event.type}`);
  const stripeData = event?.data?.object ?? {};

  if (!stripeData) {
    console.log('⚠️ No data in event');
    return;
  }

  if (!('customer' in stripeData)) {
    console.log('⚠️ No customer in event data');
    return;
  }

  if (event.type === 'payment_intent.succeeded' && event.data.object.invoice === null) {
    console.log('⚠️ Skipping payment_intent without invoice');
    return;
  }

  const { customer: customerId } = stripeData;

  if (!customerId || typeof customerId !== 'string') {
    console.error(`❌ No customer received on event: ${JSON.stringify(event)}`);
    return;
  }

  console.log(`👤 Processing for customer: ${customerId}`);

  let isSubscription = true;

  if (event.type === 'checkout.session.completed') {
    const { mode } = stripeData as Stripe.Checkout.Session;
    isSubscription = mode === 'subscription';
    console.log(`🛒 Checkout mode: ${mode}`);
  }

  const { mode, payment_status } = stripeData as Stripe.Checkout.Session;

  if (isSubscription) {
    console.log(`💳 Starting subscription sync for customer: ${customerId}`);
    await syncCustomerFromStripe(customerId);
  } else if (mode === 'payment' && payment_status === 'paid') {
    console.log(`💰 Processing one-time payment`);
    try {
      const {
        id: checkout_session_id,
        payment_intent,
        amount_subtotal,
        amount_total,
        currency,
      } = stripeData as Stripe.Checkout.Session;

      const { error: orderError } = await supabase.from('stripe_orders').insert({
        checkout_session_id,
        payment_intent_id: payment_intent,
        customer_id: customerId,
        amount_subtotal,
        amount_total,
        currency,
        payment_status,
        status: 'completed',
      });

      if (orderError) {
        console.error('❌ Error inserting order:', orderError);
        return;
      }
      console.log(`✅ One-time payment processed: ${checkout_session_id}`);
    } catch (error) {
      console.error('❌ Error processing one-time payment:', error);
    }
  }
}

async function syncCustomerFromStripe(customerId: string) {
  try {
    console.log(`🔄 Syncing customer: ${customerId}`);

    const stripeCustomer = await stripe.customers.retrieve(customerId);
    if (stripeCustomer.deleted) {
      console.error(`❌ Customer ${customerId} has been deleted`);
      return;
    }

    const customerEmail = stripeCustomer.email;
    const customerMetadata = stripeCustomer.metadata;
    console.log(`📧 Customer email: ${customerEmail}`);

    let userId: string | null = null;

    if (customerMetadata?.userId) {
      userId = customerMetadata.userId;
      console.log(`🆔 Found userId in metadata: ${userId}`);
    } else if (customerEmail) {
      console.log(`🔍 Looking up user by email: ${customerEmail}`);
      const { data: userData, error: userError } = await supabase.auth.admin.listUsers();

      if (!userError && userData?.users) {
        const user = userData.users.find(u => u.email === customerEmail);
        if (user) {
          userId = user.id;
          console.log(`✅ Found user by email: ${userId}`);
        }
      }
    }

    if (!userId) {
      console.error(`❌ Could not find user for customer ${customerId}`);
      return;
    }

    const { data: existingCustomer } = await supabase
      .from('stripe_customers')
      .select('user_id')
      .eq('customer_id', customerId)
      .maybeSingle();

    if (!existingCustomer) {
      console.log(`➕ Creating stripe_customers record for ${customerId}`);
      const { error: insertError } = await supabase
        .from('stripe_customers')
        .insert({
          user_id: userId,
          customer_id: customerId,
        });

      if (insertError) {
        console.error('❌ Error creating stripe_customers record:', insertError);
      } else {
        console.log('✅ stripe_customers record created');
      }
    } else {
      console.log(`✓ stripe_customers record exists`);
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
      status: 'all',
      expand: ['data.default_payment_method'],
    });

    console.log(`📊 Found ${subscriptions.data.length} subscriptions`);

    if (subscriptions.data.length === 0) {
      console.log('⚠️ No subscriptions found, setting to free tier');
      const { error: noSubError } = await supabase.from('stripe_subscriptions').upsert(
        {
          customer_id: customerId,
          subscription_status: 'not_started',
        },
        {
          onConflict: 'customer_id',
        },
      );

      if (noSubError) {
        console.error('❌ Error updating subscription status:', noSubError);
      }

      const { error: userSubError } = await supabase.from('user_subscriptions').update({
        tier: 'free',
        status: 'active',
        generations_limit: 2,
        stripe_customer_id: customerId,
        stripe_subscription_id: null,
        current_period_end: null,
        updated_at: new Date().toISOString(),
      }).eq('user_id', userId);

      if (userSubError) {
        console.error('❌ Error updating user_subscriptions:', userSubError);
      } else {
        console.log('✅ User set to free tier');
      }

      return;
    }

    const subscription = subscriptions.data[0];
    const priceId = subscription.items.data[0].price.id;
    console.log(`💰 Price ID: ${priceId}`);

    let tier: 'free' | 'premium_monthly' | 'premium_yearly' = 'free';
    if (priceId === 'price_1SIUxhITo9olfzy0Swo7mjOB') {
      tier = 'premium_monthly';
    } else if (priceId === 'price_1SIUzAITo9olfzy0yODlorhl') {
      tier = 'premium_yearly';
    }
    console.log(`🎯 Tier determined: ${tier}`);

    const statusMap: Record<string, 'active' | 'canceled' | 'expired' | 'trialing'> = {
      'active': 'active',
      'trialing': 'trialing',
      'canceled': 'canceled',
      'past_due': 'expired',
      'unpaid': 'expired',
      'incomplete': 'expired',
      'incomplete_expired': 'expired',
      'paused': 'canceled',
    };
    const status = statusMap[subscription.status] || 'expired';
    console.log(`📌 Status: ${subscription.status} -> ${status}`);

    const { error: subError } = await supabase.from('stripe_subscriptions').upsert(
      {
        customer_id: customerId,
        subscription_id: subscription.id,
        price_id: priceId,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        cancel_at_period_end: subscription.cancel_at_period_end,
        ...(subscription.default_payment_method && typeof subscription.default_payment_method !== 'string'
          ? {
              payment_method_brand: subscription.default_payment_method.card?.brand ?? null,
              payment_method_last4: subscription.default_payment_method.card?.last4 ?? null,
            }
          : {}),
        status: subscription.status,
      },
      {
        onConflict: 'customer_id',
      },
    );

    if (subError) {
      console.error('❌ Error syncing stripe_subscriptions:', subError);
      throw new Error('Failed to sync subscription in database');
    }
    console.log('✅ stripe_subscriptions updated');

    const { error: userSubError } = await supabase.from('user_subscriptions').update({
      tier,
      status,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      generations_limit: tier === 'free' ? 2 : null,
      updated_at: new Date().toISOString(),
    }).eq('user_id', userId);

    if (userSubError) {
      console.error('❌ Error updating user_subscriptions:', userSubError);
      throw new Error('Failed to update user subscription');
    }

    console.log(`✅ Successfully synced subscription for customer ${customerId} - Tier: ${tier}, Status: ${status}`);
  } catch (error) {
    console.error(`❌ Failed to sync subscription for customer ${customerId}:`, error);
    throw error;
  }
}