import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'Edukidi Sync',
    version: '1.0.0',
  },
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: customerData, error: customerError } = await supabaseAdmin
      .from('stripe_customers')
      .select('customer_id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (customerError || !customerData) {
      return new Response(
        JSON.stringify({ error: 'No Stripe customer found', synced: false }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const customerId = customerData.customer_id;

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
      status: 'all',
      expand: ['data.default_payment_method'],
    });

    if (subscriptions.data.length === 0) {
      await supabaseAdmin.from('user_subscriptions').update({
        tier: 'free',
        status: 'active',
        generations_limit: 2,
        stripe_customer_id: customerId,
        stripe_subscription_id: null,
        current_period_end: null,
        updated_at: new Date().toISOString(),
      }).eq('user_id', user.id);

      return new Response(
        JSON.stringify({ message: 'No active subscription, set to free tier', tier: 'free', synced: true }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const subscription = subscriptions.data[0];
    const priceId = subscription.items.data[0].price.id;

    let tier: 'free' | 'premium_monthly' | 'premium_yearly' = 'free';
    if (priceId === 'price_1SIUxhITo9olfzy0Swo7mjOB') {
      tier = 'premium_monthly';
    } else if (priceId === 'price_1SIUzAITo9olfzy0yODlorhl') {
      tier = 'premium_yearly';
    }

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

    await supabaseAdmin.from('stripe_subscriptions').upsert(
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

    const { error: userSubError } = await supabaseAdmin.from('user_subscriptions').update({
      tier,
      status,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      generations_limit: tier === 'free' ? 2 : null,
      updated_at: new Date().toISOString(),
    }).eq('user_id', user.id);

    if (userSubError) {
      console.error('Error updating user_subscriptions:', userSubError);
      throw new Error('Failed to update user subscription');
    }

    return new Response(
      JSON.stringify({
        message: 'Subscription synced successfully',
        tier,
        status,
        price_id: priceId,
        synced: true
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error syncing subscription:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error', synced: false }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});