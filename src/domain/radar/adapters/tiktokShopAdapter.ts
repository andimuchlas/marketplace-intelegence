import { MarketplaceAdapter, MarketplaceProductOffer } from '../types';

export class TikTokShopAdapter implements MarketplaceAdapter {
  readonly marketplaceId = 'tiktok-shop';
  readonly marketplaceName = 'TikTok Shop';

  async search(keyword: string): Promise<MarketplaceProductOffer[]> {
    const appKey = process.env.TIKTOK_SHOP_APP_KEY;
    const accessToken = process.env.TIKTOK_SHOP_ACCESS_TOKEN;

    if (appKey && accessToken) {
      try {
        const res = await this.fetchTikTokAPI(keyword, appKey, accessToken);
        if (res.length > 0) return res;
      } catch (err) {
        console.warn('[TikTokShopAdapter] Live API fetch failed, falling back to mock:', err);
      }
    }

    return this.generateMockOffer(keyword);
  }

  private async fetchTikTokAPI(
    keyword: string,
    appKey: string,
    accessToken: string
  ): Promise<MarketplaceProductOffer[]> {
    const endpoint = `https://open-api.tiktokglobalshop.com/api/affiliate/products/search?keyword=${encodeURIComponent(
      keyword
    )}&app_key=${appKey}`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'x-tts-access-token': accessToken,
      },
      signal: AbortSignal.timeout(4000),
    });

    if (!response.ok) {
      throw new Error(`TikTok Shop API status ${response.status}`);
    }

    const json = await response.json();
    const products = json?.data?.products || [];

    return products.map((item: any) => ({
      marketplaceId: this.marketplaceId,
      marketplaceName: this.marketplaceName,
      productId: String(item.id),
      title: item.title,
      originalPrice: Math.round(item.original_price?.amount || item.price?.amount),
      currentPrice: Math.round(item.price?.amount),
      discountPercentage: 10,
      rating: Number(item.rating) || 4.7,
      totalSold: Number(item.sales) || 850,
      shopName: item.seller_name || 'TikTok Verified Creator Shop',
      shopCity: 'Jakarta Selatan',
      isOfficialStore: true,
      imageUrl: item.cover_image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
      affiliateUrl: item.affiliate_url || `https://shop.tiktok.com/search?q=${encodeURIComponent(keyword)}`,
      isLowestPrice: false,
    }));
  }

  private generateMockOffer(keyword: string): MarketplaceProductOffer[] {
    const hash = keyword.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const basePrice = Math.max(50000, ((hash * 1234) % 800000) + 75000);
    // TikTok Shop often has live/video creator discounts
    const currentPrice = Math.round(basePrice * 0.92); // 8% discount

    return [
      {
        marketplaceId: this.marketplaceId,
        marketplaceName: this.marketplaceName,
        productId: `tiktok-${hash}`,
        title: `${keyword.toUpperCase()} (Live Special Deal / TikTok Mall)`,
        originalPrice: basePrice,
        currentPrice,
        discountPercentage: 8,
        rating: 4.8,
        totalSold: 5120,
        shopName: 'TikTok Shop Mall Official',
        shopCity: 'Jakarta Selatan',
        isOfficialStore: true,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
        affiliateUrl: `https://shop.tiktok.com/search?q=${encodeURIComponent(keyword)}&utm_source=radar_affiliate`,
        isLowestPrice: false,
      },
    ];
  }
}

export const tiktokShopAdapter = new TikTokShopAdapter();
