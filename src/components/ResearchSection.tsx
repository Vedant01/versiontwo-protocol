import { Button } from "@/components/ui/button";

const ResearchSection = () => {
  const metrics = [
    { value: "5", label: "PEER-REVIEWED PAPERS", color: "bg-mint" },
    { value: "3", label: "PAPERS IN PROGRESS", color: "bg-gold" },
    { value: "R² = 0.999", label: "MODEL ACCURACY", color: "bg-coral" },
    { value: "34%", label: "INEQUALITY REDUCTION", color: "bg-primary" },
    { value: "3.36×", label: "SURVIVAL ADVANTAGE", color: "bg-mint" },
  ];

  const credibilityLabels = [
    "PEER REVIEWED",
    "PROTOCOL INFRASTRUCTURE",
    "AI-NATIVE REPUTATION",
    "DATA NETWORK EFFECT",
    "TRUST ESCALATION LADDER",
  ];

  return (
    <section id="research" className="px-6 md:px-12 lg:px-20 py-20 border-t border-grid/20">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12">
          <span className="text-technical text-primary/50 block mb-4">007 / EVIDENCE</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.04em] leading-[0.9] text-primary">
            RESEARCH<br />FOUNDATION.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-grid/20">
          {metrics.map((m, idx) => (
            <div key={idx} className="bg-background p-6 space-y-3">
              <div className={`w-1 h-4 ${m.color}`} />
              <span className="font-display text-2xl md:text-3xl font-bold text-primary block">
                {m.value}
              </span>
              <span className="text-technical text-primary/50">{m.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {credibilityLabels.map((label, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-2 border border-grid/20 px-3 py-1.5"
            >
              <div className="w-1.5 h-1.5 bg-primary" />
              <span className="text-technical text-primary/60">{label}</span>
            </span>
          ))}
        </div>

        <div className="mt-8 max-w-xl">
          <p className="font-mono text-[11px] text-primary/40 leading-relaxed">
            Results derived from simulation models demonstrating the emergence of cooperation in agent reputation economies.
          </p>
          <div className="mt-6">
            <Button variant="ghost-technical" size="technical" className="h-10 px-6" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">VIEW PAPERS</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
