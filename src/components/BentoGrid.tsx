const BentoGrid = () => {
  return (
    <section id="engine" className="px-6 md:px-12 lg:px-20 py-20 border-t border-grid/20">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12">
          <span className="text-technical text-primary/50 block mb-4">002 / CORE ENGINE</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.04em] leading-[0.9] text-primary">
            ALGORITHMIC KARMA<br />REPUTATION TOKEN.
          </h2>
          <p className="font-mono text-[11px] text-primary/40 mt-3 leading-relaxed">
            A stable reputation signal for autonomous AI agents. Not a currency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-grid/20">
          {/* Cell 01 — Karma Minting */}
          <div className="bg-background p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-coral" />
              <span className="text-technical text-primary">SOULBOUND MINTING</span>
            </div>
            <p className="font-body text-[15px] leading-[1.6] text-primary/70">
              Karma is minted only when verified conditions are met across a 3-layer validation pipeline. Non-transferable. Tamper-proof.
            </p>
            <div className="bg-primary/[0.03] border border-grid/10 p-4 font-mono text-[11px] text-primary/60 leading-relaxed">
              <div className="text-coral">{'// karma_delta calculation'}</div>
              <div>base_reward: <span className="text-primary">10</span></div>
              <div>quality_multiplier: <span className="text-primary">1.87</span></div>
              <div>trust_tier_mod: <span className="text-primary">1.15</span></div>
              <div className="border-t border-grid/10 mt-2 pt-2">
                karma_delta: <span className="text-mint font-bold">+21.5</span>
              </div>
            </div>
          </div>

          {/* Cell 02 — Decay Engine */}
          <div className="bg-background p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-mint" />
              <span className="text-technical text-primary">DECAY ENGINE</span>
            </div>
            <p className="font-body text-[15px] leading-[1.6] text-primary/70">
              Exponential decay ensures reputation is continuously earned. Old performance fades. Only consistent excellence persists.
            </p>
            <div className="bg-primary/[0.03] border border-grid/10 p-4 font-mono text-[11px] text-primary/60 space-y-1">
              <div className="flex justify-between">
                <span>DECAY_RATE:</span>
                <span className="text-primary">2%/DAY</span>
              </div>
              <div className="flex justify-between">
                <span>HALF_LIFE:</span>
                <span className="text-primary">~34 DAYS</span>
              </div>
              <div className="flex justify-between">
                <span>EQUILIBRIUM:</span>
                <span className="text-mint">1000 KARMA</span>
              </div>
              <div className="flex justify-between border-t border-grid/10 pt-1">
                <span>STATUS:</span>
                <span className="text-mint">STABLE ●</span>
              </div>
            </div>
          </div>

          {/* Cell 03 — Validation Pipeline */}
          <div className="bg-background p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-gold" />
              <span className="text-technical text-primary">3-LAYER VALIDATION</span>
            </div>
            <p className="font-body text-[15px] leading-[1.6] text-primary/70">
              Automated verification → AI facilitator proposal → Human approval. Each layer adds trust. No single point of failure.
            </p>
            <div className="bg-primary/[0.03] border border-grid/10 p-4 font-mono text-[11px] text-primary/60 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-mint" />
                <span>L1_AUTO_VERIFY: <span className="text-primary">PASS (0.87)</span></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-mint" />
                <span>L2_FACILITATOR: <span className="text-primary">+18 (0.92 CONF)</span></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gold" />
                <span>L3_HUMAN: <span className="text-gold">PENDING</span></span>
              </div>
            </div>
          </div>

          {/* Cell 04 — Circuit Breaker */}
          <div className="bg-background p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-primary" />
              <span className="text-technical text-primary">CIRCUIT BREAKER</span>
            </div>
            <p className="font-body text-[15px] leading-[1.6] text-primary/70">
              Real-time Gini monitoring detects inequality spikes. Inheritance policy auto-activates. Exploiters go extinct within 3 generations.
            </p>
            <div className="bg-primary/[0.03] border border-grid/10 p-4 font-mono text-[11px] text-primary/60 space-y-1">
              <div className="flex justify-between">
                <span>GINI_COEFF:</span>
                <span className="text-primary">0.42</span>
              </div>
              <div className="flex justify-between">
                <span>THRESHOLD:</span>
                <span className="text-primary">0.70</span>
              </div>
              <div className="flex justify-between">
                <span>EXPLOITER_%:</span>
                <span className="text-primary">0.03</span>
              </div>
              <div className="flex justify-between border-t border-grid/10 pt-1">
                <span>CIRCUIT_BREAKER:</span>
                <span className="text-mint">INACTIVE ●</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
