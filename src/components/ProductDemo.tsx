import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════
   STEP DEFINITIONS
   ═══════════════════════════════════════════════════════════ */

const STEPS = [
  {
    id: 1,
    title: 'Task Created',
    description:
      'A new deployment task enters the Karma Protocol. The system registers the task, assesses its risk level, and prepares it for agent assignment.',
  },
  {
    id: 2,
    title: 'Agent Selection',
    description:
      'The Karma Engine evaluates all available agents by karma score and trust tier. The highest-qualified agent is matched to the task.',
  },
  {
    id: 3,
    title: 'Peer Approval',
    description:
      'High-risk tasks require peer review before execution. Trusted agents review the assignment and cast approval votes.',
  },
  {
    id: 4,
    title: 'Task Execution',
    description:
      'The approved agent executes the task. The system monitors progress in real time and records the outcome with an automated quality score.',
  },
  {
    id: 5,
    title: 'Karma Settlement',
    description:
      'Based on the task outcome and quality score, karma tokens are minted and transferred to the agent. Success earns karma; failure burns it.',
  },
  {
    id: 6,
    title: 'Trust Promotion',
    description:
      "The agent's accumulated karma crosses a tier threshold. Their trust level is promoted, granting access to higher-stakes tasks.",
  },
];

/* ═══════════════════════════════════════════════════════════
   SHARED ANIMATION PRESETS
   ═══════════════════════════════════════════════════════════ */

const spring = { type: 'spring' as const, stiffness: 300, damping: 25 };

const sceneFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

/* ═══════════════════════════════════════════════════════════
   REUSABLE VISUAL ELEMENTS
   ═══════════════════════════════════════════════════════════ */

type CardColor = 'indigo' | 'emerald' | 'amber' | 'rose';

const CARD_STYLES: Record<
  CardColor,
  { activeBorder: string; iconBg: string; labelColor: string }
> = {
  indigo: {
    activeBorder: 'border-primary/40 shadow-primary/10',
    iconBg: 'bg-primary/5',
    labelColor: 'text-primary',
  },
  emerald: {
    activeBorder: 'border-mint/40 shadow-mint/10',
    iconBg: 'bg-mint/10',
    labelColor: 'text-primary',
  },
  amber: {
    activeBorder: 'border-gold/40 shadow-gold/10',
    iconBg: 'bg-gold/10',
    labelColor: 'text-primary',
  },
  rose: {
    activeBorder: 'border-coral/40 shadow-coral/10',
    iconBg: 'bg-coral/10',
    labelColor: 'text-primary',
  },
};

function SystemCard({
  label,
  icon,
  children,
  active,
  color = 'indigo',
}: {
  label: string;
  icon: string;
  children?: React.ReactNode;
  active?: boolean;
  color?: CardColor;
}) {
  const s = CARD_STYLES[color];
  return (
    <div
      className={`bg-background border px-5 py-4 transition-all duration-300
        ${active ? `${s.activeBorder} shadow-lg` : 'border-grid/20 shadow-sm'}`}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <div
          className={`w-7 h-7 ${s.iconBg} flex items-center justify-center text-sm`}
        >
          {icon}
        </div>
        <span className={`text-technical ${s.labelColor}`}>
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

function AgentCard({
  name,
  initials,
  karma,
  tier,
  color,
  selected,
  dimmed,
  label,
}: {
  name: string;
  initials: string;
  karma: number;
  tier: string;
  color: string;
  selected?: boolean;
  dimmed?: boolean;
  label?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`bg-background border px-4 py-3 transition-all duration-300 w-[150px]
          ${
            selected
              ? 'border-mint/40 shadow-lg shadow-mint/10 ring-2 ring-mint/20'
              : dimmed
              ? 'border-grid/10 opacity-40'
              : 'border-grid/20 shadow-sm'
          }`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ backgroundColor: color }}
          >
            {initials}
          </div>
          <div className="min-w-0">
            <div className="font-display text-[13px] font-semibold text-primary">
              {name}
            </div>
            <div className="font-mono text-[11px] text-primary/40">
              K:{karma} · {tier}
            </div>
          </div>
        </div>
        {selected && (
          <motion.div
            className="mt-2 flex items-center justify-center gap-1 text-[10px] font-semibold text-primary bg-mint/10 py-1 font-mono"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={spring}
          >
            <span>✓</span> SELECTED
          </motion.div>
        )}
      </div>
      {label && (
        <span className="text-[10px] text-primary/40 font-mono tracking-wider">{label}</span>
      )}
    </div>
  );
}

