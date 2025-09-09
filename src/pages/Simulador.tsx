import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calculator, Mail, Shield, Lock, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const Simulador = () => {
  const [valorPerdido, setValorPerdido] = useState("");
  const [resultado, setResultado] = useState<{
    valorPerdido: number;
    taxa: number;
    valorPix: number;
    taxaEspecial: boolean;
  } | null>(null);

  const calcularRecuperacao = () => {
    const valor = parseFloat(valorPerdido.replace(/[^\d,]/g, '').replace(',', '.'));
    
    if (!valor || valor < 100) {
      alert('O valor mínimo para recuperação é R$ 100,00');
      return;
    }

    const taxa = valor >= 1000 ? 150 : 20;
    const valorPix = valor - taxa;

    setResultado({
      valorPerdido: valor,
      taxa,
      valorPix,
      taxaEspecial: valor >= 1000
    });
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Remove tudo que não é número
    value = value.replace(/\D/g, '');
    // Adiciona as vírgulas para centavos
    if (value.length > 2) {
      value = value.slice(0, -2) + ',' + value.slice(-2);
    }
    // Adiciona os pontos para milhares
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    // Adiciona R$
    if (value) {
      value = 'R$ ' + value;
    }
    setValorPerdido(value);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <img 
              src="/lovable-uploads/928040ae-c6d8-4f53-8ed2-05570d02f6b7.png" 
              alt="Recupera Bet" 
              className="h-12 w-auto"
            />
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar para Landing Page
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Simule agora sua recuperação
            </h1>
            <p className="text-xl text-muted-foreground">
              Descubra em segundos quanto você pode receber de volta no Pix. <br />
              <span className="text-base">Valor mínimo: R$ 100,00</span>
            </p>
          </div>

          {/* Simulador */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-large">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="valor" className="text-base font-semibold">
                  Digite o valor que você perdeu (em R$)
                </Label>
                <Input
                  id="valor"
                  type="text"
                  placeholder="R$ 100,00 (mínimo)"
                  value={valorPerdido}
                  onChange={handleInputChange}
                  className="text-lg h-12"
                />
              </div>

              <Button 
                onClick={calcularRecuperacao}
                className="w-full btn-cta-primary text-lg py-6"
                disabled={!valorPerdido}
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calcular minha recuperação
              </Button>

              {/* Resultado */}
              {resultado && (
                <div className="mt-8 p-6 bg-accent rounded-xl border-2 border-primary">
                  <h3 className="text-xl font-bold text-accent-foreground mb-4">
                    Resultado da Simulação
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-accent-foreground">Valor perdido:</span>
                      <span className="font-semibold text-accent-foreground">
                        {formatarMoeda(resultado.valorPerdido)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-accent-foreground">Taxa da Recupera Bet:</span>
                      <span className="font-semibold text-accent-foreground">
                        {formatarMoeda(resultado.taxa)}
                      </span>
                    </div>
                    
                    {resultado.taxaEspecial && (
                      <div className="text-sm text-primary font-medium bg-primary/10 p-2 rounded">
                        Taxa fixa para valores superiores a R$ 999: R$ 150,00
                      </div>
                    )}
                    
                    {!resultado.taxaEspecial && (
                      <div className="text-sm text-primary font-medium bg-primary/10 p-2 rounded">
                        Taxa fixa para valores até R$ 999: R$ 20
                      </div>
                    )}
                    
                    <div className="border-t border-primary pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-accent-foreground">
                          Valor no Pix:
                        </span>
                        <span className="text-2xl font-bold text-primary">
                          {formatarMoeda(resultado.valorPix)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {resultado && (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-6">
                    O pagamento pode ser realizado em até 7 dias úteis, dependendo da casa de apostas.
                  </p>
                  
                  <Button 
                    className="btn-cta-primary text-lg py-6 px-8"
                    onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
                  >
                    🚀 Iniciar minha recuperação agora
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-brand-secondary text-brand-secondary-foreground py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contato */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:contato@starrecupera.com" className="hover:text-brand-accent transition-colors">
                    contato@starrecupera.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:suporte@starrecupera.com" className="hover:text-brand-accent transition-colors">
                    suporte@starrecupera.com
                  </a>
                </div>
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
              <div className="space-y-2">
                <a href="#" className="block hover:text-brand-accent transition-colors">
                  Termos de Uso
                </a>
                <a href="#" className="block hover:text-brand-accent transition-colors">
                  Política de Privacidade
                </a>
              </div>
            </div>

            {/* Segurança */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Segurança</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-5 h-5" />
                  <span>SSL Certificado</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Lock className="w-5 h-5" />
                  <span>Pix Seguro</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CreditCard className="w-5 h-5" />
                  <span>Dados Protegidos</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-brand-secondary-foreground/20 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 Star Recupera. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Simulador;