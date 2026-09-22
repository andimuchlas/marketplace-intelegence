# Product Requirements Document (PRD)
## Project: Indonesian Marketplace Intelligence & Profit Calculator Platform

- **Document Version:** 1.0.0
- **Status:** Approved for Architecture & Implementation
- **Target Release:** Prototype v1.0
- **Primary Audience:** Engineering, Product, UX/UI, SEO Specialists

---

## 1. Product Overview & Vision

**Marketplace Intelligence Indonesia** is a free, blazing-fast, mobile-first utility platform enabling Indonesian e-commerce sellers to calculate true profit, platform deductions, and cross-marketplace margins across Shopee, Tokopedia, TikTok Shop, and Lazada.

### 1.1 Core Value Loop
```
Search Query (e.g. "Kalkulator Shopee Star Seller")
       ↓
Search Engine Results Page (SERP)
       ↓
SSR / Static Content Landing Page with Explanatory Content
       ↓
Interactive Profit Calculator (Client-side execution, instant feedback)
       ↓
Detailed Deductions & Net Margin Breakdown
       ↓
1-Click Cross-Marketplace Comparison Matrix (Shopee vs Toko vs TikTok vs Lazada)
       ↓
Deep Links to Fee Documentation / Sibling Calculators / Return Visit Bookmark
```

---

## 2. User Personas & Use Cases

### 2.1 Use Case 1: Pre-Pricing Strategy (New Product Launch)
- **User:** Fashion seller launching a new hijab line.
- **Action:** Enters Cost of Goods Sold (COGS/HPP) = Rp45.000, desired margin target = 25%, ad spend budget = Rp5.000.
- **System Output:** Calculates target selling price, all expected deductions (Admin fee, Gratis Ongkir Xtra, Payment fee), net take-home cash, and exact break-even price.

### 2.2 Use Case 2: Multi-Channel Expansion Decision
- **User:** Electronics merchant currently only selling on Tokopedia Power Merchant Pro.
- **Action:** Inputs current SKU economics (Price: Rp250.000, COGS: Rp190.000, Ads: Rp10.000) and clicks "Bandingkan Marketplace".
- **System Output:** Side-by-side comparison table showing net profit across Tokopedia vs Shopee Star+ vs TikTok Shop vs Lazada.

### 2.3 Use Case 3: Campaign & Promotion Feasibility Check
- **User:** Merchant preparing for Shopee 11.11 / TikTok Mega Sale.
- **Action:** Tests adding an extra 10% voucher and 5% affiliate commission.
- **System Output:** Real-time alert if net profit turns negative or drops below safety margin.

---

## 3. Detailed Functional Requirements

### 3.1 Core Calculation Engine Specifications

#### Input Parameters
The calculator accepts the following inputs:

| Field Name | Type | Unit / Format | Required | Default | Validation Rules |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `marketplaceId` | Enum | `shopee` \| `tokopedia` \| `tiktok-shop` \| `lazada` | Yes | Selected route / `shopee` | Must be a valid configured marketplace ID |
| `sellerTierId` | String | Marketplace-specific ID (e.g., `star_seller`, `power_merchant_pro`) | Yes | Default tier per marketplace | Must exist in marketplace config |
| `categoryId` | String | Category Group ID (e.g., `fashion`, `electronics`) | Yes | Default group | Must exist in marketplace config |
| `sellingPrice` | Number | IDR (Rupiah) | Yes | Rp100.000 | Integer > 0, Max Rp10.000.000.000 |
| `productCost` (HPP) | Number | IDR (Rupiah) | Yes | Rp60.000 | Integer >= 0, <= `sellingPrice` * 10 |
| `advertisingCost` | Number | IDR (Rupiah) per unit sold | No | Rp0 | Integer >= 0 |
| `affiliatePercentage`| Number | Percentage (%) | No | 0% | Number >= 0, <= 100, up to 2 decimal places |
| `voucherCost` | Number | IDR (Rupiah) per unit sold | No | Rp0 | Integer >= 0 |
| `shippingSubsidy` | Number | IDR (Rupiah) seller-paid | No | Rp0 | Integer >= 0 |
| `extraPrograms` | String[] | Program IDs (e.g. `gratis_ongkir_xtra`, `cashback_xtra`) | No | Active defaults | Array of valid rule IDs |

#### Mathematical Formulas & Calculation Order
Calculations must be deterministic, pure, and executed in exact sequence:

1. **Base Selling Price:**
   $$\text{Price} = P$$
2. **Product Cost (HPP / COGS):**
   $$\text{Cost}_{\text{product}} = C$$
3. **Marketplace Admin & Service Fees:**
   For each applicable rule $r \in R$ enabled for the seller tier, category, and selected programs:
   $$\text{Fee}_r = \text{clamp}\left(P \times \text{rate}_r + \text{fixedFee}_r, \min_r, \max_r\right)$$
   $$\text{Fee}_{\text{marketplace}} = \sum \text{Fee}_r$$
