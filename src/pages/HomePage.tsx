import { useNavigate } from 'react-router-dom';
import { BookHeart, Zap, Target, MessageCircle, Star, CheckCircle, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Footer } from '../components/Footer';
import { useState } from 'react';

export default function HomePage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const testimonials = [
    {
      name: 'Sophie M.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      text: 'Ma fille de 5 ans adore les histoires personnalisées! C\'est devenu notre rituel du soir.',
      rating: 5,
    },
    {
      name: 'Thomas L.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      text: 'Un outil formidable pour aborder des sujets difficiles avec mon fils. Les questions sont très pertinentes.',
      rating: 5,
    },
    {
      name: 'Marie D.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      text: 'Mes jumeaux ont chacun leurs histoires adaptées à leur âge. C\'est magique!',
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: 'Comment fonctionne Edukidi?',
      answer: 'Edukidi utilise l\'intelligence artificielle pour créer des histoires personnalisées basées sur l\'âge de votre enfant et la situation que vous souhaitez aborder. En quelques secondes, vous recevez une histoire unique avec des questions de discussion.',
    },
    {
      question: 'Pour quel âge sont les histoires?',
      answer: 'Nos histoires sont adaptées pour les enfants de 3 à 12 ans. L\'IA ajuste le vocabulaire, la complexité et les thèmes en fonction de l\'âge que vous indiquez.',
    },
    {
      question: 'Combien d\'histoires puis-je générer?',
      answer: 'Avec l\'offre gratuite, vous pouvez générer 3 histoires. Les abonnements mensuels offrent 30 histoires par mois, et l\'abonnement annuel vous donne un accès illimité.',
    },
    {
      question: 'Les histoires sont-elles vraiment éducatives?',
      answer: 'Oui! Chaque histoire est conçue pour transmettre des valeurs importantes et inclut des questions de réflexion pour approfondir la discussion avec votre enfant.',
    },
    {
      question: 'Puis-je annuler mon abonnement?',
      answer: 'Absolument. Vous pouvez annuler votre abonnement à tout moment depuis votre espace client. Aucun engagement.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-12">

        <div className="text-center space-y-6 mb-12">
          <div className="flex justify-center mb-6">
            <div className="flex items-center rounded-full p-0.5 gap-1.5 border border-gray-300 shadow-sm bg-white">
              <div className="flex -space-x-1 px-1">
                <Avatar className="size-7">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
                    alt="User"
                    className="border-2 border-white hover:z-10"
                  />
                  <AvatarFallback>U1</AvatarFallback>
                </Avatar>
                <Avatar className="size-7">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&h=100&fit=crop"
                    alt="User"
                    className="border-2 border-white hover:z-10"
                  />
                  <AvatarFallback>U2</AvatarFallback>
                </Avatar>
                <Avatar className="size-7">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1551292831-023188e78222?w=100&h=100&fit=crop"
                    alt="User"
                    className="border-2 border-white hover:z-10"
                  />
                  <AvatarFallback>U3</AvatarFallback>
                </Avatar>
                <Avatar className="size-7">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop"
                    alt="User"
                    className="border-2 border-white hover:z-10"
                  />
                  <AvatarFallback>U4</AvatarFallback>
                </Avatar>
              </div>
              <p className="text-xs text-gray-600 me-3">
                Approuvé par <span className="font-semibold text-text-primary">10 000+</span> parents
              </p>
            </div>
          </div>

          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl max-w-2xl mx-auto mb-10">
  Des histoires éducatives <span className="underline decoration-orange-400 underline-offset-4">adaptées</span> à votre enfant
</h2>

          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Générées par IA pour vos enfants, adaptées a leur âge et aux situations
          </p>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            onClick={() => navigate('/signup')}
            className="btn-primary text-lg px-12 py-4"
          >
            Commencer gratuitement
          </button>
          <button
            onClick={() => navigate('/pricing')}
            className="bg-white hover:bg-gray-50 text-text-primary font-body font-semibold text-lg px-12 py-4 rounded-2xl border-2 border-primary/30 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Voir les formules
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="card">
            <div className="flex justify-center mb-4">
              <Zap className="w-12 h-12 text-accent" />
            </div>
            <h3 className="font-heading font-bold text-text-primary mb-2 text-lg">En 10 secondes</h3>
            <p className="text-text-secondary">Une histoire unique générée instantanement</p>
          </div>
          <div className="card">
            <div className="flex justify-center mb-4">
              <Target className="w-12 h-12 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-text-primary mb-2 text-lg">Personnalisée</h3>
            <p className="text-text-secondary">Adaptee a age et aux valeurs de votre enfant</p>
          </div>
          <div className="card">
            <div className="flex justify-center mb-4">
              <MessageCircle className="w-12 h-12 text-success" />
            </div>
            <h3 className="font-heading font-bold text-text-primary mb-2 text-lg">Educative</h3>
            <p className="text-text-secondary">Avec des questions pour discuter ensemble</p>
          </div>
        </div>

        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
              Edukidi en chiffres
            </h3>
            <p className="text-xl text-text-secondary">La confiance des parents, partout en France</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card text-center">
              <div className="text-4xl font-heading font-bold text-accent mb-2">10 000+</div>
              <p className="text-text-secondary">Parents satisfaits</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl font-heading font-bold text-primary mb-2">50 000+</div>
              <p className="text-text-secondary">Histoires générées</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl font-heading font-bold text-success mb-2">4.9/5</div>
              <p className="text-text-secondary">Note moyenne</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl font-heading font-bold text-accent mb-2">10 sec</div>
              <p className="text-text-secondary">Temps de génération</p>
            </div>
          </div>
        </div>

        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
              Comment ça fonctionne?
            </h3>
            <p className="text-xl text-text-secondary">Créez une histoire en 3 étapes simples</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="card text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center font-heading font-bold">
                  1
                </div>
                <h4 className="font-heading font-bold text-text-primary mb-3 text-lg mt-4">
                  Indiquez l'âge
                </h4>
                <p className="text-text-secondary">
                  Dites-nous l'âge de votre enfant pour adapter le vocabulaire et la complexité
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="card text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-heading font-bold">
                  2
                </div>
                <h4 className="font-heading font-bold text-text-primary mb-3 text-lg mt-4">
                  Décrivez la situation
                </h4>
                <p className="text-text-secondary">
                  Expliquez brièvement la situation ou la valeur que vous souhaitez aborder
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="card text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-success text-white rounded-full w-8 h-8 flex items-center justify-center font-heading font-bold">
                  3
                </div>
                <h4 className="font-heading font-bold text-text-primary mb-3 text-lg mt-4">
                  Recevez l'histoire
                </h4>
                <p className="text-text-secondary">
                  En 10 secondes, découvrez votre histoire personnalisée avec des questions de discussion
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
              Ce que disent les parents
            </h3>
            <p className="text-xl text-text-secondary">Des milliers de familles nous font confiance</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="size-12">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-heading font-bold text-text-primary">{testimonial.name}</div>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-text-secondary italic">&ldquo;{testimonial.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-24 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
              Questions fréquentes
            </h3>
            <p className="text-xl text-text-secondary">Tout ce que vous devez savoir</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="card">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <h4 className="font-heading font-bold text-text-primary">{faq.question}</h4>
                  <ChevronDown
                    className={`w-5 h-5 text-text-secondary transition-transform ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <p className="text-text-secondary mt-4 pt-4 border-t border-gray-200">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="card bg-gradient-to-br from-primary/20 to-accent/20 text-center py-12 mb-24">
          <h3 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
            Prêt à commencer?
          </h3>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de parents qui utilisent Edukidi pour créer des moments magiques avec leurs enfants
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="btn-primary text-lg px-12 py-4"
          >
            Essayer gratuitement
          </button>
        </div>

      </div>

      <Footer />
    </div>
  );
}
