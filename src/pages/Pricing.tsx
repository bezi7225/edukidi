import React from 'react'
import { stripeProducts } from '../stripe-config'
import { ProductCard } from '../components/ProductCard'

export function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choisissez votre plan Edukidi
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Accédez à tous nos contenus éducatifs avec l'abonnement qui vous convient
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
          {stripeProducts.map((product, index) => (
            <ProductCard
              key={product.priceId}
              product={product}
              isPopular={index === 0} // Make annual plan popular
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            Tous les plans incluent un accès complet à la plateforme Edukidi.
            <br />
            Vous pouvez annuler votre abonnement à tout moment.
          </p>
        </div>
      </div>
    </div>
  )
}