4. **Payment / Handling Fee:**
   $$\text{Fee}_{\text{payment}} = \text{clamp}\left(P \times \text{rate}_{\text{pay}} + \text{fixed}_{\text{pay}}, \min_{\text{pay}}, \max_{\text{pay}}\right)$$
5. **Affiliate Commission:**
   $$\text{Fee}_{\text{affiliate}} = P \times \left(\frac{\text{affiliatePercentage}}{100}\right)$$
6. **Marketing & Operational Deductions:**
   $$\text{Cost}_{\text{operational}} = \text{advertisingCost} + \text{voucherCost} + \text{shippingSubsidy}$$
7. **Total Costs & Deductions:**
   $$\text{Cost}_{\text{total}} = \text{Cost}_{\text{product}} + \text{Fee}_{\text{marketplace}} + \text{Fee}_{\text{payment}} + \text{Fee}_{\text{affiliate}} + \text{Cost}_{\text{operational}}$$
8. **Net Profit:**
   $$\text{Profit}_{\text{net}} = P - \text{Cost}_{\text{total}}$$
9. **Net Margin (%):**
   $$\text{Margin}_{\text{net}} = \begin{cases} 0\% & \text{if } P = 0 \\ \left(\frac{\text{Profit}_{\text{net}}}{P}\right) \times 100 & \text{if } P > 0 \end{cases}$$
10. **Break-Even Selling Price:**
    The minimum selling price $P_{\text{BE}}$ such that $\text{Profit}_{\text{net}} = 0$.
    Because variable fee percentage is:
    $$\text{Rate}_{\text{var}} = \sum \text{rate}_{\text{fee}} + \frac{\text{affiliatePercentage}}{100}$$
    And total fixed costs are:
    $$\text{Cost}_{\text{fixed}} = \text{Cost}_{\text{product}} + \text{advertisingCost} + \text{voucherCost} + \text{shippingSubsidy} + \sum \text{fixed}_{\text{fee}}$$
    Provided $\text{Rate}_{\text{var}} < 1.0$:
    $$P_{\text{BE}} = \left\lceil \frac{\text{Cost}_{\text{fixed}}}{1.0 - \text{Rate}_{\text{var}}} \right\rceil$$
    *(Subject to cap/ceiling clamping iterations if capped fees are involved).*

---

### 3.2 Marketplace Comparison Engine Specifications
- Allows single-click execution of the user's input across all 4 marketplaces (Shopee, Tokopedia, TikTok Shop, Lazada).
- Displays a structured side-by-side comparison matrix:
  - Marketplace Fee
  - Payment Processing Fee
  - Affiliate Fee
  - Advertising Spend
  - Product Cost (HPP)
  - Operational / Voucher Deductions
  - **Total Deduction & Cost**
  - **Net Profit (IDR)**
  - **Net Margin (%)**
  - **Break-Even Selling Price (IDR)**
- Visually flags the "Best Margin" platform with a subtle, accessible badge.
- Reuses the identical domain calculation engine, guaranteeing consistency.

---

### 3.3 Required Pages & Routing Hierarchy

The application mandates exactly 13 primary URLs, each satisfying a dedicated search intent without keyword cannibalization:

```
/
├── marketplace-calculator                (Universal Multi-Marketplace Calculator)
├── shopee-profit-calculator              (Shopee Profit & Break-Even Calculator)
├── shopee-fee                            (Shopee Fee Schedule & Guide)
├── tokopedia-profit-calculator           (Tokopedia Profit & Break-Even Calculator)
├── tokopedia-fee                         (Tokopedia Fee Schedule & Guide)
├── tiktok-shop-profit-calculator         (TikTok Shop Profit & Break-Even Calculator)
├── tiktok-shop-fee                       (TikTok Shop Fee Schedule & Guide)
├── lazada-profit-calculator              (Lazada Profit & Break-Even Calculator)
├── lazada-fee                            (Lazada Fee Schedule & Guide)
├── compare                               (Comparison Landing Matrix)
│   ├── shopee-vs-tokopedia               (Head-to-head Comparison)
│   ├── shopee-vs-tiktok-shop             (Head-to-head Comparison)
│   └── tokopedia-vs-tiktok-shop          (Head-to-head Comparison)
```

