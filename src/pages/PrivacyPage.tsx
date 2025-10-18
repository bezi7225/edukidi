import { Footer } from '../components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-8">
          Politique de confidentialité
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">1. Introduction</h2>
            <p className="text-text-secondary leading-relaxed">
              Bienvenue sur Edukidi. Nous nous engageons à protéger votre vie privée et celle de vos enfants.
              Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">2. Données collectées</h2>
            <p className="text-text-secondary leading-relaxed mb-3">
              Nous collectons les informations suivantes:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Informations de compte (email, mot de passe)</li>
              <li>Informations de paiement (traitées de manière sécurisée par Stripe)</li>
              <li>L'âge de vos enfants et les situations pour lesquelles vous générez des histoires</li>
              <li>Les histoires générées et leur contenu</li>
              <li>Données d'utilisation et statistiques anonymisées</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">3. Utilisation des données</h2>
            <p className="text-text-secondary leading-relaxed mb-3">
              Nous utilisons vos données pour:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Générer des histoires personnalisées adaptées à vos besoins</li>
              <li>Gérer votre compte et votre abonnement</li>
              <li>Améliorer notre service et l'expérience utilisateur</li>
              <li>Vous envoyer des notifications importantes concernant votre compte</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">4. Protection des données</h2>
            <p className="text-text-secondary leading-relaxed">
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données
              contre tout accès non autorisé, modification, divulgation ou destruction. Toutes les données sont chiffrées
              en transit et au repos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">5. Partage des données</h2>
            <p className="text-text-secondary leading-relaxed">
              Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos données uniquement avec:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mt-3">
              <li>Nos prestataires de services (hébergement, paiement, IA) qui sont tenus à la confidentialité</li>
              <li>Les autorités légales si la loi l'exige</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">6. Vos droits</h2>
            <p className="text-text-secondary leading-relaxed mb-3">
              Conformément au RGPD, vous disposez des droits suivants:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Droit d'accès à vos données personnelles</li>
              <li>Droit de rectification de vos données</li>
              <li>Droit à l'effacement de vos données</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité de vos données</li>
              <li>Droit d'opposition au traitement</li>
            </ul>
            <p className="text-text-secondary leading-relaxed mt-3">
              Pour exercer ces droits, contactez-nous à: <a href="mailto:privacy@edukidi.com" className="text-primary hover:underline">privacy@edukidi.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">7. Cookies</h2>
            <p className="text-text-secondary leading-relaxed">
              Nous utilisons des cookies essentiels pour le fonctionnement du site et des cookies analytiques pour améliorer
              notre service. Consultez notre <a href="/cookies" className="text-primary hover:underline">politique des cookies</a> pour plus d'informations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">8. Conservation des données</h2>
            <p className="text-text-secondary leading-relaxed">
              Nous conservons vos données aussi longtemps que votre compte est actif ou selon les besoins pour vous fournir
              nos services. Vous pouvez demander la suppression de votre compte à tout moment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">9. Modifications</h2>
            <p className="text-text-secondary leading-relaxed">
              Nous pouvons modifier cette politique de confidentialité à tout moment. Les modifications seront publiées sur
              cette page avec une date de mise à jour. Nous vous encourageons à consulter régulièrement cette page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">10. Contact</h2>
            <p className="text-text-secondary leading-relaxed">
              Pour toute question concernant cette politique de confidentialité, contactez-nous à:
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
