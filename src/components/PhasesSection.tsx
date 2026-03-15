const PhasesSection = () => {
  const outcomes = [
    {
      id: "01",
      title: "GOVERNANCE",
      tagline: "CONTROL YOUR AI'S BEHAVIOR",
      color: "bg-mint",
      description:
        "Define policies, boundaries, and rules for how your AI operates—internally with teams and externally with partners, systems, and customers.",
      items: [
        "AI POLICY ENFORCEMENT",
        "ROLE-BASED ACCESS CONTROL",
        "INTERNAL & EXTERNAL BEHAVIOR RULES",
        "HUMAN OVERRIDE & APPROVAL GATES",
        "CONFIGURABLE CONSTRAINT LAYERS",
      ],
    },
    {
      id: "02",
      title: "ACCOUNTABILITY",
      tagline: "OWN EVERY DECISION",
      color: "bg-coral",
      description:
        "Full audit trail of every AI decision — who triggered it, who approved it, and what outcome it produced. No black boxes.",
      items: [
        "DECISION ATTRIBUTION LOGS",
        "APPROVAL CHAIN VISIBILITY",
        "HUMAN-AI ACTION HISTORY",
        "IMMUTABLE AUDIT RECORDS",
        "STAKEHOLDER RESPONSIBILITY MAP",
      ],
    },
    {
      id: "03",
      title: "INCENTIVE ENGINE",
      tagline: "KARMA FOR YOUR AI WORKFORCE",
      color: "bg-gold",
      description:
        "A capitalist-style reward and punishment system that incentivizes good AI behavior and penalizes failure — letting your AI evolve in the real world.",
      items: [
        "PERFORMANCE-BASED SCORING",
        "DECAY FOR INACTIVITY OR FAILURE",
        "GINI COEFFICIENT FAIRNESS CHECK",
        "AGENT STAKING & SLASHING",
        "CONTINUOUS SELF-IMPROVEMENT LOOP",
      ],
    },
    {
      id: "04",
      title: "COMPLIANCE & TRUST",
      tagline: "A CIBIL SCORE FOR YOUR AI",
      color: "bg-primary",
      description:
        "Continuous monitoring of AI behavior and performance trends, giving you a live trust score for every agent — like a credit rating for your AI.",
      items: [
        "LIVE TRUST SCORE PER AGENT",
        "REGULATORY COMPLIANCE EXPORT",
        "ANOMALY DETECTION & ALERTS",
        "BEHAVIORAL TREND ANALYSIS",
        "CIRCUIT BREAKER ON TRUST BREACH",
      ],
    },
  ];

  return (
    <section id="phases" className="px-6 md:px-12 lg:px-20 py-20 border-t border-grid/20">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12">
          <span className="text-technical text-primary/50 block mb-4">004 / OUTCOMES</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.04em] leading-[0.9] text-primary">
            WHAT YOUR<br />COMPANY GAINS.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-grid/20">
          {outcomes.map((outcome) => (
            <div key={outcome.id} className="bg-background p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-1 h-6 ${outcome.color}`} />
                <span className="text-technical text-primary">{outcome.id}</span>
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight text-primary">
                {outcome.title}
              </h3>
              <span className="font-mono text-[10px] text-primary/40 tracking-widest">
                {outcome.tagline}
              </span>
              <p className="font-mono text-[10px] text-primary/50 leading-relaxed">
                {outcome.description}
              </p>
              <ul className="space-y-2 pt-2">
                {outcome.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-primary/30 mt-[6px] shrink-0" />
                    <span className="font-mono text-[10px] text-primary/60 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhasesSection;
