import { Mail, Shield, Lock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer id="contato" className="bg-brand-secondary text-brand-secondary-foreground">
      {/* CTA Section */}
      <div className="border-b border-brand-secondary-foreground/20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para recuperar seu dinheiro?
            </h2>
            <p className="text-xl text-brand-secondary-foreground/90 max-w-2xl mx-auto">
              Não deixe seu dinheiro perdido. Comece sua recuperação agora mesmo, é grátis!
            </p>
            <Button className="btn-cta-primary">
              Simule agora sua recuperação
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
           <div className="space-y-4">
             <h3 className="text-2xl font-bold text-primary">Recupera Bet</h3>
             <p className="text-brand-secondary-foreground/80 leading-relaxed">
               Especializada em recuperar valores perdidos em casas de apostas não licenciadas no Brasil.
             </p>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <Lock className="w-4 h-4 text-primary" />
              </div>
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                 <a 
                   href="mailto:contato@recuperabet.com" 
                   className="text-brand-secondary-foreground/80 hover:text-primary transition-colors"
                 >
                   contato@recuperabet.com
                 </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                 <a 
                   href="mailto:suporte@recuperabet.com" 
                   className="text-brand-secondary-foreground/80 hover:text-primary transition-colors"
                 >
                   suporte@recuperabet.com
                 </a>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Links Úteis</h4>
            <div className="space-y-3">
              <a 
                href="#" 
                className="block text-brand-secondary-foreground/80 hover:text-primary transition-colors"
              >
                Termos de Uso
              </a>
              <a 
                href="#" 
                className="block text-brand-secondary-foreground/80 hover:text-primary transition-colors"
              >
                Política de Privacidade
              </a>
              <a 
                href="#" 
                className="block text-brand-secondary-foreground/80 hover:text-primary transition-colors"
              >
                Suporte
              </a>
              <a 
                href="#" 
                className="block text-brand-secondary-foreground/80 hover:text-primary transition-colors"
              >
                Como Funciona
              </a>
            </div>
          </div>

          {/* Security Badges */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Segurança</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-primary" />
                <span>SSL Certificado</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="w-4 h-4 text-primary" />
                <span>Pix Seguro</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Lock className="w-4 h-4 text-primary" />
                <span>Dados Protegidos</span>
              </div>
              <div className="bg-brand-secondary-foreground/10 rounded-lg p-3 mt-4">
                <div className="text-xs text-brand-secondary-foreground/80">
                  Garantia de Confiança
                </div>
                <div className="text-sm font-semibold text-primary">
                  100% Seguro
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-secondary-foreground/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-sm text-brand-secondary-foreground/60">
               © 2024 Recupera Bet. Todos os direitos reservados.
             </p>
            <div className="flex items-center gap-4 text-xs text-brand-secondary-foreground/60">
              <span>CNPJ: 00.000.000/0001-00</span>
              <span>•</span>
              <span>Empresa 100% brasileira</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;