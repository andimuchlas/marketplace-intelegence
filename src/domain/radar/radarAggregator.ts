import { PriceRadarResult, MarketplaceProductOffer } from './types';
import { shopeeAdapter } from './adapters/shopeeAdapter';
import { tiktokShopAdapter } from './adapters/tiktokShopAdapter';
import { tokopediaAdapter } from './adapters/tokopediaAdapter';
import { lazadaAdapter } from './adapters/lazadaAdapter';
import { normalizeRadarOffers } from './normalizer';
import { radarCache } from './cache';

export class RadarAggregator {
  private adapters = [shopeeAdapter, tiktokShopAdapter, tokopediaAdapter, lazadaAdapter];

  async search(query: string, skipCache = false): Promise<PriceRadarResult> {
    const cleanQuery = query.trim();
    if (!cleanQuery) {
      return normalizeRadarOffers('', []);
    }

    const cacheKey = `radar:query:${cleanQuery.toLowerCase()}`;

    // 1. Check Redis Cache
    if (!skipCache) {
      const cached = await radarCache.get<PriceRadarResult>(cacheKey);
      if (cached) {
        return {
          ...cached,
          cached: true,
        };
      }
    }

    // 2. Fetch concurrently from all marketplace adapters with fault tolerance
    const settled = await Promise.allSettled(this.adapters.map((adapter) => adapter.search(cleanQuery)));

    const collectedOffers: MarketplaceProductOffer[] = [];

    settled.forEach((result, idx) => {
      if (result.status === 'fulfilled') {
        collectedOffers.push(...result.value);
      } else {
        console.warn(`[RadarAggregator] Adapter ${this.adapters[idx].marketplaceName} failed:`, result.reason);
      }
    });

    // 3. Normalize, find winner & calculate delta
    const normalizedResult = normalizeRadarOffers(cleanQuery, collectedOffers, false);

    // 4. Store in Cache (1 hour TTL)
    if (normalizedResult.offers.length > 0) {
      await radarCache.set(cacheKey, normalizedResult, 3600);
    }

    return normalizedResult;
  }
}

export const radarAggregator = new RadarAggregator();
