'use client';

import React from 'react';

interface AffiliatePartner {
  name: string;
  logo: string;
  heightClass: string;
}

const AFFILIATE_PARTNERS: AffiliatePartner[] = [
  {
    name: 'Shopee',
    logo: '/assets/logo/shopee.png',
    heightClass: 'h-8 sm:h-9',
  },
  {
    name: 'Tokopedia',
    logo: '/assets/logo/tokopedia.png',
    heightClass: 'h-8 sm:h-9',
  },
  {
    name: 'TikTok Shop',
    logo: '/assets/logo/tiktok.png',
    heightClass: 'h-7 sm:h-8',
  },
  {
    name: 'Lazada',
    logo: '/assets/logo/lazada.png',
    heightClass: 'h-7 sm:h-8',
  },
];

export function InfiniteLogoSlider({ className = '' }: { className?: string }) {
  // Duplicate array 6 times to ensure seamless infinite looping on all screen sizes
  const extendedList = [
    ...AFFILIATE_PARTNERS,
    ...AFFILIATE_PARTNERS,
    ...AFFILIATE_PARTNERS,
    ...AFFILIATE_PARTNERS,
    ...AFFILIATE_PARTNERS,
    ...AFFILIATE_PARTNERS,
  ];

  return (
    <div
      className={`w-full overflow-hidden rounded-2xl border border-stone-200/90 bg-white py-5 px-4 sm:px-6 shadow-card ${className}`}
    >
      {/* Header Label - Clean title only without extra sub-text or tags */}
      <div className="text-center mb-4">
        <h3 className="font-display text-xs font-bold uppercase tracking-widest text-stone-500 sm:text-[13px]">
          Official Affiliate Partners
        </h3>
      </div>

      {/* Marquee Track with Inner Edge Fade Masks */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_6%,white_94%,transparent)]">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center gap-12 sm:gap-16 py-1">
          {extendedList.map((partner, idx) => (
            <div
              key={`${partner.name}-${idx}`}
              className="flex shrink-0 items-center justify-center transition-transform duration-200 hover:scale-105"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className={`${partner.heightClass} w-auto object-contain opacity-85 hover:opacity-100 transition-opacity`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
