import { describe, it, expect, beforeEach } from 'vitest';
import { normalizeRadarOffers } from '@/domain/radar/normalizer';
import { radarAggregator } from '@/domain/radar/radarAggregator';
import { radarCache } from '@/domain/radar/cache';
import { MarketplaceProductOffer } from '@/domain/radar/types';

describe('Radar Domain & Aggregator', () => {
  beforeEach(() => {
    radarCache.clearMemory();
  });

  describe('normalizeRadarOffers', () => {
    it('correctly sorts offers ascending, flags the lowest price winner, and calculates delta', () => {
      const mockOffers: MarketplaceProductOffer[] = [
        {
          marketplaceId: 'shopee',
          marketplaceName: 'Shopee',
          productId: 's1',
          title: 'Produk A',
          originalPrice: 100000,
          currentPrice: 95000,
          rating: 4.8,
          totalSold: 100,
          shopName: 'Shopee Shop',
          isOfficialStore: true,
          imageUrl: 'https://example.com/1.jpg',
          affiliateUrl: 'https://shopee.co.id/item',
          isLowestPrice: false,
        },
        {
          marketplaceId: 'tokopedia',
          marketplaceName: 'Tokopedia',
          productId: 't1',
          title: 'Produk A',
          originalPrice: 100000,
          currentPrice: 88000, // Cheapest
          rating: 4.9,
          totalSold: 200,
          shopName: 'Tokped Shop',
          isOfficialStore: true,
          imageUrl: 'https://example.com/2.jpg',
          affiliateUrl: 'https://tokopedia.com/item',
          isLowestPrice: false,
        },
        {
          marketplaceId: 'tiktok-shop',
          marketplaceName: 'TikTok Shop',
          productId: 'tt1',
          title: 'Produk A',
          originalPrice: 100000,
          currentPrice: 92000,
          rating: 4.7,
          totalSold: 300,
          shopName: 'TikTok Shop',
          isOfficialStore: true,
          imageUrl: 'https://example.com/3.jpg',
          affiliateUrl: 'https://tiktok.com/item',
          isLowestPrice: false,
        },
      ];

      const result = normalizeRadarOffers('Produk A', mockOffers);

      expect(result.lowestPrice).toBe(88000);
      expect(result.highestPrice).toBe(95000);
      expect(result.priceDelta).toBe(7000); // 95.000 - 88.000
      expect(result.winningMarketplaceId).toBe('tokopedia');
      expect(result.winningMarketplaceName).toBe('Tokopedia');

      // The first item must be the cheapest and have isLowestPrice = true
      expect(result.offers[0].marketplaceId).toBe('tokopedia');
      expect(result.offers[0].isLowestPrice).toBe(true);

      // Remaining items must have isLowestPrice = false
      expect(result.offers[1].isLowestPrice).toBe(false);
      expect(result.offers[2].isLowestPrice).toBe(false);
    });

    it('handles empty offers list safely without throwing errors', () => {
      const result = normalizeRadarOffers('Empty Query', []);
      expect(result.offers).toHaveLength(0);
      expect(result.lowestPrice).toBe(0);
      expect(result.highestPrice).toBe(0);
      expect(result.priceDelta).toBe(0);
    });

    it('enforces whole Rupiah integer rounding on prices', () => {
      const mockOffers: MarketplaceProductOffer[] = [
        {
          marketplaceId: 'shopee',
          marketplaceName: 'Shopee',
          productId: 's1',
          title: 'Item Decimal',
          originalPrice: 100000.45,
          currentPrice: 85500.8,
          rating: 5.0,
          totalSold: 50,
          shopName: 'Shop',
          isOfficialStore: false,
          imageUrl: '',
          affiliateUrl: '',
          isLowestPrice: false,
        },
      ];

      const result = normalizeRadarOffers('Item Decimal', mockOffers);
      expect(result.offers[0].currentPrice).toBe(85501);
      expect(result.offers[0].originalPrice).toBe(100000);
    });
  });

  describe('radarAggregator', () => {
    it('aggregates live search across 4 marketplaces and caches the result', async () => {
      const query = 'iPhone 15';

      // First call (cache miss)
      const res1 = await radarAggregator.search(query);
      expect(res1.query).toBe(query);
      expect(res1.offers.length).toBeGreaterThanOrEqual(4);
      expect(res1.cached).toBe(false);

      // Second call (cache hit)
      const res2 = await radarAggregator.search(query);
      expect(res2.cached).toBe(true);
      expect(res2.lowestPrice).toBe(res1.lowestPrice);
    });
  });
});
