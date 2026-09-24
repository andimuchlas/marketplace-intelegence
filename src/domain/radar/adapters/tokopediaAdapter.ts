import { MarketplaceAdapter, MarketplaceProductOffer } from '../types';
import { generateMarketplaceMockCatalog } from '../mockCatalog';

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
    return generateMarketplaceMockCatalog(this.marketplaceId, keyword);
  }
}

export const tokopediaAdapter = new TokopediaAdapter();
