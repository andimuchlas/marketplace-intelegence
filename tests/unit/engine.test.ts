import { describe, it, expect } from 'vitest';
import { calculateProfit } from '@/domain/calculator/engine';
import { calculateBreakEven } from '@/domain/calculator/breakeven';
import { compareMarketplaces } from '@/domain/calculator/comparison';
import { CalculatorInput } from '@/domain/calculator/types';
import { MarketplaceConfig } from '@/domain/marketplace/types';
import { shopeeConfig } from '@/data/marketplaces/shopee';
import { tokopediaConfig } from '@/data/marketplaces/tokopedia';
import { tiktokShopConfig } from '@/data/marketplaces/tiktok-shop';
import { lazadaConfig } from '@/data/marketplaces/lazada';

describe('Calculation Engine - Behavioral Tests', () => {
  // Test Mock Config with strictly controlled rates
  const mockCleanConfig: MarketplaceConfig = {
    id: 'shopee',
    name: 'Mock Platform',
    slug: 'mock',
    tagline: 'Test platform',
    brandColor: '#000',
    version: '1.0',
    lastVerifiedDate: '2025-01-01',
    sourceUrl: 'https://example.com',
    disclaimer: 'Mock disclaimer',
    isPrototypeData: true,
    sellerTiers: [{ id: 'tier_a', name: 'Tier A', isDefault: true }],
    categories: [{ id: 'cat_general', name: 'General', defaultAdminFeeRate: 0.05 }],
    rules: [
      {
        id: 'rule_admin_pct',
        name: 'Admin Fee 5%',
        type: 'percentage',
        category: 'admin',
        percentageRate: 0.05, // 5%
        fixedFee: 0,
        isDefaultActive: true,
        isOptional: false,
      },
      {
        id: 'rule_fixed_payment',
        name: 'Fixed Payment Fee',
        type: 'fixed',
        category: 'payment',
        percentageRate: 0,
        fixedFee: 1000, // Rp 1.000
        isDefaultActive: true,
        isOptional: false,
      },
      {
        id: 'rule_optional_service',
        name: 'Optional Service 4%',
        type: 'percentage',
        category: 'service',
        percentageRate: 0.04, // 4%
        fixedFee: 0,
        maxFee: 10000, // max cap Rp10.000
        isDefaultActive: true,
        isOptional: true,
      },
    ],
  };

  // 1. No marketplace fees
  it('1. calculates correctly when marketplace has 0% fees', () => {
    const zeroFeeConfig: MarketplaceConfig = {
      ...mockCleanConfig,
      rules: [],
    };

    const input: CalculatorInput = {
      marketplaceId: 'shopee',
      sellerTierId: 'tier_a',
      categoryId: 'cat_general',
      sellingPrice: 100000,
      productCost: 60000,
    };

    const result = calculateProfit(input, zeroFeeConfig);

    expect(result.sellingPrice).toBe(100000);
    expect(result.productCost).toBe(60000);
    expect(result.totalMarketplaceFees).toBe(0);
    expect(result.paymentFee).toBe(0);
    expect(result.totalDeductions).toBe(0);
    expect(result.totalCost).toBe(60000);
    expect(result.netProfit).toBe(40000);
    expect(result.netMargin).toBe(40);
    expect(result.isProfitable).toBe(true);
  });

  // 2. Percentage fee
  it('2. calculates exact percentage fee on selling price', () => {
    const singlePctConfig: MarketplaceConfig = {
      ...mockCleanConfig,
      rules: [
        {
          id: 'admin_only',
          name: 'Admin Fee',
          type: 'percentage',
          category: 'admin',
          percentageRate: 0.0425, // 4.25%
          fixedFee: 0,
          isDefaultActive: true,
          isOptional: false,
        },
      ],
    };

    const input: CalculatorInput = {
      marketplaceId: 'shopee',
      sellerTierId: 'tier_a',
      categoryId: 'cat_general',
      sellingPrice: 100000,
      productCost: 50000,
    };

    const result = calculateProfit(input, singlePctConfig);

    // 100.000 * 0.0425 = 4.250
    expect(result.totalMarketplaceFees).toBe(4250);
    expect(result.netProfit).toBe(100000 - (50000 + 4250)); // 45.750
  });

  // 3. Fixed fee
  it('3. calculates flat/fixed fee', () => {
    const fixedOnlyConfig: MarketplaceConfig = {
      ...mockCleanConfig,
      rules: [
        {
          id: 'fixed_fee',
          name: 'Flat Fee',
          type: 'fixed',
          category: 'payment',
          percentageRate: 0,
          fixedFee: 2500,
          isDefaultActive: true,
          isOptional: false,
        },
      ],
    };

    const input: CalculatorInput = {
      marketplaceId: 'shopee',
      sellerTierId: 'tier_a',
      categoryId: 'cat_general',
      sellingPrice: 50000,
      productCost: 30000,
    };

    const result = calculateProfit(input, fixedOnlyConfig);

    expect(result.paymentFee).toBe(2500);
    expect(result.totalCost).toBe(30000 + 2500);
    expect(result.netProfit).toBe(50000 - 32500); // 17.500
  });

  // 4. Multiple fees (percentage + fixed + capped service fee)
  it('4. aggregates multiple stacked fees with caps correctly', () => {
    const input: CalculatorInput = {
      marketplaceId: 'shopee',
      sellerTierId: 'tier_a',
      categoryId: 'cat_general',
      sellingPrice: 300000, // 300.000
      productCost: 150000,
      selectedPrograms: ['rule_optional_service'],
    };

    const result = calculateProfit(input, mockCleanConfig);

    // Admin: 5% of 300.000 = 15.000
    // Fixed payment: 1.000
    // Optional service: 4% of 300.000 = 12.000 -> CAPPED at maxFee 10.000!
    expect(result.totalMarketplaceFees).toBe(15000 + 10000); // 25.000
    expect(result.paymentFee).toBe(1000);
    expect(result.totalDeductions).toBe(26000);
    expect(result.totalCost).toBe(150000 + 26000); // 176.000
    expect(result.netProfit).toBe(300000 - 176000); // 124.000
  });

  // 5. Affiliate fee
  it('5. computes affiliate commission fee accurately', () => {
    const input: CalculatorInput = {
      marketplaceId: 'shopee',
      sellerTierId: 'tier_a',
      categoryId: 'cat_general',
      sellingPrice: 200000,
      productCost: 100000,
      affiliatePercentage: 7.5, // 7.5%
      selectedPrograms: [], // disable optional service
    };

    const result = calculateProfit(input, mockCleanConfig);

    // 200.000 * 7.5% = 15.000
    expect(result.affiliateFee).toBe(15000);
    expect(result.feeBreakdown.some((f) => f.category === 'affiliate')).toBe(true);
  });

  // 6. Advertising cost
  it('6. handles advertising cost deduction per unit', () => {
    const input: CalculatorInput = {
      marketplaceId: 'shopee',
      sellerTierId: 'tier_a',
      categoryId: 'cat_general',
      sellingPrice: 100000,
      productCost: 50000,
      advertisingCost: 8000,
      selectedPrograms: [],
    };

    const result = calculateProfit(input, mockCleanConfig);

    expect(result.operationalCosts.advertisingCost).toBe(8000);
    expect(result.operationalCosts.total).toBe(8000);
  });

  // 7. Voucher & Promotion subsidy
  it('7. factors voucher and shipping subsidies into operational costs', () => {
    const input: CalculatorInput = {
      marketplaceId: 'shopee',
      sellerTierId: 'tier_a',
      categoryId: 'cat_general',
      sellingPrice: 100000,
      productCost: 50000,
      voucherCost: 5000,
      shippingSubsidy: 2000,
      selectedPrograms: [],
    };

    const result = calculateProfit(input, mockCleanConfig);

    expect(result.operationalCosts.voucherCost).toBe(5000);
    expect(result.operationalCosts.shippingSubsidy).toBe(2000);
    expect(result.operationalCosts.total).toBe(7000);
  });

  // 8. Zero/empty optional inputs
  it('8. handles undefined or zero optional inputs safely', () => {
    const input: CalculatorInput = {
      marketplaceId: 'shopee',
      sellerTierId: 'tier_a',
      categoryId: 'cat_general',
      sellingPrice: 100000,
      productCost: 50000,
      advertisingCost: undefined,
      affiliatePercentage: undefined,
      voucherCost: undefined,
      shippingSubsidy: undefined,
    };

    const result = calculateProfit(input, mockCleanConfig);

    expect(result.operationalCosts.advertisingCost).toBe(0);
    expect(result.affiliateFee).toBe(0);
    expect(result.operationalCosts.voucherCost).toBe(0);
    expect(result.operationalCosts.shippingSubsidy).toBe(0);
    expect(result.operationalCosts.total).toBe(0);
    expect(isNaN(result.netProfit)).toBe(false);
  });

  // 9. Decimal percentages
  it('9. accurately rounds intermediate decimal percentages without floating point leaks', () => {
    const input: CalculatorInput = {
      marketplaceId: 'shopee',
      sellerTierId: 'tier_a',
      categoryId: 'cat_general',
      sellingPrice: 77777,
      productCost: 30000,
      affiliatePercentage: 3.33,
      selectedPrograms: [],
    };

    const result = calculateProfit(input, mockCleanConfig);

    // Should be an exact integer
    expect(Number.isInteger(result.affiliateFee)).toBe(true);
    expect(Number.isInteger(result.totalMarketplaceFees)).toBe(true);
    expect(Number.isInteger(result.netProfit)).toBe(true);
    expect(result.netProfit).toBe(Math.round(result.netProfit));
  });

  // 10. Break-even calculation
  it('10. calculates break-even selling price where net profit is non-negative', () => {
    const input: CalculatorInput = {
      marketplaceId: 'shopee',
      sellerTierId: 'tier_a',
      categoryId: 'cat_general',
      sellingPrice: 100000,
      productCost: 60000,
      advertisingCost: 5000,
      affiliatePercentage: 5,
    };

    const result = calculateProfit(input, mockCleanConfig);

    expect(result.breakEvenPrice).toBeGreaterThan(60000);

    // Verify break-even price yields netProfit >= 0
    const breakEvenResult = calculateProfit(
      { ...input, sellingPrice: result.breakEvenPrice },
      mockCleanConfig
    );
    expect(breakEvenResult.netProfit).toBeGreaterThanOrEqual(0);

    // Verify 1 Rupiah below break-even is unprofitable
    const belowBreakEvenResult = calculateProfit(
      { ...input, sellingPrice: result.breakEvenPrice - 1 },
      mockCleanConfig
    );
    expect(belowBreakEvenResult.netProfit).toBeLessThanOrEqual(0);
  });

  // 11. Comparison across marketplaces
  it('11. runs 4-way comparison accurately across real configs', () => {
    const input: CalculatorInput = {
      marketplaceId: 'shopee',
      sellerTierId: 'star_seller',
      categoryId: 'fashion',
      sellingPrice: 100000,
      productCost: 60000,
      advertisingCost: 5000,
      affiliatePercentage: 5,
    };

    const comparison = compareMarketplaces(input, [
      shopeeConfig,
      tokopediaConfig,
      tiktokShopConfig,
      lazadaConfig,
    ]);

    expect(comparison.items.length).toBe(4);
    expect(comparison.items.some((i) => i.isBestMargin)).toBe(true);

    const best = comparison.items.find((i) => i.isBestMargin);
    expect(best).toBeDefined();
    expect(best?.profitDifferenceFromBest).toBe(0);

    for (const item of comparison.items) {
      expect(item.result.sellingPrice).toBe(100000);
      expect(item.result.productCost).toBe(60000);
      expect(Number.isInteger(item.result.netProfit)).toBe(true);
    }
  });

  // 12. Invalid / edge input handling
  it('12. handles negative or extreme values gracefully', () => {
    const negativeInput: CalculatorInput = {
      marketplaceId: 'shopee',
      sellerTierId: 'tier_a',
      categoryId: 'cat_general',
      sellingPrice: -50000,
      productCost: -20000,
    };

    const result = calculateProfit(negativeInput, mockCleanConfig);

    expect(result.sellingPrice).toBe(0);
    expect(result.productCost).toBe(0);
    expect(result.netProfit).toBe(0);
    expect(result.isProfitable).toBe(false);
  });
});
