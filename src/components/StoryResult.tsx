import { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';

interface StoryResultProps {
  story: string;
  onCreateNew: () => void;
}

export default function StoryResult({ story, onCreateNew }: StoryResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(story);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const sections = story.split('\n\n');
  const title = sections[0]?.replace(/^#+\s*/, '').trim() || 'Votre Histoire';
  const content = sections.slice(1).join('\n\n');

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-6">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
              {title}
            </h1>
          </div>

          <div className="prose prose-lg max-w-none">
            {content.split('\n\n').map((paragraph, index) => {
              if (paragraph.toLowerCase().includes('questions') || paragraph.includes('?')) {
                const lines = paragraph.split('\n').filter(line => line.trim());
                return (
                  <div key={index} className="mt-8 bg-amber-50 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Questions à discuter
                    </h3>
                    <ul className="space-y-3">
                      {lines
                        .filter(line => line.includes('?'))
                        .map((question, qIndex) => (
                          <li key={qIndex} className="text-gray-700 leading-relaxed">
                            {question.replace(/^[-•*]\s*/, '').trim()}
                          </li>
                        ))}
                    </ul>
                  </div>
                );
              }

              return (
                <p key={index} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-green-600" />
                <span>Copié!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>Copier le texte</span>
              </>
            )}
          </button>

          <button
            onClick={onCreateNew}
            className="flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Créer une nouvelle histoire</span>
          </button>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Fait avec ❤️ par Edukid0
          </p>
        </div>
      </div>
    </div>
  );
}
