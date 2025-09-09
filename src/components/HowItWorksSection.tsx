import { Button } from "@/components/ui/button";
import { Smartphone, Zap, CreditCard, Clock } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Smartphone,
      number: "1",
      title: "Simule sua recuperação",
      description: "Informe seus dados gratuitamente em menos de 1 minuto. Nosso sistema verifica automaticamente suas chances de recuperação.",
    },
    {
      icon: Zap,
      number: "2",
      title: "Solicitamos o reembolso",
      description: "Nossa equipe especializada solicita o reembolso automaticamente junto à casa de apostas usando protocolos legais.",
    },
    {
      icon: CreditCard,
      number: "3",
      title: "Pix na sua conta",
      description: "Após aprovação da casa de apostas, você recebe o valor direto no seu Pix em segundos.",
    },
  ];

  return (
    <section id="como-funciona" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Recupere seus valores em{" "}
              <span className="text-primary">3 passos simples</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nosso processo é 100% automatizado e seguro. Você não precisa se preocupar com nada.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={index}
                  className="process-step relative"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow connector for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <div className="w-8 h-0.5 bg-primary/30"></div>
                      <div className="absolute -right-1 -top-1 w-2 h-2 bg-primary rotate-45 transform origin-center"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Disclaimer and CTA */}
          <div className="space-y-6 pt-8">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>O pagamento pode ser realizado em até 7 dias úteis, dependendo da casa de apostas.</span>
            </div>
            
            <Button className="btn-cta-secondary">
              🚀 Pedir meu reembolso agora
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;