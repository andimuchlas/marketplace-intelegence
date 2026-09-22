import { CalculatorInput, CalculationResult } from './types';
import { MarketplaceConfig } from '../marketplace/types';

/**
 * Solves for the exact minimum whole-Rupiah selling price where netProfit >= 0.
 * Combines analytical closed-form initial estimation with bounded binary search
 * to account for non-linear fee caps (min/max clamps).
 */
export function calculateBreakEven(
  input: CalculatorInput,
  config: MarketplaceConfig,
  profitEvaluator: (input: CalculatorInput, config: MarketplaceConfig) => CalculationResult
): number {
  const productCost = Math.max(0, Math.round(input.productCost || 0));
  const advertisingCost = Math.max(0, Math.round(input.advertisingCost || 0));
  const voucherCost = Math.max(0, Math.round(input.voucherCost || 0));
  const shippingSubsidy = Math.max(0, Math.round(input.shippingSubsidy || 0));
  const affiliateRate = Math.max(0, Math.min(100, input.affiliatePercentage || 0)) / 100;

  const baseFixedCost = productCost + advertisingCost + voucherCost + shippingSubsidy;
  if (baseFixedCost === 0) {
    return 0;
  }

  // Estimate total variable rate
  let estimatedVarRate = affiliateRate;
  let estimatedFixedFees = 0;

  const activePrograms = input.selectedPrograms ?? [];

  for (const rule of config.rules) {
    // Check tier applicability
    if (rule.applicableTiers && !rule.applicableTiers.includes(input.sellerTierId)) {
      continue;
    }
    // Check optional program selection
    if (rule.isOptional) {
      const isSelected = activePrograms.length > 0
        ? activePrograms.includes(rule.id)
        : rule.isDefaultActive;
      if (!isSelected) continue;
    }

    const rate = rule.applicableCategories?.[input.categoryId] ?? rule.percentageRate;
    estimatedVarRate += rate;
    estimatedFixedFees += rule.fixedFee;
  }

  // If variable rate is 100% or more, break-even cannot be reached without fee caps
  const effectiveVarRate = Math.min(0.95, estimatedVarRate);
  const initialEstimate = Math.ceil((baseFixedCost + estimatedFixedFees) / (1 - effectiveVarRate));

  // Binary search bounds around initial estimate
  let low = Math.max(1, Math.floor(initialEstimate * 0.5));
  let high = Math.max(initialEstimate * 2, baseFixedCost * 3);
  let breakEvenPrice = high;

  // Binary search to find exact smallest integer price where netProfit >= 0
  for (let i = 0; i < 30; i++) {
    if (low >= high) {
      breakEvenPrice = low;
      break;
    }

    const mid = Math.floor((low + high) / 2);
    const testInput: CalculatorInput = { ...input, sellingPrice: mid };
    const res = profitEvaluator(testInput, config);

    if (res.netProfit >= 0) {
      breakEvenPrice = mid;
      high = mid; // Try finding an even lower price
    } else {
      low = mid + 1;
    }
  }

  return Math.max(0, breakEvenPrice);
}
