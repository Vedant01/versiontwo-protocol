'use client';

import { useState, useCallback, useRef } from 'react';
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

// ─── System Component Card ──────────────────────────────────

type CardColor = 'indigo' | 'emerald' | 'amber' | 'rose';

const CARD_STYLES: Record<
  CardColor,
  { activeBorder: string; iconBg: string; labelColor: string }
> = {
  indigo: {
    activeBorder: 'border-indigo-300 shadow-indigo-100/60',
    iconBg: 'bg-indigo-50',
    labelColor: 'text-indigo-600',
  },
  emerald: {
    activeBorder: 'border-emerald-300 shadow-emerald-100/60',
    iconBg: 'bg-emerald-50',
    labelColor: 'text-emerald-600',
  },
  amber: {
    activeBorder: 'border-amber-300 shadow-amber-100/60',
    iconBg: 'bg-amber-50',
    labelColor: 'text-amber-600',
  },
  rose: {
    activeBorder: 'border-rose-300 shadow-rose-100/60',
    iconBg: 'bg-rose-50',
    labelColor: 'text-rose-600',
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
      className={`bg-white border rounded-xl px-5 py-4 transition-all duration-300
        ${active ? `${s.activeBorder} shadow-lg` : 'border-stone-200 shadow-sm'}`}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <div
          className={`w-7 h-7 rounded-lg ${s.iconBg} flex items-center justify-center text-sm`}
        >
          {icon}
        </div>
        <span className={`text-[13px] font-semibold ${s.labelColor}`}>
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

// ─── Agent Card ─────────────────────────────────────────────

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
        className={`bg-white border rounded-xl px-4 py-3 transition-all duration-300 w-[150px]
          ${
            selected
              ? 'border-emerald-300 shadow-lg shadow-emerald-100/50 ring-2 ring-emerald-100'
              : dimmed
              ? 'border-stone-100 opacity-40'
              : 'border-stone-200 shadow-sm'
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
            <div className="text-[13px] font-semibold text-stone-800">
              {name}
            </div>
            <div className="text-[11px] text-stone-400 font-mono">
              K:{karma} · {tier}
            </div>
          </div>
        </div>
        {selected && (
          <motion.div
            className="mt-2 flex items-center justify-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 rounded-md py-1"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={spring}
          >
            <span>✓</span> Selected
          </motion.div>
        )}
      </div>
      {label && (
        <span className="text-[10px] text-stone-400 font-medium">{label}</span>
      )}
    </div>
  );
}

// ─── Flow Connectors ────────────────────────────────────────

function HArrow({ active, delay = 0 }: { active?: boolean; delay?: number }) {
  const c = active ? '#818cf8' : '#d6d3d1';
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
  const c = active ? '#818cf8' : '#d6d3d1';
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

// ─── Pulsing Dot ────────────────────────────────────────────

function PulseDot({ color = '#10b981' }: { color?: string }) {
  return (
    <motion.div
      className="w-1.5 h-1.5 rounded-full"
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
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold
                  ${
                    done
                      ? 'bg-emerald-500 text-white'
                      : active
                      ? 'bg-indigo-500 text-white'
                      : 'bg-stone-200 text-stone-400'
                  }`}
                animate={{ scale: active ? 1.15 : 1 }}
                transition={spring}
              >
                {done ? '✓' : num}
              </motion.div>
              <span
                className={`text-[11px] font-medium whitespace-nowrap
                  ${
                    done
                      ? 'text-emerald-600'
                      : active
                      ? 'text-indigo-600'
                      : 'text-stone-400'
                  }`}
              >
                {s.title}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-5 h-px mx-1.5 ${
                  done ? 'bg-emerald-300' : 'bg-stone-200'
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
      className="w-full max-w-[820px] mt-4 px-6 py-4 bg-stone-50/80 rounded-xl border border-stone-100"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wide">
          Step {s.id}
        </span>
        <span className="text-[14px] font-semibold text-stone-800">
          {s.title}
        </span>
      </div>
      <p className="text-[13px] text-stone-500 leading-relaxed">
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
      {/* Task Card */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...spring, delay: 0.15 }}
      >
        <SystemCard label="New Task" icon="📋" active={phase >= 0} color="indigo">
          <div className="space-y-2 mt-1">
            <p className="text-[12px] font-medium text-stone-700">
              Deploy ML Model v2.3
            </p>
            <div className="flex gap-2">
              <span className="text-[10px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full font-medium">
                High Risk
              </span>
              <span className="text-[10px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full font-medium">
                Complexity 8/10
              </span>
            </div>
            <div className="text-[10px] text-stone-400 pt-0.5">
              Requires production access
            </div>
          </div>
        </SystemCard>
      </motion.div>

      {/* Arrow */}
      {phase >= 1 && <HArrow active />}

      {/* Karma Protocol */}
      {phase >= 2 && (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={spring}
        >
          <SystemCard label="Karma Protocol" icon="◉" active color="indigo">
            <div className="space-y-1.5 mt-1">
              <p className="text-[12px] text-stone-500">Task registered</p>
              <p className="text-[11px] text-stone-400">
                Risk level assessed · Agent pool queried
              </p>
              <div className="flex items-center gap-1.5">
                <PulseDot />
                <span className="text-[11px] text-emerald-600 font-medium">
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
      {/* Karma Engine */}
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
          <p className="text-[12px] text-stone-500 mt-1">
            {phase < 2
              ? 'Loading agent pool...'
              : phase < 3
              ? 'Evaluating karma scores & trust tiers...'
              : 'Best match found'}
          </p>
          {phase >= 2 && phase < 3 && (
            <div className="flex items-center gap-1.5 mt-1.5">
              <PulseDot color="#6366f1" />
              <span className="text-[11px] text-indigo-500 font-medium">
                Scoring...
              </span>
            </div>
          )}
        </SystemCard>
      </motion.div>

      {/* Down arrow */}
      {phase >= 1 && <VArrow active={phase >= 2} />}

      {/* Agent cards */}
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

      {/* Selection result */}
      {phase >= 3 && (
        <motion.div
          className="mt-4 text-[12px] font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={spring}
        >
          ✓ Cipher selected — Highest karma score (88)
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
      {/* Assigned agent */}
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
          label="Assigned Agent"
        />
      </motion.div>

      {/* Arrow to gate */}
      {phase >= 0 && <HArrow active delay={0.3} />}

      {/* Approval Gate */}
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
            <p className="text-[12px] text-stone-500">
              High-risk task · Peer review required
            </p>
            <div className="w-full bg-stone-100 rounded-full h-1.5 mt-1">
              <motion.div
                className="h-1.5 rounded-full"
                style={{
                  backgroundColor: phase >= 3 ? '#10b981' : '#f59e0b',
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
              className={`text-[11px] font-mono font-medium ${
                phase >= 3 ? 'text-emerald-600' : 'text-amber-600'
              }`}
            >
              {phase < 2 ? '0 / 2 votes' : phase < 3 ? '1 / 2 votes' : '2 / 2 votes'}
            </span>
            {phase >= 3 && (
              <motion.div
                className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md text-center border border-emerald-200"
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

      {/* Arrow from peers */}
      {phase >= 1 && <HArrow delay={0.1} />}

      {/* Peer reviewers */}
      {phase >= 1 && (
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...spring, delay: 0.15 }}
        >
          {/* Peer 1 */}
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
                className="absolute -right-1.5 -top-1.5 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              >
                <span className="text-[10px] text-white font-bold">✓</span>
              </motion.div>
            )}
          </div>
          {/* Peer 2 */}
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
                className="absolute -right-1.5 -top-1.5 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              >
                <span className="text-[10px] text-white font-bold">✓</span>
              </motion.div>
            )}
          </div>
          <span className="text-[10px] text-stone-400 font-medium text-center">
            Peer Reviewers
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
      {/* Execution Card */}
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
            {/* Agent line */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold">
                CP
              </div>
              <div>
                <span className="text-[12px] font-medium text-stone-700">
                  Cipher
                </span>
                <span className="text-[11px] text-stone-400 ml-1.5">
                  executing
                </span>
              </div>
            </div>

            {/* Task label */}
            <div className="text-[11px] text-stone-500 bg-stone-50 rounded-lg px-3 py-2">
              Deploy ML Model v2.3 → production-cluster-01
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-stone-400 font-medium">
                  Progress
                </span>
                <span className="text-[10px] font-mono text-stone-500 font-medium">
                  {phase < 1 ? '0%' : phase < 2 ? '100%' : '100%'}
                </span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2">
                <motion.div
                  className="h-2 rounded-full"
                  style={{
                    backgroundColor: phase >= 2 ? '#10b981' : '#6366f1',
                  }}
                  initial={{ width: '0%' }}
                  animate={{
                    width: phase >= 1 ? '100%' : '0%',
                  }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                />
              </div>
            </div>

            {/* Status */}
            <div
              className={`flex items-center gap-1.5 text-[11px] font-medium ${
                phase >= 2 ? 'text-emerald-600' : 'text-stone-400'
              }`}
            >
              {phase < 2 ? (
                <>
                  <PulseDot color="#6366f1" />
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

      {/* Quality Score Output */}
      {phase >= 2 && (
        <motion.div
          className="w-[380px]"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.3 }}
        >
          <SystemCard label="Quality Assessment" icon="📊" active color="emerald">
            <div className="flex items-center justify-between mt-1">
              <span className="text-[12px] text-stone-500">
                Automated quality score
              </span>
              <span className="text-[16px] font-bold font-mono text-emerald-600">
                0.94
              </span>
            </div>
            <div className="w-full bg-emerald-50 rounded-full h-1.5 mt-2">
              <motion.div
                className="h-1.5 rounded-full bg-emerald-400"
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
      {/* Settlement Engine */}
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
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-stone-400">Quality</span>
              <span className="text-stone-600 font-mono font-medium">0.94</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-stone-400">Base reward</span>
              <span className="text-stone-600 font-mono font-medium">+10</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-stone-400">Quality bonus</span>
              <span className="text-stone-600 font-mono font-medium">+5</span>
            </div>
            <div className="border-t border-stone-100 pt-1 flex items-center justify-between text-[12px]">
              <span className="text-stone-500 font-medium">Total mint</span>
              <span className="text-emerald-600 font-bold font-mono">+15</span>
            </div>
          </div>
        </SystemCard>
      </motion.div>

      {/* Arrow + floating token */}
      <div className="flex flex-col items-center gap-1 mx-1">
        {phase >= 1 && <HArrow active />}
        {phase >= 1 && (
          <motion.div
            className="px-3 py-1 rounded-full bg-emerald-500 text-white text-[12px] font-bold font-mono shadow-lg shadow-emerald-200/50"
            initial={{ opacity: 0, scale: 0, x: -40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              type: 'spring',
              stiffness: 200,
            }}
          >
            +15 Karma
          </motion.div>
        )}
      </div>

      {/* Agent receiving */}
      <motion.div
        initial={{ opacity: 0, x: 25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...spring, delay: 0.15 }}
      >
        <div className="flex flex-col items-center gap-1">
          <div
            className={`bg-white border rounded-xl px-5 py-4 transition-all duration-300 w-[175px]
              ${
                phase >= 2
                  ? 'border-emerald-300 shadow-lg shadow-emerald-100/50'
                  : 'border-stone-200 shadow-sm'
              }`}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                CP
              </div>
              <div>
                <div className="text-[13px] font-semibold text-stone-800">
                  Cipher
                </div>
                <div className="text-[10px] text-stone-400">Agent</div>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-stone-400">Karma</span>
                <motion.span
                  className="text-[14px] font-bold font-mono text-emerald-600"
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
                  className="text-[10px] text-emerald-500 font-medium text-right"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  ↑ 88 → 103
                </motion.div>
              )}
            </div>
          </div>
          <span className="text-[10px] text-stone-400 font-medium">
            Karma Recipient
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
  { name: 'Probation', color: '#ef4444', min: 0 },
  { name: 'Standard', color: '#f59e0b', min: 30 },
  { name: 'Trusted', color: '#10b981', min: 70 },
  { name: 'Elite', color: '#6366f1', min: 120 },
];

function Scene6({ phase }: { phase: number }) {
  return (
    <motion.div
      key="scene6"
      className="flex flex-col items-center justify-center gap-5 w-full h-full px-12"
      {...sceneFade}
    >
      {/* Promotion Card */}
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
            {/* Agent header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-bold">
                CP
              </div>
              <div>
                <div className="text-[14px] font-semibold text-stone-800">
                  Cipher
                </div>
                <div className="text-[11px] text-stone-400">
                  Karma: 103
                </div>
              </div>
            </div>

            {/* Tier progress visualization */}
            <div>
              <div className="flex items-center justify-between mb-2 text-[10px] text-stone-400 font-medium">
                <span>Trust Tier Thresholds</span>
              </div>
              <div className="relative w-full h-3 bg-stone-100 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background:
                      'linear-gradient(90deg, #f59e0b 0%, #10b981 60%, #10b981 100%)',
                  }}
                  initial={{ width: '55%' }}
                  animate={{ width: phase >= 1 ? '72%' : '55%' }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                />
                {/* Threshold markers */}
                {[20, 46, 80].map((pos, i) => (
                  <div
                    key={i}
                    className="absolute top-0 bottom-0 w-px bg-white/70"
                    style={{ left: `${pos}%` }}
                  />
                ))}
              </div>
              {/* Tier labels */}
              <div className="flex justify-between mt-1.5">
                {TIERS.map((t) => (
                  <span
                    key={t.name}
                    className="text-[9px] font-medium"
                    style={{ color: t.color }}
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Before → After */}
            {phase >= 2 && (
              <motion.div
                className="flex items-center justify-center gap-3 pt-1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={spring}
              >
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-[11px] font-medium text-amber-700">
                    Standard
                  </span>
                </div>
                <span className="text-stone-300 text-sm">→</span>
                <motion.div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-bold text-emerald-700">
                    Trusted ✓
                  </span>
                </motion.div>
              </motion.div>
            )}

            {/* Unlocked capabilities */}
            {phase >= 2 && (
              <motion.div
                className="text-[11px] text-stone-400 bg-stone-50 rounded-lg px-3 py-2 text-center"
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
        className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
      >
        <span className="text-2xl">✓</span>
      </motion.div>

      <div className="text-center">
        <motion.h2
          className="text-lg font-bold text-stone-800"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          Governance Protocol Complete
        </motion.h2>
        <motion.p
          className="text-[13px] text-stone-400 mt-1.5 max-w-[400px] leading-relaxed"
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
          { label: 'Fair Karma Economy', icon: '⚖' },
          { label: 'Peer-Verified Trust', icon: '🔒' },
          { label: 'Autonomous Governance', icon: '🛡' },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-1.5 text-[11px] text-stone-500 font-medium"
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
  const [step, setStep] = useState(0); // 0=idle, 1-6=steps, 7=complete
  const [phase, setPhase] = useState(0);
  const running = useRef(false);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

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

  /* ── Animation Sequence ──────────────────────────────────── */
  const runDemo = useCallback(async () => {
    if (running.current) return;
    running.current = true;

    // Step 1 — Task Created
    setStep(1);
    setPhase(0);
    await wait(1200);
    setPhase(1);
    await wait(700);
    setPhase(2);
    await wait(1800);

    // Step 2 — Agent Selection
    setStep(2);
    setPhase(0);
    await wait(900);
    setPhase(1);
    await wait(1200);
    setPhase(2);
    await wait(1400);
    setPhase(3);
    await wait(1800);

    // Step 3 — Peer Approval
    setStep(3);
    setPhase(0);
    await wait(900);
    setPhase(1);
    await wait(1000);
    setPhase(2);
    await wait(900);
    setPhase(3);
    await wait(1800);

    // Step 4 — Task Execution
    setStep(4);
    setPhase(0);
    await wait(800);
    setPhase(1);
    await wait(2400);
    setPhase(2);
    await wait(1800);

    // Step 5 — Karma Settlement
    setStep(5);
    setPhase(0);
    await wait(1000);
    setPhase(1);
    await wait(1400);
    setPhase(2);
    await wait(1800);

    // Step 6 — Trust Promotion
    setStep(6);
    setPhase(0);
    await wait(900);
    setPhase(1);
    await wait(1500);
    setPhase(2);
    await wait(2500);

    // Complete
    setStep(7);
    setPhase(0);
    running.current = false;
  }, [wait]);

  const isIdle = step === 0;
  const isComplete = step === 7;
  const isRunning = step >= 1 && step <= 6;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-4 py-10 select-none"
      style={{ background: '#fafafa' }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-[22px] font-bold text-stone-800 tracking-tight">
          Karma Protocol
        </h1>
        <p className="text-[13px] text-stone-400 mt-0.5">
          How trust-based agent governance works
        </p>
      </motion.div>

      {/* Step indicator */}
      {(isRunning || isComplete) && <StepIndicator currentStep={step} />}

      {/* Canvas */}
      <div
        className="relative rounded-2xl border border-stone-200/60 overflow-hidden"
        style={{
          width: 820,
          height: 420,
          background: 'linear-gradient(180deg, #ffffff 0%, #fafaf9 100%)',
          boxShadow:
            '0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.03)',
        }}
      >
        <AnimatePresence mode="wait">
          {isIdle && (
            <motion.div
              key="idle"
              className="flex flex-col items-center justify-center w-full h-full gap-3 text-stone-300"
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
              <span className="text-[13px] font-medium">
                Press Run Demo to begin
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
            className="w-full max-w-[820px] mt-4 px-6 py-4 bg-stone-50/80 rounded-xl border border-stone-100"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <p className="text-[13px] text-stone-500 leading-relaxed text-center">
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
            className="px-6 py-2.5 rounded-xl text-[13px] font-semibold text-white cursor-pointer
              bg-gradient-to-b from-indigo-500 to-indigo-600
              shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(99,102,241,0.25)]
              hover:shadow-[0_1px_2px_rgba(0,0,0,0.1),0_6px_20px_rgba(99,102,241,0.35)]
              transition-shadow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {isComplete ? 'Replay Demo' : 'Run Demo'}
          </motion.button>
        )}

        {isRunning && (
          <motion.button
            onClick={resetDemo}
            className="px-4 py-2 rounded-xl text-[12px] font-medium text-stone-500 cursor-pointer
              border border-stone-200 bg-white hover:bg-stone-50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Reset
          </motion.button>
        )}
      </div>
    </div>
  );
}
