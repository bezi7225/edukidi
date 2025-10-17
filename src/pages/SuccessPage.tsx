import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useSubscription } from '../hooks/useSubscription';

export function SuccessPage() {
  const [syncing, setSyncing] = useState(true);
  const [syncError, setSyncError] = useState<string | null>(null);
  const { refetch } = useSubscription();

  useEffect(() => {
    const syncSubscription = async () => {
      setSyncing(true);
      setSyncError(null);

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

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erreur lors de la synchronisation');
        }

        const data = await response.json();
        console.log('Subscription synced:', data);

        await refetch();

        localStorage.removeItem('checkout_session_id');
      } catch (err) {
        console.error('Error syncing subscription:', err);
        setSyncError(err instanceof Error ? err.message : 'Erreur de synchronisation');
      } finally {
        setSyncing(false);
      }
    };

    syncSubscription();
  }, [refetch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 text-center">
          <div className="mb-6">
            {syncing ? (
              <>
                <Loader2 className="w-16 h-16 text-rose-500 mx-auto mb-4 animate-spin" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Activation en cours...
                </h2>
                <p className="text-gray-600">
                  Nous activons votre abonnement, veuillez patienter quelques instants.
                </p>
              </>
            ) : syncError ? (
              <>
                <CheckCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Paiement réussi !
                </h2>
                <p className="text-gray-600 mb-4">
                  Votre paiement a été effectué. L'activation peut prendre quelques minutes.
                </p>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                  <p className="text-orange-800 text-sm">
                    Si votre abonnement n'est pas actif dans quelques minutes, contactez le support.
                  </p>
                </div>
              </>
            ) : (
              <>
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Abonnement activé !
                </h2>
                <p className="text-gray-600">
                  Votre abonnement premium est maintenant actif. Profitez de générations illimitées !
                </p>
              </>
            )}
          </div>

          {!syncing && (
            <>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 text-sm">
                  Vous recevrez un email de confirmation avec tous les détails de votre abonnement.
                </p>
              </div>

              <div className="space-y-4">
                <Link
                  to="/generation"
                  className="w-full flex items-center justify-center py-3 px-4 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors shadow-md hover:shadow-lg"
                >
                  Créer une histoire
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>

                <Link
                  to="/pricing"
                  className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Voir mon abonnement
                </Link>

                <Link
                  to="/"
                  className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Retour à l'accueil
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
