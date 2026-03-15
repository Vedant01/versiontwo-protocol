import { motion } from 'framer-motion';

const STEPS = [
  {
    id: 1,
    title: 'TASK CREATED',
    description: 'A new deployment task enters the Protocol. Risk level assessed.',
    color: 'border-indigo-500/40 bg-indigo-500/5',
    activeColor: 'bg-indigo-500',
    icon: '📋',
  },
  {
    id: 2,
    title: 'AGENT SELECTION',
    description: 'Karma Engine evaluates pool. Cipher selected (Score: 88).',
    color: 'border-violet-500/40 bg-violet-500/5',
    activeColor: 'bg-violet-500',
    icon: '⚙',
  },
  {
    id: 3,
    title: 'PEER APPROVAL',
    description: 'High-risk task requires peer review. 2/2 Votes Approved.',
    color: 'border-amber-500/40 bg-amber-500/5',
    activeColor: 'bg-amber-500',
    icon: '🔒',
  },
  {
    id: 4,
    title: 'TASK EXECUTION',
    description: 'Cipher executing deployment. Automated Quality Score: 0.94.',
    color: 'border-emerald-500/40 bg-emerald-500/5',
    activeColor: 'bg-emerald-500',
    icon: '▶',
  },
  {
    id: 5,
    title: 'KARMA SETTLEMENT',
    description: 'Quality bonus applied. +15 Karma minted to Cipher.',
    color: 'border-emerald-500/40 bg-emerald-500/5',
    activeColor: 'bg-emerald-500',
    icon: '⚖',
  },
  {
    id: 6,
    title: 'TRUST PROMOTION',
    description: 'Score crosses Tier threshold. Promoted to TRUSTED status.',
    color: 'border-teal-500/40 bg-teal-500/5',
    activeColor: 'bg-teal-500',
    icon: '🛡',
  },
];

export default function MobileProductDemo() {
  return (
    <div className="w-full border border-grid/20 bg-background/50 p-6 space-y-8 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/40 z-10" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/40 z-10" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/40 z-10" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/40 z-10" />
      
      {/* Central Connector Line */}
      <div className="absolute left-10 top-12 bottom-12 w-px bg-primary/10" />

      {STEPS.map((step, index) => (
        <motion.div
          key={step.id}
          className="relative flex items-start gap-5 w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
        >
          {/* Timeline Node */}
          <div className="relative z-10 flex-shrink-0 mt-1">
            <div className={`w-8 h-8 rounded-full border-2 ${step.color} flex items-center justify-center bg-background shadow-sm`}>
              <span className="text-[12px]">{step.icon}</span>
            </div>
            {/* Active pulse effect */}
            <div className={`absolute inset-0 rounded-full ${step.activeColor} opacity-20 animate-ping`} style={{ animationDuration: '3s' }} />
          </div>

          {/* Content Card */}
          <div className={`flex-1 border border-grid/10 bg-background shadow-sm p-4 hover:border-primary/30 transition-colors`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[9px] font-bold text-primary bg-primary/5 px-2 py-0.5 font-mono tracking-widest uppercase">
                STEP {step.id}
              </span>
              <h3 className="font-display text-[13px] font-bold text-primary tracking-tight">
                {step.title}
              </h3>
            </div>
            <p className="font-body text-[12px] text-primary/60 leading-relaxed">
              {step.description}
            </p>
          </div>
        </motion.div>
      ))}

      {/* Completion Banner */}
      <motion.div 
        className="pt-4 border-t border-dashed border-grid/20 flex flex-col items-center justify-center text-center gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1 }}
      >
         <div className="w-10 h-10 bg-mint/10 border border-mint/20 flex items-center justify-center mb-1">
            <span className="text-xl">✓</span>
         </div>
         <span className="font-mono text-[10px] text-primary/50 tracking-widest uppercase">Protocol Cycle Complete</span>
      </motion.div>
    </div>
  );
}
