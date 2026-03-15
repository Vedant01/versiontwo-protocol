import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";

const HeroSection = () => {
  return (
    <section className="h-[calc(100vh-3.5rem)] flex items-center px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column */}
        <div className="space-y-6">
          <StatusBadge text="PROTOCOL V2.0 — ACTIVE" />

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[0.9] text-primary">
            TRUST<br />
            INFRASTRUCTURE<br />
            FOR MACHINE<br />
            INTELLIGENCE.
          </h1>

          <div className="flex items-stretch gap-4">
            <div className="w-px bg-primary" />
            <div className="space-y-2">
              <p className="font-mono text-[11px] md:text-[13px] uppercase tracking-widest text-primary/70 leading-relaxed">
                THE ECONOMIC IMMUNE SYSTEM FOR AUTONOMOUS AI.<br />
                A REPUTATION PROTOCOL THAT LETS AI AGENTS PROVE<br />
                TRUSTWORTHINESS THROUGH VERIFIABLE PERFORMANCE.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="solid-technical" size="technical" className="h-12 px-8" asChild>
              <a href="#deploy">DEPLOY PROTOCOL</a>
            </Button>
            <Button variant="ghost-technical" size="technical" className="h-12 px-8" asChild>
              <a href="#research">VIEW RESEARCH</a>
            </Button>
          </div>

          <div className="flex items-center gap-8">
            <div>
              <span className="font-display text-2xl font-bold text-primary">3.36×</span>
              <p className="text-technical text-primary/50 mt-1">SURVIVAL ADVANTAGE</p>
              <p className="font-mono text-[9px] text-primary/30 mt-0.5 normal-case tracking-normal">observed in cooperative agent simulations</p>
            </div>
            <div className="w-px h-10 bg-primary/20" />
            <div>
              <span className="font-display text-2xl font-bold text-primary">3 GEN</span>
              <p className="text-technical text-primary/50 mt-1">EXPLOITER EXTINCTION</p>
              <p className="font-mono text-[9px] text-primary/30 mt-0.5 normal-case tracking-normal">circuit breaker activates within 3 generations</p>
            </div>
            <div className="w-px h-10 bg-primary/20" />
            <div>
              <span className="font-display text-2xl font-bold text-primary">R²=0.999</span>
              <p className="text-technical text-primary/50 mt-1">MODEL ACCURACY</p>
              <p className="font-mono text-[9px] text-primary/30 mt-0.5 normal-case tracking-normal">model accuracy of reputation equilibrium</p>
            </div>
          </div>
        </div>

        {/* Right Column — Abstract Wireframe */}
        <div className="flex items-center justify-center">
          <div className="relative w-[340px] h-[340px] md:w-[400px] md:h-[400px] border border-dashed border-grid/30">
            {/* Orbiting circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 400 400" className="w-full h-full animate-orbit" style={{ animationDuration: '20s' }}>
                <circle cx="200" cy="200" r="140" fill="none" stroke="hsl(153 38% 17% / 0.15)" strokeDasharray="8 6" strokeWidth="1" />
              </svg>
            </div>

            {/* Inner dashed circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <circle cx="200" cy="200" r="100" fill="none" stroke="hsl(153 38% 17% / 0.1)" strokeDasharray="4 4" strokeWidth="0.5" />
                <circle cx="200" cy="200" r="60" fill="none" stroke="hsl(153 38% 17% / 0.1)" strokeDasharray="4 4" strokeWidth="0.5" />
              </svg>
            </div>

            {/* Center node */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary" />

            {/* Orbiting nodes */}
            <div className="absolute inset-0 animate-orbit" style={{ animationDuration: '20s' }}>
              <div className="absolute top-[30px] left-1/2 -translate-x-1/2 w-2 h-2 bg-coral" />
            </div>
            <div className="absolute inset-0 animate-orbit-reverse" style={{ animationDuration: '25s' }}>
              <div className="absolute top-1/2 right-[20px] -translate-y-1/2 w-2 h-2 bg-mint" />
            </div>
            <div className="absolute inset-0 animate-orbit-slow" style={{ animationDuration: '30s' }}>
              <div className="absolute bottom-[50px] left-[50px] w-2 h-2 bg-gold" />
            </div>

            {/* Corner markers */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
