# ADR-005: SEO-First Content and Rendering Architecture

## Status
Accepted

## Date
2026-09-22

## Context
Organic search is the primary acquisition channel for Marketplace Intelligence Indonesia. Indonesian sellers search for specific transactional and informational queries:
- Tool-seeking intent: *"kalkulator shopee star seller"*, *"hitung potongan lazada"*, *"kalkulator margin tiktok shop"*.
- Fee-seeking intent: *"biaya admin shopee 2025"*, *"berapa persen potongan tokopedia power merchant pro"*.
- Comparison-seeking intent: *"shopee vs tokopedia lebih murah mana biaya admin"*, *"perbandingan komisi tiktok shop vs shopee"*.

Search engine crawlers (Googlebot) must receive complete, indexable HTML on the initial HTTP GET request without waiting for client-side JavaScript execution. Concurrently, we must avoid Google spam penalties by strictly preventing thin doorway pages or keyword cannibalization.

## Decision
We adopt an **SEO-First Static & Server Rendering Architecture** using Next.js App Router:
1. **One URL per Primary Search Intent:**
   - Define exactly 13 primary canonical URLs covering the 4 marketplaces, fee schedules, and head-to-head comparisons.
   - Reject duplicate pseudo-synonym URLs (e.g. no `/kalkulator-shopee` vs `/shopee-profit-calculator`).
2. **Hybrid SSR/SSG Content Delivery:**
   - Every page pre-renders complete semantic HTML containing:
     - Single `<h1>` matched to search intent.
     - 2–3 paragraphs of authoritative introductory guidance.
     - A pre-rendered calculation example table with realistic numbers (e.g. Rp100.000 selling price).
     - Step-by-step mathematical explanation of the deductions.
     - Interactive `<Calculator />` component hydrated client-side.
     - FAQ section with JSON-LD schema markup.
     - Hierarchical breadcrumb navigation trail.
3. **Automated Metadata & Discoverability Infrastructure:**
   - Dynamic `sitemap.ts` generating `/sitemap.xml` with last-modified timestamps.
   - Dynamic `robots.ts` generating `/robots.txt`.
   - Reusable metadata utility `constructMetadata()` enforcing canonical URLs, Open Graph images, Twitter cards, and title templates.

## Alternatives Considered

### 1. Single Universal URL with Query Parameters (`/?marketplace=shopee`)
- *Pros:* Easiest to maintain with single page code.
- *Cons:* Terrible for SEO. Google struggles to rank parameterized URLs for distinct long-tail keywords. Misses dedicated search intent targeting.
- *Rejected:* Destroys organic discoverability.

### 2. Programmatic Doorway Page Generation (500+ auto-generated pages)
- *Example:* `/kalkulator-shopee-surabaya`, `/kalkulator-shopee-baju`, etc.
- *Pros:* Captures long-tail permutations temporarily.
- *Cons:* Direct violation of Google's Helpful Content System and Spam Policies. Causes index bloat, search penalties, and high maintenance overhead.
- *Rejected:* Product requirements strictly mandate genuine utility pages with unique value.

### 3. Client-Side SPA with Headless Pre-rendering Proxy (e.g. Prerender.io)
- *Pros:* Allows building on standard Vite/CRA.
- *Cons:* Adds third-party proxy latency, billing subscription costs, caching staleness issues, and debugging headaches.
- *Rejected:* Next.js App Router performs SSG natively with zero external proxy dependencies.

## Consequences
- **Positive:**
  - Fast Time-to-First-Byte (TTFB) and perfect Core Web Vitals.
  - Full indexability even if search bots restrict JavaScript execution.
  - Zero risk of doorway penalties due to human-grade, authoritative page copy.
- **Negative / Trade-offs:**
  - Requires maintaining dedicated route files for each marketplace and comparison pair.
