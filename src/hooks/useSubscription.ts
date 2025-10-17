import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

export interface UserSubscription {
  id: number
  user_id: string
  tier: 'free' | 'premium_monthly' | 'premium_yearly'
  status: 'active' | 'canceled' | 'expired' | 'trialing'
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  current_period_end: string | null
  generations_used: number
  generations_limit: number | null
  created_at: string
  updated_at: string
}

export function useSubscription() {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState<UserSubscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSubscription = async () => {
    if (!user) {
      setSubscription(null)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()

      if (error) {
        throw error
      }

      setSubscription(data)
    } catch (err) {
      console.error('Error fetching subscription:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch subscription')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscription()
  }, [user])

  const incrementGenerations = async () => {
    if (!subscription || !user) return

    const canGenerate = subscription.tier === 'free'
      ? subscription.generations_used < (subscription.generations_limit || 2)
      : true

    if (!canGenerate) {
      throw new Error('Generation limit reached')
    }

    try {
      const { error } = await supabase
        .from('user_subscriptions')
        .update({
          generations_used: subscription.generations_used + 1,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)

      if (error) throw error

      await fetchSubscription()
    } catch (err) {
      console.error('Error incrementing generations:', err)
      throw err
    }
  }

  const logGeneration = async (storyContent: string, formData: any) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('story_generations')
        .insert({
          user_id: user.id,
          story_content: storyContent,
          form_data: formData
        })

      if (error) throw error
    } catch (err) {
      console.error('Error logging generation:', err)
    }
  }

  const isActive = subscription?.status === 'active' || subscription?.status === 'trialing'
  const isPremium = subscription?.tier === 'premium_monthly' || subscription?.tier === 'premium_yearly'
  const isFree = subscription?.tier === 'free'

  const canGenerate = () => {
    if (!subscription) return false
    if (isPremium) return true
    return subscription.generations_used < (subscription.generations_limit || 2)
  }

  const generationsRemaining = () => {
    if (!subscription) return 0
    if (isPremium) return Infinity
    return Math.max(0, (subscription.generations_limit || 2) - subscription.generations_used)
  }

  return {
    subscription,
    loading,
    error,
    isActive,
    isPremium,
    isFree,
    canGenerate: canGenerate(),
    generationsUsed: subscription?.generations_used || 0,
    generationsLimit: subscription?.generations_limit,
    generationsRemaining: generationsRemaining(),
    incrementGenerations,
    logGeneration,
    refetch: fetchSubscription,
  }
}
