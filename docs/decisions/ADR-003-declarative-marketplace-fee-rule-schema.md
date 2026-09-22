# ADR-003: Declarative Marketplace Fee Rule Configuration Schema

## Status
Accepted

## Date
2026-09-22

## Context
Each Indonesian marketplace implements different fee conventions:
- **Shopee:** Categorizes sellers into Non-Star, Star, Star+, and Mall; fees vary across 5 category clusters (A, B, C, D, E) and optional service programs (Gratis Ongkir Xtra, Cashback Xtra) with maximum fee caps.
- **Tokopedia:** Classifies sellers into Regular Merchant, Power Merchant, Power Merchant Pro, and Official Store across Category Groups 1 through 5, plus Bebas Ongkir service fees with ceiling amounts.
- **TikTok Shop:** Commission rates per product category, affiliate commissions, and live shopping voucher fees.
- **Lazada:** LazMall vs Marketplace commission rates, payment transaction fees, and Free Shipping Max fees.

These rules change every 6 to 12 months. We need a fee representation that is:
1. Highly maintainable without editing the calculation engine code.
2. Strongly typed to prevent syntax or structural errors.
3. Transparent, including versioning, verification dates, and source URLs.
4. Extensible to a relational database in the future when a dedicated admin UI or community fee-tracking database is built.

## Decision
We will represent marketplace fee rules as **Declarative TypeScript Configuration Modules** adhering to a strict `MarketplaceConfig` interface, managed under `src/data/marketplaces/`.
- Each marketplace has a dedicated configuration file:
  - `src/data/marketplaces/shopee.ts`
  - `src/data/marketplaces/tokopedia.ts`
  - `src/data/marketplaces/tiktok-shop.ts`
  - `src/data/marketplaces/lazada.ts`
- A centralized `MarketplaceRegistry` (`src/data/marketplaces/registry.ts`) exposes accessor functions (`getMarketplaceConfig(id)`, `getAllMarketplaceConfigs()`).
- All configurations feature an explicit `disclaimer` and `isPrototypeData: true` flag to ensure prototype data is never misrepresented as official policy.

## Alternatives Considered

### 1. Hardcoded Conditional Logic Inside Calculation Functions
- *Example:* `if (marketplace === 'shopee' && tier === 'star') fee = price * 0.0425;`
- *Pros:* Quickest to code for a single day.
- *Cons:* Horrible maintainability. As tiers and categories grow, the calculation engine becomes an unreadable nest of 500-line if-else blocks. Adding a new marketplace requires modifying the core engine algorithm.
- *Rejected:* Violates Open/Closed Principle.

### 2. External Relational Database (PostgreSQL / Supabase / SQLite) for Prototype
- *Pros:* Allows non-developers to edit fee rates via a database table or GUI.
- *Cons:* Adds database connection overhead, ORM dependencies (Prisma/Drizzle), migrations, connection pooling, and latency. For a read-heavy public calculator with only 4 marketplaces, a database introduces operational points of failure without adding value during the prototype stage.
- *Rejected:* Violates the "Do not introduce a database merely because production systems need databases" requirement.

### 3. Dynamic Rule Engine DSL (e.g. JSON-Rules-Engine / AST Interpreter)
- *Pros:* Arbitrary business rules expressed in JSON AST.
- *Cons:* Massive overengineering. Introduces debugging opacity, untyped runtime failures, performance overhead, and maintenance complexity.
- *Rejected:* A simple typed schema supporting percentage, fixed, min, max, tier, and category overrides covers 100% of marketplace fee requirements cleanly.

## Consequences
- **Positive:**
  - Fee updates take less than 2 minutes: edit a number in `shopee.ts`, commit, and deploy.
  - Full TypeScript compile-time checking ensures no invalid tiers or missing categories exist.
  - Zero database maintenance or runtime latency.
  - When Phase 3 introduces a dynamic fee database, the relational schema can mirror the TypeScript interface 1:1.
- **Negative / Trade-offs:**
  - Fee updates require a Git commit and site deployment rather than a database row update.
