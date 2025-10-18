import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { stripeProducts } from '../stripe-config';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { Footer } from '../components/Footer';

export function PricingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePurchase = async (priceId: string, mode: 'payment' | 'subscription') => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: priceId,
          mode,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/pricing`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-pink-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center pt-28">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl max-w-xl mx-auto">
            Choisissez votre plangg 
          </h2>
          <p className="text-xl font-body text-text-secondary max-w-2xl mx-auto mt-4">
            Créez des histoires personnalisées pour vos enfants. Commencez gratuitement, puis passez à l'illimité.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16 mt-16">
          {stripeProducts.map((product) => (
            <ProductCard
              key={product.priceId}
              product={product}
              isPopular={product.name.toLowerCase().includes('annuel')}
            />
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="card shadow-lg p-10 max-w-4xl mx-auto">
            <h3 className="text-3xl font-heading font-bold text-text-primary mb-8">
              Pourquoi choisir Edukidi ?
            </h3>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">📚</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">Histoires sur mesure</h4>
                  <p className="text-gray-600">Créez des histoires personnalisées qui captivent vos enfants</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">✨</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">IA avancée</h4>
                  <p className="text-gray-600">Technologie de génération d'histoires de pointe</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">Thèmes variés</h4>
                  <p className="text-gray-600">Des aventures, de la science, du mystère et bien plus</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">💡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">Éducatif et amusant</h4>
                  <p className="text-gray-600">Allier apprentissage et plaisir de la lecture</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
