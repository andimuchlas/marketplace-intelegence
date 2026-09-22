# System Architecture & Technical Design Document
## Project: Indonesian Marketplace Intelligence & Profit Calculator Platform

- **Document Version:** 1.0.0
- **Status:** Approved
- **Lead Architect:** Lead Software Architect & Senior Full-Stack Engineer

---

## 1. Architectural Philosophy & Principles

The architectural design of **Marketplace Intelligence Indonesia** is guided by five foundational principles:

1. **Separation of Domain Logic from UI:**
   Calculation logic is 100% pure TypeScript, decoupled from React components, hooks, or DOM APIs. The calculation engine operates independently of rendering targets.
2. **Config-Driven Domain Rules:**
   Marketplace fee rules, category rates, and seller tiers are declarative data structures. Adding a new marketplace or updating a fee commission does not require modifying calculation algorithms.
3. **SEO as a First-Class Architectural Citizen:**
   All 13 primary landing pages are statically pre-rendered or server-rendered (SSG/SSR). Search bots receive semantically rich, accessible HTML containing complete educational text and default calculation examples without running JavaScript.
4. **Zero-Latency Client-Side Interactivity:**
   While SEO content is pre-rendered on the server, the calculation engine runs entirely client-side in the browser upon user input. Zero server requests or API roundtrips are incurred during typing or sliding.
5. **Modular Monolith over Distributed Complexity:**
   No microservices, no message queues, no Redis, no distributed tracing, and no redundant database layers. The application is a unified Next.js + TypeScript codebase designed for zero-maintenance edge deployment with clean internal boundaries.

---

## 2. High-Level Architecture Diagram

```mermaid
flowchart TD
    subgraph Client["Client Browser / Search Engine Crawler"]
        SearchCrawler["Search Engine Crawler (Googlebot)"]
        UserBrowser["User Browser (Desktop / Mobile)"]
    end

    subgraph EdgeDelivery["Edge CDN & Next.js Server (App Router)"]
        Router["Next.js App Router (SSR / SSG)"]
        SEOEngine["SEO & Metadata Generator (JSON-LD, Canonical, OG)"]
        HTMLRenderer["HTML + CSS (Pre-rendered content & hydration shell)"]
    end

    subgraph ClientRuntime["Client-Side Interactive Runtime (React)"]
        CalcUI["Calculator Form UI Components"]
        CompUI["Comparison Matrix UI Components"]
        AdSlots["AdSlot Placements (Config Switch)"]
        AffLinks["Affiliate Link Router (Config-based)"]
        AnalyticsDispatcher["Abstract Analytics Dispatcher"]
    end

    subgraph DomainCore["Domain Core (Pure TypeScript Engine)"]
        Engine["Calculation Engine (calculateProfit)"]
        CompEngine["Comparison Engine (compareMarketplaces)"]
        BreakEvenCalc["Break-Even Solver (calculateBreakEven)"]
        CurrencyFormatter["IDR Monetary & Precision Formatter"]
    end

    subgraph ConfigData["Config & Data Repository"]
        ShopeeConfig["Shopee Fee Rules (Mock Prototype)"]
        TokoConfig["Tokopedia Fee Rules (Mock Prototype)"]
        TikTokConfig["TikTok Shop Fee Rules (Mock Prototype)"]
        LazadaConfig["Lazada Fee Rules (Mock Prototype)"]
        MarketplaceRegistry["Marketplace Config Registry"]
    end

    SearchCrawler -->|GET HTML| Router
    Router --> SEOEngine
    Router --> HTMLRenderer
    HTMLRenderer -->|Pre-rendered HTML with Rich Schema| SearchCrawler

    UserBrowser -->|Page Request| Router
    Router --> HTMLRenderer
    HTMLRenderer -->|Hydration Shell| UserBrowser
    UserBrowser --> ClientRuntime

    CalcUI -->|User Inputs (Price, HPP, Ads, Tier)| Engine
    CompUI -->|User Inputs| CompEngine
    CompEngine -->|Runs N Marketplaces| Engine

    Engine -->|Queries Rules| MarketplaceRegistry
    MarketplaceRegistry --> ShopeeConfig
    MarketplaceRegistry --> TokoConfig
    MarketplaceRegistry --> TikTokConfig
    MarketplaceRegistry --> LazadaConfig

    Engine --> BreakEvenCalc
    Engine --> CurrencyFormatter
    Engine -->|Returns CalculationResult| CalcUI
    CompEngine -->|Returns ComparisonResult| CompUI

    CalcUI -.->|Dispatches Events| AnalyticsDispatcher
    CompUI -.->|Dispatches Events| AnalyticsDispatcher
```

