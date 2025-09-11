import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const IdadeVerificacao = () => {
  const [etapa, setEtapa] = useState<'inicial' | 'confirmacao' | 'negado'>('inicial');
  const navigate = useNavigate();

  const handleIdadeConfirmada = () => {
    setEtapa('confirmacao');
    setTimeout(() => {
      navigate('/simulador');
    }, 2000);
  };

  const handleMenorIdade = () => {
    setEtapa('negado');
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
      <main className="py-12 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="container mx-auto px-4 max-w-lg">
          {etapa === 'inicial' && (
            <Card className="p-8 text-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-foreground">
                  Verificação de Idade
                </h1>
                <p className="text-lg text-muted-foreground">
                  Para utilizar nossos serviços de recuperação, você deve ser maior de idade.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-accent/50 p-4 rounded-lg border">
                  <p className="text-base font-medium text-accent-foreground">
                    🔒 Você tem 18 anos ou mais?
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <Button 
                    onClick={handleIdadeConfirmada}
                    className="btn-cta-primary text-lg py-6"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Sim, tenho 18 anos ou mais
                  </Button>

                  <Button 
                    onClick={handleMenorIdade}
                    variant="outline"
                    className="text-lg py-6 border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <XCircle className="w-5 h-5 mr-2" />
                    Não, sou menor de 18 anos
                  </Button>
                </div>
              </div>

              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  ⚠️ <strong>Importante:</strong> Nossos serviços são destinados exclusivamente para maiores de idade.
                </p>
                <p>
                  Esta verificação é obrigatória de acordo com as regulamentações brasileiras.
                </p>
              </div>
            </Card>
          )}

          {etapa === 'confirmacao' && (
            <Card className="p-8 text-center space-y-6">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-green-600">
                  Verificação Confirmada!
                </h1>
                <p className="text-lg text-muted-foreground">
                  Redirecionando você para o simulador de recuperação...
                </p>
              </div>

              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            </Card>
          )}

          {etapa === 'negado' && (
            <Card className="p-8 text-center space-y-6">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
                <h1 className="text-3xl font-bold text-red-600">
                  Acesso Negado
                </h1>
                <p className="text-lg text-muted-foreground">
                  Nossos serviços são destinados exclusivamente para maiores de 18 anos.
                </p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-red-800 font-medium">
                  🚫 Você deve ter pelo menos 18 anos para utilizar nossos serviços de recuperação.
                </p>
                <p className="text-red-700 text-sm mt-2">
                  Esta restrição está de acordo com a legislação brasileira sobre jogos e apostas.
                </p>
              </div>

              <Link to="/">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar para a Página Inicial
                </Button>
              </Link>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default IdadeVerificacao;