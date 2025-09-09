import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Shield } from "lucide-react";
const heroImage = "/lovable-uploads/c4bcc343-ac15-426c-ba8f-0a45a53efa22.png";

const HeroSection = () => {
  return (
    <section className="hero-gradient min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Perdeu dinheiro em{" "}
                <span className="text-primary">casas de apostas?</span> A Recupera
                Bet solicita o reembolso pra você
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground text-balance">
                Automatizamos a solicitação do reembolso junto à casa de apostas.
                Após aprovação,{" "}
                <span className="text-primary font-semibold">
                  você recebe no Pix em segundos.
                </span>
              </p>
            </div>

            {/* CTA Button */}
            <div className="space-y-4">
              <Button className="btn-cta-primary text-lg">
                <Zap className="mr-2 h-5 w-5" />
                Simule agora sua recuperação gratuita
              </Button>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                <span>100% seguro e gratuito</span>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Mais de 200 casas cobertas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Pix na hora</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Processo automatizado</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-large">
              <img
                src={heroImage}
                alt="Mulher sorrindo ao receber Pix no celular"
                className="w-full h-auto object-cover"
                loading="eager"
              />
              
              {/* Floating Pix notification */}
              <div className="absolute top-8 right-8 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-brand animate-pulse">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                  <span className="text-sm font-semibold">Pix recebido!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;