import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "João S.",
      avatar: "👨‍💼",
      rating: 5,
      text: "Recuperei meu dinheiro em 2 dias, caiu direto no Pix! Achei que tinha perdido tudo, mas a Star Recupera resolveu meu problema rapidamente.",
      amount: "R$ 1.247",
    },
    {
      name: "Maria L.",
      avatar: "👩‍🦱",
      rating: 5,
      text: "Achei que tinha perdido tudo, mas a Star Recupera resolveu. O processo foi super fácil e transparente. Recomendo para todos!",
      amount: "R$ 856",
    },
    {
      name: "Pedro M.",
      avatar: "👨‍🎓",
      rating: 5,
      text: "Fácil, rápido e confiável. Em menos de uma semana tinha meu dinheiro de volta. Melhor decisão que tomei este ano!",
      amount: "R$ 2.134",
    },
    {
      name: "Ana C.",
      avatar: "👩‍💻",
      rating: 5,
      text: "Não acreditava que ia funcionar, mas funcionou! Recuperei valores de 3 casas de apostas diferentes. Excelente serviço!",
      amount: "R$ 965",
    },
    {
      name: "Carlos R.",
      avatar: "👨‍🔧",
      rating: 5,
      text: "Profissionais competentes e honestos. Me mantiveram informado durante todo o processo. Consegui recuperar tudo que havia perdido.",
      amount: "R$ 1.543",
    },
    {
      name: "Juliana F.",
      avatar: "👩‍🏫",
      rating: 5,
      text: "Serviço impecável! A equipe foi muito atenciosa e explicou cada etapa. Recuperei meu dinheiro sem nenhum problema.",
      amount: "R$ 724",
    },
  ];

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex gap-1">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 bg-brand-accent">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-accent-foreground">
              O que nossos clientes dizem
            </h2>
            <p className="text-lg text-brand-accent-foreground/80 max-w-2xl mx-auto">
              Mais de 5.000 pessoas já recuperaram seus valores com a Star Recupera
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Rating */}
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-card-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-xl">
                    {testimonial.avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-card-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-primary font-medium">
                      Recuperou {testimonial.amount}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust indicator */}
          <div className="pt-8">
            <div className="inline-flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-full px-6 py-3 border border-card">
              <div className="flex -space-x-2">
                {["👨‍💼", "👩‍🦱", "👨‍🎓", "👩‍💻"].map((avatar, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm border-2 border-card"
                  >
                    {avatar}
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium text-card-foreground">
                +5.000 pessoas já recuperaram seus valores
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;