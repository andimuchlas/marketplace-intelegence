# ADR-008: Client Animation Strategy — Motion & Core Web Vitals Safety

## Status
Accepted

## Date
2026-09-22

## Context
Interactive financial calculators benefit greatly from subtle, communicative motion:
- Smooth numerical transitions when recalculating profits or switching seller tiers.
- Elegant pill sliders when switching between marketplaces (`Shopee` -> `Tokopedia`).
- Fluid expansion and collapse of the itemized fee breakdown accordion.
- Engaging bar fill indicators in the comparison matrix.

However, improper animation implementations introduce severe risks:
1. **Cumulative Layout Shift (CLS):** Animating heights without reserving container bounds causes Google Core Web Vitals penalties and search ranking demotions.
2. **Input Delay / Interaction to Next Paint (INP):** Heavy JavaScript animation libraries blocking the main thread cause keystroke lag when typing prices.
3. **Bundle Bloat:** Full enterprise animation suites (e.g. legacy GSAP plugins with extra modules) can balloon client bundle sizes.

## Decision
We adopt **Framer Motion (`framer-motion` / `motion`)** for lightweight, declarative micro-interactions with strict Core Web Vitals guardrails:
1. **Targeted Micro-Interactions Only:**
   - **Numerical Ticker / Springs:** Animated transition for the primary profit figure (`Rp 17.600`) and margin percentage.
   - **Sliding Tab Indicator:** Smooth background indicator when switching marketplaces in the selector bar.
   - **Accordion Motion:** CSS Grid / Framer Motion height transitions for the detailed fee breakdown drawer with pre-measured bounds.
   - **Comparison Bar Progressions:** Animated comparison delta bars comparing fee percentages across the 4 platforms.
2. **CLS Immunity:**
   - Result containers have fixed minimum heights (`min-h-[...]`) to ensure numbers update in place without jumping page content.
   - Flanking ad slots have strict explicit width and height containers.
3. **Accessibility & Performance:**
   - Fully respect `prefers-reduced-motion: reduce` by disabling spring animations and falling back to instantaneous opacity cuts.
   - Isolate animated components behind React `"use client"` boundaries, leaving all SEO marketing copy 100% static and server-rendered.

## Alternatives Considered

### 1. Full GSAP (GreenSock) with ScrollTrigger & Timeline Plugins
- *Pros:* High animation ceiling; complex cinematic timelines.
- *Cons:* Overkill for a clean fintech utility. Requires manual React lifecycle hook cleanup (`useLayoutEffect`, `gsap.context()`), increases bundle overhead, and risks SSR hydration mismatch warnings in Next.js App Router if not carefully wrapped.
- *Rejected:* A calculator needs micro-interactions, not cinematic storytelling or scroll-hijacking.

### 2. Pure CSS Transitions (No JS Animation Library)
- *Pros:* Zero JavaScript bundle size.
- *Cons:* Difficult to animate dynamic height accordions smoothly; lacks spring physics for number counters and layout shared element transitions (e.g. the sliding tab pill).
- *Rejected:* Framer Motion provides the necessary spring physics and accessible layout transitions while remaining compact.

## Consequences
- **Positive:**
  - High-end fintech feel (fluid, responsive, satisfying micro-interactions).
  - Zero Cumulative Layout Shift (CLS = 0.00).
  - Clean declarative React integration with automatic cleanup on unmount.
- **Negative / Trade-offs:**
  - Adds ~25KB gzipped to the client runtime bundle (well within our budget of < 80KB total JS).
