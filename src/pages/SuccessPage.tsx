import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function SuccessPage() {
  const [syncing, setSyncing] = useState(true);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const syncSubscription = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          setSyncError('Non authentifié');
          setSyncing(false);
          return;
        }

        await new Promise(resolve => setTimeout(resolve, 2000));

        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sync-subscription`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session.access_token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Erreur lors de la synchronisation');
        }

        console.log('Subscription synced:', data);

        if (data.synced) {
          setSyncSuccess(true);
          localStorage.removeItem('checkout_session_id');
        } else {
          setSyncError('Synchronisation incomplète');
        }
      } catch (err) {
        console.error('Error syncing subscription:', err);
        setSyncError(err instanceof Error ? err.message : 'Erreur de synchronisation');
      } finally {
        setSyncing(false);
      }
    };

    syncSubscription();
  }, []);

  if (syncing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-12 px-6 shadow-lg sm:rounded-lg sm:px-10 text-center">
            <Loader2 className="w-20 h-20 text-rose-500 mx-auto mb-6 animate-spin" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Activation en cours...
            </h2>
            <p className="text-gray-600">
              Nous activons votre abonnement, veuillez patienter.
            </p>
            <div className="mt-6 text-sm text-gray-500">
              Cela peut prendre quelques secondes
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (syncError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 text-center">
            <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Paiement effectué
            </h2>
            <p className="text-gray-600 mb-4">
              Votre paiement a été reçu. L'activation de votre abonnement peut prendre quelques minutes.
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <p className="text-orange-800 text-sm">
                Rafraîchissez la page dans quelques instants ou contactez le support si le problème persiste.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full flex items-center justify-center py-3 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Rafraîchir la page
              </button>

              <Link
                to="/pricing"
                className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Voir mes abonnements
              </Link>

              <Link
                to="/"
                className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Home className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Abonnement activé!
          </h2>
          <p className="text-gray-600 mb-2">
            Votre abonnement premium est maintenant actif.
          </p>
          <p className="text-lg font-semibold text-rose-600 mb-6">
            Profitez de générations illimitées!
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 text-sm">
              Un email de confirmation vous a été envoyé avec tous les détails.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              to="/generation"
              className="w-full flex items-center justify-center py-4 px-6 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors shadow-md hover:shadow-lg font-semibold text-lg"
            >
              Créer une histoire maintenant
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>

            <Link
              to="/pricing"
              className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Gérer mon abonnement
            </Link>

            <Link
              to="/"
              className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Home className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
