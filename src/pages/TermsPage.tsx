import { Footer } from '../components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-8">
          Conditions d'utilisation
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">1. Acceptation des conditions</h2>
            <p className="text-text-secondary leading-relaxed">
              En accédant et en utilisant Edukidi, vous acceptez d'être lié par les présentes conditions d'utilisation.
              Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">2. Description du service</h2>
            <p className="text-text-secondary leading-relaxed">
              Edukidi est une plateforme de génération d'histoires éducatives personnalisées utilisant l'intelligence artificielle.
              Le service permet aux parents de créer des histoires adaptées à l'âge de leurs enfants et à des situations spécifiques.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">3. Compte utilisateur</h2>
            <p className="text-text-secondary leading-relaxed mb-3">
              Pour utiliser Edukidi, vous devez:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Avoir au moins 18 ans</li>
              <li>Créer un compte avec des informations exactes et complètes</li>
              <li>Maintenir la confidentialité de vos identifiants de connexion</li>
              <li>Être responsable de toutes les activités effectuées via votre compte</li>
              <li>Nous informer immédiatement de toute utilisation non autorisée de votre compte</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">4. Abonnements et paiements</h2>
            <p className="text-text-secondary leading-relaxed mb-3">
              Edukidi propose différentes formules d'abonnement:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Offre gratuite: 3 histoires</li>
              <li>Abonnement mensuel: 30 histoires par mois</li>
              <li>Abonnement annuel: histoires illimitées</li>
            </ul>
            <p className="text-text-secondary leading-relaxed mt-3">
              Les paiements sont traités de manière sécurisée par Stripe. Les abonnements se renouvellent automatiquement
              sauf annulation de votre part. Vous pouvez annuler à tout moment depuis votre espace client.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">5. Politique de remboursement</h2>
            <p className="text-text-secondary leading-relaxed">
              Les paiements ne sont généralement pas remboursables. Toutefois, nous examinons les demandes de remboursement
              au cas par cas dans les 14 jours suivant l'achat initial. Pour toute demande, contactez notre support.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">6. Utilisation acceptable</h2>
            <p className="text-text-secondary leading-relaxed mb-3">
              Vous vous engagez à ne pas:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Utiliser le service à des fins illégales ou non autorisées</li>
              <li>Tenter de contourner les limitations de votre abonnement</li>
              <li>Partager votre compte avec d'autres personnes</li>
              <li>Copier, modifier ou distribuer le contenu du service sans autorisation</li>
              <li>Utiliser des robots, scrapers ou autres moyens automatisés pour accéder au service</li>
              <li>Tenter de perturber ou compromettre la sécurité du service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">7. Propriété intellectuelle</h2>
            <p className="text-text-secondary leading-relaxed">
              Les histoires générées vous appartiennent et vous pouvez les utiliser librement avec vos enfants.
              Cependant, la plateforme Edukidi, son code source, son design et sa marque restent notre propriété exclusive.
              Vous ne pouvez pas revendre ou redistribuer les histoires à des fins commerciales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">8. Contenu généré par IA</h2>
            <p className="text-text-secondary leading-relaxed">
              Les histoires sont générées par intelligence artificielle. Bien que nous fassions de notre mieux pour
              assurer la qualité et la pertinence du contenu, nous ne pouvons garantir que chaque histoire sera parfaite.
              Nous vous encourageons à lire les histoires avant de les partager avec vos enfants et à nous signaler
              tout contenu inapproprié.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">9. Limitation de responsabilité</h2>
            <p className="text-text-secondary leading-relaxed">
              Edukidi est fourni "tel quel" sans garantie d'aucune sorte. Nous ne sommes pas responsables des dommages
              directs, indirects, accessoires ou consécutifs résultant de l'utilisation ou de l'impossibilité d'utiliser
              notre service. Vous utilisez le service à vos propres risques.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">10. Résiliation</h2>
            <p className="text-text-secondary leading-relaxed">
              Nous nous réservons le droit de suspendre ou de résilier votre compte à tout moment si vous violez ces
              conditions d'utilisation. Vous pouvez également supprimer votre compte à tout moment depuis votre espace client.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">11. Modifications</h2>
            <p className="text-text-secondary leading-relaxed">
              Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications seront publiées
              sur cette page avec une date de mise à jour. Votre utilisation continue du service après les modifications
              constitue votre acceptation des nouvelles conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">12. Droit applicable</h2>
            <p className="text-text-secondary leading-relaxed">
              Ces conditions sont régies par le droit français. Tout litige sera soumis à la compétence exclusive
              des tribunaux français.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">13. Contact</h2>
            <p className="text-text-secondary leading-relaxed">
              Pour toute question concernant ces conditions d'utilisation, contactez-nous à:
              <a href="mailto:legal@edukidi.com" className="text-primary hover:underline ml-1">legal@edukidi.com</a>
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
