import { MarketplaceId } from '@/domain/calculator/types';
import { MarketplaceConfig } from '@/domain/marketplace/types';
import { shopeeConfig } from './shopee';
import { tokopediaConfig } from './tokopedia';
import { tiktokShopConfig } from './tiktok-shop';
import { lazadaConfig } from './lazada';

export const MARKETPLACE_CONFIGS: Record<MarketplaceId, MarketplaceConfig> = {
  shopee: shopeeConfig,
  tokopedia: tokopediaConfig,
  'tiktok-shop': tiktokShopConfig,
  lazada: lazadaConfig,
};

export function getMarketplaceConfig(id: MarketplaceId): MarketplaceConfig {
  const config = MARKETPLACE_CONFIGS[id];
  if (!config) {
    throw new Error(`Marketplace configuration for '${id}' not found.`);
  }
  return config;
}

export function getAllMarketplaceConfigs(): MarketplaceConfig[] {
  return [shopeeConfig, tokopediaConfig, tiktokShopConfig, lazadaConfig];
}

export function getDefaultTier(id: MarketplaceId): string {
  const config = getMarketplaceConfig(id);
  const defaultTier = config.sellerTiers.find((t) => t.isDefault) || config.sellerTiers[0];
  return defaultTier.id;
}

export function getDefaultCategory(id: MarketplaceId): string {
  const config = getMarketplaceConfig(id);
  return config.categories[0]?.id || 'default';
}
