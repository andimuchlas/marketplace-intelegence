export type MarketplaceId = 'shopee' | 'tokopedia' | 'tiktok-shop' | 'lazada';

export interface MarketplaceProductOffer {
  marketplaceId: MarketplaceId;
  marketplaceName: string;
  productId: string;
  title: string;
  originalPrice: number;       // Base/strikethrough price in IDR
  currentPrice: number;        // Active base selling price in IDR
  discountPercentage?: number; // e.g. 15 for 15% off
  rating: number;              // 0.0 - 5.0
  totalSold: number;           // Volume sold
  shopName: string;
  shopCity?: string;
  isOfficialStore: boolean;    // Mall / Official / Star seller
  imageUrl: string;
  affiliateUrl: string;        // Outbound tracking link
  isLowestPrice: boolean;      // Calculated flag
}

export interface PriceRadarResult {
  query: string;
  lowestPrice: number;
  highestPrice: number;
  priceDelta: number;          // Potential savings: highest - lowest
  savingsPercentage: number;   // Savings percentage e.g. 15 for 15%
  winningMarketplaceId: MarketplaceId;
  winningMarketplaceName: string;
  updatedAt: string;           // ISO 8601
  cached: boolean;
  offers: MarketplaceProductOffer[];
  disclaimer: string;
}

export interface MarketplaceAdapter {
  marketplaceId: MarketplaceId;
  marketplaceName: string;
  search(keyword: string): Promise<MarketplaceProductOffer[]>;
}
