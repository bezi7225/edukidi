import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StripeProduct } from '../stripe-config'
import { supabase } from '../lib/supabase'
import { Check, Loader2, Settings } from 'lucide-react'
import { useSubscription } from '../hooks/useSubscription'

interface ProductCardProps {
  product: StripeProduct
  isPopular?: boolean
}

export function ProductCard({ product, isPopular = false }: ProductCardProps) {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { subscription, isPremium } = useSubscription()

  const isCurrentPlan = () => {
    if (product.isFree && !isPremium) return true
    if (!subscription) return false

    if (product.name.toLowerCase().includes('mensuel') && subscription.tier === 'premium_monthly') {
      return true
    }
    if (product.name.toLowerCase().includes('annuel') && subscription.tier === 'premium_yearly') {
      return true
    }
    return false
  }

  const handleManageSubscription = async () => {
    setLoading(true)

    try {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        navigate('/login')
        return
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-portal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          return_url: `${window.location.origin}/pricing`,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create portal session')
      }

      const { url } = await response.json()

      if (url) {
        window.location.href = url
      } else {
        throw new Error('No portal URL received')
      }
    } catch (error) {
      console.error('Portal error:', error)
      alert(error instanceof Error ? error.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  const handlePurchase = async () => {
    if (product.isFree) {
      navigate('/signup')
      return
    }

    if (isPremium && !product.isFree) {
      await handleManageSubscription()
      return
    }

    setLoading(true)

    try {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        navigate('/login')
        return
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          price_id: product.priceId,
          mode: product.mode,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/pricing`,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create checkout session')
      }

      const { url } = await response.json()

      if (url) {
        window.location.href = url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      console.error('Purchase error:', error)
      alert(error instanceof Error ? error.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = () => {
    if (product.isFree) return 'Gratuit'
    return `${product.price.toFixed(2)}${product.currencySymbol}`
  }

  const getPeriod = () => {
    if (product.isFree) return ''
    if (product.name.toLowerCase().includes('annuel')) return '/an'
    if (product.name.toLowerCase().includes('mensuel')) return '/mois'
    return ''
  }

  const getButtonText = () => {
    if (loading) return null
    if (isCurrentPlan()) return 'Plan actuel'
    if (isPremium && !product.isFree) return 'Changer de plan'
    if (product.isFree) return 'Commencer gratuitement'
    return 'Choisir ce plan'
  }

  const isButtonDisabled = () => {
    return loading || isCurrentPlan()
  }

  return (
    <div className={`relative card border ${isPopular ? 'border-accent shadow-xl scale-105' : isCurrentPlan() ? 'border-success shadow-lg' : 'border-primary/20'} p-8 shadow-sm hover:shadow-lg transition-all`}>
      {isPopular && !isCurrentPlan() && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="inline-flex items-center rounded-full bg-accent px-4 py-1 text-sm font-body font-medium text-white">
            Le plus populaire
          </span>
        </div>
      )}

      {isCurrentPlan() && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="inline-flex items-center rounded-full bg-success px-4 py-1 text-sm font-body font-medium text-white">
            Votre plan actuel
          </span>
        </div>
      )}

      <div className="text-center">
        <h3 className="text-2xl font-heading font-bold text-text-primary">{product.name}</h3>
        <p className="mt-2 text-sm font-body text-text-secondary">{product.description}</p>

        <div className="mt-6">
          <span className="text-5xl font-heading font-bold text-text-primary">{formatPrice()}</span>
          <span className="text-lg font-body text-text-secondary">{getPeriod()}</span>
        </div>

        <div className="mt-8">
          <button
            onClick={handlePurchase}
            disabled={isButtonDisabled()}
            className={`w-full btn-primary rounded-2xl px-6 py-3 text-base font-body font-semibold transition-all ${
              isCurrentPlan()
                ? 'bg-gray-100 text-text-secondary border-2 border-gray-300 cursor-not-allowed hover:scale-100 hover:shadow-md'
                : isPopular
                ? 'bg-accent text-white hover:bg-accent/90'
                : product.isFree
                ? 'bg-white text-text-primary hover:bg-gray-50 border-2 border-primary/30 hover:scale-100'
                : 'bg-primary text-white hover:bg-primary/90'
            } disabled:cursor-not-allowed`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Chargement...
              </div>
            ) : (
              getButtonText()
            )}
          </button>

          {isPremium && isCurrentPlan() && !product.isFree && (
            <button
              onClick={handleManageSubscription}
              disabled={loading}
              className="w-full mt-3 btn-secondary rounded-2xl px-6 py-3 text-base font-body font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Settings className="h-5 w-5" />
              Gérer mon abonnement
            </button>
          )}
        </div>

        <div className="mt-8 space-y-4">
          {product.features?.map((feature, index) => (
            <div key={index} className="flex items-start text-left">
              <Check className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-sm font-body text-text-primary">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
