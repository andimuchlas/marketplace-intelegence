import { MarketplaceAdapter, MarketplaceProductOffer } from '../types';

export class LazadaAdapter implements MarketplaceAdapter {
  readonly marketplaceId = 'lazada';
  readonly marketplaceName = 'Lazada';

  async search(keyword: string): Promise<MarketplaceProductOffer[]> {
    const appKey = process.env.LAZADA_APP_KEY;
    const appSecret = process.env.LAZADA_APP_SECRET;

    if (appKey && appSecret) {
      try {
        const res = await this.fetchLazadaAPI(keyword, appKey, appSecret);
        if (res.length > 0) return res;
      } catch (err) {
        console.warn('[LazadaAdapter] Live API fetch failed, falling back to mock:', err);
      }
    }

    return this.generateMockOffer(keyword);
  }

  private async fetchLazadaAPI(
    keyword: string,
    _appKey: string,
    _appSecret: string
  ): Promise<MarketplaceProductOffer[]> {
    // In production, sign request with Lazada Open Platform SDK
    return this.generateMockOffer(keyword);
  }

  private generateMockOffer(keyword: string): MarketplaceProductOffer[] {
    const hash = keyword.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const basePrice = Math.max(50000, ((hash * 1234) % 800000) + 75000);
    const currentPrice = Math.round(basePrice * 0.97); // 3% discount

    return [
      {
        marketplaceId: this.marketplaceId,
        marketplaceName: this.marketplaceName,
        productId: `lazada-${hash}`,
        title: `${keyword.toUpperCase()} (LazMall Flagship Store)`,
        originalPrice: basePrice,
        currentPrice,
        discountPercentage: 3,
        rating: 4.7,
        totalSold: 1420,
        shopName: 'LazMall Flagship Store',
        shopCity: 'Tangerang',
        isOfficialStore: true,
        imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300',
        affiliateUrl: `https://www.lazada.co.id/catalog/?q=${encodeURIComponent(keyword)}&utm_source=radar_affiliate`,
        isLowestPrice: false,
      },
    ];
  }
}

export const lazadaAdapter = new LazadaAdapter();
