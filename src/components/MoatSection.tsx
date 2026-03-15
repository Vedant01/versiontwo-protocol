const MoatSection = () => {
  const moats = [
    {
      metric: "PEER-REVIEWED",
      label: "RESEARCH FOUNDATION",
      desc: "Simulation with R²=0.999 proving cooperation emerges spontaneously under karma economics.",
    },
    {
      metric: "PROTOCOL",
      label: "NOT A PRODUCT",
      desc: "Infrastructure cannot be acquired and shut down. Like HTTP — it becomes public rails.",
    },
    {
      metric: "FIRST MOVER",
      label: "AI-NATIVE REPUTATION",
      desc: "No production karma protocol for AI agents exists. We ship the primitive.",
    },
    {
      metric: "COMPOUND",
      label: "DATA NETWORK EFFECT",
      desc: "Every karma event is a data point on what good AI behavior looks like. The dataset compounds.",
    },
    {
      metric: "ESCALATION",
      label: "TRUST LADDER",
      desc: "Start locked-down, earn autonomy. The only credible pitch to risk-averse enterprises.",
    },
  ];

  return (
    <section className="px-6 md:px-12 lg:px-20 py-20 border-t border-grid/20">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12">
          <span className="text-technical text-primary/50 block mb-4">005.5 / COMPETITIVE MOAT</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.04em] leading-[0.9] text-primary">
            WHY US.<br />WHY NOW.
          </h2>
        </div>

        <div className="space-y-0">
          {moats.map((moat, idx) => (
            <div key={idx} className="flex items-start gap-6 md:gap-12 py-6 border-b border-grid/10 group hover:bg-mint/5 transition-colors duration-150 px-4 -mx-4">
              <span className="font-display text-lg md:text-xl font-bold text-primary shrink-0 w-32 md:w-40">
                {moat.metric}
              </span>
              <div className="space-y-1">
                <h4 className="text-technical text-primary">{moat.label}</h4>
                <p className="font-body text-[14px] leading-[1.6] text-primary/60 max-w-md">{moat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoatSection;
