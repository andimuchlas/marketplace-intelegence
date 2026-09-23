# ADR-009: Dual-Portal Architecture & Persona Separation (Consumer `/` & Merchant `/seller`)

## Status
**Accepted** (Implemented in Sprint 4 — September 2026)

---

## Context & Problem Statement

In the initial release (Prototype v1.0), the platform combined both seller utilities and marketplace exploration on the root URL (`/`). The homepage presented the `MarketplaceCalculator` directly in the hero fold, with inputs for Cost of Goods Sold (HPP), seller tiers, admin fee categories, and Break-Even Price (BEP) formulas.

However, market feedback and user analytics revealed two fundamentally incompatible user personas:
1. **B2B / Merchants / Online Sellers**:
   - Core question: *"Berapa keuntungan bersih saya setelah dipotong komisi admin & iklan?"*
   - Mental model: Unit economics, ledger accounting, profit margin, operational costs.
2. **B2C / Online Shoppers / Consumers**:
   - Core question: *"Di mana saya bisa membeli barang ini dengan harga paling murah?"*
   - Mental model: Catalog search, instant price comparison, vouchers, discount authenticity, cheapest marketplace recommendation.

When a consumer searching for *"cek harga iPhone 15 termurah"* landed on a page asking for *"Modal (HPP)"* and *"Biaya Penanganan"*, it created severe cognitive friction and high bounce rates. Conversely, sellers felt distracted if consumer shopping search widgets were mixed into their unit economics workspace.

---

## Decision Drivers

1. **Audience Intent Alignment**: 90%+ of e-commerce web traffic consists of consumers seeking product prices, while merchants seek financial calculators.
2. **First-Fold Clarity**: The landing page must answer the visitor's intent in < 3 seconds without irrelevant form fields.
3. **Minimalist Header Navigation**: Navigation between portals must be frictionless and clean, avoiding cluttered "Mode" toggles in favor of simple active underline tabs.
4. **SEO Link Equity Preservation**: Legacy URLs (`/shopee-profit-calculator`, `/radar-harga`, etc.) must not return 404s when reorganized.

---

## Considered Options

1. **Option A (Combined Single-Page with Switcher Widget)**:
   - Keep everything on `/` with a toggle that dynamically hides/shows the calculator or search bar.
   - *Rejected:* Heavy client-side JavaScript payload, poor SEO indexing (search bots see contradictory content), and noisy layout shifts.
2. **Option B (Subdomains: `seller.domain.com` and `user.domain.com`)**:
   - Split into distinct subdomains.
   - *Rejected:* Fractures domain authority (SEO link juice is split), requires separate SSL/DNS configuration, and complicates local development.
3. **Option C (Dual-Portal Path Separation: `/` for Consumer & `/seller` for Merchant)** — **SELECTED**:
   - The root domain (`/`) defaults to the high-traffic Consumer Price Radar.
   - The dedicated path (`/seller/*`) houses all merchant financial tools, fee guides, and comparison matrices.
   - Navigation header provides clean, minimalist `Pembeli` and `Penjual` tabs with active underline indicators.

---

## Architectural Implementation

### 1. Route Hierarchy (Next.js App Router)
```text
src/app/
├── page.tsx                           # Consumer Portal (Live Price Radar & Search)
│
├── seller/                            # Merchant Portal (Seller Hub)
│   ├── page.tsx                       # Seller Dashboard + Interactive Profit Calculator
│   ├── kalkulator/                    # Universal Calculator (/seller/kalkulator)
│   │   ├── shopee/page.tsx            # Shopee Profit Calculator
│   │   ├── tokopedia/page.tsx         # Tokopedia Profit Calculator
│   │   ├── tiktok-shop/page.tsx       # TikTok Shop Profit Calculator
│   │   └── lazada/page.tsx            # Lazada Profit Calculator
│   ├── biaya-admin/                   # Official Fee Guides 2025
│   │   ├── shopee/page.tsx
│   │   ├── tokopedia/page.tsx
│   │   ├── tiktok-shop/page.tsx
│   │   └── lazada/page.tsx
│   └── komparasi-fee/                 # Merchant Fee Comparison
│       ├── page.tsx                   # 4-Way Fee Matrix
│       ├── shopee-vs-tokopedia/page.tsx
│       ├── shopee-vs-tiktok-shop/page.tsx
│       └── tokopedia-vs-tiktok-shop/page.tsx
```

### 2. Minimalist Underline Header UX (`Header.tsx`)
- Tab **`Pembeli`** (`/`): Underline active when on root/consumer routes. Secondary nav shows `Radar Harga`.
- Tab **`Penjual`** (`/seller`): Underline active when on `/seller/*`. Secondary nav reveals `Kalkulator`, `Bandingkan`, and `Panduan Biaya`.
- No confusing "Mode" labels—pure, elegant typography with emerald active borders.

### 3. SEO 301 Permanent Redirects (`next.config.mjs`)
All legacy endpoints are permanently redirected with HTTP 301 to preserve link authority and existing Google rankings:
- `/radar-harga` → `/`
- `/marketplace-calculator` → `/seller/kalkulator`
- `/*-profit-calculator` → `/seller/kalkulator/*`
- `/*-fee` → `/seller/biaya-admin/*`
- `/compare/*` → `/seller/komparasi-fee/*`

---

## Consequences

### Positive
- **100% Intent Focus**: Consumers immediately see search and price comparisons without seller jargon. Merchants enjoy an uncluttered financial workspace.
- **Superior SEO Targeting**: Distinct keyword clustering (Consumer keywords rank to `/`, merchant keywords rank to `/seller/*`).
- **Zero Deadlinks**: 301 redirect table ensures 0 broken links for legacy users or external backlinks.

### Negative / Trade-offs
- **Route Multiplication**: Increases total route count from 22 to 36, requiring structured maintenance of subpages (mitigated through shared data modules and automated test coverage).
