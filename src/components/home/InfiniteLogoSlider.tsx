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
    heightClass: 'h-11 sm:h-14',
  },
  {
    name: 'Tokopedia',
    logo: '/assets/logo/tokopedia.png',
    heightClass: 'h-11 sm:h-14',
  },
  {
    name: 'TikTok Shop',
    logo: '/assets/logo/tiktok.png',
    heightClass: 'h-10 sm:h-13',
  },
  {
    name: 'Lazada',
    logo: '/assets/logo/lazada.png',
    heightClass: 'h-9 sm:h-12',
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
    <div className={`w-full py-4 sm:py-6 overflow-hidden ${className}`}>
      {/* Header Label - Clean title only without extra sub-text or tags */}
      <div className="text-center mb-5 sm:mb-6">
        <h2 className="font-display text-xs font-bold uppercase tracking-widest text-stone-600 sm:text-[13px]">
          Official Affiliate Partners
        </h2>
      </div>

      {/* Seamless Marquee Track with Soft Edge Fade Masks */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center gap-14 sm:gap-20 py-2">
          {extendedList.map((partner, idx) => (
            <div
              key={`${partner.name}-${idx}`}
              className="flex shrink-0 items-center justify-center transition-transform duration-200 hover:scale-105"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className={`${partner.heightClass} w-auto object-contain opacity-90 hover:opacity-100 transition-opacity drop-shadow-2xs`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
