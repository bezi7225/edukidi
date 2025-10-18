import { Link } from 'react-router-dom';
import { Mail, Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-24">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-2xl text-primary">Edukidi</h3>
            <p className="text-text-secondary text-sm">
              Des histoires éducatives personnalisées pour vos enfants, générées par IA.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-text-primary mb-4">Produit</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/pricing" className="text-text-secondary hover:text-primary transition-colors">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link to="/generation" className="text-text-secondary hover:text-primary transition-colors">
                  Génération
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-text-primary mb-4">Légal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-text-secondary hover:text-primary transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-text-secondary hover:text-primary transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-text-secondary hover:text-primary transition-colors">
                  Politique des cookies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-text-primary mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-text-secondary">
                <Mail className="w-4 h-4" />
                <a href="mailto:contact@edukidi.com" className="hover:text-primary transition-colors">
                  contact@edukidi.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-text-secondary text-sm">
          <p>&copy; {new Date().getFullYear()} Edukidi. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
