import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/928040ae-c6d8-4f53-8ed2-05570d02f6b7.png" 
              alt="Recupera Bet" 
              className="h-12 w-auto"
            />
          </div>

          {/* Navigation for larger screens */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#como-funciona" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Como Funciona
            </a>
            <a 
              href="#casas-cobertas" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Casas Cobertas
            </a>
            <a 
              href="#depoimentos" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Depoimentos
            </a>
            <a 
              href="#contato" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Contato
            </a>
          </nav>

          {/* CTA Button */}
          <Button className="btn-cta-secondary">
            Simule agora
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;