---

## 3. Technology Stack Selection & Justification

| Layer | Selection | Architectural Justification |
| :--- | :--- | :--- |
| **Framework** | **Next.js 14+ (App Router)** | Best-in-class SSG/SSR support for SEO, built-in metadata API, native sitemap generation, zero-config code splitting, and high performance on Edge/Node runtimes. |
| **Language** | **TypeScript 5.x (Strict Mode)** | Complete type safety across domain interfaces, configuration objects, calculation inputs, and UI components. Eliminates null/undefined runtime crashes. |
| **Styling & Design Tokens** | **Tailwind CSS 3.x** | Utility-first, zero-runtime CSS overhead, highly responsive mobile-first layouts, and custom tokens for the modern fintech palette (`#FAFAF9` canvas, Slate-900 text, Emerald profit, Rose loss). |
| **UI Primitives** | **shadcn/ui (Radix UI Core)** | Unstyled, accessible (WAI-ARIA compliant) headless primitives for Select, Tabs, Tooltip, Accordion, and Dialog without heavy bundle locks. |
| **Animation Engine** | **Framer Motion (`framer-motion`)** | Declarative springs for numerical profit tickers, smooth accordion drawer expansion, and layout-preserving marketplace selector tabs with zero CLS impact. (See [ADR-008](file:///home/andim/ideas/marketplace-intelegence/docs/decisions/ADR-008-client-animation-strategy-motion-and-cls-safety.md)). |
| **Typography (Font Trio)** | **Display + Body + Tabular Mono** | 1. Display/Heading: *Plus Jakarta Sans* / *Geist Sans* (sharp financial authority).<br>2. Body: *Inter* / *Plus Jakarta Sans*.<br>3. Tabular Numeric: *Geist Mono* / *JetBrains Mono* with `tabular-nums` for exact decimal/column alignment. (See [ADR-007](file:///home/andim/ideas/marketplace-intelegence/docs/decisions/ADR-007-design-system-fintech-utility-and-typography-trio.md)). |
| **Validation** | **Zod** | Declarative schema validation for user input parsing and runtime configuration sanity checks. |
| **Testing** | **Vitest** | Sub-millisecond execution for unit test suites covering the pure domain calculation engine, break-even solver, and currency formatters. |
| **Database** | **None for Prototype (Static Config Registry)** | For the initial release, a database introduces operational friction without value. Declarative TypeScript data modules provide version-controlled, fast, zero-latency rule storage. A clean migration interface is established for PostgreSQL when a database is needed in future phases. |

---

## 4. Visual Design Architecture: The "Modern Financial Utility"

The product strictly avoids the **"Seller Admin Dashboard"** anti-pattern (crammed sidebars, dark crypto themes, 40 random cards). It is a public utility website where users arrive from organic search, perform immediate calculations, view prominent outcomes, compare platforms, and consume educational breakdowns.

### 4.1 Four Architectural Reference Pillars
1. **Wise (Structure & Intent Flow):**
   - Clean top navigation.
   - Big, search-intent headline ("Hitung Keuntungan Bersih Jualan di Shopee").
   - Tool/Calculator Card immediately visible above the fold.
   - Prominent Result summary card.
   - Rich, authoritative explanatory SEO content, formulas, and FAQs below.
2. **SlickCalc (Calculator Ergonomics & Minimalism):**
   - Whitespace-driven, distraction-free calculation experience.
   - Large input touchpoints with clear Indonesian Rupiah prefixes.
   - Zero gratuitous charts or decorative noise.
3. **Marketplace Analytics (Data Hierarchy & Comparison):**
   - Side-by-side comparative metric cards across Shopee, Tokopedia, TikTok Shop, and Lazada.
   - Clear visual flags for the "Best Margin" platform without sensory overload.
4. **Modern Fintech UI (Typography, Spacing & Trust):**
   - Off-white canvas (`#FAFAF9`), pure white card surfaces (`#FFFFFF`), very light gray borders (`#E2E8F0`).
   - Marketplace branding is represented via subtle badge accents (`[ 🟠 Shopee ]`, `[ 🟢 Tokopedia ]`, `[ ⚫ TikTok Shop ]`, `[ 🔵 Lazada ]`), never whole-page color washes.

### 4.2 Desktop 3-Column Layout & Safe Ad Zones
```text
┌───────────────────────────────────────────────────────────────┐
│ [Logo] Marketplace Intelligence     Kalkulator  Bandingkan  Biaya  │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│                         HERO SECTION                          │
│                Big Headline & Direct Tool Value               │
│                                                               │
│     ┌──────────────────────────────────────────────────┐      │
│     │            MAIN CALCULATOR CARD                  │      │
│     │  [Marketplace Selector Tabs]                     │      │
│     │  Selling Price | HPP | Ads | Affiliate | Tier    │      │
│     │                 [ HITUNG SEKARANG ]              │      │
│     └──────────────────────────────────────────────────┘      │
│                                                               │
├───────────────┬───────────────────────────────┬───────────────┤
│               │                               │               │
│   AD SLOT     │      YOUR PROFIT SIGNATURE    │    AD SLOT    │
│ (sidebar-left)│           Rp 17.600           │(sidebar-right)│
│               │            +17.6%             │               │
│               │  ┌─────────────────────────┐  │               │
│               │  │ Quick 4-Platform Preview│  │               │
│               │  └─────────────────────────┘  │               │
│               │      Itemized Fee Drawer      │               │
│               │                               │               │
├───────────────┴───────────────────────────────┴───────────────┤
│                                                               │
│             4-WAY CROSS-MARKETPLACE COMPARISON MATRIX         │
│                                                               │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│        EDITORIAL EXPLANATORY CONTENT & SEO FORMULAS           │
│        (Step-by-step example, FAQ Schema, Internal Links)     │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```
- **Ad Safety Principle:** The interactive calculator card is **never** flanked or squeezed by ads.
- Left and right ad sidebars only appear alongside results on desktop screens (>= 1280px), preserving focus and eliminating accidental clicks.

---

## 5. Codebase Organization & Folder Structure

```
marketplace-intelegence/
├── docs/                                 # Architectural & Product Documentation
│   ├── BRD.md                            # Business Requirements Document
│   ├── PRD.md                            # Product Requirements Document
│   ├── ARCHITECTURE.md                   # System Architecture (This file)
│   └── decisions/                        # Architecture Decision Records (ADRs)
│       ├── ADR-001-modular-monolith-nextjs-tech-stack.md
│       ├── ADR-002-domain-driven-calculation-engine.md
│       ├── ADR-003-declarative-marketplace-fee-rule-schema.md
│       ├── ADR-004-monetary-precision-and-idr-currency-handling.md
│       ├── ADR-005-seo-first-content-and-rendering-architecture.md
│       ├── ADR-006-monetization-extensibility-ads-and-affiliate.md
│       ├── ADR-007-design-system-fintech-utility-and-typography-trio.md
│       └── ADR-008-client-animation-strategy-motion-and-cls-safety.md
├── src/
│   ├── app/                              # Next.js App Router (13 Canonical Routes + Assets)
│   │   ├── layout.tsx                    # Root Layout (Nav, Footer, Global Providers)
│   │   ├── page.tsx                      # Homepage (/)
│   │   ├── marketplace-calculator/       # Universal Multi-Marketplace Calculator
│   │   │   └── page.tsx
│   │   ├── shopee-profit-calculator/     # Dedicated Shopee Calculator
│   │   │   └── page.tsx
│   │   ├── shopee-fee/                   # Shopee Fee Guide & Reference
│   │   │   └── page.tsx
│   │   ├── tokopedia-profit-calculator/  # Dedicated Tokopedia Calculator
│   │   │   └── page.tsx
│   │   ├── tokopedia-fee/                # Tokopedia Fee Guide & Reference
│   │   │   └── page.tsx
│   │   ├── tiktok-shop-profit-calculator/# Dedicated TikTok Shop Calculator
│   │   │   └── page.tsx
│   │   ├── tiktok-shop-fee/              # TikTok Shop Fee Guide & Reference
│   │   │   └── page.tsx
│   │   ├── lazada-profit-calculator/     # Dedicated Lazada Calculator
│   │   │   └── page.tsx
│   │   ├── lazada-fee/                   # Lazada Fee Guide & Reference
│   │   │   └── page.tsx
│   │   ├── compare/                      # Comparison Landing Hub
│   │   │   ├── page.tsx                  # 4-Way Multi-Platform Comparison Tool
│   │   │   ├── shopee-vs-tokopedia/      # Focused Head-to-Head Comparison
│   │   │   │   └── page.tsx
│   │   │   ├── shopee-vs-tiktok-shop/    # Focused Head-to-Head Comparison
│   │   │   │   └── page.tsx
│   │   │   └── tokopedia-vs-tiktok-shop/ # Focused Head-to-Head Comparison
│   │   │       └── page.tsx
│   │   ├── sitemap.ts                    # Dynamic XML Sitemap Generator
│   │   ├── robots.ts                     # Search Engine Robots Directive
│   │   ├── not-found.tsx                 # Custom 404 Error Page
│   │   └── error.tsx                     # Error Boundary
│   ├── components/                       # UI Component Library
│   │   ├── layout/                       # Header, Footer, Breadcrumbs, Container
│   │   ├── calculator/                   # Calculator Form, Result Card, Fee Accordion
│   │   ├── comparison/                   # Side-by-Side Comparison Matrix Table
│   │   ├── ads/                          # AdSlot Placeholder Component
│   │   ├── affiliate/                    # AffiliateLink Routing Component
│   │   ├── seo/                          # Structured Data (JSON-LD), FAQ Accordion
│   │   └── ui/                           # Base inputs, buttons, badges, tooltips
│   ├── domain/                           # Pure Domain Calculation Layer
│   │   ├── calculator/                   # Calculation Engine, Break-Even, Types
│   │   │   ├── engine.ts                 # Core calculateProfit function
│   │   │   ├── comparison.ts             # compareMarketplaces aggregator
│   │   │   ├── breakeven.ts              # Iterative break-even price solver
│   │   │   └── types.ts                  # Domain TypeScript interfaces
│   │   └── marketplace/                  # Marketplace Entity Definitions & Types
│   │       └── types.ts
│   ├── data/                             # Declarative Marketplace Fee Configurations
│   │   └── marketplaces/
│   │       ├── registry.ts               # Registry & Accessor API
│   │       ├── shopee.ts                 # Shopee Tier/Category/Program Fee Config
│   │       ├── tokopedia.ts              # Tokopedia Tier/Category/Program Fee Config
│   │       ├── tiktok-shop.ts            # TikTok Shop Tier/Category/Program Fee Config
│   │       └── lazada.ts                 # Lazada Tier/Category/Program Fee Config
│   ├── lib/                              # Shared Utilities & Infrastructure
│   │   ├── formatting/                   # Indonesian Rupiah & Percentage Formatters
│   │   ├── seo/                          # Metadata Builders & Schema Generators
│   │   ├── validation/                   # Zod Schemas for Inputs & Configs
│   │   └── analytics/                    # Abstract Analytics Dispatcher
│   └── config/                           # Application & Feature Flag Configuration
│       ├── site.ts                       # Site Metadata & URLs
│       ├── ads.ts                        # Ad Slot Placement Definitions & Switches
│       └── affiliate.ts                  # Affiliate Link Destination Providers
├── tests/                                # Unit & Integration Test Suites
│   ├── unit/
│   │   ├── engine.test.ts                # Calculation engine behavioral tests
│   │   ├── breakeven.test.ts             # Break-even solver tests
│   │   ├── comparison.test.ts            # Multi-marketplace comparison tests
│   │   └── formatting.test.ts            # Currency precision & parsing tests
│   └── seo/
│       └── metadata.test.ts              # Route metadata & schema completeness
├── public/                               # Static Assets (Logos, Icons, Robots)
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

---

## 5. Domain Model & Calculation Engine Architecture

### 5.1 Data Contracts (Domain Interfaces)

```typescript
// src/domain/calculator/types.ts

export type MarketplaceId = 'shopee' | 'tokopedia' | 'tiktok-shop' | 'lazada';

export interface CalculatorInput {
  marketplaceId: MarketplaceId;
  sellerTierId: string;
  categoryId: string;
  sellingPrice: number;        // in IDR (integer Rupiah)
  productCost: number;         // HPP in IDR
  advertisingCost?: number;    // per unit in IDR
  affiliatePercentage?: number;// e.g. 5 for 5%
  voucherCost?: number;        // per unit in IDR
  shippingSubsidy?: number;    // per unit in IDR
  selectedPrograms?: string[]; // IDs of selected extra programs (e.g. 'gratis_ongkir_xtra')
}

export interface FeeItem {
  id: string;
  name: string;
  category: 'admin' | 'service' | 'payment' | 'program' | 'affiliate' | 'tax';
  rate: number;                // Decimal rate (e.g. 0.04 for 4%)
  fixedAmount: number;         // Fixed Rupiah deduction
  calculatedAmount: number;    // Resulting fee in IDR
  minAmount?: number;          // Floor cap
  maxAmount?: number;          // Ceiling cap
  description?: string;
  isOptional: boolean;
}

export interface CalculationResult {
  input: CalculatorInput;
  sellingPrice: number;
  productCost: number;
  totalMarketplaceFees: number;
  paymentFee: number;
  affiliateFee: number;
  operationalCosts: {
    advertisingCost: number;
    voucherCost: number;
    shippingSubsidy: number;
    total: number;
  };
  feeBreakdown: FeeItem[];
  totalDeductions: number;     // Total marketplace fees + operational costs
  totalCost: number;           // Total deductions + productCost
  netProfit: number;           // sellingPrice - totalCost
  netMargin: number;           // (netProfit / sellingPrice) * 100
  breakEvenPrice: number;      // Minimum selling price where netProfit = 0
  effectiveFeeRate: number;    // (totalMarketplaceFees / sellingPrice) * 100
  isProfitable: boolean;
}

export interface MarketplaceComparisonItem {
  marketplaceId: MarketplaceId;
  marketplaceName: string;
  sellerTierName: string;
  result: CalculationResult;
  isBestMargin: boolean;
  profitDifferenceFromBest: number;
}

export interface ComparisonResult {
  baseInput: CalculatorInput;
  items: MarketplaceComparisonItem[];
  bestMarketplaceId: MarketplaceId;
}
```

### 5.2 Declarative Fee Rule Configuration Schema

```typescript
// src/domain/marketplace/types.ts

export type FeeCalculationType = 'percentage' | 'fixed' | 'tiered' | 'hybrid';

export interface FeeRule {
  id: string;
  name: string;
  type: FeeCalculationType;
  category: 'admin' | 'service' | 'payment' | 'program' | 'tax';
  percentageRate: number;      // e.g. 0.0425 for 4.25%
  fixedFee: number;            // in IDR
  minFee?: number;             // Minimum fee in IDR
  maxFee?: number;             // Maximum fee cap in IDR
  applicableTiers?: string[];  // e.g. ['star_seller', 'star_plus'] or undefined for all
  applicableCategories?: Record<string, number>; // Specific rate override by category ID
  conditionDescription?: string;
  isDefaultActive: boolean;
  isOptional: boolean;
}

export interface SellerTier {
  id: string;
  name: string;
  description: string;
  isDefault?: boolean;
}

export interface ProductCategoryGroup {
  id: string;
  name: string;
  description: string;
  defaultAdminFeeRate: number;
}

export interface MarketplaceConfig {
  id: MarketplaceId;
  name: string;
  slug: string;
  brandColor: string;
  version: string;
  lastVerifiedDate: string;
  sourceUrl: string;
  disclaimer: string;
  sellerTiers: SellerTier[];
  categories: ProductCategoryGroup[];
  rules: FeeRule[];
}
```

### 5.3 Deterministic Engine Pipeline

The calculation algorithm follows an immutable, functional pipeline:

```
[CalculatorInput]
       │
       ▼
1. Normalize & Clamp Inputs (Default zero for undefined optional values)
       │
       ▼
2. Resolve Marketplace Config (Tiers, Categories, Applicable Rules)
       │
       ▼
3. Evaluate Base Admin Fee (Resolve Category Rate Override or Tier Rate)
       │
       ▼
4. Evaluate Service & Extra Program Fees (Gratis Ongkir Xtra, Cashback Xtra, with Max Caps)
       │
       ▼
5. Evaluate Payment Processing Fee (e.g. 1% with Min/Max bounds)
       │
       ▼
6. Evaluate Affiliate Commission (sellingPrice * affiliatePercentage / 100)
       │
       ▼
7. Aggregate Operational Deductions (Ads + Voucher + Shipping)
       │
       ▼
8. Compute Gross Deductions, Total Costs, Net Profit, and Net Margin
       │
       ▼
9. Solve Exact Break-Even Selling Price via Closed-Form or Bounded Binary Iteration
       │
       ▼
10. Format Monetary Values (Rounded integer IDR, no fractional sub-units)
       │
       ▼
[CalculationResult]
```

---

## 6. Currency & Number Precision Strategy

### 6.1 The Floating-Point Hazard
In JavaScript, floating-point arithmetic produces notorious precision errors (e.g. `100000 * 0.0425 = 4250.000000000001` or `0.1 + 0.2 = 0.30000000000000004`). In a financial calculator, displaying `Rp4.250,000000000001` destroys credibility.

### 6.2 IDR Integer Arithmetic Strategy
- **Indonesian Rupiah has no circulating decimal coins (Sen).** All actual transactions in Indonesian retail are rounded to whole Rupiah.
- **Rule:**
  - Intermediate calculations use standard JavaScript numbers with explicit rounding via `Math.round()` at each distinct fee step.
  - Commission rates are stored as exact decimal numbers (e.g. `0.0425` for 4.25%).
  - The final outputs (`calculatedAmount`, `netProfit`, `totalCost`, `breakEvenPrice`) are strictly rounded integers:
    $$\text{fee} = \text{Math.round}(\text{sellingPrice} \times \text{rate})$$
  - Number formatters use `Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })`, rendering clean `Rp100.000` with standard Indonesian thousand separators (`.`).

---

## 7. SEO Architecture & Rendering Strategy

### 7.1 Search Intent to Route Mapping

| Route | Primary Search Query Target | Intent Type | SSR Content Focus |
| :--- | :--- | :--- | :--- |
| `/` | `kalkulator marketplace indonesia` | Navigational / Broad Commercial | Overview of 4 platforms, quick comparison preview, platform links. |
| `/marketplace-calculator` | `kalkulator jualan online marketplace` | Core Commercial Utility | Multi-platform switcher, full feature inputs, instant comparison. |
| `/shopee-profit-calculator` | `kalkulator shopee star seller untung rugi` | Specific Tool Intent | Shopee seller tiers (Star/Mall), Gratis Ongkir Xtra toggle, Shopee formula. |
| `/shopee-fee` | `biaya admin shopee terbaru 2025` | Informational / Educational | Comprehensive Shopee fee table, category rates, simulation example. |
| `/tokopedia-profit-calculator`| `kalkulator profit tokopedia power merchant` | Specific Tool Intent | PM Pro / Regular tiers, Bebas Ongkir rate breakdown, Tokopedia formulas. |
| `/tokopedia-fee` | `potongan biaya admin tokopedia` | Informational / Educational | Tokopedia commission groups 1-5, service fee limits. |
| `/tiktok-shop-profit-calculator`| `kalkulator tiktok shop creator affiliate` | Specific Tool Intent | Live commerce fee, affiliate commission slider, Mall commission. |
| `/tiktok-shop-fee` | `biaya admin tiktok shop seller` | Informational / Educational | TikTok Shop commission rates by category, payment fee terms. |
| `/lazada-profit-calculator` | `kalkulator margin lazada lazmall` | Specific Tool Intent | LazMall vs Marketplace seller fees, Free Shipping Max costs. |
| `/lazada-fee` | `biaya komisi lazada indonesia` | Informational / Educational | Detailed breakdown of Lazada commission and payment handling. |
| `/compare` | `perbandingan potongan marketplace indonesia` | High-Intent Comparison | 4-way comparison matrix, cross-platform margin differences. |
| `/compare/shopee-vs-tokopedia`| `shopee vs tokopedia lebih murah mana biaya admin` | Head-to-Head Comparison | Direct comparison of Shopee Star vs Tokopedia PM Pro fees. |
| `/compare/shopee-vs-tiktok-shop`| `shopee vs tiktok shop biaya potongan seller` | Head-to-Head Comparison | Direct comparison highlighting affiliate costs and live shopping fees. |
| `/compare/tokopedia-vs-tiktok-shop`| `tokopedia vs tiktok shop komisi jualan` | Head-to-Head Comparison | Shop \| Tokopedia integration context and fee structures. |

### 7.2 Structured Data (Schema.org JSON-LD) Strategy
Every page automatically injects contextual JSON-LD structured schemas:
1. **WebApplication / SoftwareApplication:** On all calculator pages (`applicationCategory: BusinessApplication`, `operatingSystem: All`, `offers: { price: '0', priceCurrency: 'IDR' }`).
2. **BreadcrumbList:** Hierarchical navigation trail assisting Google SERP snippet formatting.
3. **FAQPage:** Structured FAQ answering specific questions (e.g., *"Berapa biaya admin Shopee Star Seller?"*).
4. **HowTo:** Step-by-step calculation workflow structured for rich snippets.

---

## 8. Extensibility & Future Monetization

### 8.1 AdSlot Architecture
```tsx
// Abstract Ad Slot Component Pattern
interface AdSlotProps {
  position: 'top' | 'sidebar-left' | 'sidebar-right' | 'in-content' | 'bottom' | 'mobile-anchor';
  className?: string;
}

export function AdSlot({ position, className }: AdSlotProps) {
  // Feature flag check
  if (!ADS_CONFIG.enabled) return null;

  return (
    <aside
      aria-label="Iklan Sponsor"
      className={clsx(
        "ad-slot-container border border-dashed border-slate-200 bg-slate-50/50 text-center flex items-center justify-center text-xs text-slate-400 select-none",
        positionStyles[position],
        className
      )}
    >
      <span className="font-mono">[Ruang Iklan - {position}]</span>
    </aside>
  );
}
```
- Completely inert in prototype mode.
- Does not load third-party ad scripts.
- Guarantees CLS immunity by reserving dimension bounds.

### 8.2 Affiliate Provider Redirection Abstraction
```typescript
// src/config/affiliate.ts
export interface AffiliateDestination {
  marketplaceId: MarketplaceId;
  targetType: 'seller-registration' | 'seller-center' | 'official-tools';
  baseUrl: string;
  trackingParamKey: string;
}

export function resolveAffiliateUrl(marketplaceId: MarketplaceId, targetType: string): string {
  const provider = AFFILIATE_PROVIDERS[marketplaceId];
  if (!provider) return '#';
  const affId = process.env.NEXT_PUBLIC_AFFILIATE_ID || 'prototype_preview';
  return `${provider.baseUrl}?${provider.trackingParamKey}=${encodeURIComponent(affId)}&utm_source=marketplace_intelligence`;
}
```

---

## 9. Assumptions, Unknowns & Out-of-Scope Declarations

### 9.1 Assumptions
1. Indonesian sellers calculate unit profit before VAT (PPN 11%) or absorb VAT within the platform commission deduction.
2. Marketplaces charge commission on the customer-paid product price (excluding direct marketplace vouchers).
3. The mock fee rates reflect typical published ranges in Indonesia for educational modeling (e.g. 4.0% – 6.5% for Star/Power Merchant).

### 9.2 Unknowns & Verification Strategy
- *Dynamic Campaign Promotions:* Marketplaces intermittently launch temporary fee discount programs.
  - *Strategy:* The fee config contains an `isOptional` and `isDefaultActive` flag allowing users to toggle temporary programs (e.g. Flash Sale / Gratis Ongkir Xtra).

### 9.3 Explicitly Out of Scope (What NOT to Build Yet)
- ❌ User authentication, sign-in, or session databases.
- ❌ Payment gateways, Stripe/Midtrans integrations, or premium subscriptions.
- ❌ Web scrapers or unauthorized automated crawlers targeting marketplace portals.
- ❌ Third-party ad network scripts (Google AdSense script injection).
- ❌ Backend database servers (PostgreSQL / Redis) for the prototype.
- ❌ Real-time inventory synchronization or order processing.

---

## 10. Testing & Quality Assurance Strategy

The prototype enforces strict unit test coverage using Vitest:
1. **Zero Fee Baseline:** Base case verification where fees are 0%.
2. **Standard Percentage Admin Fee:** Validating 4.25% fee on Rp100.000 yields exact Rp4.250.
3. **Fixed Payment Handling Fee:** Validating Rp1.000 flat fee addition.
4. **Capped Fees (Min/Max):** Validating programs with fee caps (e.g. 4% with max Rp10.000).
5. **Break-Even Solver Precision:** Ensuring calculated break-even price produces $\text{Net Profit} \ge 0$ and is within Rp1 of theoretical balance.
6. **Cross-Marketplace Comparison Invariance:** Running comparison returns identical single-calculation results for every platform.
7. **Negative Profit / High-Cost Alerts:** Ensuring engine accurately produces negative profit without crashing when costs exceed selling price.
8. **Invalid & Extreme Input Protection:** Handling negative prices, extreme values (Rp10B), and zero values gracefully.
