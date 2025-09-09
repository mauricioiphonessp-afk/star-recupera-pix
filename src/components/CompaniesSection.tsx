const CompaniesSection = () => {
  const companies = [
    { name: "Bet365", logo: "/lovable-uploads/4eb87dfd-76e0-466a-9a3f-98ea49aafe1b.png" },
    { name: "KTO", logo: "/lovable-uploads/b958e5f3-ecad-4c43-a48d-1b2c15073350.png" },
    { name: "1XBET", logo: "/lovable-uploads/b230acb4-d96d-4c7c-9a34-b1ec4faf3557.png" },
    { name: "Rivalo", logo: "/lovable-uploads/9f0212d0-461e-4fb0-a188-f5d463f78a8d.png" },
    { name: "Esporte da Sorte", logo: "/lovable-uploads/f4c34fbf-f63f-40be-b722-f441d4365a44.png" },
    { name: "Blaze", logo: "/lovable-uploads/f1b49819-91d6-4494-8513-39e25a9156c1.png" },
    { name: "Sportingbet", logo: "/lovable-uploads/b0d12206-623d-4bfa-adb1-36d23d3fb2ef.png" },
    { name: "Betano", logo: "/lovable-uploads/b9e75452-1be9-4b2f-8cd7-d1d5e80f838c.png" },
    { name: "Betfair", logo: "/lovable-uploads/df363fc7-1913-41c1-a949-5b7d740f41b4.png" },
  ];

  return (
    <section id="casas-cobertas" className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8">
           <h2 className="text-3xl md:text-4xl font-bold text-foreground">
             Mais de 200 casas de apostas já cobertas pela{" "}
             <span className="text-primary">Recupera Bet</span>
           </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Se a sua casa de apostas está na lista, podemos solicitar seu reembolso imediatamente.
          </p>

          {/* Companies Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 pt-8 max-w-4xl mx-auto">
            {companies.map((company, index) => (
              <div
                key={company.name}
                className="company-logo bg-background border border-border rounded-xl p-6 flex items-center justify-center h-20 hover:border-primary transition-colors"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img 
                  src={company.logo} 
                  alt={company.name}
                  className="max-h-12 max-w-full object-contain"
                />
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