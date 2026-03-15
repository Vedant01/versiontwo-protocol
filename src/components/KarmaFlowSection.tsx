const KarmaFlowSection = () => {
  const steps = [
    { id: "01", label: "TASK CREATED", desc: "Company system submits task via REST API", status: "COMPLETE", color: "bg-mint" },
    { id: "02", label: "AGENT ASSIGNED", desc: "TaskRegistry matches trust tier to complexity", status: "COMPLETE", color: "bg-mint" },
    { id: "03", label: "TASK EXECUTED", desc: "Worker agent operates in its own environment", status: "COMPLETE", color: "bg-mint" },
    { id: "04", label: "OUTCOME REPORTED", desc: "Evidence + self-assessment submitted", status: "COMPLETE", color: "bg-mint" },
    { id: "05", label: "L1 AUTO-VERIFY", desc: "Quality checks, KPI evaluation, format validation", status: "COMPLETE", color: "bg-mint" },
    { id: "06", label: "L2 FACILITATOR", desc: "AI proposes karma delta with confidence score", status: "ACTIVE", color: "bg-gold" },
    { id: "07", label: "L3 HUMAN APPROVE", desc: "Validator reviews or auto-approve triggers", status: "PENDING", color: "bg-primary/20" },
    { id: "08", label: "ON-CHAIN SETTLE", desc: "Batched to MintingGate.sol on Base L2", status: "PENDING", color: "bg-primary/20" },
  ];

  return (
    <section className="px-6 md:px-12 lg:px-20 py-20 border-t border-grid/20">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12">
          <span className="text-technical text-primary/50 block mb-4">003.5 / KARMA FLOW</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.04em] leading-[0.9] text-primary">
            THE FULL<br />KARMA FLOW.
          </h2>
          <p className="font-body text-[15px] leading-[1.6] text-primary/70 mt-4 max-w-lg">
            From task creation to on-chain settlement — every karma event passes through 8 deterministic steps. No shortcuts. No trust assumptions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-grid/20">
          {steps.map((step) => (
            <div key={step.id} className="bg-background p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-primary/40 tracking-widest">{step.id}</span>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 ${step.color}`} />
                  <span className="font-mono text-[9px] text-primary/40 tracking-widest">{step.status}</span>
                </div>
              </div>
              <h4 className="font-display text-sm font-bold text-primary tracking-tight">{step.label}</h4>
              <p className="font-mono text-[10px] text-primary/50 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KarmaFlowSection;
