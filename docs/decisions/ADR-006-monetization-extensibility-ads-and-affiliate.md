# ADR-006: Monetization Extensibility (AdSlot and Affiliate Abstractions)

## Status
Accepted

## Date
2026-09-22

## Context
Marketplace Intelligence Indonesia is free for all users. The long-term monetization roadmap includes:
1. Programmatic display advertising (Google AdSense, Prebid / Header Bidding).
2. Affiliate marketing (outbound recommendations for seller ERPs, shipping aggregators, packing suppliers, and official seller registration links).

Key constraints:
- **No Production Scripts or Fake Revenue Logic:** The prototype must NOT connect to live ad networks or simulate fake ad impressions/revenue counters.
- **Zero Layout Shift (CLS):** Dynamic ad loading is the #1 cause of Cumulative Layout Shift (CLS) penalties in Core Web Vitals. The layout must pre-allocate dimensions for ad units.
- **Accidental Click Prevention:** Ad units must not be positioned adjacent to interactive form elements (e.g. right next to the "Calculate" button).
- **Instant Kill-Switch:** When ads are disabled (`ADS_ENABLED=false`), the UI must render cleanly without broken gaps, borders, or dead whitespace.

## Decision
We implement decoupled, configuration-driven abstractions for both advertising and affiliate links:

### 1. AdSlot Architecture (`src/components/ads/AdSlot.tsx`)
- Standard positions defined: `top`, `sidebar-left`, `sidebar-right`, `in-content`, `bottom`, `mobile-anchor`.
- Controlled via `src/config/ads.ts` and environment variable `NEXT_PUBLIC_ADS_ENABLED`.
- In prototype mode with ads enabled, it renders a clean, subtle placeholder box with exact CSS height/width constraints preventing layout shift.
- In production, swapping the placeholder for Google AdSense or Prebid requires editing only the `<AdSlot />` component implementation without touching page layouts.
- With ads disabled, `<AdSlot />` returns `null` and container margins collapse gracefully.

### 2. Affiliate Redirection Abstraction (`src/components/affiliate/AffiliateLink.tsx`)
- Component API: `<AffiliateLink marketplace="shopee" targetType="seller-registration">...</AffiliateLink>`.
- Destination URLs and tracking parameters are resolved via `src/config/affiliate.ts`.
- Affiliate tracking codes (`aff_id`, `sub_id`) are ingested via environment variables (`NEXT_PUBLIC_AFFILIATE_ID`), ensuring no affiliate keys are hardcoded in source code.
- Outbound links automatically receive `rel="noopener noreferrer nofollow sponsored"` to comply with Google search webmaster guidelines.

## Alternatives Considered

### 1. Hardcoding AdSense Scripts and Affiliate URLs Directly in Page JSX
- *Pros:* Fast for an initial afternoon test.
- *Cons:* Extremely brittle. Disabling ads or updating affiliate publisher IDs would require modifying dozens of page templates. Risk of layout shift and Google policy violations.
- *Rejected:* Poor software engineering practice.

### 2. Simulating Fake Ad Networks with Animated Mock Banners & Impression Trackers
- *Pros:* Visually resembles an active ad-supported site.
- *Cons:* Wasteful engineering effort; adds junk code that must be deleted later. Explicitly prohibited by product requirements ("Do not use fake ad networks or fake revenue logic").
- *Rejected:* Placeholders must remain clean and structural.

## Consequences
- **Positive:**
  - Zero third-party ad script overhead during development and testing.
  - Rock-solid layout stability (CLS = 0.00).
  - Effortless rollout when ad network accounts are approved: simply insert the ad tag inside the `<AdSlot />` component.
- **Negative / Trade-offs:**
  - Layouts must be tested in both `ADS_ENABLED=true` and `ADS_ENABLED=false` modes to ensure aesthetic balance.
