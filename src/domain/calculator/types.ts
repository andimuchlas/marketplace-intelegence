export type MarketplaceId = 'shopee' | 'tokopedia' | 'tiktok-shop' | 'lazada';

export interface CalculatorInput {
  marketplaceId: MarketplaceId;
  sellerTierId: string;
  categoryId: string;
  sellingPrice: number;        // IDR (integer Rupiah)
  productCost: number;         // HPP in IDR
  advertisingCost?: number;    // per unit in IDR (optional, default 0)
  affiliatePercentage?: number;// e.g. 5 for 5% (optional, default 0)
  voucherCost?: number;        // per unit in IDR (optional, default 0)
  shippingSubsidy?: number;    // per unit in IDR (optional, default 0)
  selectedPrograms?: string[]; // IDs of selected extra programs (e.g. 'gratis_ongkir_xtra')
}

export interface FeeItem {
  id: string;
  name: string;
  category: 'admin' | 'service' | 'payment' | 'program' | 'affiliate' | 'operational';
  rate: number;                // Decimal rate (e.g. 0.0425 for 4.25%)
  fixedAmount: number;         // Fixed Rupiah deduction
  calculatedAmount: number;    // Resulting fee in whole IDR
  minAmount?: number;          // Floor cap
  maxAmount?: number;          // Ceiling cap
  description?: string;
  isOptional: boolean;
}

export interface CalculationResult {
  input: CalculatorInput;
  sellingPrice: number;
  productCost: number;
  totalMarketplaceFees: number; // Admin + Service + Program fees
  paymentFee: number;           // Payment gateway/processing fee
  affiliateFee: number;         // Creator or platform affiliate fee
  operationalCosts: {
    advertisingCost: number;
    voucherCost: number;
    shippingSubsidy: number;
    total: number;
  };
  feeBreakdown: FeeItem[];
  totalDeductions: number;      // Total fees + operational costs (excluding product cost)
  totalCost: number;            // Total deductions + product cost (HPP)
  netProfit: number;            // sellingPrice - totalCost
  netMargin: number;            // (netProfit / sellingPrice) * 100
  breakEvenPrice: number;       // Minimum selling price where netProfit >= 0
  effectiveFeeRate: number;     // (totalMarketplaceFees / sellingPrice) * 100
  isProfitable: boolean;
}

export interface MarketplaceComparisonItem {
  marketplaceId: MarketplaceId;
  marketplaceName: string;
  sellerTierName: string;
  brandColor: string;
  result: CalculationResult;
  isBestMargin: boolean;
  profitDifferenceFromBest: number;
}

export interface ComparisonResult {
  baseInput: CalculatorInput;
  items: MarketplaceComparisonItem[];
  bestMarketplaceId: MarketplaceId;
  highestMargin: number;
  lowestMargin: number;
}