function HArrow({ active, delay = 0 }: { active?: boolean; delay?: number }) {
  const c = active ? 'hsl(153 38% 17%)' : 'hsl(153 38% 17% / 0.2)';
  return (
    <motion.div
      className="flex items-center mx-2"
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.4, delay }}
      style={{ originX: 0 }}
    >
      <div
        className="w-12 h-[1.5px]"
        style={{
          background: `repeating-linear-gradient(90deg, ${c} 0, ${c} 4px, transparent 4px, transparent 8px)`,
        }}
      />
      <div
        className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[7px]"
        style={{ borderLeftColor: c }}
      />
    </motion.div>
  );
}

function VArrow({ active }: { active?: boolean }) {
  const c = active ? 'hsl(153 38% 17%)' : 'hsl(153 38% 17% / 0.2)';
  return (
    <motion.div
      className="flex flex-col items-center my-1"
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 0.3 }}
      style={{ originY: 0 }}
    >
      <div
        className="w-[1.5px] h-6"
        style={{
          background: `repeating-linear-gradient(180deg, ${c} 0, ${c} 4px, transparent 4px, transparent 8px)`,
        }}
      />
      <div
        className="w-0 h-0 border-x-[4px] border-x-transparent border-t-[7px]"
        style={{ borderTopColor: c }}
      />
    </motion.div>
  );
}

