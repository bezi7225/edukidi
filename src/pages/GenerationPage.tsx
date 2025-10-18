import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import StoryForm, { StoryFormData } from '../components/StoryForm';
import StoryResult from '../components/StoryResult';
import { supabase } from '../lib/supabase';

type ViewState = 'form' | 'result';

export function GenerationPage() {
  const { user } = useAuth();
  const {
    subscription,
    canGenerate,
    generationsUsed,
    generationsLimit,
    isPremium,
    incrementGenerations,
    logGeneration
  } = useSubscription();
  const [view, setView] = useState<ViewState>('form');
  const [story, setStory] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (formData: StoryFormData) => {
    if (!canGenerate) {
      setError('Vous avez atteint la limite de 2 generations gratuites. Passez a un abonnement premium pour des generations illimitees!');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Non authentifie');
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-story`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la generation');
      }

      const data = await response.json();
      setStory(data.story);
      setView('result');

      await incrementGenerations();
      await logGeneration(data.story, formData);
    } catch (err) {
      console.error('Error generating story:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreateNew = () => {
    setView('form');
    setStory('');
    setError(null);
  };

  const handleBack = () => {
    setView('form');
    setError(null);
  };

  if (view === 'result' && story) {
    return <StoryResult story={story} onCreateNew={handleCreateNew} />;
  }

  return (
    <div>
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-lg z-50 max-w-md">
          <p className="font-semibold">{error}</p>
        </div>
      )}

      <StoryForm
        onBack={handleBack}
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
      />

      {subscription && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600">
            {isPremium ? (
              <span className="font-semibold text-green-600">Generations illimitees</span>
            ) : (
              <>
                <span className="font-semibold">{generationsUsed}/{generationsLimit || 2}</span> generations utilisees
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
