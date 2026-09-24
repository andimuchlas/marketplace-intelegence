'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { PromoSlide, DEFAULT_PROMOTIONS, TrustBadgeItem } from '@/config/promos';
import { MarketplaceIcon } from '@/components/ui/MarketplaceIcon';
import { GoogleIcon } from '@/components/ui/Icon';
import { formatRupiah } from '@/lib/formatting/currency';

interface AffiliateCarouselProps {
  initialPromos?: PromoSlide[];
  className?: string;
}

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 180 : -180,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 320, damping: 30 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 180 : -180,
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: 'spring', stiffness: 320, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
};

const DEFAULT_TRUST_BADGES: TrustBadgeItem[] = [
  { icon: 'verified', label: 'Garansi Resmi', sublabel: 'Toko Official' },
  { icon: 'local_shipping', label: 'Pengiriman Cepat', sublabel: 'Dari Jakarta' },
  { icon: 'star', label: '4.8 (12rb+ ulasan)', sublabel: 'Produk Terlaris' },
  { icon: 'sync', label: '7 Hari', sublabel: 'Mudah Return' },
];

export function AffiliateCarousel({
  initialPromos = DEFAULT_PROMOTIONS,
  className = '',
}: AffiliateCarouselProps) {
  const [promos, setPromos] = useState<PromoSlide[]>(initialPromos);
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch dynamic promotions from CMS API on mount
  useEffect(() => {
    let isMounted = true;
    async function loadPromos() {
      try {
        const res = await fetch('/api/promotions');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.promotions) && data.promotions.length > 0 && isMounted) {
            setPromos(data.promotions);
          }
        }
      } catch {
        // Silently keep default fallback promos on error
      }
    }
    loadPromos();
    return () => {
      isMounted = false;
    };
  }, []);

  const total = promos.length;
  const currentIndex = total > 0 ? ((page % total) + total) % total : 0;

  const paginate = useCallback(
    (newDirection: number) => {
      if (total <= 1) return;
      setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
    },
    [total]
  );

  // Autoplay rotation every 6 seconds with pause-on-hover
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, paginate, total]);

  const handleSlideClick = (promo: PromoSlide) => {
    try {
      fetch('/api/radar/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          marketplace: promo.marketplace,
          productId: String(promo.id),
          query: promo.title,
        }),
      }).catch(() => {});
    } catch {
      // Non-blocking beacon
    }

    if (promo.targetUrl) {
      window.open(promo.targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (total === 0) return null;

  const activePromo = promos[currentIndex] || promos[0];
  const platformName =
    activePromo.marketplace === 'tiktok-shop'
      ? 'TikTok Shop'
      : activePromo.marketplace === 'tokopedia'
      ? 'Tokopedia'
      : activePromo.marketplace === 'lazada'
      ? 'Lazada'
      : activePromo.marketplace === 'shopee'
      ? 'Shopee'
      : 'Marketplace';

  const highlights =
    activePromo.highlights && activePromo.highlights.length > 0
      ? activePromo.highlights
      : activePromo.subtitle
      ? activePromo.subtitle.split(',').map((s) => s.trim())
      : ['Garansi Resmi Toko', 'Harga Termurah Hari Ini', 'Stok Terbatas'];

  const trustBadges = activePromo.trustBadges || DEFAULT_TRUST_BADGES;

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-stone-200/90 bg-white p-5 sm:p-7 shadow-card transition-all ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Top Bar Indicator with Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
        {/* Left: Brand Badge & Spotlight Tag */}
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-4 ring-emerald-50">
            <GoogleIcon name="radar" size={16} filled className="text-emerald-600 animate-pulse" />
          </span>
          <span className="font-display text-sm font-extrabold tracking-wider text-stone-900 uppercase">
            RADAR SPOTLIGHT
          </span>
          {activePromo.badge && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
              <GoogleIcon name="local_offer" size={12} filled className="text-emerald-600" />
              <span>{activePromo.badge}</span>
            </span>
          )}
        </div>

        {/* Right: Carousel Navigation Controls */}
        <div className="flex items-center gap-2">
          {/* Prev Button */}
          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Promo sebelumnya"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 shadow-2xs hover:bg-stone-50 hover:border-stone-300 transition-colors"
          >
            <GoogleIcon name="chevron_left" size={16} />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5 mx-1">
            {promos.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  const diff = idx - currentIndex;
                  if (diff !== 0) setPage([page + diff, diff > 0 ? 1 : -1]);
                }}
                aria-label={`Lihat promo ke-${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-5 bg-emerald-600'
                    : 'w-2 bg-stone-200 hover:bg-stone-300'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label="Promo berikutnya"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 shadow-2xs hover:bg-stone-50 hover:border-stone-300 transition-colors"
          >
            <GoogleIcon name="chevron_right" size={16} />
          </button>

          {/* Counter */}
          <span className="font-mono text-xs font-medium text-stone-400 ml-1">
            {currentIndex + 1}/{total}
          </span>
        </div>
      </div>

      {/* Main Slide Body with Motion Transition */}
      <div className="relative mt-5 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -8000 || offset.x < -60) {
                paginate(1);
              } else if (swipe > 8000 || offset.x > 60) {
                paginate(-1);
              }
            }}
            className="flex flex-col md:flex-row items-center gap-6 sm:gap-8"
          >
            {/* Left Column: Product Image with Discount Badge */}
            <div
              onClick={() => handleSlideClick(activePromo)}
              className="relative aspect-square w-44 sm:w-52 md:w-56 shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-stone-200/80 bg-stone-50 shadow-md group/img"
            >
              <img
                src={activePromo.imageUrl}
                alt={activePromo.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                loading="lazy"
              />
              {activePromo.discountPercent && (
                <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-0.5 rounded-lg bg-rose-600 px-2 py-0.5 text-xs font-black text-white shadow-md">
                  <GoogleIcon name="bolt" size={12} filled className="text-amber-300" />
                  <span>-{activePromo.discountPercent}%</span>
                </span>
              )}
            </div>

            {/* Right Column: Details, Highlights, Prices, and CTA */}
            <div className="flex-1 min-w-0 w-full">
              {/* Row 1: Marketplace & Status Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-bold text-stone-800 shadow-2xs">
                  <MarketplaceIcon id={activePromo.marketplace} size={14} />
                  <span className="capitalize">{platformName}</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
                  <GoogleIcon name="trending_up" size={14} className="text-emerald-600" />
                  <span>Penawaran Terbaik</span>
                </span>
              </div>

              {/* Row 2: Product Title */}
              <h2
                onClick={() => handleSlideClick(activePromo)}
                className="mt-2.5 font-display text-lg sm:text-xl md:text-2xl font-extrabold text-stone-900 tracking-tight leading-snug line-clamp-2 cursor-pointer hover:text-emerald-700 transition-colors"
              >
                {activePromo.title}
              </h2>

              {/* Row 3: Highlight Bullet Features */}
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-stone-600">
                {highlights.map((feat, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span className="text-stone-300 select-none">|</span>}
                    <span className="inline-flex items-center gap-1">
                      <GoogleIcon
                        name={idx === 0 ? 'verified' : idx === 1 ? 'local_shipping' : 'bolt'}
                        size={14}
                        filled
                        className="text-emerald-600"
                      />
                      <span>{feat}</span>
                    </span>
                  </React.Fragment>
                ))}
              </div>

              {/* Row 4: Pricing & Action Button */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Price Line */}
                <div className="flex flex-wrap items-baseline gap-2.5">
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-700 tabular-nums">
                    {formatRupiah(activePromo.dealPrice || 312000)}
                  </span>
                  {activePromo.originalPrice && (
                    <span className="font-mono text-sm sm:text-base font-medium text-stone-400 line-through tabular-nums">
                      {formatRupiah(activePromo.originalPrice)}
                    </span>
                  )}
                  {activePromo.discountPercent && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 border border-rose-200/80 px-2 py-0.5 text-xs font-bold text-rose-600">
                      <GoogleIcon name="local_offer" size={11} filled />
                      <span>Diskon {activePromo.discountPercent}%</span>
                    </span>
                  )}
                </div>

                {/* Direct Affiliate CTA Button */}
                <div className="relative inline-flex items-center">
                  {/* Subtle celebratory sunburst icon top-right */}
                  <div className="absolute -top-3 -right-2 flex items-center justify-center text-emerald-500 font-bold select-none pointer-events-none opacity-90 animate-pulse">
                    <GoogleIcon name="auto_awesome" size={16} filled className="text-emerald-500" />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSlideClick(activePromo)}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 sm:px-7 py-3 text-sm shadow-md transition-all hover:scale-[1.02] active:scale-98"
                  >
                    <span>{activePromo.ctaText || `Cek di ${platformName}`}</span>
                    <GoogleIcon name="arrow_outward" size={16} />
                  </button>
                </div>
              </div>

              {/* Row 5: Trust Badges Bar */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 rounded-2xl bg-stone-50/90 border border-stone-200/70 p-2.5 sm:p-3 text-xs">
                {trustBadges.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white border border-stone-200/80 text-emerald-600 shadow-2xs">
                      <GoogleIcon name={item.icon} size={15} filled />
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-stone-800 text-[11px] truncate">
                        {item.label}
                      </span>
                      <span className="text-[10px] text-stone-600 truncate">
                        {item.sublabel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