function PulseDot({ color = 'hsl(140 100% 81%)' }: { color?: string }) {
  return (
    <motion.div
      className="w-1.5 h-1.5"
      style={{ backgroundColor: color }}
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ duration: 1.2, repeat: Infinity }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   STEP INDICATOR
   ═══════════════════════════════════════════════════════════ */

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center gap-0 mb-5">
      {STEPS.map((s, i) => {
        const num = i + 1;
        const done = num < currentStep;
        const active = num === currentStep;
        return (
          <div key={s.id} className="flex items-center">
            <div
              className={`flex items-center gap-1.5 ${
                num <= currentStep ? '' : 'opacity-35'
              }`}
            >
              <motion.div
                className={`w-6 h-6 flex items-center justify-center text-[11px] font-bold font-mono
                  ${
                    done
                      ? 'bg-mint text-primary'
                      : active
                      ? 'bg-primary text-background'
                      : 'bg-primary/10 text-primary/40'
                  }`}
                animate={{ scale: active ? 1.15 : 1 }}
                transition={spring}
              >
                {done ? '✓' : num}
              </motion.div>
              <span
                className={`text-technical whitespace-nowrap
                  ${
                    done
                      ? 'text-primary/70'
                      : active
                      ? 'text-primary'
                      : 'text-primary/40'
                  }`}
              >
                {s.title}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-5 h-px mx-1.5 ${
                  done ? 'bg-mint' : 'bg-primary/10'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DESCRIPTION PANEL
   ═══════════════════════════════════════════════════════════ */

function DescriptionPanel({ step }: { step: number }) {
  const s = STEPS[step - 1];
  if (!s) return null;

  return (
    <motion.div
      key={step}
      className="w-full max-w-[820px] mt-4 px-6 py-4 bg-primary/[0.03] border border-grid/10"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-bold text-primary bg-mint/20 px-2 py-0.5 font-mono tracking-widest uppercase">
          STEP {s.id}
        </span>
        <span className="font-display text-[14px] font-semibold text-primary">
          {s.title}
        </span>
      </div>
      <p className="font-body text-[13px] text-primary/50 leading-relaxed">
        {s.description}
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCENE 1 — TASK CREATED
   ═══════════════════════════════════════════════════════════ */

function Scene1({ phase }: { phase: number }) {
  return (
    <motion.div
      key="scene1"
      className="flex items-center justify-center gap-2 w-full h-full px-16"
      {...sceneFade}
    >
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...spring, delay: 0.15 }}
      >
        <SystemCard label="New Task" icon="📋" active={phase >= 0} color="indigo">
          <div className="space-y-2 mt-1">
            <p className="font-display text-[12px] font-medium text-primary">
              Deploy ML Model v2.3
            </p>
            <div className="flex gap-2">
              <span className="text-[10px] bg-coral/10 text-primary px-2 py-0.5 font-mono tracking-wider">
                HIGH RISK
              </span>
              <span className="text-[10px] bg-primary/5 text-primary/60 px-2 py-0.5 font-mono tracking-wider">
                COMPLEXITY 8/10
              </span>
            </div>
            <div className="font-mono text-[10px] text-primary/40 pt-0.5">
              Requires production access
            </div>
          </div>
        </SystemCard>
      </motion.div>

      {phase >= 1 && <HArrow active />}

      {phase >= 2 && (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={spring}
        >
          <SystemCard label="Karma Protocol" icon="◉" active color="indigo">
            <div className="space-y-1.5 mt-1">
              <p className="font-body text-[12px] text-primary/60">Task registered</p>
              <p className="font-mono text-[11px] text-primary/40">
                Risk level assessed · Agent pool queried
              </p>
              <div className="flex items-center gap-1.5">
                <PulseDot />
                <span className="font-mono text-[11px] text-primary/70 font-medium">
                  Processing...
                </span>
              </div>
            </div>
          </SystemCard>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCENE 2 — AGENT SELECTION
   ═══════════════════════════════════════════════════════════ */

function Scene2({ phase }: { phase: number }) {
  return (
    <motion.div
      key="scene2"
      className="flex flex-col items-center w-full h-full pt-8 px-12"
      {...sceneFade}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 0.1 }}
      >
        <SystemCard
          label="Karma Engine"
          icon="⚙"
          active={phase >= 2}
          color="indigo"
        >
          <p className="font-body text-[12px] text-primary/50 mt-1">
            {phase < 2
              ? 'Loading agent pool...'
              : phase < 3
              ? 'Evaluating karma scores & trust tiers...'
              : 'Best match found'}
          </p>
          {phase >= 2 && phase < 3 && (
            <div className="flex items-center gap-1.5 mt-1.5">
              <PulseDot color="hsl(153 38% 17%)" />
              <span className="font-mono text-[11px] text-primary/70 font-medium">
                Scoring...
              </span>
            </div>
          )}
        </SystemCard>
      </motion.div>

      {phase >= 1 && <VArrow active={phase >= 2} />}

      {phase >= 1 && (
        <div className="flex items-start gap-4 mt-2">
          {[
            {
              name: 'Atlas',
              initials: 'AT',
              karma: 72,
              tier: 'Tier 2',
              color: '#6366f1',
              delay: 0,
            },
            {
              name: 'Nova',
              initials: 'NV',
              karma: 45,
              tier: 'Tier 1',
              color: '#8b5cf6',
              delay: 0.12,
            },
            {
              name: 'Cipher',
              initials: 'CP',
              karma: 88,
              tier: 'Tier 3',
              color: '#10b981',
              delay: 0.24,
            },
          ].map((a) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: a.delay }}
            >
              <AgentCard
                {...a}
                selected={phase >= 3 && a.name === 'Cipher'}
                dimmed={phase >= 3 && a.name !== 'Cipher'}
              />
            </motion.div>
          ))}
        </div>
      )}

      {phase >= 3 && (
        <motion.div
          className="mt-4 font-mono text-[12px] font-medium text-primary bg-mint/10 border border-mint/20 px-4 py-1.5 tracking-wider"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={spring}
        >
          ✓ CIPHER SELECTED — HIGHEST KARMA SCORE (88)
        </motion.div>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCENE 3 — PEER APPROVAL
   ═══════════════════════════════════════════════════════════ */

function Scene3({ phase }: { phase: number }) {
  return (
    <motion.div
      key="scene3"
      className="flex items-center justify-center gap-2 w-full h-full px-8"
      {...sceneFade}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...spring, delay: 0.1 }}
      >
        <AgentCard
          name="Cipher"
          initials="CP"
          karma={88}
          tier="Tier 3"
          color="#10b981"
          selected
          label="ASSIGNED AGENT"
        />
      </motion.div>

      {phase >= 0 && <HArrow active delay={0.3} />}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...spring, delay: 0.4 }}
      >
        <SystemCard
          label="Approval Gate"
          icon="🔒"
          active={phase >= 1}
          color="amber"
        >
          <div className="space-y-1.5 mt-1 min-w-[160px]">
            <p className="font-body text-[12px] text-primary/50">
              High-risk task · Peer review required
            </p>
            <div className="w-full bg-primary/5 h-1.5 mt-1">
              <motion.div
                className="h-1.5"
                style={{
                  backgroundColor: phase >= 3 ? 'hsl(140 100% 81%)' : 'hsl(45 88% 66%)',
                }}
                initial={{ width: '0%' }}
                animate={{
                  width:
                    phase < 2 ? '0%' : phase < 3 ? '50%' : '100%',
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span
              className={`font-mono text-[11px] font-medium ${
                phase >= 3 ? 'text-primary' : 'text-primary/60'
              }`}
            >
              {phase < 2 ? '0 / 2 VOTES' : phase < 3 ? '1 / 2 VOTES' : '2 / 2 VOTES'}
            </span>
            {phase >= 3 && (
              <motion.div
                className="font-mono text-[11px] font-bold text-primary bg-mint/10 px-3 py-1 text-center border border-mint/20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              >
                APPROVED ✓
              </motion.div>
            )}
          </div>
        </SystemCard>
      </motion.div>

      {phase >= 1 && <HArrow delay={0.1} />}

      {phase >= 1 && (
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...spring, delay: 0.15 }}
        >
          <div className="relative">
            <AgentCard
              name="Atlas"
              initials="AT"
              karma={72}
              tier="Tier 2"
              color="#6366f1"
            />
            {phase >= 2 && (
              <motion.div
                className="absolute -right-1.5 -top-1.5 w-5 h-5 bg-mint flex items-center justify-center shadow-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              >
                <span className="text-[10px] text-primary font-bold">✓</span>
              </motion.div>
            )}
          </div>
          <div className="relative">
            <AgentCard
              name="Nova"
              initials="NV"
              karma={45}
              tier="Tier 1"
              color="#8b5cf6"
            />
            {phase >= 3 && (
              <motion.div
                className="absolute -right-1.5 -top-1.5 w-5 h-5 bg-mint flex items-center justify-center shadow-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              >
                <span className="text-[10px] text-primary font-bold">✓</span>
              </motion.div>
            )}
          </div>
          <span className="text-[10px] text-primary/40 font-mono tracking-wider text-center">
            PEER REVIEWERS
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCENE 4 — TASK EXECUTION
   ═══════════════════════════════════════════════════════════ */

function Scene4({ phase }: { phase: number }) {
  return (
    <motion.div
      key="scene4"
      className="flex flex-col items-center justify-center gap-4 w-full h-full px-12"
      {...sceneFade}
    >
      <motion.div
        className="w-[380px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 0.1 }}
      >
        <SystemCard
          label="Execution Engine"
          icon="▶"
          active={phase >= 1}
          color={phase >= 2 ? 'emerald' : 'indigo'}
        >
          <div className="space-y-3 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#10b981] flex items-center justify-center text-white text-[10px] font-bold">
                CP
              </div>
              <div>
                <span className="font-display text-[12px] font-medium text-primary">
                  Cipher
                </span>
                <span className="font-mono text-[11px] text-primary/40 ml-1.5">
                  executing
                </span>
              </div>
            </div>

            <div className="font-mono text-[11px] text-primary/50 bg-primary/[0.03] border border-grid/10 px-3 py-2">
              Deploy ML Model v2.3 → production-cluster-01
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] text-primary/40 tracking-wider">
                  PROGRESS
                </span>
                <span className="font-mono text-[10px] text-primary/60 font-medium">
                  {phase < 1 ? '0%' : '100%'}
                </span>
              </div>
              <div className="w-full bg-primary/5 h-2">
                <motion.div
                  className="h-2"
                  style={{
                    backgroundColor: phase >= 2 ? 'hsl(140 100% 81%)' : 'hsl(153 38% 17%)',
                  }}
                  initial={{ width: '0%' }}
                  animate={{
                    width: phase >= 1 ? '100%' : '0%',
                  }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                />
              </div>
            </div>

            <div
              className={`flex items-center gap-1.5 font-mono text-[11px] font-medium ${
                phase >= 2 ? 'text-primary' : 'text-primary/40'
              }`}
            >
              {phase < 2 ? (
                <>
                  <PulseDot color="hsl(153 38% 17%)" />
                  <span>Running...</span>
                </>
              ) : (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  ✓ Task completed successfully
                </motion.span>
              )}
            </div>
          </div>
        </SystemCard>
      </motion.div>

      {phase >= 2 && (
        <motion.div
          className="w-[380px]"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.3 }}
        >
          <SystemCard label="Quality Assessment" icon="📊" active color="emerald">
            <div className="flex items-center justify-between mt-1">
              <span className="font-body text-[12px] text-primary/50">
                Automated quality score
              </span>
              <span className="font-display text-[16px] font-bold text-primary">
                0.94
              </span>
            </div>
            <div className="w-full bg-mint/10 h-1.5 mt-2">
              <motion.div
                className="h-1.5 bg-mint"
                initial={{ width: '0%' }}
                animate={{ width: '94%' }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </div>
          </SystemCard>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCENE 5 — KARMA SETTLEMENT
   ═══════════════════════════════════════════════════════════ */

function Scene5({ phase }: { phase: number }) {
  return (
    <motion.div
      key="scene5"
      className="flex items-center justify-center gap-2 w-full h-full px-12 relative"
      {...sceneFade}
    >
      <motion.div
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...spring, delay: 0.1 }}
      >
        <SystemCard
          label="Settlement Engine"
          icon="⚖"
          active={phase >= 1}
          color="emerald"
        >
          <div className="space-y-1.5 mt-1 min-w-[155px]">
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-primary/40">Quality</span>
              <span className="text-primary font-medium">0.94</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-primary/40">Base reward</span>
              <span className="text-primary font-medium">+10</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-primary/40">Quality bonus</span>
              <span className="text-primary font-medium">+5</span>
            </div>
            <div className="border-t border-grid/10 pt-1 flex items-center justify-between font-mono text-[12px]">
              <span className="text-primary/60 font-medium">Total mint</span>
              <span className="text-primary font-bold">+15</span>
            </div>
          </div>
        </SystemCard>
      </motion.div>

      <div className="flex flex-col items-center gap-1 mx-1">
        {phase >= 1 && <HArrow active />}
        {phase >= 1 && (
          <motion.div
            className="px-3 py-1 bg-mint text-primary text-[12px] font-bold font-mono shadow-lg shadow-mint/20"
            initial={{ opacity: 0, scale: 0, x: -40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              type: 'spring',
              stiffness: 200,
            }}
          >
            +15 KARMA
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, x: 25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...spring, delay: 0.15 }}
      >
        <div className="flex flex-col items-center gap-1">
          <div
            className={`bg-background border px-5 py-4 transition-all duration-300 w-[175px]
              ${
                phase >= 2
                  ? 'border-mint/40 shadow-lg shadow-mint/10'
                  : 'border-grid/20 shadow-sm'
              }`}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-full bg-[#10b981] flex items-center justify-center text-white text-xs font-bold">
                CP
              </div>
              <div>
                <div className="font-display text-[13px] font-semibold text-primary">
                  Cipher
                </div>
                <div className="font-mono text-[10px] text-primary/40">AGENT</div>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-primary/40">Karma</span>
                <motion.span
                  className="font-display text-[14px] font-bold text-primary"
                  key={phase >= 2 ? 'updated' : 'initial'}
                  initial={phase >= 2 ? { scale: 1.3 } : false}
                  animate={{ scale: 1 }}
                  transition={spring}
                >
                  {phase >= 2 ? '103' : '88'}
                </motion.span>
              </div>
              {phase >= 2 && (
                <motion.div
                  className="font-mono text-[10px] text-primary/60 font-medium text-right"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  ↑ 88 → 103
                </motion.div>
              )}
            </div>
          </div>
          <span className="text-[10px] text-primary/40 font-mono tracking-wider">
            KARMA RECIPIENT
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCENE 6 — TRUST PROMOTION
   ═══════════════════════════════════════════════════════════ */

const TIERS = [
  { name: 'PROBATION', color: 'hsl(16 100% 71%)', min: 0 },
  { name: 'STANDARD', color: 'hsl(45 88% 66%)', min: 30 },
  { name: 'TRUSTED', color: 'hsl(140 100% 81%)', min: 70 },
  { name: 'ELITE', color: 'hsl(153 38% 17%)', min: 120 },
];

function Scene6({ phase }: { phase: number }) {
  return (
    <motion.div
      key="scene6"
      className="flex flex-col items-center justify-center gap-5 w-full h-full px-12"
      {...sceneFade}
    >
      <motion.div
        className="w-[400px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 0.1 }}
      >
        <SystemCard
          label="Trust Registry"
          icon="🛡"
          active={phase >= 1}
          color={phase >= 2 ? 'emerald' : 'indigo'}
        >
          <div className="space-y-4 mt-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#10b981] flex items-center justify-center text-white text-sm font-bold">
                CP
              </div>
              <div>
                <div className="font-display text-[14px] font-semibold text-primary">
                  Cipher
                </div>
                <div className="font-mono text-[11px] text-primary/40">
                  Karma: 103
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2 font-mono text-[10px] text-primary/40 tracking-wider">
                <span>TRUST TIER THRESHOLDS</span>
              </div>
              <div className="relative w-full h-3 bg-primary/5 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0"
                  style={{
                    background:
                      'linear-gradient(90deg, hsl(45 88% 66%) 0%, hsl(140 100% 81%) 60%, hsl(140 100% 81%) 100%)',
                  }}
                  initial={{ width: '55%' }}
                  animate={{ width: phase >= 1 ? '72%' : '55%' }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                />
                {[20, 46, 80].map((pos, i) => (
                  <div
                    key={i}
                    className="absolute top-0 bottom-0 w-px bg-background/70"
                    style={{ left: `${pos}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-1.5">
                {TIERS.map((t) => (
                  <span
                    key={t.name}
                    className="font-mono text-[9px] font-medium tracking-wider"
                    style={{ color: t.color }}
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </div>

            {phase >= 2 && (
              <motion.div
                className="flex items-center justify-center gap-3 pt-1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={spring}
              >
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 border border-gold/20">
                  <div className="w-2 h-2 bg-gold" />
                  <span className="font-mono text-[11px] font-medium text-primary/70 tracking-wider">
                    STANDARD
                  </span>
                </div>
                <span className="text-primary/30 text-sm">→</span>
                <motion.div
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-mint/10 border border-mint/20"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <div className="w-2 h-2 bg-mint" />
                  <span className="font-mono text-[11px] font-bold text-primary tracking-wider">
                    TRUSTED ✓
                  </span>
                </motion.div>
              </motion.div>
            )}

            {phase >= 2 && (
              <motion.div
                className="font-mono text-[11px] text-primary/40 bg-primary/[0.03] border border-grid/10 px-3 py-2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Unlocked: production deployments · peer reviewer role ·
                higher task limits
              </motion.div>
            )}
          </div>
        </SystemCard>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPLETION OVERLAY
   ═══════════════════════════════════════════════════════════ */

function CompletionOverlay() {
  return (
    <motion.div
      key="complete"
      className="flex flex-col items-center justify-center gap-6 w-full h-full px-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="w-14 h-14 bg-mint/10 border border-mint/20 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
      >
        <span className="text-2xl">✓</span>
      </motion.div>

      <div className="text-center">
        <motion.h2
          className="font-display text-lg font-bold text-primary"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          GOVERNANCE PROTOCOL COMPLETE
        </motion.h2>
        <motion.p
          className="font-body text-[13px] text-primary/50 mt-1.5 max-w-[400px] leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Task completed · Karma settled · Trust updated.
          <br />
          The cycle repeats for every action in the fleet.
        </motion.p>
      </div>

      <motion.div
        className="flex items-center gap-6 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
      >
        {[
          { label: 'FAIR KARMA ECONOMY', icon: '⚖' },
          { label: 'PEER-VERIFIED TRUST', icon: '🔒' },
          { label: 'AUTONOMOUS GOVERNANCE', icon: '🛡' },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-1.5 font-mono text-[11px] text-primary/50 font-medium tracking-wider"
          >
            <span>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function ProductDemo() {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState(0);
  const running = useRef(false);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAutoPlayed = useRef(false);

  const wait = useCallback(
    (ms: number) =>
      new Promise<void>((resolve) => {
        const t = setTimeout(resolve, ms);
        timeouts.current.push(t);
      }),
    [],
  );

  const clearTimers = useCallback(() => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  }, []);

  const resetDemo = useCallback(() => {
    running.current = false;
    clearTimers();
    setStep(0);
    setPhase(0);
  }, [clearTimers]);

  const runDemo = useCallback(async () => {
    if (running.current) return;
    running.current = true;

    setStep(1);
    setPhase(0);
    await wait(1200);
    setPhase(1);
    await wait(700);
    setPhase(2);
    await wait(1800);

    setStep(2);
    setPhase(0);
    await wait(900);
    setPhase(1);
    await wait(1200);
    setPhase(2);
    await wait(1400);
    setPhase(3);
    await wait(1800);

    setStep(3);
    setPhase(0);
    await wait(900);
    setPhase(1);
    await wait(1000);
    setPhase(2);
    await wait(900);
    setPhase(3);
    await wait(1800);

    setStep(4);
    setPhase(0);
    await wait(800);
    setPhase(1);
    await wait(2400);
    setPhase(2);
    await wait(1800);

    setStep(5);
    setPhase(0);
    await wait(1000);
    setPhase(1);
    await wait(1400);
    setPhase(2);
    await wait(1800);

    setStep(6);
    setPhase(0);
    await wait(900);
    setPhase(1);
    await wait(1500);
    setPhase(2);
    await wait(2500);

    setStep(7);
    setPhase(0);
    running.current = false;
  }, [wait]);

  const isIdle = step === 0;
  const isComplete = step === 7;
  const isRunning = step >= 1 && step <= 6;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoPlayed.current) {
          hasAutoPlayed.current = true;
          setTimeout(runDemo, 400);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [runDemo]);

  return (
    <div ref={sectionRef} className="flex flex-col items-center select-none">
      {/* Step indicator */}
      {(isRunning || isComplete) && <StepIndicator currentStep={step} />}

      {/* Canvas */}
      <div
        className="relative w-full border border-grid/20 overflow-hidden bg-background"
        style={{
          maxWidth: 820,
          height: 420,
        }}
      >
        {/* Corner markers */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary z-10" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary z-10" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary z-10" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary z-10" />

        <AnimatePresence mode="wait">
          {isIdle && (
            <motion.div
              key="idle"
              className="flex flex-col items-center justify-center w-full h-full gap-3 text-primary/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <svg
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon
                  points="10 8 16 12 10 16 10 8"
                  fill="currentColor"
                />
              </svg>
              <span className="font-mono text-[13px] font-medium tracking-wider">
                PRESS RUN DEMO TO BEGIN
              </span>
            </motion.div>
          )}

          {step === 1 && <Scene1 phase={phase} />}
          {step === 2 && <Scene2 phase={phase} />}
          {step === 3 && <Scene3 phase={phase} />}
          {step === 4 && <Scene4 phase={phase} />}
          {step === 5 && <Scene5 phase={phase} />}
          {step === 6 && <Scene6 phase={phase} />}

          {isComplete && <CompletionOverlay />}
        </AnimatePresence>
      </div>

      {/* Description Panel */}
      <AnimatePresence mode="wait">
        {isRunning && <DescriptionPanel step={step} />}
        {isComplete && (
          <motion.div
            key="complete-desc"
            className="w-full max-w-[820px] mt-4 px-6 py-4 bg-primary/[0.03] border border-grid/10"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <p className="font-body text-[13px] text-primary/50 leading-relaxed text-center">
              Every task in the fleet follows this cycle — creating a
              self-governing economy of trust, accountability, and fair
              reward.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="mt-5 flex items-center gap-3">
        {(isIdle || isComplete) && (
          <motion.button
            onClick={() => {
              resetDemo();
              setTimeout(runDemo, 60);
            }}
            className="h-9 px-5 font-mono text-[10px] tracking-[0.1em] uppercase font-medium
              bg-primary text-primary-foreground
              hover:opacity-90 transition-opacity cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {isComplete ? 'REPLAY DEMO' : 'RUN DEMO'}
          </motion.button>
        )}

        {isRunning && (
          <motion.button
            onClick={resetDemo}
            className="h-9 px-5 font-mono text-[10px] tracking-[0.1em] uppercase font-medium
              border border-grid/20 bg-background text-primary/60
              hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            RESET
          </motion.button>
        )}
      </div>
    </div>
  );
}
