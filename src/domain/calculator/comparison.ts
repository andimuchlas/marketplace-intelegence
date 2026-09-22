import { CalculatorInput, ComparisonResult, MarketplaceComparisonItem } from './types';
import { MarketplaceConfig } from '../marketplace/types';
import { calculateProfit } from './engine';

/**
 * Runs a standardized cross-marketplace profit and margin comparison.
 * Maps default tiers and categories if the input's tier/category is marketplace-specific.
 */
export function compareMarketplaces(
  input: CalculatorInput,
  configs: MarketplaceConfig[]
): ComparisonResult {
  const items: MarketplaceComparisonItem[] = [];

  for (const config of configs) {
    // Resolve seller tier: use input tier if valid for this config, else use default tier
    const validTier = config.sellerTiers.find((t) => t.id === input.sellerTierId)
      || config.sellerTiers.find((t) => t.isDefault)
      || config.sellerTiers[0];

    // Resolve category: use input category if valid, else default
    const validCategory = config.categories.find((c) => c.id === input.categoryId)
      || config.categories[0];

    const marketplaceInput: CalculatorInput = {
      ...input,
      marketplaceId: config.id,
      sellerTierId: validTier.id,
      categoryId: validCategory.id,
      // Pass selected programs only if from the same marketplace
      selectedPrograms: input.marketplaceId === config.id ? input.selectedPrograms : undefined,
    };

    const result = calculateProfit(marketplaceInput, config);

    items.push({
      marketplaceId: config.id,
      marketplaceName: config.name,
      sellerTierName: validTier.name,
      brandColor: config.brandColor,
      result,
      isBestMargin: false,
      profitDifferenceFromBest: 0,
    });
  }

  // Determine best margin marketplace
  let bestItem = items[0];
  for (const item of items) {
    if (item.result.netMargin > bestItem.result.netMargin) {
      bestItem = item;
    }
  }

  // Flag best margin and compute differences
  for (const item of items) {
    if (item.marketplaceId === bestItem.marketplaceId) {
      item.isBestMargin = true;
      item.profitDifferenceFromBest = 0;
    } else {
      item.isBestMargin = false;
      item.profitDifferenceFromBest = bestItem.result.netProfit - item.result.netProfit;
    }
  }

  const margins = items.map((i) => i.result.netMargin);
  const highestMargin = Math.max(...margins);
  const lowestMargin = Math.min(...margins);

  return {
    baseInput: input,
    items,
    bestMarketplaceId: bestItem.marketplaceId,
    highestMargin,
    lowestMargin,
  };
}
