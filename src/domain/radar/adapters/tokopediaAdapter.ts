import { MarketplaceAdapter, MarketplaceProductOffer } from '../types';

export class TokopediaAdapter implements MarketplaceAdapter {
  readonly marketplaceId = 'tokopedia';
  readonly marketplaceName = 'Tokopedia';

  async search(keyword: string): Promise<MarketplaceProductOffer[]> {
    const clientId = process.env.TOKOPEDIA_CLIENT_ID;
    const clientSecret = process.env.TOKOPEDIA_CLIENT_SECRET;

    if (clientId && clientSecret) {
      try {
        const res = await this.fetchTokopediaAPI(keyword, clientId, clientSecret);
        if (res.length > 0) return res;
      } catch (err) {
        console.warn('[TokopediaAdapter] Live API fetch failed, falling back to mock:', err);
      }
    }

    return this.generateMockOffer(keyword);
  }

  private async fetchTokopediaAPI(
    keyword: string,
    _clientId: string,
    _clientSecret: string
  ): Promise<MarketplaceProductOffer[]> {
    // In production, exchange client credentials for OAuth token & query Tokopedia product API
    return this.generateMockOffer(keyword);
  }

  private generateMockOffer(keyword: string): MarketplaceProductOffer[] {
    const hash = keyword.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const basePrice = Math.max(50000, ((hash * 1234) % 800000) + 75000);
    const currentPrice = Math.round(basePrice * 0.94); // 6% discount

    return [
      {
        marketplaceId: this.marketplaceId,
        marketplaceName: this.marketplaceName,
        productId: `tokopedia-${hash}`,
        title: `${keyword.toUpperCase()} (Official Store Tokopedia)`,
        originalPrice: basePrice,
        currentPrice,
        discountPercentage: 6,
        rating: 4.9,
        totalSold: 2890,
        shopName: 'Tokopedia Official Store',
        shopCity: 'Jakarta Utara',
        isOfficialStore: true,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
        affiliateUrl: `https://www.tokopedia.com/search?st=product&q=${encodeURIComponent(
          keyword
        )}&utm_source=radar_affiliate`,
        isLowestPrice: false,
      },
    ];
  }
}

export const tokopediaAdapter = new TokopediaAdapter();
