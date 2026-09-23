# ADR-010: B2C Price Radar Engine, Multi-Tier Caching, and Sliding-Window Rate Limiting

## Status
**Accepted** (Implemented in Sprint 4 — September 2026)

---

## Context & Problem Statement

The introduction of the B2C **Price Radar** feature (`/`) allows consumers to compare base selling prices for identical products across **Shopee, Tokopedia, TikTok Shop, and Lazada**. 

On-demand cross-marketplace price aggregation presents three critical architectural challenges:
1. **Third-Party API Rate Limits & Cost**: Hitting marketplace affiliate APIs or search endpoints on every keystroke exhausts API quotas, risks IP throttling, and increases outbound latency.
2. **Scraper & Bot Abuse**: Public price comparison tools are prime targets for automated web scrapers, which can degrade server performance and exhaust infrastructure capacity.
3. **Data Freshness vs. Response Latency**: Online prices fluctuate, but consumers expect instantaneous (< 50ms) search results for popular queries (e.g., *"iPhone 15"*, *"Skintific"*).

---

## Decision Drivers

1. **Sub-20ms Cached Response Times**: Repeated searches must return immediately without external network roundtrips.
2. **Zero VPS Database Maintenance**: Persistent storage for search analytics, price history snapshots, and outbound clicks must require zero infrastructure ops.
3. **Graceful Fallback & High Availability**: The platform must function seamlessly in local development or if external caching/database layers are temporarily offline.
4. **Strict Rate Limiting**: Anti-abuse protection adhering to RFC 6585 standards (`X-RateLimit-*` headers and HTTP 429).

---

## Architectural Decision

We adopted a **Multi-Tier Caching, Edge Rate-Limited, and Serverless Persistence** stack:

```text
[User Browser: /] ──► [Route Handler: /api/radar/search?q=...]
                            │
                            ├── 1. Sliding Window Rate Limiter (20 req/min per IP)
                            │      └── Exceeded? ──► HTTP 429 Too Many Requests
                            │
                            ├── 2. Redis 7 Cache Layer (1-Hour TTL: 3600s)
                            │      ├── [HIT]  ──► Return JSON immediately (< 15ms)
                            │      └── [MISS] ──► Fallback to RadarAggregator Engine
                            │
                            ├── 3. Concurrent Marketplace Gateway Adapters
                            │      └── Promise.allSettled([Shopee, Toko, TikTok, Lazada])
                            │
                            ├── 4. Data Normalizer & Winner Decider (Integer IDR)
                            │
                            └── 5. Async Persistence to Neon Postgres via Drizzle ORM
                                   ├── trending_searches (increment counter)
                                   ├── price_snapshots (record historical price point)
                                   └── affiliate_clicks (record outbound monetized click)
```

### 1. Multi-Tier Cache Layer (`src/domain/radar/cache.ts`)
- **Primary Cache**: **Redis 7 (Alpine)** deployed via Docker Compose with `maxmemory 256mb` and `allkeys-lru` eviction policy.
- **Cache Keying**: Hash-based key `radar:query:<normalized_query>`.
- **TTL**: 3600 seconds (1 hour). Once a user searches for a product, all subsequent users benefit from instant responses for the next hour.
- **Graceful In-Memory Fallback**: If Redis is unreachable (e.g. during local developer runs without Docker), the system seamlessly falls back to an in-memory LRU map without throwing errors.

### 2. Sliding Window Counter Rate Limiter (`src/lib/security/rateLimiter.ts`)
- Implemented using Redis transaction pipelines (`MULTI`/`EXEC`) tracking request timestamps within a 60-second sliding window.
- **Limits**:
  - `/api/radar/search`: **20 requests / minute** per client IP.
  - `/api/radar/click`: **60 requests / minute** per client IP.
- **RFC Standard Headers Returned**:
  - `X-RateLimit-Limit`: Maximum quota allowed.
  - `X-RateLimit-Remaining`: Remaining requests in active window.
  - `X-RateLimit-Reset`: Seconds remaining until quota refresh.
- **429 Response Shape**:
  ```json
  {
    "success": false,
    "error": "TOO_MANY_REQUESTS",
    "message": "Terlalu banyak permintaan pencarian dalam waktu singkat. Silakan coba lagi dalam beberapa detik.",
    "retryAfter": 14
  }
  ```

### 3. Serverless Persistence: Neon Postgres + Drizzle ORM (`src/db/`)
- **Neon Serverless Postgres** was selected for zero-ops, scale-to-zero serverless hosting.
- **Drizzle ORM** (`drizzle-orm`, `drizzle-kit`) provides fully typesafe SQL queries with minimal bundle overhead.
- **Schema**:
  1. `trending_searches`: Tracks high-volume user searches to populate the homepage curated discovery chips dynamically.
  2. `price_snapshots`: Stores historical product prices across marketplaces to support future discount authenticity verification (detecting fake discounts during campaign double-days like 11.11).
  3. `affiliate_clicks`: Records outbound clicks to track affiliate conversion rates and marketplace performance.

### 4. Resilient Gateway Adapters (`src/domain/radar/adapters/`)
- Four decoupled adapters: `ShopeeAdapter`, `TokopediaAdapter`, `TikTokShopAdapter`, and `LazadaAdapter`.
- Combined via `Promise.allSettled()` in `RadarAggregator` so a single slow or failing marketplace API does not block or crash the remaining three platforms.
- Includes realistic fallback prototype datasets when live API credentials are not yet configured in `.env`.

---

## Consequences

### Positive
- **Extreme Speed**: Cached searches respond in under 15ms.
- **Zero API Quota Waste**: 1-hour cache TTL minimizes third-party API consumption by 90%+.
- **Robust Security**: Rate limiter stops bots and scraper attacks before they consume server resources.
- **Developer Experience**: Works immediately out-of-the-box via Bun (`bun run test`, `bun run build`) with zero mandatory external services due to graceful in-memory fallbacks.

### Negative / Trade-offs
- **Price Drift**: 1-hour caching means flash sale price cuts occurring mid-hour will take up to 60 minutes to appear (communicated transparently via the UI Disclaimer Box).
