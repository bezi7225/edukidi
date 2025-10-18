import { useNavigate } from 'react-router-dom';
import { BookHeart, Zap, Target, MessageCircle } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-pink-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center pt-28">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl max-w-2xl mx-auto mb-10">
  Des histoires éducatives <span className="underline decoration-orange-400 underline-offset-4">adaptées</span> à votre enfant
</h2>



          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Générées par IA pour vos enfants, adaptées a leur âge et aux situations
          </p>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate('/signup')}
            className="btn-primary text-lg px-12 py-4"
          >
            Commencer gratuitement
          </button>
          <button
            onClick={() => navigate('/pricing')}
            className="bg-white hover:bg-gray-50 text-text-primary font-body font-semibold text-lg px-12 py-4 rounded-2xl border-2 border-primary/30 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Voir les formules
          </button>
        </div>

        <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="card">
            <div className="flex justify-center mb-4">
              <Zap className="w-12 h-12 text-accent" />
            </div>
            <h3 className="font-heading font-bold text-text-primary mb-2 text-lg">En 10 secondes</h3>
            <p className="text-text-secondary">Une histoire unique générée instantanement</p>
          </div>
          <div className="card">
            <div className="flex justify-center mb-4">
              <Target className="w-12 h-12 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-text-primary mb-2 text-lg">Personnalisée</h3>
            <p className="text-text-secondary">Adaptee a age et aux valeurs de votre enfant</p>
          </div>
          <div className="card">
            <div className="flex justify-center mb-4">
              <MessageCircle className="w-12 h-12 text-success" />
            </div>
            <h3 className="font-heading font-bold text-text-primary mb-2 text-lg">Educative</h3>
            <p className="text-text-secondary">Avec des questions pour discuter ensemble</p>
          </div>
        </div>


      </div>
    </div>
  );
}
