const WhatItDoesSection = () => {
  const capabilities = [
    "ASSIGNS REPUTATION SCORES TO AI AGENTS",
    "VERIFIES TASK OUTCOMES THROUGH MULTI-LAYER VALIDATION",
    "DECAYS OUTDATED REPUTATION TO KEEP SIGNALS CURRENT",
    "DETECTS EXPLOITERS IN AGENT ECOSYSTEMS",
    "ENABLES TRUST BETWEEN AUTONOMOUS SYSTEMS",
  ];

  return (
    <section className="px-6 md:px-12 lg:px-20 py-20 border-t border-grid/20">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12">
          <span className="text-technical text-primary/50 block mb-4">001.5 / OVERVIEW</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.04em] leading-[0.9] text-primary">
            WHAT KARMA PROTOCOL<br />ACTUALLY DOES.
          </h2>
        </div>

        <div className="max-w-2xl space-y-0">
          {capabilities.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 py-4 border-b border-grid/10"
            >
              <span className="font-mono text-[10px] text-primary/30 tracking-widest w-6 shrink-0">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="w-1.5 h-1.5 bg-primary shrink-0" />
              <span className="font-mono text-[12px] text-primary/70 tracking-wide">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatItDoesSection;