#### Canonical Page Content Standard
Every SEO landing page must adhere to the following strict semantic structure:
1. **Header & Breadcrumbs:** Clear hierarchical breadcrumb navigation (e.g. `Beranda > Shopee > Kalkulator`).
2. **Single `<h1>` Title:** Target keyword aligned with human intent (e.g. `Kalkulator Profit Shopee: Hitung Potongan Biaya & Margin Bersih`).
3. **Direct Value Introduction:** 2–3 concise sentences explaining what the tool calculates, target seller tier, and update date.
4. **Interactive Calculator Widget:** Above-the-fold or immediate scroll view.
5. **Detailed Result Summary:** Net profit card, margin percentage, break-even price, and accordion fee breakdown.
6. **Calculation Formula & Walkthrough:** Explicit step-by-step mathematical example using realistic values (e.g. Rp100.000 selling price).
7. **Educational Fee Summary Table:** Transparent listing of applicable commission rates, seller tiers, and maximum caps.
8. **Internal Linking Hub:** Links to comparison pages, sister marketplace calculators, and official documentation sources.
9. **Prototype Disclaimer:** Explicit notice that rules are educational simulations.

---

### 3.4 UI/UX Design System: "Modern Financial Utility"

The user interface explicitly rejects the "Seller Admin Dashboard" archetype (no 40-metric cards, no dark neon themes, no full-page sidebars). It adheres to a **Wise × SlickCalc × Marketplace Analytics** visual formula.

#### 1. Page Topology & Hierarchy (The Wise Pattern)
- **Header:** Lightweight navigation bar with site title and direct utility links.
- **Hero:** Punchy, high-intent headline ("Hitung Keuntungan Bersih Jualan di Shopee") + 1-sentence value proposition.
- **Calculator Card:** Large, distraction-free input touchpoints (Rp formatted integers, marketplace switcher tabs).
- **Result Signature Card:** Immediate, visually prominent net profit display:
  ```text
  ESTIMATED NET PROFIT
  Rp 17.600
  ↑ +17.6% margin
  [ 4-Platform Preview Pills: Shopee 17.6k | Tokopedia 19.2k | TikTok 21.1k | Lazada 18.3k ]
  ```
- **Itemized Fee Drawer:** Expandable/collapsible detailed breakdown (Marketplace Admin, Payment Processing, Affiliate, Ads, Shipping).
- **Comparison Matrix:** Side-by-side comparative table with "Best Margin" visual badge.
- **SEO & Educational Lower Fold:** Mathematical formula walkthrough, category fee tables, FAQ accordion, and sibling calculator links.

#### 2. Visual Palette & Brand Accents
- **Canvas Background:** `#FAFAF9` (Stone-50 off-white).
- **Surfaces:** `#FFFFFF` (Pure white cards) with thin borders (`#E2E8F0` / Slate-200) and soft neutral elevation (`shadow-sm`).
- **Typography:** Deep near-black `#0F172A` (Slate-900) for high-contrast legibility.
- **Marketplace Neutrality:** Marketplace brand colors are strictly localized to small pills/badges (`[ 🟠 Shopee ]`, `[ 🟢 Tokopedia ]`, `[ ⚫ TikTok Shop ]`, `[ 🔵 Lazada ]`), never used as page-wide color washes.

#### 3. Typography Architecture (The Font Trio)
- **Display / Headlines:** *Plus Jakarta Sans* or *Geist Sans* (weight 700/800).
- **Body / Interface:** *Plus Jakarta Sans* or *Inter* (weight 400/500/600).
- **Tabular / Currency Figures:** *Geist Mono* or *JetBrains Mono* with CSS `font-variant-numeric: tabular-nums` for rock-solid tabular data alignment.

#### 4. Micro-Interactions & Animation (Framer Motion)
- **Profit Number Springs:** Fluid spring ticker when profit or margin recalculates upon input change.
- **Sliding Tab Pill:** Smooth animated indicator when toggling marketplace tabs.
- **Accordion Motion:** CSS Grid / Framer Motion height transition for fee itemization.
- **CLS Immunity:** Fixed container minimum heights prevent layout jump during recalculation.

---

### 3.5 Advertising Architecture Specifications

#### Ad Placement Slots
Ad positions are encapsulated into a reusable `<AdSlot />` component with zero layout shift (CLS):

| Slot Identifier | Position Description | Desktop Dimensions | Mobile Dimensions | CLS Prevention Technique |
| :--- | :--- | :--- | :--- | :--- |
| `top` | Above main header / below hero | 728x90 or 970x90 | 320x50 or 300x50 | Min-height reserved container |
| `sidebar-left` | Left of main content on wide screens | 160x600 or 300x600 | Hidden | Sticky container with clear margins |
| `sidebar-right` | Right of calculation results on wide screens | 300x250 or 300x600 | Hidden | Self-contained aside element |
| `in-content` | Between calculator and educational text | 728x90 or 336x280 | 300x250 | Pre-allocated responsive box |
| `bottom` | Above footer navigation | 728x90 | 320x50 | Margin-separated bottom section |
| `mobile-anchor` | Fixed bottom anchor on mobile viewports | Hidden | 320x50 | Safe-area padded bottom bar with close toggle |

