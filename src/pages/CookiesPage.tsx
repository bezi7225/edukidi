import { Footer } from '../components/Footer';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-8">
          Politique des cookies
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">1. Qu'est-ce qu'un cookie?</h2>
            <p className="text-text-secondary leading-relaxed">
              Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous visitez un site web.
              Les cookies permettent au site de mémoriser vos actions et préférences pendant une période donnée,
              afin que vous n'ayez pas à les ressaisir à chaque visite ou navigation entre les pages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">2. Comment utilisons-nous les cookies?</h2>
            <p className="text-text-secondary leading-relaxed mb-3">
              Edukidi utilise des cookies pour:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Maintenir votre session de connexion</li>
              <li>Mémoriser vos préférences (langue, paramètres)</li>
              <li>Comprendre comment vous utilisez notre site pour l'améliorer</li>
              <li>Assurer la sécurité de votre compte</li>
              <li>Analyser les performances du site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">3. Types de cookies utilisés</h2>

            <div className="space-y-4">
              <div className="border-l-4 border-accent pl-4">
                <h3 className="font-heading font-bold text-text-primary mb-2">Cookies essentiels</h3>
                <p className="text-text-secondary text-sm">
                  Ces cookies sont nécessaires au fonctionnement du site. Ils vous permettent de naviguer sur le site
                  et d'utiliser ses fonctionnalités. Sans ces cookies, certains services ne peuvent pas être fournis.
                </p>
                <ul className="list-disc list-inside text-text-secondary text-sm mt-2 ml-4">
                  <li>Cookie de session: maintient votre connexion</li>
                  <li>Cookie de sécurité: protège contre les attaques CSRF</li>
                </ul>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-heading font-bold text-text-primary mb-2">Cookies de fonctionnalité</h3>
                <p className="text-text-secondary text-sm">
                  Ces cookies permettent au site de mémoriser vos choix et de fournir des fonctionnalités améliorées.
                </p>
                <ul className="list-disc list-inside text-text-secondary text-sm mt-2 ml-4">
                  <li>Préférence de langue</li>
                  <li>Paramètres d'affichage</li>
                </ul>
              </div>

              <div className="border-l-4 border-success pl-4">
                <h3 className="font-heading font-bold text-text-primary mb-2">Cookies analytiques</h3>
                <p className="text-text-secondary text-sm">
                  Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site en collectant
                  et rapportant des informations de manière anonyme.
                </p>
                <ul className="list-disc list-inside text-text-secondary text-sm mt-2 ml-4">
                  <li>Google Analytics (anonymisé)</li>
                  <li>Statistiques d'utilisation</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">4. Cookies tiers</h2>
            <p className="text-text-secondary leading-relaxed mb-3">
              Certains de nos partenaires utilisent également des cookies sur notre site:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li><strong>Stripe:</strong> Pour traiter les paiements de manière sécurisée</li>
              <li><strong>Supabase:</strong> Pour l'authentification et la gestion des sessions</li>
              <li><strong>Google Analytics:</strong> Pour analyser le trafic du site (données anonymisées)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">5. Durée de conservation</h2>
            <p className="text-text-secondary leading-relaxed mb-3">
              Les cookies ont différentes durées de vie:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li><strong>Cookies de session:</strong> Supprimés à la fermeture du navigateur</li>
              <li><strong>Cookies persistants:</strong> Conservés pendant une durée définie (généralement 1 an maximum)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">6. Gérer vos préférences de cookies</h2>
            <p className="text-text-secondary leading-relaxed mb-3">
              Vous pouvez contrôler et gérer les cookies de plusieurs façons:
            </p>

            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div>
                <h4 className="font-heading font-semibold text-text-primary mb-2">Via votre navigateur</h4>
                <p className="text-text-secondary text-sm">
                  Tous les navigateurs modernes vous permettent de modifier vos paramètres de cookies. Ces paramètres
                  se trouvent généralement dans les options "Préférences" ou "Paramètres" de votre navigateur.
                </p>
              </div>

              <div>
                <h4 className="font-heading font-semibold text-text-primary mb-2">Désactiver les cookies</h4>
                <p className="text-text-secondary text-sm">
                  Vous pouvez refuser ou supprimer les cookies, mais cela peut affecter votre expérience sur notre site
                  et certaines fonctionnalités peuvent ne plus être disponibles.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">7. Cookies et données personnelles</h2>
            <p className="text-text-secondary leading-relaxed">
              Les informations collectées via les cookies peuvent être considérées comme des données personnelles.
              Par conséquent, notre <a href="/privacy" className="text-primary hover:underline">Politique de confidentialité</a> s'applique
              à la collecte et l'utilisation de ces données.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">8. Modifications</h2>
            <p className="text-text-secondary leading-relaxed">
              Nous pouvons modifier cette politique des cookies à tout moment. Toute modification sera publiée sur
              cette page avec une date de mise à jour.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">9. Contact</h2>
            <p className="text-text-secondary leading-relaxed">
              Pour toute question concernant notre utilisation des cookies, contactez-nous à:
              <a href="mailto:privacy@edukidi.com" className="text-primary hover:underline ml-1">privacy@edukidi.com</a>
            </p>
          </section>

          <div className="pt-6 border-t border-gray-200 text-sm text-text-secondary">
            Dernière mise à jour: 18 octobre 2025
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
