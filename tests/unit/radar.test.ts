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
      expect(result.savingsPercentage).toBe(7); // round(7000 / 95000 * 100) = 7%
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
      expect(result.savingsPercentage).toBe(0);
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

    it('normalizes floating point ratings to 1 decimal place', () => {
      const mockOffers: MarketplaceProductOffer[] = [
        {
          marketplaceId: 'shopee',
          marketplaceName: 'Shopee',
          productId: 's1',
          title: 'Handgrip Racing',
          originalPrice: 114600,
          currentPrice: 110500,
          rating: 4.8999999999999995,
          totalSold: 4000,
          shopName: 'Spin Racing',
          shopCity: 'Jakarta',
          isOfficialStore: false,
          imageUrl: '',
          affiliateUrl: '',
          isLowestPrice: false,
        },
      ];

      const result = normalizeRadarOffers('Handgrip Racing', mockOffers);
      expect(result.offers[0].rating).toBe(4.9);
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

  describe('generateMarketplaceMockCatalog', () => {
    it('generates 6 realistic offers per marketplace with proper attributes', async () => {
      const { generateMarketplaceMockCatalog } = await import('@/domain/radar/mockCatalog');
      const shopeeOffers = generateMarketplaceMockCatalog('shopee', 'baju');
      expect(shopeeOffers).toHaveLength(6);
      expect(shopeeOffers[0].marketplaceId).toBe('shopee');
      expect(shopeeOffers[0].currentPrice).toBeGreaterThan(0);
      expect(shopeeOffers[0].shopCity).toBeDefined();
      expect(shopeeOffers[0].rating).toBeGreaterThanOrEqual(4.0);
    });

    it('prioritizes real Shopee affiliate links for matching keywords from catalog', async () => {
      const { generateMarketplaceMockCatalog } = await import('@/domain/radar/mockCatalog');
      const shopeeOffers = generateMarketplaceMockCatalog('shopee', 'sandal');
      expect(shopeeOffers).toHaveLength(6);
      expect(shopeeOffers[0].affiliateUrl).toMatch(/^https:\/\/s\.shopee\.co\.id\//);
      expect(shopeeOffers[0].productId).toMatch(/^shopee-aff-/);
    });
  });
});
