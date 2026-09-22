import { CalculatorInput, CalculationResult, FeeItem } from './types';
import { MarketplaceConfig } from '../marketplace/types';
import { calculateBreakEven } from './breakeven';

/**
 * Calculates deterministic profit, fees, margin, and break-even for a given marketplace.
 * Pure function with zero external side-effects.
 */
export function calculateProfit(
  input: CalculatorInput,
  config: MarketplaceConfig
): CalculationResult {
  // 1. Sanitize & Normalize Inputs (Clamp to non-negative integers where appropriate)
  const sellingPrice = Math.max(0, Math.round(input.sellingPrice || 0));
  const productCost = Math.max(0, Math.round(input.productCost || 0));
  const advertisingCost = Math.max(0, Math.round(input.advertisingCost || 0));
  const affiliatePercentage = Math.max(0, Math.min(100, input.affiliatePercentage || 0));
  const voucherCost = Math.max(0, Math.round(input.voucherCost || 0));
  const shippingSubsidy = Math.max(0, Math.round(input.shippingSubsidy || 0));

  const activePrograms = input.selectedPrograms;

  // 2. Evaluate Marketplace Fee Rules
  const feeBreakdown: FeeItem[] = [];
  let totalMarketplaceFees = 0;
  let paymentFee = 0;

  for (const rule of config.rules) {
    // Check tier eligibility
    if (rule.applicableTiers && !rule.applicableTiers.includes(input.sellerTierId)) {
      continue;
    }

    // Check optional program selection
    if (rule.isOptional) {
      const isSelected = activePrograms !== undefined
        ? activePrograms.includes(rule.id)
        : rule.isDefaultActive;

      if (!isSelected) {
        continue;
      }
    }

    // Determine category-specific percentage rate or fallback to rule default
    const rate = rule.applicableCategories?.[input.categoryId] ?? rule.percentageRate;

    // Calculate raw fee
    let calculatedAmount = 0;
    if (sellingPrice > 0) {
      const percentageAmount = Math.round(sellingPrice * rate);
      let feeSum = percentageAmount + rule.fixedFee;

      // Apply minimum cap
      if (rule.minFee !== undefined && feeSum < rule.minFee) {
        feeSum = rule.minFee;
      }

      // Apply maximum cap
      if (rule.maxFee !== undefined && feeSum > rule.maxFee) {
        feeSum = rule.maxFee;
      }

      calculatedAmount = feeSum;
    }

    const feeItem: FeeItem = {
      id: rule.id,
      name: rule.name,
      category: rule.category,
      rate,
      fixedAmount: rule.fixedFee,
      calculatedAmount,
      minAmount: rule.minFee,
      maxAmount: rule.maxFee,
      description: rule.conditionDescription,
      isOptional: rule.isOptional,
    };

    feeBreakdown.push(feeItem);

    if (rule.category === 'payment') {
      paymentFee += calculatedAmount;
    } else {
      totalMarketplaceFees += calculatedAmount;
    }
  }

  // 3. Evaluate Affiliate Fee
  const affiliateFee = sellingPrice > 0 && affiliatePercentage > 0
    ? Math.round(sellingPrice * (affiliatePercentage / 100))
    : 0;

  if (affiliateFee > 0 || affiliatePercentage > 0) {
    feeBreakdown.push({
      id: 'affiliate_commission',
      name: `Komisi Affiliate (${affiliatePercentage}%)`,
      category: 'affiliate',
      rate: affiliatePercentage / 100,
      fixedAmount: 0,
      calculatedAmount: affiliateFee,
      isOptional: true,
      description: 'Komisi kreator atau platform affiliate atas transaksi.',
    });
  }

  // 4. Evaluate Marketing & Operational Expenses
  const operationalCosts = {
    advertisingCost,
    voucherCost,
    shippingSubsidy,
    total: advertisingCost + voucherCost + shippingSubsidy,
  };

  // 5. Compute Totals, Net Profit & Margin
  const totalDeductions = totalMarketplaceFees + paymentFee + affiliateFee + operationalCosts.total;
  const totalCost = totalDeductions + productCost;
  const netProfit = sellingPrice - totalCost;
  const netMargin = sellingPrice > 0 ? (netProfit / sellingPrice) * 100 : 0;
  const effectiveFeeRate = sellingPrice > 0
    ? ((totalMarketplaceFees + paymentFee) / sellingPrice) * 100
    : 0;

  // 6. Compute Break-Even Selling Price
  // Note: Pass raw calculateProfitInternal to avoid recursive cycle
  const breakEvenPrice = calculateBreakEven(input, config, calculateProfitRaw);

  return {
    input,
    sellingPrice,
    productCost,
    totalMarketplaceFees,
    paymentFee,
    affiliateFee,
    operationalCosts,
    feeBreakdown,
    totalDeductions,
    totalCost,
    netProfit,
    netMargin: Number(netMargin.toFixed(2)),
    breakEvenPrice,
    effectiveFeeRate: Number(effectiveFeeRate.toFixed(2)),
    isProfitable: netProfit > 0,
  };
}

/**
 * Lightweight internal evaluator used by break-even solver to avoid deep recursion.
 */
function calculateProfitRaw(input: CalculatorInput, config: MarketplaceConfig): CalculationResult {
  const sellingPrice = Math.max(0, Math.round(input.sellingPrice || 0));
  const productCost = Math.max(0, Math.round(input.productCost || 0));
  const advertisingCost = Math.max(0, Math.round(input.advertisingCost || 0));
  const affiliatePercentage = Math.max(0, Math.min(100, input.affiliatePercentage || 0));
  const voucherCost = Math.max(0, Math.round(input.voucherCost || 0));
  const shippingSubsidy = Math.max(0, Math.round(input.shippingSubsidy || 0));

  let totalFees = 0;
  const activePrograms = input.selectedPrograms;

  for (const rule of config.rules) {
    if (rule.applicableTiers && !rule.applicableTiers.includes(input.sellerTierId)) {
      continue;
    }
    if (rule.isOptional) {
      const isSelected = activePrograms !== undefined
        ? activePrograms.includes(rule.id)
        : rule.isDefaultActive;
      if (!isSelected) continue;
    }

    const rate = rule.applicableCategories?.[input.categoryId] ?? rule.percentageRate;
    let amount = Math.round(sellingPrice * rate) + rule.fixedFee;
    if (rule.minFee !== undefined && amount < rule.minFee) amount = rule.minFee;
    if (rule.maxFee !== undefined && amount > rule.maxFee) amount = rule.maxFee;
    totalFees += amount;
  }

  const affiliateFee = Math.round(sellingPrice * (affiliatePercentage / 100));
  const operationalTotal = advertisingCost + voucherCost + shippingSubsidy;
  const totalCost = productCost + totalFees + affiliateFee + operationalTotal;
  const netProfit = sellingPrice - totalCost;

  return {
    input,
    sellingPrice,
    productCost,
    totalMarketplaceFees: totalFees,
    paymentFee: 0,
    affiliateFee,
    operationalCosts: { advertisingCost, voucherCost, shippingSubsidy, total: operationalTotal },
    feeBreakdown: [],
    totalDeductions: totalFees + affiliateFee + operationalTotal,
    totalCost,
    netProfit,
    netMargin: sellingPrice > 0 ? (netProfit / sellingPrice) * 100 : 0,
    breakEvenPrice: 0,
    effectiveFeeRate: 0,
    isProfitable: netProfit > 0,
  };
}
