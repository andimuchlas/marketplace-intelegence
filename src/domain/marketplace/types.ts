import { MarketplaceId } from '../calculator/types';

export type FeeCalculationType = 'percentage' | 'fixed' | 'tiered' | 'hybrid';

export interface FeeRule {
  id: string;
  name: string;
  type: FeeCalculationType;
  category: 'admin' | 'service' | 'payment' | 'program';
  percentageRate: number;                   // e.g. 0.0425 for 4.25%
  fixedFee: number;                         // in IDR (e.g. 1000)
  minFee?: number;                          // Minimum fee in IDR
  maxFee?: number;                          // Maximum fee cap in IDR
  applicableTiers?: string[];               // e.g. ['star_seller', 'star_plus'] or undefined for all tiers
  applicableCategories?: Record<string, number>; // Specific percentage rate override by category ID
  conditionDescription?: string;
  isDefaultActive: boolean;
  isOptional: boolean;
}

export interface SellerTier {
  id: string;
  name: string;
  description: string;
  isDefault?: boolean;
}

export interface ProductCategoryGroup {
  id: string;
  name: string;
  description: string;
  defaultAdminFeeRate: number;              // Base rate if not tier-specific
}

export interface MarketplaceConfig {
  id: MarketplaceId;
  name: string;
  slug: string;
  tagline: string;
  brandColor: string;
  version: string;
  lastVerifiedDate: string;
  sourceUrl: string;
  disclaimer: string;
  isPrototypeData: boolean;
  sellerTiers: SellerTier[];
  categories: ProductCategoryGroup[];
  rules: FeeRule[];
}
