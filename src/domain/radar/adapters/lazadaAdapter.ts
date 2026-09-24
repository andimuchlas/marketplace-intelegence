import { MarketplaceAdapter, MarketplaceProductOffer } from '../types';
import { generateMarketplaceMockCatalog } from '../mockCatalog';

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
    return generateMarketplaceMockCatalog(this.marketplaceId, keyword);
  }
}

export const lazadaAdapter = new LazadaAdapter();
