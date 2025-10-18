import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignupForm } from '../components/auth/SignupForm';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';

export function SignupPage() {
  const navigate = useNavigate();

  const handleSignupSuccess = () => {
    navigate('/generation');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          to="/"
          className="inline-flex items-center text-rose-600 hover:text-rose-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à l'accueil
        </Link>
        
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-2">
          Créer un compte
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Rejoignez Edukidi et commencez votre parcours d'apprentissage
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <SignupForm onSuccess={handleSignupSuccess} />
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Déjà un compte ?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}