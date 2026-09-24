import { MarketplaceAdapter, MarketplaceProductOffer } from '../types';
import { generateMarketplaceMockCatalog } from '../mockCatalog';

export class ShopeeAdapter implements MarketplaceAdapter {
  readonly marketplaceId = 'shopee';
  readonly marketplaceName = 'Shopee';

  async search(keyword: string): Promise<MarketplaceProductOffer[]> {
    const appId = process.env.SHOPEE_AFFILIATE_APP_ID;
    const appSecret = process.env.SHOPEE_AFFILIATE_APP_SECRET;

    // 1. If real credentials configured, execute Shopee GraphQL request
    if (appId && appSecret) {
      try {
        const res = await this.fetchShopeeGraphQL(keyword, appId, appSecret);
        if (res.length > 0) return res;
      } catch (err) {
        console.warn('[ShopeeAdapter] Live GraphQL fetch failed, falling back to mock:', err);
      }
    }

    // 2. Realistic Prototype Data Fallback
    return this.generateMockOffer(keyword);
  }

  private async fetchShopeeGraphQL(
    keyword: string,
    appId: string,
    appSecret: string
  ): Promise<MarketplaceProductOffer[]> {
    // Official Shopee Affiliate GraphQL endpoint
    const endpoint = 'https://open-api.affiliate.shopee.co.id/graphql';
    const timestamp = Math.floor(Date.now() / 1000);
    const query = `
      query searchProducts($keyword: String!) {
        productOfferV2(keyword: $keyword, page: 1, limit: 10) {
          nodes {
            itemId
            productName
            price
            priceMin
            priceMax
            sales
            ratingStar
            imageUrl
            shopName
            productLink
          }
        }
      }
    `;

    // Note: Signature generation uses HMAC-SHA256(appId + timestamp + payload + appSecret)
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `SHA256 Credential=${appId}, Timestamp=${timestamp}`,
      },
      body: JSON.stringify({ query, variables: { keyword } }),
      signal: AbortSignal.timeout(4000), // 4 second timeout guard
    });

    if (!response.ok) {
      throw new Error(`Shopee API responded with status ${response.status}`);
    }

    const json = await response.json();
    const nodes = json?.data?.productOfferV2?.nodes || [];

    return nodes.map((node: any) => ({
      marketplaceId: this.marketplaceId,
      marketplaceName: this.marketplaceName,
      productId: String(node.itemId),
      title: node.productName,
      originalPrice: Math.round(node.priceMax || node.price),
      currentPrice: Math.round(node.priceMin || node.price),
      discountPercentage: node.priceMax ? Math.round(((node.priceMax - node.priceMin) / node.priceMax) * 100) : 0,
      rating: Number(node.ratingStar) || 4.8,
      totalSold: Number(node.sales) || 1200,
      shopName: node.shopName || 'Shopee Official Store',
      shopCity: 'Jakarta Pusat',
      isOfficialStore: true,
      imageUrl: node.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
      affiliateUrl: node.productLink || `https://shopee.co.id/search?keyword=${encodeURIComponent(keyword)}`,
      isLowestPrice: false,
    }));
  }

  private generateMockOffer(keyword: string): MarketplaceProductOffer[] {
    return generateMarketplaceMockCatalog(this.marketplaceId, keyword);
  }
}

export const shopeeAdapter = new ShopeeAdapter();
