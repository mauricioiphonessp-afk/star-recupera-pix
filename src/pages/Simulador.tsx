import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Calculator, Mail, Shield, Lock, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const Simulador = () => {
  const [valorPerdido, setValorPerdido] = useState("");
  const [casasSelecionadas, setCasasSelecionadas] = useState<string[]>([]);
  const [outraCasa, setOutraCasa] = useState("");
  const [maisDeCasa, setMaisDeCasa] = useState("");
  const [resultado, setResultado] = useState<{
    valorPerdido: number;
    taxa: number;
    valorPix: number;
    taxaEspecial: boolean;
   } | null>(null);
   
   // Estados do cadastro
   const [nomeCompleto, setNomeCompleto] = useState("");
   const [cpf, setCpf] = useState("");
   const [dataNascimento, setDataNascimento] = useState("");
   const [anoPerda, setAnoPerda] = useState("");

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

  const casasDeApostas = [
    "KTO", "Esporte da Sorte", "Blaze", "1xBet", "Betfair", "Betano", 
    "Bet365", "Sportingbet", "Rivalo", "Pixbet", "Parimatch", "F12.bet",
    "Galera.bet", "Casa de Apostas", "Betmotion", "LeoVegas", "Bodog",
    "Betway", "William Hill", "Stake", "BC.Game", "Sportsbet.io"
  ];

  const handleCasaChange = (casa: string, checked: boolean) => {
    if (checked) {
      setCasasSelecionadas([...casasSelecionadas, casa]);
    } else {
      setCasasSelecionadas(casasSelecionadas.filter(c => c !== casa));
    }
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
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-orange-500">⚠️</span>
                      <span>
                        <strong>Não precisa ser o valor exato, apenas aproximado.</strong> Caso você tenha perdido um valor maior, a equipe da Recupera Bet entrará em contato com você.
                      </span>
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-6">
                      O pagamento pode ser realizado em até 7 dias úteis, dependendo da casa de apostas.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Seção de Casas de Apostas */}
          {resultado && (
            <div className="bg-card border border-border rounded-2xl p-8 shadow-large mt-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                Por qual casa de apostas você perdeu dinheiro?
              </h3>
              
              <div className="space-y-6">
                {/* Lista de Casas */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {casasDeApostas.map((casa) => (
                    <div key={casa} className="flex items-center space-x-2">
                      <Checkbox 
                        id={casa}
                        checked={casasSelecionadas.includes(casa)}
                        onCheckedChange={(checked) => handleCasaChange(casa, checked as boolean)}
                      />
                      <label 
                        htmlFor={casa} 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {casa}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Opções Especiais */}
                <div className="space-y-4 border-t pt-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="outra-casa"
                        checked={casasSelecionadas.includes("outra")}
                        onCheckedChange={(checked) => {
                          handleCasaChange("outra", checked as boolean);
                          if (!checked) setOutraCasa("");
                        }}
                      />
                      <label htmlFor="outra-casa" className="text-sm font-medium cursor-pointer">
                        Outra casa
                      </label>
                    </div>
                    {casasSelecionadas.includes("outra") && (
                      <Input
                        placeholder="Digite o nome da casa de apostas"
                        value={outraCasa}
                        onChange={(e) => setOutraCasa(e.target.value)}
                        className="ml-6"
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="mais-casas"
                        checked={casasSelecionadas.includes("multiplas")}
                        onCheckedChange={(checked) => {
                          handleCasaChange("multiplas", checked as boolean);
                          if (!checked) setMaisDeCasa("");
                        }}
                      />
                      <label htmlFor="mais-casas" className="text-sm font-medium cursor-pointer">
                        Mais de uma casa
                      </label>
                    </div>
                    {casasSelecionadas.includes("multiplas") && (
                      <Textarea
                        placeholder="Digite as casas de apostas (uma por linha ou separadas por vírgula)"
                        value={maisDeCasa}
                        onChange={(e) => setMaisDeCasa(e.target.value)}
                        className="ml-6"
                        rows={3}
                      />
                    )}
                  </div>
                </div>

                {/* Seção de Cadastro */}
                {(casasSelecionadas.length > 0 || outraCasa || maisDeCasa) && (
                  <div className="space-y-6 pt-8 border-t border-border">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Dados para Recuperação
                      </h3>
                      <p className="text-muted-foreground">
                        Preencha seus dados para iniciarmos o processo de recuperação
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome Completo *</Label>
                        <Input
                          id="nome"
                          type="text"
                          placeholder="Digite seu nome completo"
                          value={nomeCompleto}
                          onChange={(e) => setNomeCompleto(e.target.value)}
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cpf">CPF *</Label>
                        <Input
                          id="cpf"
                          type="text"
                          placeholder="000.000.000-00"
                          value={cpf}
                          onChange={(e) => setCpf(e.target.value)}
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="nascimento">Data de Nascimento *</Label>
                        <Input
                          id="nascimento"
                          type="date"
                          value={dataNascimento}
                          onChange={(e) => setDataNascimento(e.target.value)}
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="ano-perda">Ano Aproximado que Perdeu o Dinheiro *</Label>
                        <Input
                          id="ano-perda"
                          type="number"
                          placeholder="2023"
                          min="2020"
                          max="2024"
                          value={anoPerda}
                          onChange={(e) => setAnoPerda(e.target.value)}
                          className="h-12"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Botão Final */}
                <div className="text-center pt-6">
                  <Button 
                    className="btn-cta-primary text-lg py-6 px-8"
                    onClick={() => window.open('https://app.pushinpay.com.br/service/pay/9fd93ba0-8540-4575-82b0-dd76f7aa2037', '_blank')}
                    disabled={
                      (casasSelecionadas.length > 0 || outraCasa || maisDeCasa) && 
                      (!nomeCompleto || !cpf || !dataNascimento || !anoPerda)
                    }
                  >
                    🚀 Iniciar minha recuperação agora
                  </Button>
                  {(casasSelecionadas.length > 0 || outraCasa || maisDeCasa) && 
                   (!nomeCompleto || !cpf || !dataNascimento || !anoPerda) && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Preencha todos os campos obrigatórios para continuar
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
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