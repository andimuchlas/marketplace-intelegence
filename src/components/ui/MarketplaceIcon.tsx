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
    logoUrl?: string;
  }
> = {
  shopee: {
    name: 'Shopee',
    iconName: 'shopping_bag',
    color: '#EE4D2D',
    bgClass: 'bg-orange-50',
    borderClass: 'border-orange-200',
    textClass: 'text-[#EE4D2D]',
    logoUrl: '/assets/logo/shopee.png',
  },
  tokopedia: {
    name: 'Tokopedia',
    iconName: 'store',
    color: '#03AC0E',
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-200',
    textClass: 'text-[#03AC0E]',
    logoUrl: '/assets/logo/tokopedia.png',
  },
  'tiktok-shop': {
    name: 'TikTok Shop',
    iconName: 'music_note',
    color: '#000000',
    bgClass: 'bg-stone-100',
    borderClass: 'border-stone-300',
    textClass: 'text-stone-900',
    logoUrl: '/assets/logo/tiktok.png',
  },
  tiktok: {
    name: 'TikTok Shop',
    iconName: 'music_note',
    color: '#000000',
    bgClass: 'bg-stone-100',
    borderClass: 'border-stone-300',
    textClass: 'text-stone-900',
    logoUrl: '/assets/logo/tiktok.png',
  },
  lazada: {
    name: 'Lazada',
    iconName: 'diamond',
    color: '#0F146D',
    bgClass: 'bg-blue-50',
    borderClass: 'border-blue-200',
    textClass: 'text-[#0F146D]',
    logoUrl: '/assets/logo/lazada.png',
  },
};

/**
 * Clean, official brand logo & UI icon for e-commerce marketplaces.
 * Renders the official transparent brand logo with fallback to Google Material Symbols.
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

  const logoUrl = theme.logoUrl;

  if (withBackground) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-xl border ${theme.bgClass} ${theme.borderClass} p-1.5 shadow-2xs transition-colors shrink-0 ${className}`}
        title={theme.name}
      >
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={theme.name}
            width={size}
            height={size}
            className="object-contain shrink-0"
            style={{ width: `${size}px`, height: `${size}px` }}
            loading="lazy"
          />
        ) : (
          <GoogleIcon name={theme.iconName} size={size} filled />
        )}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${theme.textClass} ${className}`}
      title={theme.name}
    >
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={theme.name}
          width={size}
          height={size}
          className="object-contain shrink-0 inline-block"
          style={{ width: `${size}px`, height: `${size}px` }}
          loading="lazy"
        />
      ) : (
        <GoogleIcon name={theme.iconName} size={size} filled />
      )}
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
