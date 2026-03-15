const NetworkTopology = () => {
  return (
    <section id="architecture" className="px-6 md:px-12 lg:px-20 py-20 border-t border-grid/20">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left — SVG */}
        <div className="flex items-center justify-center">
          <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] border border-grid/20">
            <svg viewBox="0 0 450 450" className="w-full h-full">
              {/* Connection lines */}
              <line x1="225" y1="225" x2="225" y2="85" stroke="hsl(153 38% 17% / 0.1)" strokeWidth="1" />
              <line x1="225" y1="225" x2="365" y2="225" stroke="hsl(153 38% 17% / 0.1)" strokeWidth="1" />
              <line x1="225" y1="225" x2="85" y2="225" stroke="hsl(153 38% 17% / 0.1)" strokeWidth="1" />
              <line x1="225" y1="225" x2="225" y2="365" stroke="hsl(153 38% 17% / 0.1)" strokeWidth="1" />
              <line x1="225" y1="225" x2="130" y2="130" stroke="hsl(153 38% 17% / 0.1)" strokeWidth="1" />
              <line x1="225" y1="225" x2="320" y2="130" stroke="hsl(153 38% 17% / 0.1)" strokeWidth="1" />
              <line x1="225" y1="225" x2="130" y2="320" stroke="hsl(153 38% 17% / 0.1)" strokeWidth="1" />
              <line x1="225" y1="225" x2="320" y2="320" stroke="hsl(153 38% 17% / 0.1)" strokeWidth="1" />

              {/* Orbits */}
              <circle cx="225" cy="225" r="70" fill="none" stroke="hsl(153 38% 17% / 0.12)" strokeDasharray="6 4" strokeWidth="0.5" />
              <circle cx="225" cy="225" r="110" fill="none" stroke="hsl(153 38% 17% / 0.10)" strokeDasharray="6 4" strokeWidth="0.5" />
              <circle cx="225" cy="225" r="140" fill="none" stroke="hsl(153 38% 17% / 0.08)" strokeDasharray="6 4" strokeWidth="0.5" />

              {/* Center node */}
              <rect x="217" y="217" width="16" height="16" fill="hsl(153, 38%, 17%)" />
            </svg>

            {/* Orbiting nodes */}
            <div className="absolute inset-0 animate-orbit" style={{ animationDuration: '20s' }}>
              <div className="absolute" style={{ top: '55px', left: '50%', transform: 'translateX(-50%)' }}>
                <div className="w-2 h-2 bg-coral" />
              </div>
            </div>
            <div className="absolute inset-0 animate-orbit-reverse" style={{ animationDuration: '25s' }}>
              <div className="absolute" style={{ top: '50%', right: '35px', transform: 'translateY(-50%)' }}>
                <div className="w-2 h-2 bg-mint" />
              </div>
            </div>
            <div className="absolute inset-0 animate-orbit-slow" style={{ animationDuration: '30s' }}>
              <div className="absolute" style={{ bottom: '70px', left: '70px' }}>
                <div className="w-2 h-2 bg-gold" />
              </div>
            </div>
            <div className="absolute inset-0 animate-orbit" style={{ animationDuration: '35s' }}>
              <div className="absolute" style={{ top: '100px', left: '60px' }}>
                <div className="w-2 h-2 bg-coral" />
              </div>
            </div>
          </div>
        </div>

        {/* Right — Architecture Description */}
        <div className="space-y-8">
          <span className="text-technical text-primary/50">003 / SYSTEM ARCHITECTURE</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.04em] leading-[0.9] text-primary">
            HYBRID<br />ON-CHAIN<br />SETTLEMENT.
          </h2>
          <p className="font-body text-[15px] leading-[1.6] text-primary/70 max-w-lg">
            Day-to-day computation runs off-chain for speed. Final karma settlements are batched and committed to Base L2 for immutability. Like Visa — fast operations, permanent ledger.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4 py-3 border-b border-grid/10">
              <div className="w-2 h-2 bg-coral" />
              <span className="text-technical text-primary/70 flex-1">KARMATOKEN.SOL</span>
              <span className="font-mono text-[11px] text-primary/40">ERC-20 + SOULBOUND</span>
            </div>
            <div className="flex items-center gap-4 py-3 border-b border-grid/10">
              <div className="w-2 h-2 bg-mint" />
              <span className="text-technical text-primary/70 flex-1">MINTINGGATE.SOL</span>
              <span className="font-mono text-[11px] text-primary/40">CONDITION VERIFIER</span>
            </div>
            <div className="flex items-center gap-4 py-3 border-b border-grid/10">
              <div className="w-2 h-2 bg-gold" />
              <span className="text-technical text-primary/70 flex-1">AGENTREGISTRY.SOL</span>
              <span className="font-mono text-[11px] text-primary/40">ERC-4337 WALLETS</span>
            </div>
            <div className="flex items-center gap-4 py-3 border-b border-grid/10">
              <div className="w-2 h-2 bg-primary" />
              <span className="text-technical text-primary/70 flex-1">GOVERNANCE.SOL</span>
              <span className="font-mono text-[11px] text-primary/40">CIRCUIT BREAKERS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkTopology;
