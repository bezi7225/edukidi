export interface StripeProduct {
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
  currency: string;
  currencySymbol: string;
  isFree?: boolean;
  features?: string[];
}

export const stripeProducts: StripeProduct[] = [
  {
    priceId: 'free',
    name: 'Gratuit',
    description: 'Essayez Edukidi gratuitement',
    mode: 'payment',
    price: 0,
    currency: 'eur',
    currencySymbol: '€',
    isFree: true,
    features: [
      '2 générations d\'histoires',
      'Accès aux fonctionnalités de base',
      'Aucune carte bancaire requise',
    ],
  },
  {
    priceId: 'price_1SIUxhITo9olfzy0Swo7mjOB',
    name: 'Mensuel',
    description: 'Idéal pour découvrir',
    mode: 'subscription',
    price: 3.99,
    currency: 'eur',
    currencySymbol: '€',
    features: [
      'Générations illimitées',
      'Tous les types d\'histoires',
      'Support prioritaire',
      'Annulation à tout moment',
    ],
  },
  {
    priceId: 'price_1SIUzAITo9olfzy0yODlorhl',
    name: 'Annuel',
    description: 'Meilleure valeur - économisez 80%',
    mode: 'subscription',
    price: 9.99,
    currency: 'eur',
    currencySymbol: '€',
    features: [
      'Générations illimitées',
      'Tous les types d\'histoires',
      'Support prioritaire',
      'Économisez 18€/an',
    ],
  },
];

export function getProductByPriceId(priceId: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.priceId === priceId);
}