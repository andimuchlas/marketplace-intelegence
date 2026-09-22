# ADR-002: Decoupled Domain-Driven Calculation Engine

## Status
Accepted

## Date
2026-09-22

## Context
Marketplace profit calculation involves multiple interdependent variables: product cost (HPP), selling price, marketplace base admin fees, category commission adjustments, seller tier multipliers, optional programs (Gratis Ongkir Xtra, Cashback Xtra), payment transaction fees, affiliate percentages, advertising spend, voucher subsidies, and break-even solving.

In naive web implementations, these formulas are often embedded directly within React component handlers or custom hooks (`useState`, `useEffect`). This causes several critical problems:
1. **Un-testability:** Testing the business logic requires mounting React components or DOM simulators.
2. **Logic Duplication:** The comparison page, the standalone Shopee page, and the static SSR example calculation cards each risk re-implementing slightly diverging formulas.
3. **Fragility:** Any change to a fee rule or formula creates regression risks across multiple UI files.

## Decision
We will isolate all business calculations into a pure, framework-agnostic **Domain Calculation Engine** located at `src/domain/calculator/`.
- The engine consists of pure functions with zero side effects:
  - `calculateProfit(input: CalculatorInput, config: MarketplaceConfig): CalculationResult`
  - `calculateBreakEven(input: CalculatorInput, config: MarketplaceConfig): number`
  - `compareMarketplaces(input: CalculatorInput, configs: MarketplaceConfig[]): ComparisonResult`
- The engine does not import React, Next.js, or DOM APIs.
- React components only manage user input state and pass data into the engine, receiving an immutable result object.

## Alternatives Considered

### 1. Inline State Calculations in React Components
- *Pros:* Fast to assemble for simple prototypes.
- *Cons:* Directly violates the Single Responsibility Principle. Impossible to unit test with simple test runners. Comparison page would require duplicating or tightly coupling to single calculator component state.
- *Rejected:* Explicitly prohibited by product requirements.

### 2. Global State Store with Middleware (Redux Toolkit / Zustand)
- *Pros:* Centralized state container.
- *Cons:* Adds unnecessary abstraction and boilerplate for what is fundamentally a set of pure mathematical functions. Increases client bundle weight.
- *Rejected:* Pure functions require no external state store; React local state combined with pure domain functions provides cleaner ergonomics.

### 3. Server-Side Calculation Endpoint (`POST /api/v1/calculate`)
- *Pros:* Keeps calculation logic hidden on the server.
- *Cons:* Every keystroke or slider adjustment causes network latency and server load. Fails offline or on intermittent mobile connections.
- *Rejected:* Calculation rules are public knowledge (marketplace fee schedules are published publicly); keeping them on the server offers zero security benefit while penalizing UX speed.

## Consequences
- **Positive:**
  - 100% unit test coverage using standard test runners (Vitest/Jest) in sub-millisecond execution.
  - Complete code reuse between single marketplace calculator pages, the cross-marketplace comparison tool, and server-rendered SEO example calculation blocks.
  - Zero framework lock-in: the engine can be exported as an npm package or integrated into a CLI or mobile app.
- **Negative / Trade-offs:**
  - Developers must maintain typed contracts between UI input objects and domain input interfaces.
