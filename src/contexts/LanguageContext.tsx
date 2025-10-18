import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traductions
const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.pricing': 'Tarifs',
    'nav.login': 'Connexion',
    'nav.signup': 'Inscription',
    'nav.generation': 'Génération',
    
    // Génération
    'generation.title': 'Génération d\'histoire',
    'generation.limit_reached': 'Vous avez atteint la limite de 2 générations gratuites. Passez à un abonnement premium pour des générations illimitées!',
    'generation.not_authenticated': 'Non authentifié',
    'generation.error': 'Erreur lors de la génération',
    'generation.unlimited': 'Générations illimitées',
    'generation.used': 'générations utilisées',
    
    // Formulaires
    'form.back': 'Retour',
    'form.generate': 'Générer',
    'form.is_generating': 'Génération en cours...',
    'form.create_story': 'Créer une histoire',
    'form.fill_info': 'Remplissez les informations pour générer une histoire unique',
    'form.child_name': 'Prénom de l\'enfant',
    'form.age': 'Âge (2-10 ans)',
    'form.age_years': 'ans',
    'form.duration': 'Durée de lecture',
    'form.duration.short': 'Courte (2 min)',
    'form.duration.medium': 'Moyenne (3 min)',
    'form.duration.long': 'Longue (5 min)',
    'form.value': 'Valeur à transmettre',
    'form.situation': 'Situation (optionnelle)',
    'form.situation_placeholder': 'Ex: Il a menti sur ses devoirs / Elle n\'écoute pas à table',
    'form.generate_story': 'Générer l\'histoire',
    'form.values.courage': 'Courage',
    'form.values.sharing': 'Partage',
    'form.values.patience': 'Patience',
    'form.values.respect': 'Respect',
    'form.values.honesty': 'Honnêteté',
    'form.values.empathy': 'Empathie',
    'form.values.responsibility': 'Responsabilité',
    'form.values.kindness': 'Gentillesse',
    'form.values.perseverance': 'Persévérance',
    'form.values.generosity': 'Générosité',
    
    // Messages d'erreur
    'error.occurred': 'Une erreur est survenue',
    
    // Langue
    'language.french': 'Français',
    'language.english': 'English',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.pricing': 'Pricing',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.generation': 'Generation',
    
    // Génération
    'generation.title': 'Story Generation',
    'generation.limit_reached': 'You have reached the limit of 2 free generations. Upgrade to a premium subscription for unlimited generations!',
    'generation.not_authenticated': 'Not authenticated',
    'generation.error': 'Error during generation',
    'generation.unlimited': 'Unlimited generations',
    'generation.used': 'generations used',
    
    // Formulaires
    'form.back': 'Back',
    'form.generate': 'Generate',
    'form.is_generating': 'Generating...',
    'form.create_story': 'Create a Story',
    'form.fill_info': 'Fill in the information to generate a unique story',
    'form.child_name': 'Child\'s First Name',
    'form.age': 'Age (2-10 years)',
    'form.age_years': 'years',
    'form.duration': 'Reading Duration',
    'form.duration.short': 'Short (2 min)',
    'form.duration.medium': 'Medium (3 min)',
    'form.duration.long': 'Long (5 min)',
    'form.value': 'Value to Convey',
    'form.situation': 'Situation (optional)',
    'form.situation_placeholder': 'Ex: He lied about his homework / She doesn\'t listen at the table',
    'form.generate_story': 'Generate Story',
    'form.values.courage': 'Courage',
    'form.values.sharing': 'Sharing',
    'form.values.patience': 'Patience',
    'form.values.respect': 'Respect',
    'form.values.honesty': 'Honesty',
    'form.values.empathy': 'Empathy',
    'form.values.responsibility': 'Responsibility',
    'form.values.kindness': 'Kindness',
    'form.values.perseverance': 'Perseverance',
    'form.values.generosity': 'Generosity',
    
    // Messages d'erreur
    'error.occurred': 'An error occurred',
    
    // Langue
    'language.french': 'Français',
    'language.english': 'English',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('fr');

  // Charger la langue sauvegardée au démarrage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Sauvegarder la langue quand elle change
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
