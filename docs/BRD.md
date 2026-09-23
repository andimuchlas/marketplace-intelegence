# Business Requirements Document (BRD)
## Project: Indonesian Marketplace Intelligence & Profit Calculator Platform

- **Project Name:** Marketplace Intelligence Indonesia (Kalkulator Margin & Biaya Marketplace)
- **Document Version:** 1.0.0
- **Status:** Approved for Architecture & Implementation
- **Target Market:** Indonesian E-commerce Sellers (Shopee, Tokopedia, TikTok Shop, Lazada)
- **Author:** Lead Software Architect & Senior Full-Stack Engineer

---

## 1. Executive Summary

Indonesian e-commerce has evolved into a complex multi-platform ecosystem dominated by Shopee, Tokopedia (GoTo / Shop | Tokopedia), TikTok Shop, and Lazada. As competition intensifies, platforms frequently adjust fee structures—introducing variable commission rates per product category, seller tiers (Regular Seller, Star Seller, Star+, Mall / Official Store), free-shipping program subsidies (Gratis Ongkir Xtra), flash-sale participation fees, payment processing surcharges, and affiliate commissions.

Small and medium-sized sellers (UMKM) and brand aggregators struggle to calculate accurate unit economics. Most sellers rely on fragmented Excel spreadsheets or mental math, frequently miscalculating their break-even price and net profit margin.

**Marketplace Intelligence Indonesia** is a fast, free, web-based utility platform designed to solve this problem. It provides deterministic profit calculation, marketplace fee breakdowns, cross-marketplace cost comparisons, and authoritative fee educational content.

---

## 2. Business Objectives & Success Criteria

### 2.1 Primary Business Objectives
1. **Utility-First Value Creation:** Provide the most transparent, deterministic, and frictionless seller calculator in Indonesia, accessible without registration or paywalls.
2. **Organic SEO Flywheel:** Rank for high-intent e-commerce financial queries (e.g., *"biaya admin shopee star seller"*, *"kalkulator profit tokopedia"*, *"perbandingan potongan tiktok shop vs shopee"*).
3. **Monetization Foundation:** Establish clean, non-intrusive placeholders for programmatic display advertising, affiliate partnerships, and future SaaS/data expansion.
4. **Data Neutrality & Trust:** Deliver unambiguous, transparent calculations clearly distinguishing verified baseline algorithms from platform-specific estimates, building user trust.

### 2.2 Key Performance Indicators (KPIs)
- **Organic Search Visibility:** Page 1 Google Indonesia ranking for top 20 marketplace fee/profit search keywords within 6 months of launch.
- **Engagement Depth:** Average session duration > 90 seconds and > 1.8 calculations/comparisons per session.
- **Organic Retention:** 20%+ return visitor rate within 30 days via bookmarking or direct return visits.
- **SEO Accessibility:** 100% crawlability, valid structured data (JSON-LD), and Core Web Vitals (LCP < 1.8s, CLS < 0.05, INP < 150ms).

---

## 3. Stakeholder & Target Audience Analysis

| Persona | Description | Core Pain Point | Primary Value Proposition |
| :--- | :--- | :--- | :--- |
| **UMKM / Solo Seller** | Individual or home-based merchant selling fashion, FMCG, or accessories on Shopee & TikTok Shop. | Surprise deductions at month-end; does not know exact fee percentages (e.g. Gratis Ongkir Xtra + Admin). | Instant break-even calculator that tells them exact minimum selling price before running promotions. |
| **Power Merchant / Star Seller** | Scaling business selling 500+ orders/month across multiple channels (Tokopedia PM Pro, Shopee Star+). | Difficult to decide which platform yields the best net margin for an identical product. | Side-by-side comparison matrix showing total deduction delta across Shopee, Tokopedia, TikTok Shop, and Lazada. |
| **Brand Manager / Agency Media Buyer** | Operates paid campaigns (Shopee Ads, TikTok GMV Max, CPAS) and affiliate programs. | Ads and affiliate costs swallow the gross profit if not factored into base pricing. | Comprehensive input fields for ROAS/Ad budget per unit, affiliate commissions, and voucher costs. |
| **Smart Online Shopper (B2C Consumer)** | Active digital consumer looking to purchase gadgets, cosmetics, fashion, or electronics at the best price. | Inconvenience of opening 4 apps simultaneously; uncertainty if campaign discounts (11.11, Payday) are authentic. | Real-time Price Radar comparing all 4 platforms instantly with direct outbound links to the cheapest merchant. |

---

## 4. Market Context: Indonesian E-commerce Landscape

The platform initially models four major Indonesian marketplaces:

1. **Shopee Indonesia:**
   - Dominant player in fashion, beauty, and daily consumables.
   - Fee dimensions: Seller Level (Non-Star, Star, Star+, Shopee Mall), Category Groups (A, B, C, D, E), Gratis Ongkir Xtra fee, Cashback Xtra fee, Payment/Handling fee.
