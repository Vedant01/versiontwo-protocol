import { useState } from "react";
import { Button } from "@/components/ui/button";

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL as string;

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ email, source: "landing" }),
        headers: {
          "Content-Type": "text/plain"
        }
      });
      // no-cors returns an opaque response — assume success if no exception thrown
      setStatus("success");
      setEmail("");
    
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="deploy" className="px-6 md:px-12 lg:px-20 py-20 border-t border-grid/20">
      <div className="max-w-[640px] mx-auto relative p-10 md:p-12 border border-grid/20">
        {/* Corner markers */}
        <div className="absolute top-[-1px] left-[-1px] w-[10px] h-[10px] border-t border-l border-primary" />
        <div className="absolute top-[-1px] right-[-1px] w-[10px] h-[10px] border-t border-r border-primary" />
        <div className="absolute bottom-[-1px] left-[-1px] w-[10px] h-[10px] border-b border-l border-primary" />
        <div className="absolute bottom-[-1px] right-[-1px] w-[10px] h-[10px] border-b border-r border-primary" />

        <div className="text-center mb-8">
          <span className="text-technical text-primary/50 block mb-4">006 / ACCESS</span>
          <h2 className="font-display text-2xl md:text-4xl font-bold tracking-[-0.04em] leading-[0.9] text-primary">
            DEPLOY THE<br />PROTOCOL.
          </h2>
          <p className="font-mono text-[11px] text-primary/50 mt-4 leading-relaxed">
            REQUEST EARLY ACCESS TO THE KARMA PROTOCOL SDK.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-primary block mb-1">
              WORK EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="engineer@company.com"
              required
              className="w-full h-12 px-4 bg-input border border-grid/20 rounded-none font-mono text-[13px] text-primary placeholder:text-primary/30 focus:border-primary focus:outline-none transition-colors duration-150"
            />
            <p className="font-mono text-[9px] text-primary/30 mt-1.5">
              No spam. Only protocol updates and SDK access.
            </p>
          </div>
          <Button
            type="submit"
            variant="solid-technical"
            size="technical"
            className="w-full h-12"
            disabled={status === "loading"}
          >
            {status === "loading" ? "SUBMITTING..." : "REQUEST ACCESS"}
          </Button>
        </form>

        {status === "success" && (
          <p className="font-mono text-[11px] text-primary mt-4 text-center">
            Access request received. We'll notify you when the Karma Protocol SDK becomes available.
          </p>
        )}
        {status === "error" && (
          <p className="font-mono text-[11px] text-coral mt-4 text-center">
            Something went wrong. Please try again later.
          </p>
        )}

        <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-grid/10">
          <div className="text-center">
            <span className="font-mono text-[10px] text-primary/40">LATENCY</span>
            <p className="font-display text-lg font-bold text-primary">&lt; 0.02ms</p>
          </div>
          <div className="w-px h-8 bg-grid/10" />
          <div className="text-center">
            <span className="font-mono text-[10px] text-primary/40">UPTIME</span>
            <p className="font-display text-lg font-bold text-primary">99.99%</p>
          </div>
          <div className="w-px h-8 bg-grid/10" />
          <div className="text-center">
            <span className="font-mono text-[10px] text-primary/40">GAS / TX</span>
            <p className="font-display text-lg font-bold text-primary">$0 <span className="font-mono text-[9px] text-primary/40">(sponsored)</span></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
