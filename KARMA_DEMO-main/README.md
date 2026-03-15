# Karma Protocol — Animated Product Demo

A self-contained animated product demo that visually explains the Karma Protocol workflow in a guided step-by-step simulation. Built for screen recording and embedding into landing pages.

## What This Is

This is **not** a dashboard or admin UI. It is a single animated demo component that walks a viewer through the Karma Protocol's agent governance workflow in 6 clear, labeled steps — designed to be recorded and embedded as a video or live component on a landing page. This is meant to just go on the landing page so that people can see what our system is actually doing.

## Demo Walkthrough

When you press **Run Demo**, the animation plays through these steps:

| Step | Title | What the Viewer Sees |
|------|-------|---------------------|
| 1 | **Task Created** | A labeled "New Task" card (with risk/complexity badges) flows into the "Karma Protocol" system entry point |
| 2 | **Agent Selection** | The "Karma Engine" evaluates 3 agent cards by karma score — Cipher (K:88) is selected, others dim |
| 3 | **Peer Approval** | The "Approval Gate" receives votes from 2 peer reviewers — progress bar fills, checkmarks appear, "APPROVED" stamp |
| 4 | **Task Execution** | "Execution Engine" runs the task — progress bar fills to 100%, "Quality Assessment" card shows score 0.94 |
| 5 | **Karma Settlement** | "Settlement Engine" breaks down the reward — a "+15 Karma" token floats to the agent, score updates 88 → 103 |
| 6 | **Trust Promotion** | "Trust Registry" shows tier progress bar filling past threshold — badge transitions from "Standard" to "Trusted" |

Total animation runtime: ~27 seconds. Fully replayable via the "Replay Demo" button.

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.1.6 | React framework |
| React | 19.2.3 | UI library |
| Tailwind CSS | 4.x | Utility-first styling |
| Framer Motion | 12.x | Animation engine |
| TypeScript | 5.x | Type safety |

## Project Structure

```
landing-page/
├── public/                          # Static assets
├── src/
│   ├── app/
│   │   ├── globals.css              # Tailwind import + base styles
│   │   ├── layout.tsx               # Root layout (Inter font, metadata)
│   │   └── page.tsx                 # Landing page — renders <ProductDemo />
│   └── components/
│       └── ProductDemo.tsx          # The entire demo (single self-contained file)
├── next.config.ts                   # Next.js config
├── postcss.config.mjs               # PostCSS + Tailwind plugin
├── tsconfig.json                    # TypeScript config
└── package.json                     # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Install & Run

```bash
# Clone the repo
git clone https://github.com/Dhruvacodes/KARMA_DEMO.git
cd KARMA_DEMO

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Click **Run Demo** to start the animation.

### Production Build

```bash
npm run build
npm start
```

## How the Demo Component Works

The entire demo lives in one file: `src/components/ProductDemo.tsx`.

### Architecture

```
ProductDemo (main component)
├── State: step (0-7), phase (0-N per step)
├── runDemo() — async animation runner that advances step/phase with timed waits
├── StepIndicator — numbered progress dots at the top
├── Canvas (820×420) — AnimatePresence crossfades between scenes
│   ├── Scene1 (Task Created)
│   ├── Scene2 (Agent Selection)
│   ├── Scene3 (Peer Approval)
│   ├── Scene4 (Task Execution)
│   ├── Scene5 (Karma Settlement)
│   ├── Scene6 (Trust Promotion)
│   └── CompletionOverlay
├── DescriptionPanel — step explanation text below the canvas
└── Controls — Run Demo / Reset / Replay buttons
```

### Key Design Decisions

- **Every element is labeled** — no abstract circles or unlabeled nodes. Each card has an icon + title header (e.g., "Karma Engine", "Approval Gate", "Settlement Engine").
- **Phase-driven sub-animations** — each step has 2-4 internal phases that animate sequentially (element appears → highlight → result shown).
- **AnimatePresence mode="wait"** — clean crossfade between steps, no visual overlap.
- **Spring physics** — all element animations use `type: 'spring'` for natural feel.
- **Self-contained** — zero imports from the rest of the project. Only depends on React + Framer Motion + Tailwind utilities.

## Customization Guide

### Change Animation Speed

In `ProductDemo.tsx`, find the `runDemo()` function. Each `await wait(N)` controls the pause duration in milliseconds between sub-phases:

```tsx
// Step 1 — Task Created
setStep(1);
setPhase(0);
await wait(1200);  // ← increase this to slow down, decrease to speed up
setPhase(1);
await wait(700);
```

### Change Colors

The component uses Tailwind's built-in color palette:
- **System cards**: indigo (engine), emerald (success), amber (approval), rose (risk)
- **Agents**: custom hex colors on avatar circles
- **Background**: `#fafafa`

Edit the `CARD_STYLES` constant and individual scene components to change colors.

### Change Task / Agent Names

Search for the string literals in each Scene component (e.g., `"Deploy ML Model v2.3"`, `"Cipher"`, `"Atlas"`) and replace with your own.

### Embed in an Existing Page

The component renders as a centered full-viewport div. To embed it as a section instead:

```tsx
// Remove min-h-screen from the root div in ProductDemo.tsx
// Change: "flex flex-col items-center justify-center min-h-screen px-4 py-10"
// To:     "flex flex-col items-center justify-center px-4 py-20"
```

Then import it in your landing page:

```tsx
import ProductDemo from '@/components/ProductDemo';

<section id="demo">
  <ProductDemo />
</section>
```

## License

MIT