2. **Tokopedia (Shop | Tokopedia):**
   - High market share in electronics, home & living, and gadget accessories.
   - Fee dimensions: Seller Tier (Regular Merchant, Power Merchant, Power Merchant Pro, Official Store), Category Groups (Grup 1-5), Bebas Ongkir fee, Payment transaction fee.
3. **TikTok Shop (Integrated via Shop | Tokopedia):**
   - Live commerce and video shopping leader; heavy emphasis on affiliate sales.
   - Fee dimensions: Base commission fee per category, Mall fee, creator affiliate commission, Live shopping voucher deductions.
4. **Lazada Indonesia:**
   - Established presence in electronics, FMCG, and LazMall brands.
   - Fee dimensions: Marketplace commission, Payment fee, LazMall fee, Free Shipping Max fee.

> **Regulatory / Prototype Compliance Notice:** The platform explicitly flags all prototype fee configurations as simulated/model data. Official fees change frequently per platform policy; calculations provide educational estimates with verified calculation dates.

---

## 5. Monetization Strategy & Evolution Roadmap

The business model adheres to an open-access utility model with non-intrusive future monetization vectors:

```
Phase 1: Free Utility (Current Prototype)
├── Zero user friction (no login/paywall)
├── Clean ad placeholder zones (AdSlot top, sidebars, in-content)
└── Affiliate links placeholder abstraction

Phase 2: Programmatic Ads & Affiliate Monetization
├── Programmatic Display (Google AdSense, Prebid / Header Bidding)
├── Affiliate Links (Seller tools, ERPs, packaging materials, shipping aggregators)
└── Sponsored tooltips/callouts (e.g., third-party shipping discounts)

Phase 3: Premium Marketplace Intelligence (Future)
├── Historical fee tracking & change alerts
├── Bulk SKU pricing spreadsheet upload & export
└── Fee Database API for ERP integrations
```

### 5.1 Advertising Principles
- **Zero Disruptive Ads:** No interstitial popups, auto-playing video, or content shift (CLS-inducing) ad tags.
- **Safe Proximity:** Ad slots are strictly separated from primary input fields and calculate buttons to avoid accidental clicks (invalid traffic).
- **Kill-Switch Control:** Configurable via global environment flag (`NEXT_PUBLIC_ADS_ENABLED=false`).

### 5.2 Affiliate Integration Strategy
- **B2B Merchant Affiliates:** Neutral outbound links to seller services (e.g., shipping aggregator platforms, accounting software, seller university courses).
- **B2C Consumer Product Affiliates:** Outbound tracking endpoint (`/api/radar/click`) routing shoppers to official product listings on Shopee Affiliate, TikTok Shop Creator Affiliate, Involve Asia (Lazada), and Tokopedia with standard `sponsored` tracking tags.

---

## 6. Business Risks & Mitigation

| Risk | Impact | Mitigation Strategy |
| :--- | :--- | :--- |
| **Marketplace Fee Rule Changes** | Inaccurate calculations erode seller trust. | Decouple fee rules into declarative data files; display "Last Verified Date", "Version", and official policy documentation source links on every fee page. |
| **Legal/Brand Misinterpretation** | Marketplaces claiming unauthorized representation. | Clear disclaimers: *"Situs ini bukan bagian resmi dari Shopee, Tokopedia, TikTok, atau Lazada. Seluruh merek dagang adalah hak milik masing-masing perusahaan."* |
| **SEO Volatility / Google Core Updates** | Loss of organic traffic to content farms. | Build high-utility interactive tools that beat static content farms on engagement metrics; avoid thin automated doorway pages. |
| **Ad Blocker Impact** | Reduced monetization yield. | Diversify beyond display ads into direct B2B directory placements, e-commerce outbound affiliate commissions, and premium offline tools. |

---

## 7. Scope Boundaries

### In Scope
- **Dual-Portal System:** Dedicated Consumer Portal at `/` (Price Radar) and Merchant Portal at `/seller/*` (Calculators & Fee Guides).
- Deterministic calculation engine for single marketplace profit, margin, and break-even.
- 4-way cross-marketplace side-by-side comparison engine.
- B2C Price Radar on-demand search engine with Redis 7 caching, sliding-window rate limiting (20 req/min), and Neon Postgres analytics.
- Outbound monetized affiliate click router (`/api/radar/click`).
- 36 SEO-optimized static/SSR landing pages with 301 backward-compatible redirects.
- Full Indonesian Rupiah (IDR) currency formatting with non-floating point rounding precision.
- Accessibility standards (WCAG AA keyboard navigation, contrast, screen reader labels).
- AdSlot architecture with position configuration and global feature switch.
- XML Sitemap, `robots.txt`, Open Graph, and JSON-LD structured data.

### Out of Scope (Deferred to Future Phases)
- User accounts, authentication, and cloud save.
- Payment gateway integration or subscription billing.
- Automated web scrapers or live marketplace API sync (unstable and violation of marketplace TOS).
- Direct inventory/order management synchronization.
- Complex ERP multi-currency accounting.
