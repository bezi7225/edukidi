import React from 'react'
import { useSubscription } from '../hooks/useSubscription'
import { Crown, AlertCircle, Clock } from 'lucide-react'

export function SubscriptionStatus() {
  const { subscription, loading, error, hasActiveSubscription, planName, isTrialing } = useSubscription()

  if (loading) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="animate-pulse flex items-center">
          <div className="rounded-full bg-gray-300 h-4 w-4 mr-3"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center text-red-700">
          <AlertCircle className="h-4 w-4 mr-2" />
          <span className="text-sm">Erreur lors du chargement de l'abonnement</span>
        </div>
      </div>
    )
  }

  if (!hasActiveSubscription) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center text-yellow-700">
          <AlertCircle className="h-4 w-4 mr-2" />
          <span className="text-sm">Aucun abonnement actif</span>
        </div>
      </div>
    )
  }

  const getStatusIcon = () => {
    if (isTrialing) return <Clock className="h-4 w-4 mr-2" />
    return <Crown className="h-4 w-4 mr-2" />
  }

  const getStatusColor = () => {
    if (isTrialing) return 'text-blue-700'
    return 'text-green-700'
  }

  const getBgColor = () => {
    if (isTrialing) return 'bg-blue-50 border-blue-200'
    return 'bg-green-50 border-green-200'
  }

  const getStatusText = () => {
    if (isTrialing) return 'Période d\'essai'
    return 'Abonnement actif'
  }

  return (
    <div className={`${getBgColor()} border rounded-lg p-4`}>
      <div className={`flex items-center ${getStatusColor()}`}>
        {getStatusIcon()}
        <div>
          <span className="text-sm font-medium">{getStatusText()}</span>
          {planName && (
            <div className="text-xs opacity-75 mt-1">{planName}</div>
          )}
        </div>
      </div>
    </div>
  )
}