'use client';

import React from 'react';
import { MarketplaceIcon } from '@/components/ui/MarketplaceIcon';
import { GoogleIcon } from '@/components/ui/Icon';

interface PartnerBrand {
  name: string;
  category: 'marketplace' | 'logistic' | 'payment';
  marketplaceId?: string;
  iconName?: string;
  color?: string;
  tagline: string;
}

const PARTNERS: PartnerBrand[] = [
  {
    name: 'Shopee',
    category: 'marketplace',
    marketplaceId: 'shopee',
    tagline: 'Gratis Ongkir & Mall',
  },
  {
    name: 'Tokopedia',
    category: 'marketplace',
    marketplaceId: 'tokopedia',
    tagline: 'Official Store & WIB',
  },
  {
    name: 'TikTok Shop',
    category: 'marketplace',
    marketplaceId: 'tiktok-shop',
    tagline: 'Live Shopping Deals',
  },
  {
    name: 'Lazada',
    category: 'marketplace',
    marketplaceId: 'lazada',
    tagline: 'LazMall Authentic',
  },
  {
    name: 'Blibli',
    category: 'marketplace',
    iconName: 'storefront',
    color: '#0095DA',
    tagline: 'Jaminan 100% Orisinil',
  },
  {
    name: 'Bukalapak',
    category: 'marketplace',
    iconName: 'store',
    color: '#E31F51',
    tagline: 'BukaMall & Mitra',
  },
  {
    name: 'J&T Express',
    category: 'logistic',
    iconName: 'local_shipping',
    color: '#EE2A24',
    tagline: 'Express Courier',
  },
  {
    name: 'SiCepat Ekspres',
    category: 'logistic',
    iconName: 'local_shipping',
    color: '#D81E05',
    tagline: 'Same Day & Cargo',
  },
  {
    name: 'Anteraja',
    category: 'logistic',
    iconName: 'schedule',
    color: '#F48220',
    tagline: 'Next Day Logistics',
  },
  {
    name: 'JNE Express',
    category: 'logistic',
    iconName: 'navigation',
    color: '#00479A',
    tagline: 'Reguler & YES',
  },
  {
    name: 'QRIS',
    category: 'payment',
    iconName: 'qr_code_2',
    color: '#EF3829',
    tagline: 'Pembayaran Standar Nasional',
  },
  {
    name: 'GoPay',
    category: 'payment',
    iconName: 'account_balance_wallet',
    color: '#00AED6',
    tagline: 'Instant E-Wallet',
  },
];

export function InfiniteLogoSlider({ className = '' }: { className?: string }) {
  // Duplicate array 3 times to ensure infinite seamless loop across ultra-wide monitors
  const extendedList = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <div className={`w-full py-6 sm:py-8 overflow-hidden ${className}`}>
      {/* Header Label */}
      <div className="mx-auto max-w-5xl px-4 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-stone-200/90 bg-white px-3 py-1 text-[11px] font-semibold text-stone-600 shadow-2xs">
          <GoogleIcon name="hub" size={13} filled className="text-emerald-600" />
          <span>EKOSISTEM E-COMMERCE & LOGISTIK TERINTEGRASI</span>
        </div>
        <p className="mt-1.5 text-xs text-stone-500 max-w-md mx-auto">
          Memantau penawaran harga & simulasi biaya admin di seluruh marketplace terbesar Indonesia
        </p>
      </div>

      {/* Marquee Track Container with Edge Gradient Masks */}
      <div className="relative mt-5 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center gap-4 py-2">
          {extendedList.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="group/item flex shrink-0 items-center gap-2.5 rounded-xl border border-stone-200/80 bg-white/90 px-3.5 py-2 shadow-2xs backdrop-blur-xs transition-all hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-card"
            >
              {item.marketplaceId ? (
                <MarketplaceIcon id={item.marketplaceId} size={16} />
              ) : (
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-lg border border-stone-200 bg-stone-50"
                  style={{ color: item.color }}
                >
                  <GoogleIcon name={item.iconName || 'store'} size={15} filled />
                </span>
              )}

              <div className="flex flex-col text-left">
                <span className="font-display text-xs font-bold text-stone-800 transition-colors group-hover/item:text-emerald-700">
                  {item.name}
                </span>
                <span className="text-[10px] text-stone-600 font-medium">
                  {item.tagline}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
