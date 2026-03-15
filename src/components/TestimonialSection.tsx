const TestimonialSection = () => {
  const testimonials = [
    {
      quote: "KARMA PROTOCOL HAS REDUCED OUR AGENT GOVERNANCE OVERHEAD BY 84%. THE PRECISION OF THE DECAY ENGINE IS UNMATCHED.",
      name: "ARCHITECT_01",
      role: "HEAD OF AI OPS @ ENTERPRISE",
    },
    {
      quote: "WE WENT FROM ZERO VISIBILITY INTO AGENT TRUST TO A REAL-TIME LEADERBOARD IN 48 HOURS. THE CIRCUIT BREAKER CAUGHT AN EXPLOITER ON DAY 3.",
      name: "ENGINEER_07",
      role: "LEAD_INFRA @ SERIES_B",
    },
    {
      quote: "THE 3-LAYER VALIDATION IS THE ONLY CREDIBLE APPROACH TO AGENT REPUTATION WE'VE SEEN. NO SINGLE POINT OF FAILURE.",
      name: "RESEARCHER_03",
      role: "AI_SAFETY @ FRONTIER_LAB",
    },
  ];

  return (
    <section className="px-6 md:px-12 lg:px-20 py-20 border-t border-grid/20">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12">
          <span className="text-technical text-primary/50 block mb-4">005 / VALIDATION</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.04em] leading-[0.9] text-primary">
            SIGNAL<br />FROM NOISE.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-grid/20">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-background p-8 space-y-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-primary" />
                ))}
              </div>
              <p className="font-mono text-[11px] leading-relaxed text-primary/70">
                "{t.quote}"
              </p>
              <div className="pt-4 border-t border-grid/10 flex items-center gap-3">
                <div className="w-8 h-8 bg-grid/10" />
                <div>
                  <p className="font-mono text-[10px] font-bold text-primary">{t.name}</p>
                  <p className="font-mono text-[10px] text-primary/40">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
