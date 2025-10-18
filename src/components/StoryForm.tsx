import { useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface StoryFormProps {
  onBack: () => void;
  onGenerate: (formData: StoryFormData) => void;
  isGenerating: boolean;
}

export interface StoryFormData {
  prenom: string;
  age: number;
  duree: string;
  valeur: string;
  situation: string;
}

const DUREES = [
  { value: 'Courte', label: 'form.duration.short' },
  { value: 'Moyenne', label: 'form.duration.medium' },
  { value: 'Longue', label: 'form.duration.long' }
];

const VALEURS = [
  { value: 'Courage', label: 'form.values.courage' },
  { value: 'Partage', label: 'form.values.sharing' },
  { value: 'Patience', label: 'form.values.patience' },
  { value: 'Respect', label: 'form.values.respect' },
  { value: 'Honnêteté', label: 'form.values.honesty' },
  { value: 'Empathie', label: 'form.values.empathy' },
  { value: 'Responsabilité', label: 'form.values.responsibility' },
  { value: 'Gentillesse', label: 'form.values.kindness' },
  { value: 'Persévérance', label: 'form.values.perseverance' },
  { value: 'Générosité', label: 'form.values.generosity' }
];

export default function StoryForm({ onBack, onGenerate, isGenerating }: StoryFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<StoryFormData>({
    prenom: '',
    age: 5,
    duree: 'Courte',
    valeur: 'Courage',
    situation: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          disabled={isGenerating}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t('form.back')}</span>
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('form.create_story')}</h2>
            <p className="text-gray-600">{t('form.fill_info')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="prenom" className="block text-sm font-semibold text-gray-700 mb-2">
                {t('form.child_name')}
              </label>
              <input
                id="prenom"
                type="text"
                required
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-rose-400 focus:outline-none transition-colors"
                placeholder="Léo"
                disabled={isGenerating}
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-semibold text-gray-700 mb-2">
                {t('form.age')}
              </label>
              <select
                id="age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-rose-400 focus:outline-none transition-colors"
                disabled={isGenerating}
              >
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((age) => (
                  <option key={age} value={age}>
                    {age} {t('form.age_years')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="duree" className="block text-sm font-semibold text-gray-700 mb-2">
                {t('form.duration')}
              </label>
              <select
                id="duree"
                value={formData.duree}
                onChange={(e) => setFormData({ ...formData, duree: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-rose-400 focus:outline-none transition-colors"
                disabled={isGenerating}
              >
                {DUREES.map((duree) => (
                  <option key={duree.value} value={duree.value}>
                    {t(duree.label)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="valeur" className="block text-sm font-semibold text-gray-700 mb-2">
                {t('form.value')}
              </label>
              <select
                id="valeur"
                value={formData.valeur}
                onChange={(e) => setFormData({ ...formData, valeur: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-rose-400 focus:outline-none transition-colors"
                disabled={isGenerating}
              >
                {VALEURS.map((valeur) => (
                  <option key={valeur} value={valeur}>
                    {t(valeur.label)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="situation" className="block text-sm font-semibold text-gray-700 mb-2">
                {t('form.situation')}
              </label>
              <textarea
                id="situation"
                value={formData.situation}
                onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-rose-400 focus:outline-none transition-colors resize-none"
                placeholder={t('form.situation_placeholder')}
                rows={3}
                disabled={isGenerating}
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-gray-300 text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none transition-all duration-200 flex items-center justify-center gap-3"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{t('form.is_generating')}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>{t('form.generate_story')}</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