#### Behavior & Safety Controls
- **Kill-Switch Configuration:** When `NEXT_PUBLIC_ADS_ENABLED=false`, the ad slots render clean null or subtle invisible placeholders with zero visual debris or layout collapse.
- **Safety Zones:** Ad slots must maintain at least 48px padding from all interactive form elements (inputs, select dropdowns, submit buttons) to eliminate accidental clicks.
- **No Fake Networks:** Placeholder displays a clean, elegant developer placeholder badge (`[Ruang Iklan - Placeholder]`) with no external script loads.

---

### 3.6 Affiliate Architecture Specifications

- Standardized `<AffiliateLink />` component accepting:
  - `marketplace`: Enum (`shopee`, `tokopedia`, `tiktok-shop`, `lazada`, or external partners)
  - `targetType`: `seller-registration` \| `official-store` \| `seller-tools` \| `voucher`
  - `className`: Optional Tailwind styling
- Config-driven URL builder: Resolves URLs through `affiliateConfig.ts` with tracking parameters (`utm_source`, `utm_medium`, `aff_id`) pulled from environment variables, preventing hardcoded links.
- Security: Automatically injects `rel="noopener noreferrer nofollow sponsored"` on all outbound links.

---

### 3.7 Analytics Event Taxonomy

The platform features an abstract, pluggable analytics interface (`AnalyticsDispatcher`) triggering these standardized events:

| Event Name | Trigger Moment | Payload Attributes |
| :--- | :--- | :--- |
| `calculator_started` | User focuses on first input field | `{ marketplace, page_url }` |
| `calculation_completed` | User triggers or updates calculation | `{ marketplace, selling_price, net_profit, margin_percent }` |
| `marketplace_selected` | User changes marketplace dropdown | `{ previous_marketplace, new_marketplace }` |
| `comparison_started` | User navigates to comparison tab | `{ source_page }` |
| `comparison_completed` | Comparison calculations rendered | `{ marketplaces_compared: string[], best_margin_marketplace }` |
| `affiliate_clicked` | User clicks an outbound affiliate link | `{ marketplace, target_type, destination_url }` |

---

## 4. Non-Functional Requirements (NFR)

### 4.1 Performance & Client Execution
- **Zero Server Round-trip for Calculations:** The calculation engine runs 100% client-side in sub-5 milliseconds.
- **First Contentful Paint (FCP):** < 1.0s on 4G network.
- **Largest Contentful Paint (LCP):** < 1.8s.
- **Cumulative Layout Shift (CLS):** < 0.02 (strict zero layout shifts on inputs and ad containers).
- **Bundle Size:** Zero heavy UI component libraries; lean native Tailwind CSS.

### 4.2 Accessibility (a11y)
- Target: **WCAG 2.1 Level AA** compliance.
- Every form field has an associated `<label>` with explicit `htmlFor`.
- Keyboard navigation: Full tab sequence across inputs, dropdowns, and buttons.
- Screen reader announcements for calculated results via `aria-live="polite"`.
- Contrast ratio: Minimum 4.5:1 for normal text, 3:1 for large UI components.

### 4.3 SEO Architecture
- Static Site Generation (SSG) / Server-Side Rendering (SSR) for all 13 routes.
- Fully rendered HTML containing all headings, explanatory copy, and example calculation tables even when JavaScript is disabled.
- Automated `sitemap.xml` listing all canonical URLs with `<lastmod>` timestamps.
- Automated `robots.txt` disallowing crawl of internal query params while allowing indexation of static routes.
- Schema.org JSON-LD tags:
  - `WebApplication` / `SoftwareApplication`
  - `FAQPage`
  - `BreadcrumbList`
  - `HowTo` (for calculation steps)

---

## 5. Acceptance Criteria

- [ ] **AC-1:** User can access `/` and navigate to any of the 4 marketplaces or comparison pages in <= 2 clicks.
- [ ] **AC-2:** Entering selling price of Rp100.000, product cost Rp60.000, and standard fees produces the mathematically exact breakdown with integer Rupiah formatting.
- [ ] **AC-3:** Zero floating point formatting glitches (e.g. no `Rp12.300000000000002`).
- [ ] **AC-4:** Cross-comparison page displays side-by-side metrics across Shopee, Tokopedia, TikTok Shop, and Lazada using the same underlying numbers.
- [ ] **AC-5:** All 13 pages pass SSR inspection with complete meta tags, single H1, and pre-rendered explanatory content.
- [ ] **AC-6:** Disabling `ADS_ENABLED` cleans up all ad boxes without layout shifts or broken UI spaces.
- [ ] **AC-7:** Comprehensive unit test suite validates percentage fees, fixed fees, break-even calculation, zero/empty inputs, and comparison logic.
