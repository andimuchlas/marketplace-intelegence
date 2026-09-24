import { MarketplaceProductOffer, PriceRadarResult } from './types';

export const RADAR_PRICE_DISCLAIMER =
  'Harga tercantum merupakan estimasi harga katalog dasar aktif sebelum voucher diskon toko, flash sale streaming live, dan subsidi gratis ongkir. Harga dapat berubah sewaktu-waktu di masing-masing aplikasi marketplace.';

/**
 * Normalizes multi-platform marketplace offers into a sorted, verified comparative result.
 */
export function normalizeRadarOffers(
  query: string,
  rawOffers: MarketplaceProductOffer[],
  isCached = false
): PriceRadarResult {
  // 1. Sanitize & enforce integer IDR
  const validOffers = rawOffers
    .filter((o) => o && o.currentPrice > 0)
    .map((o) => ({
      ...o,
      originalPrice: Math.round(o.originalPrice || o.currentPrice),
      currentPrice: Math.round(o.currentPrice),
      isLowestPrice: false,
    }));

  if (validOffers.length === 0) {
    return {
      query,
      lowestPrice: 0,
      highestPrice: 0,
      priceDelta: 0,
      savingsPercentage: 0,
      winningMarketplaceId: 'shopee',
      winningMarketplaceName: 'Shopee',
      updatedAt: new Date().toISOString(),
      cached: isCached,
      offers: [],
      disclaimer: RADAR_PRICE_DISCLAIMER,
    };
  }

  // 2. Sort by active current price ascending (cheapest first)
  validOffers.sort((a, b) => a.currentPrice - b.currentPrice);

  // 3. Mark the winner (cheapest)
  validOffers[0].isLowestPrice = true;

  const lowestPrice = validOffers[0].currentPrice;
  const highestPrice = validOffers[validOffers.length - 1].currentPrice;
  const priceDelta = Math.max(0, highestPrice - lowestPrice);
  const savingsPercentage = highestPrice > 0 ? Math.round((priceDelta / highestPrice) * 100) : 0;

  return {
    query,
    lowestPrice,
    highestPrice,
    priceDelta,
    savingsPercentage,
    winningMarketplaceId: validOffers[0].marketplaceId,
    winningMarketplaceName: validOffers[0].marketplaceName,
    updatedAt: new Date().toISOString(),
    cached: isCached,
    offers: validOffers,
    disclaimer: RADAR_PRICE_DISCLAIMER,
  };
}
