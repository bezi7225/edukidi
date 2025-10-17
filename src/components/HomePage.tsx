import { BookHeart } from 'lucide-react';

interface HomePageProps {
  onCreateStory: () => void;
}

export default function HomePage({ onCreateStory }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8 py-12">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <BookHeart className="w-12 h-12 text-rose-500" strokeWidth={1.5} />
            <h1 className="text-5xl font-bold text-gray-800">Edukidi</h1>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 leading-tight">
            Des histoires éducatives adaptées à votre enfant
          </h2>
          <p className="text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
            Générées par l'IA pour vos enfants, adaptées à leur âge et aux situations
          </p>
        </div>

        <div className="pt-4">
          <button
            onClick={onCreateStory}
            className="bg-rose-500 hover:bg-rose-600 text-white font-semibold text-lg px-12 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Créer une histoire
          </button>
        </div>

        <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-700 mb-1">En 10 secondes</h3>
            <p className="text-sm text-gray-600">Une histoire unique générée instantanément</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-700 mb-1">Personnalisée</h3>
            <p className="text-sm text-gray-600">Adaptée à l'âge et aux valeurs de votre enfant</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
            <div className="text-3xl mb-2">💬</div>
            <h3 className="font-semibold text-gray-700 mb-1">Éducative</h3>
            <p className="text-sm text-gray-600">Avec des questions pour discuter ensemble</p>
          </div>
        </div>
      </div>
    </div>
  );
}
