import React from 'react';
import { GoogleIcon } from './Icon';

export type MarketplacePlatformId = 'shopee' | 'tokopedia' | 'tiktok-shop' | 'lazada';

interface MarketplaceIconProps {
  id: MarketplacePlatformId | string;
  size?: number;
  className?: string;
  withBackground?: boolean;
}

export const MARKETPLACE_THEMES: Record<
  string,
  {
    name: string;
    iconName: string;
    color: string;
    bgClass: string;
    borderClass: string;
    textClass: string;
  }
> = {
  shopee: {
    name: 'Shopee',
    iconName: 'shopping_bag',
    color: '#EE4D2D',
    bgClass: 'bg-orange-50',
    borderClass: 'border-orange-200',
    textClass: 'text-[#EE4D2D]',
  },
  tokopedia: {
    name: 'Tokopedia',
    iconName: 'store',
    color: '#03AC0E',
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-200',
    textClass: 'text-[#03AC0E]',
  },
  'tiktok-shop': {
    name: 'TikTok Shop',
    iconName: 'music_note',
    color: '#000000',
    bgClass: 'bg-stone-100',
    borderClass: 'border-stone-300',
    textClass: 'text-stone-900',
  },
  lazada: {
    name: 'Lazada',
    iconName: 'diamond',
    color: '#0F146D',
    bgClass: 'bg-blue-50',
    borderClass: 'border-blue-200',
    textClass: 'text-[#0F146D]',
  },
};

/**
 * Clean, zero-emoji UI icon for e-commerce marketplaces.
 * Built using Google Material Symbols & ReUI/shadcn styling.
 */
export function MarketplaceIcon({
  id,
  size = 20,
  className = '',
  withBackground = false,
}: MarketplaceIconProps) {
  const theme = MARKETPLACE_THEMES[id] || {
    name: id,
    iconName: 'storefront',
    color: '#78716C',
    bgClass: 'bg-stone-100',
    borderClass: 'border-stone-200',
    textClass: 'text-stone-700',
  };

  if (withBackground) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-lg border ${theme.bgClass} ${theme.borderClass} ${theme.textClass} p-1.5 shadow-xs transition-colors ${className}`}
        title={theme.name}
      >
        <GoogleIcon name={theme.iconName} size={size} filled />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center ${theme.textClass} ${className}`}
      title={theme.name}
    >
      <GoogleIcon name={theme.iconName} size={size} filled />
    </span>
  );
}

export function ShopeeIcon({ size = 20, className = '', withBackground = false }: Omit<MarketplaceIconProps, 'id'>) {
  return <MarketplaceIcon id="shopee" size={size} className={className} withBackground={withBackground} />;
}

export function TokopediaIcon({ size = 20, className = '', withBackground = false }: Omit<MarketplaceIconProps, 'id'>) {
  return <MarketplaceIcon id="tokopedia" size={size} className={className} withBackground={withBackground} />;
}

export function TikTokShopIcon({ size = 20, className = '', withBackground = false }: Omit<MarketplaceIconProps, 'id'>) {
  return <MarketplaceIcon id="tiktok-shop" size={size} className={className} withBackground={withBackground} />;
}

export function LazadaIcon({ size = 20, className = '', withBackground = false }: Omit<MarketplaceIconProps, 'id'>) {
  return <MarketplaceIcon id="lazada" size={size} className={className} withBackground={withBackground} />;
}
