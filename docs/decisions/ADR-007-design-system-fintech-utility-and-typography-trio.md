# ADR-007: Visual Design System — Fintech Utility & Typography Trio

## Status
Accepted

## Date
2026-09-22

## Context
Initial specifications required a clean, utility-oriented interface. However, many e-commerce tools fall into one of two anti-patterns:
1. **The "Seller Admin Dashboard" Anti-Pattern:** Cramming 40 metric cards, dense sidebars, dark crypto-style navigation, and gratuitous line charts onto every page. This confuses organic search visitors who just want to know their net profit on a Rp100.000 sale.
2. **The "Thin Content Farm" Anti-Pattern:** A tiny, unstyled form buried under 2,000 words of low-quality AI text designed solely to fool search engines.

The user has defined a clear visual and architectural direction synthesized from four proven benchmarks:
- **Wise:** Structure (Hero -> Big Headline -> Tool Card -> Prominent Result -> Rich SEO Explanatory Content below).
- **SlickCalc:** Calculator-first minimalism, generous whitespace, large input ergonomics, zero decoration bloat.
- **Marketplace Analytics:** Clean, readable comparison metrics and data hierarchy.
- **Modern Fintech UI:** Neutral off-white palette, sharp dark typography, single brand accent, subtle borders, and tabular numeric typography.

## Decision
We formally adopt the **"Modern Financial Utility"** design system:
1. **Layout Hierarchy (Wise Pattern):**
   - Clean, lightweight top navigation.
   - Hero: Clear, search-aligned headline + immediate interactive Calculator Card.
   - Result Zone: High-prominence Net Profit & Margin signature card.
   - Comparison Zone: Side-by-side matrix across Shopee, Tokopedia, TikTok Shop, and Lazada.
   - Lower Fold: Deep editorial explanatory content, calculation walkthroughs, FAQ accordion, and internal links.
2. **Desktop 3-Column Flanking:**
   - The calculator itself is never crowded by ads.
   - Flanking ad slots (`sidebar-left`, `sidebar-right`) are only enabled alongside the lower Result / Comparison sections on ultra-wide viewports (>= 1280px), preserving focus on inputs.
3. **Color Tokens & Neutral Authority:**
   - Background: Off-white canvas (`#FAFAF9` / Stone-50).
   - Card Surfaces: Pure white (`#FFFFFF`) with subtle neutral borders (`border-stone-200`) and soft shadows (`shadow-sm`).
   - Text: Near-black (`#0F172A` / Slate-900) for primary copy; Slate-500 for secondary hints.
   - Semantic Signals: Emerald-600 (`#059669`) for positive profit; Rose-600 (`#E11D48`) for losses; Amber-500 for warnings.
   - Marketplace Neutrality: Marketplace colors (Shopee Orange, Tokopedia Green, TikTok Black, Lazada Blue) are strictly confined to small badge pills (`[ 🟠 Shopee ]`, `[ 🟢 Tokopedia ]`) and are never used as full-page background washes.
4. **Font Trio Architecture:**
   - **Display / Heading:** *Plus Jakarta Sans* or *Geist Sans* (weight 700/800) for authoritative financial headlines.
   - **Body / Interface:** *Plus Jakarta Sans* or *Inter* (weight 400/500/600) for crisp readability.
   - **Tabular / Numeric:** *Geist Mono* or *JetBrains Mono* with CSS `font-variant-numeric: tabular-nums` for exact character alignment across columns in comparison tables and currency figures.
5. **Component Primitives:**
   - Base UI built using headless accessible primitives (shadcn/ui / Radix UI) styled with Tailwind CSS.

## Alternatives Considered

### 1. Traditional E-commerce Seller Dashboard Layout (Sidebar + Grid of Cards)
- *Cons:* Overwhelms organic visitors; feels like an internal ERP tool rather than a public utility; high bounce rate from mobile Google search users.
- *Rejected:* Misaligned with search user intent.

### 2. High-Tech "Cyberpunk / Dark Mode Crypto" Style
- *Cons:* High eye fatigue for everyday Indonesian retail merchants; erodes institutional financial trust.
- *Rejected:* Does not reflect clean financial utility.

## Consequences
- **Positive:**
  - Distinctive visual signature: feels like a professional financial tool (similar to Wise or Stripe).
  - High organic conversion: users immediately see and interact with the tool.
  - Rock-solid readability with tabular numeric figures.
- **Negative / Trade-offs:**
  - Requires disciplined layout management to ensure desktop flanking ads do not disrupt the clean aesthetic.
