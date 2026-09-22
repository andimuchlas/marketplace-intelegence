# Marketplace Intelligence Indonesia — Architecture & Specifications

Welcome to the architectural and engineering documentation repository for **Marketplace Intelligence Indonesia** (*Kalkulator Margin & Biaya Marketplace*).

This platform is a high-performance, mobile-first utility designed to help Indonesian e-commerce sellers calculate true unit profit, platform deductions, and cross-marketplace margins across **Shopee**, **Tokopedia**, **TikTok Shop**, and **Lazada**.

---

## 📚 Document Index

| Document | Description | Status |
| :--- | :--- | :--- |
| [**Business Requirements Document (BRD)**](file:///home/andim/ideas/marketplace-intelegence/docs/BRD.md) | Business model, target market personas, Indonesian e-commerce landscape, monetization evolution, and risk mitigation. | Approved |
| [**Product Requirements Document (PRD)**](file:///home/andim/ideas/marketplace-intelegence/docs/PRD.md) | Functional specs, mathematical formulas, 13 canonical URL routes, UX/UI requirements, and acceptance criteria. | Approved |
| [**System Architecture & Technical Design**](file:///home/andim/ideas/marketplace-intelegence/docs/ARCHITECTURE.md) | Architectural principles, system diagrams, data contracts, deterministic engine pipeline, IDR currency handling, and testing strategy. | Approved |

---

## 🏛️ Architecture Decision Records (ADRs)

Our technical design is grounded in explicit, recorded architectural decisions:

1. [**ADR-001: Modular Monolith Architecture using Next.js, TypeScript, and Tailwind CSS**](file:///home/andim/ideas/marketplace-intelegence/docs/decisions/ADR-001-modular-monolith-nextjs-tech-stack.md)
   - *Why a Next.js modular monolith was selected over microservices or separate client SPA.*
2. [**ADR-002: Decoupled Domain-Driven Calculation Engine**](file:///home/andim/ideas/marketplace-intelegence/docs/decisions/ADR-002-domain-driven-calculation-engine.md)
   - *Why calculation logic is isolated into pure TypeScript functions completely decoupled from React UI components.*
3. [**ADR-003: Declarative Marketplace Fee Rule Configuration Schema**](file:///home/andim/ideas/marketplace-intelegence/docs/decisions/ADR-003-declarative-marketplace-fee-rule-schema.md)
   - *Why declarative TypeScript config modules were chosen over hardcoded conditionals or heavy SQL databases for the prototype.*
4. [**ADR-004: Monetary Precision and Indonesian Rupiah (IDR) Handling**](file:///home/andim/ideas/marketplace-intelegence/docs/decisions/ADR-004-monetary-precision-and-idr-currency-handling.md)
   - *Why whole-Rupiah (integer IDR) arithmetic with step-by-step rounding was chosen to prevent IEEE 754 floating-point inaccuracies.*
5. [**ADR-005: SEO-First Content and Rendering Architecture**](file:///home/andim/ideas/marketplace-intelegence/docs/decisions/ADR-005-seo-first-content-and-rendering-architecture.md)
   - *Why 13 dedicated search-intent URLs with SSG/SSR pre-rendering and JSON-LD schemas were adopted instead of parameterized URLs.*
6. [**ADR-006: Monetization Extensibility (AdSlot and Affiliate Abstractions)**](file:///home/andim/ideas/marketplace-intelegence/docs/decisions/ADR-006-monetization-extensibility-ads-and-affiliate.md)
   - *Why zero-layout-shift AdSlots with feature switches and decoupled affiliate providers were established without third-party ad scripts.*
7. [**ADR-007: Visual Design System — Fintech Utility & Typography Trio**](file:///home/andim/ideas/marketplace-intelegence/docs/decisions/ADR-007-design-system-fintech-utility-and-typography-trio.md)
   - *Why the "Wise × SlickCalc × Marketplace Analytics" model with a font trio and neutral `#FAFAF9` palette was adopted instead of an admin dashboard.*
8. [**ADR-008: Client Animation Strategy — Motion & Core Web Vitals Safety**](file:///home/andim/ideas/marketplace-intelegence/docs/decisions/ADR-008-client-animation-strategy-motion-and-cls-safety.md)
   - *Why Framer Motion was selected for lightweight spring number transitions and accordion motion without CLS penalties.*

---

## 🎯 Key Architectural Highlights

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Browser                         │
│  ┌──────────────────────┐       ┌────────────────────────┐  │
│  │ Calculator Form UI   │       │ Comparison Matrix UI   │  │
│  └──────────┬───────────┘       └───────────┬────────────┘  │
└─────────────┼───────────────────────────────┼───────────────┘
              │                               │
              ▼                               ▼
┌─────────────────────────────────────────────────────────────┐
│          Domain Calculation Engine (Pure TypeScript)        │
│  • calculateProfit(input, config)                           │
│  • compareMarketplaces(input, configs)                      │
│  • calculateBreakEven(input, config)                        │
│  • formatRupiah(amount)                                     │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│       Declarative Marketplace Registry & Fee Rules          │
│  • shopee.ts       • tokopedia.ts                           │
│  • tiktok-shop.ts  • lazada.ts                              │
└─────────────────────────────────────────────────────────────┘
```

- **Zero-Latency Calculation:** Runs 100% in-browser in < 5ms.
- **SSR/SSG SEO Ready:** Complete semantic HTML and structured schema delivered to search bots on initial HTTP GET.
- **Pure Domain Engine:** 100% testable with zero React or DOM dependencies.
- **Monetization Ready:** Pre-allocated AdSlots with zero Cumulative Layout Shift (CLS), toggleable via environment flags.
