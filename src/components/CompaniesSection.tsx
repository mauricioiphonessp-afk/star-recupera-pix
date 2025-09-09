const CompaniesSection = () => {
  const companies = [
    { name: "KTO", logo: "🎯" },
    { name: "Esporte da Sorte", logo: "⚽" },
    { name: "Blaze", logo: "🔥" },
    { name: "1xBet", logo: "🏆" },
    { name: "Betfair", logo: "💎" },
    { name: "Betano", logo: "⭐" },
    { name: "Bet365", logo: "🎲" },
    { name: "Sportingbet", logo: "🏁" },
    { name: "Rivalo", logo: "🎪" },
    { name: "Parimatch", logo: "🚀" },
    { name: "22Bet", logo: "💰" },
    { name: "Melbet", logo: "🎊" },
  ];

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Mais de 200 casas de apostas já cobertas pela{" "}
            <span className="text-primary">Star Recupera</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Se a sua casa de apostas está na lista, podemos solicitar seu reembolso imediatamente.
          </p>

          {/* Companies Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 pt-8">
            {companies.map((company, index) => (
              <div
                key={company.name}
                className="company-logo bg-background border border-border rounded-xl p-6 flex flex-col items-center justify-center h-24 hover:border-primary"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-2xl mb-1">{company.logo}</div>
                <span className="text-xs font-medium text-muted-foreground text-center">
                  {company.name}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-6">
            <p className="text-sm text-muted-foreground">
              E muitas outras casas de apostas...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;