import React from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 flex items-center space-x-2">
        <Globe className="w-4 h-4 text-gray-600" />
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value as Language)}
          className="text-sm border-none outline-none bg-transparent text-gray-700 cursor-pointer"
        >
          <option value="fr">{t('language.french')}</option>
          <option value="en">{t('language.english')}</option>
        </select>
      </div>
    </div>
  );
}
