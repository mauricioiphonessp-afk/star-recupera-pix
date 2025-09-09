import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<{
    q1?: string;
    q2?: string;
    q3?: string;
    customHouse?: string;
  }>({});
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (question: string, value: string) => {
    const newAnswers = { ...answers, [question]: value };
    setAnswers(newAnswers);

    // If they answer "Não" to question 1, redirect to landing page
    if (question === "q1" && value === "Não") {
      navigate("/landing");
      return;
    }

    // Move to next question or show result
    if (currentQuestion === 1) {
      setCurrentQuestion(2);
    } else if (currentQuestion === 2) {
      setCurrentQuestion(3);
    } else if (currentQuestion === 3) {
      setShowResult(true);
    }
  };

  const handleCustomHouse = (value: string) => {
    setAnswers({ ...answers, customHouse: value });
  };

  const continueTQSimulator = () => {
    navigate("/simulador");
  };

  const bettingHouses = [
    "KTO", "Esporte da Sorte", "Blaze", "1xBet", "Betfair", 
    "Betano", "Bet365", "Sportingbet", "Rivalo"
  ];

  if (showResult) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-lg w-full p-8 text-center bg-accent border border-border rounded-3xl shadow-large">
          <div className="mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Boa notícia: você pode solicitar seu reembolso com a Recupera Bet e receber no Pix!
            </h1>
            <p className="text-muted-foreground mb-6">
              Agora vamos calcular exatamente quanto você pode recuperar.
            </p>
          </div>
          
          <Button 
            onClick={continueTQSimulator}
            className="btn-cta-primary w-full text-lg py-6"
          >
            Calcular meu reembolso
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <img 
            src="/lovable-uploads/928040ae-c6d8-4f53-8ed2-05570d02f6b7.png" 
            alt="Recupera Bet" 
            className="h-12 w-auto"
          />
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Pergunta {currentQuestion} de 3
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round((currentQuestion / 3) * 100)}%
            </span>
          </div>
          <Progress value={(currentQuestion / 3) * 100} className="h-2" />
        </div>

        {/* Motivational Text */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Responda 3 perguntas rápidas e descubra se você tem direito ao reembolso!
          </h1>
        </div>

        {/* Questions */}
        <div className="max-w-3xl mx-auto">
          {currentQuestion === 1 && (
            <Card className="p-8 bg-accent border-2 border-primary rounded-3xl shadow-large">
              <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
                Você perdeu dinheiro em alguma casa de apostas que não era licenciada no Brasil?
              </h2>
              
              <div className="grid gap-4 max-w-md mx-auto">
                <Button
                  onClick={() => handleAnswer("q1", "Sim")}
                  variant="outline"
                  className="h-16 text-lg font-semibold bg-primary text-primary-foreground hover:bg-brand-primary-hover border-primary rounded-2xl"
                >
                  <CheckCircle className="w-6 h-6 mr-3" />
                  Sim
                </Button>
                
                <Button
                  onClick={() => handleAnswer("q1", "Não")}
                  variant="outline"
                  className="h-16 text-lg font-semibold bg-background text-foreground hover:bg-muted border-border rounded-2xl"
                >
                  <XCircle className="w-6 h-6 mr-3" />
                  Não
                </Button>
              </div>
            </Card>
          )}

          {currentQuestion === 2 && (
            <Card className="p-8 bg-accent border-2 border-primary rounded-3xl shadow-large">
              <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
                Quanto, aproximadamente, você perdeu?
              </h2>
              
              <div className="grid gap-4 max-w-md mx-auto">
                <Button
                  onClick={() => handleAnswer("q2", "Até R$500")}
                  variant="outline"
                  className="h-16 text-lg font-semibold bg-primary text-primary-foreground hover:bg-brand-primary-hover border-primary rounded-2xl"
                >
                  Até R$500
                </Button>
                
                <Button
                  onClick={() => handleAnswer("q2", "De R$500 a R$2.000")}
                  variant="outline"
                  className="h-16 text-lg font-semibold bg-primary text-primary-foreground hover:bg-brand-primary-hover border-primary rounded-2xl"
                >
                  De R$500 a R$2.000
                </Button>
                
                <Button
                  onClick={() => handleAnswer("q2", "Mais de R$2.000")}
                  variant="outline"
                  className="h-16 text-lg font-semibold bg-primary text-primary-foreground hover:bg-brand-primary-hover border-primary rounded-2xl"
                >
                  Mais de R$2.000
                </Button>
              </div>
            </Card>
          )}

          {currentQuestion === 3 && (
            <Card className="p-8 bg-accent border-2 border-primary rounded-3xl shadow-large">
              <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
                Você lembra em qual casa de apostas isso aconteceu?
              </h2>
              
              <div className="grid gap-3 max-w-2xl mx-auto">
                {/* Betting Houses Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  {bettingHouses.map((house) => (
                    <Button
                      key={house}
                      onClick={() => handleAnswer("q3", house)}
                      variant="outline"
                      className="h-14 text-sm font-semibold bg-background text-foreground hover:bg-primary hover:text-primary-foreground border-border rounded-xl transition-all duration-200"
                    >
                      {house}
                    </Button>
                  ))}
                </div>

                {/* Special Options */}
                <div className="space-y-3">
                  <Button
                    onClick={() => handleAnswer("q3", "Outra casa")}
                    variant="outline"
                    className="w-full h-14 text-lg font-semibold bg-primary text-primary-foreground hover:bg-brand-primary-hover border-primary rounded-xl"
                  >
                    Outra casa
                  </Button>
                  
                  {answers.q3 === "Outra casa" && (
                    <div className="mt-4">
                      <Input
                        placeholder="Digite o nome da casa de apostas"
                        value={answers.customHouse || ""}
                        onChange={(e) => handleCustomHouse(e.target.value)}
                        className="h-12 text-lg rounded-xl border-primary"
                      />
                      <Button
                        onClick={() => setShowResult(true)}
                        className="w-full mt-4 btn-cta-primary h-14 text-lg"
                        disabled={!answers.customHouse?.trim()}
                      >
                        Continuar
                      </Button>
                    </div>
                  )}
                  
                  <Button
                    onClick={() => handleAnswer("q3", "Mais de uma casa")}
                    variant="outline"
                    className="w-full h-14 text-lg font-semibold bg-primary text-primary-foreground hover:bg-brand-primary-hover border-primary rounded-xl"
                  >
                    Mais de uma casa
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;