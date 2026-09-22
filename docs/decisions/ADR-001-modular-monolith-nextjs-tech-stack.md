# ADR-001: Modular Monolith Architecture using Next.js, TypeScript, and Tailwind CSS

## Status
Accepted

## Date
2026-09-22

## Context
We are designing the architecture for an Indonesian marketplace calculator and intelligence platform (covering Shopee, Tokopedia, TikTok Shop, and Lazada). Key architectural requirements:
- SEO is critical: Search crawlers (Googlebot) must receive complete, semantic HTML containing introductory content, explanation of calculations, and example tables without requiring client-side JavaScript execution.
- Instant user experience: Once the web application loads, the calculator and comparison tools must respond in sub-5ms with zero network latency.
- Lean operational footprint: As a free utility platform, operational overhead, server costs, and deployment complexity must be minimized.
- Extensibility: Must support future monetization (display ads, affiliate links), a marketplace fee database, and additional e-commerce calculators without structural rewrites.

## Decision
We will build the application as a **Modular Monolith** using **Next.js 14+ (App Router)** with **TypeScript** and **Tailwind CSS**.
- The frontend and server-rendered SEO layers live in Next.js App Router (`src/app`).
- The domain calculation logic is cleanly isolated in `src/domain/` with zero dependencies on React or Next.js.
- Fee configurations are declarative typed modules in `src/data/marketplaces/`.
- No separate backend API or microservices will be introduced.

## Alternatives Considered

### 1. Microservices Architecture (Separate Calculator Service + Content API + Next.js Frontend)
- *Pros:* Independent scaling of calculation microservice; decoupled deployment pipelines.
- *Cons:* Severe overengineering. Introduces distributed network latency (100–300ms roundtrip per calculation), serialization overhead, multi-service deployment maintenance, Docker orchestration, and increased operational costs.
- *Rejected:* Financial calculations are simple mathematical formulas that run in < 1ms on the client browser. Distributing calculation logic across microservices would harm user experience and introduce unnecessary failure points.

### 2. Single Page Application (Vite + React SPA) with Cloudflare Workers API
- *Pros:* Extremely lightweight build; client-only static hosting on S3/Cloudflare Pages.
- *Cons:* Poor for SEO. Search engines must execute JavaScript to render content and schema markup. Pre-rendering or hydration setups with external headless CMS add brittle build-time orchestration.
- *Rejected:* SEO is a primary business pillar; Next.js provides hybrid SSG/SSR natively out of the box.

### 3. Traditional Multi-Page Application (Go / Python Django / Laravel) with HTMX / Alpine
- *Pros:* Server-side rendering by default; simple monolithic operational model.
- *Cons:* Higher server CPU load per calculation request; interactive cross-marketplace comparison matrix with real-time sliders and instant tab updates feels sluggish when round-tripping to the server.
- *Rejected:* Next.js gives the best of both worlds: pre-rendered server HTML for crawlers and immediate client-side reactive interactivity without server hits.

## Consequences
- **Positive:**
  - Fast page loads with pre-rendered SEO content.
  - Zero server cost per calculation (calculations execute on the user's device).
  - Clean separation allows easy extraction of the domain engine into an npm package or standalone REST API if required in Phase 3.
  - Single repository and deployment pipeline (Vercel, Netlify, or Docker container).
- **Negative / Trade-offs:**
  - Developers must maintain awareness of the server vs. client boundary in Next.js (`"use client"` directives for interactive forms).
