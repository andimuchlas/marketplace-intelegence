'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { PromoSlide, DEFAULT_PROMOTIONS } from '@/config/promos';
import { MarketplaceIcon } from '@/components/ui/MarketplaceIcon';
import { GoogleIcon } from '@/components/ui/Icon';
import { formatRupiah } from '@/lib/formatting/currency';

interface AffiliateCarouselProps {
  initialPromos?: PromoSlide[];
  className?: string;
}

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 240 : -240,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring' as const, stiffness: 320, damping: 30 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 240 : -240,
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: 'spring' as const, stiffness: 320, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
};

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

  // Autoplay rotation every 5.5 seconds with pause-on-hover
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 5500);
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

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-card transition-all ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Top Bar Indicator */}
      <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50/80 px-4 py-2 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <GoogleIcon name="auto_awesome" size={13} filled className="text-emerald-700" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary-900">
            Radar Spotlight
          </span>
          {activePromo.badge && (
            <span className="rounded-full bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
              {activePromo.badge}
            </span>
          )}
        </div>

        {/* Slide Counter & Dots */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {promos.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  const diff = idx - currentIndex;
                  if (diff !== 0) setPage([page + diff, diff > 0 ? 1 : -1]);
                }}
                aria-label={`Lihat promo ke-${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-5 bg-emerald-600'
                    : 'w-1.5 bg-stone-300 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] text-stone-400">
            {currentIndex + 1}/{total}
          </span>
        </div>
      </div>

      {/* Main Slide Body with Motion Transition */}
      <div className="relative min-h-[140px] sm:min-h-[120px] overflow-hidden">
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
            onClick={() => handleSlideClick(activePromo)}
            className="cursor-pointer p-4 sm:p-5 transition-colors hover:bg-stone-50/50"
          >
            {activePromo.type === 'campaign_banner' ? (
              // Mode A: Campaign Banner (e.g. 10.10, WIB)
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    {activePromo.marketplace !== 'all' && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-primary-800 shadow-2xs">
                        <MarketplaceIcon id={activePromo.marketplace} size={14} />
                        <span className="capitalize">
                          {activePromo.marketplace.replace('-', ' ')}
                        </span>
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                      <GoogleIcon name="sell" size={13} filled className="text-emerald-600" />
                      Promo Pilihan
                    </span>
                  </div>

                  <h2 className="font-display text-base font-bold tracking-tight text-primary-900 sm:text-lg lg:text-xl">
                    {activePromo.title}
                  </h2>

                  {activePromo.subtitle && (
                    <p className="text-xs text-primary-600 sm:text-sm line-clamp-2">
                      {activePromo.subtitle}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-primary-900 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition-transform group-hover:scale-[1.02] active:scale-95 sm:text-sm"
                  >
                    <span>{activePromo.ctaText}</span>
                    <GoogleIcon name="arrow_outward" size={15} />
                  </button>
                </div>
              </div>
            ) : (
              // Mode B: Curated Product Spotlight (Price Drop Deal)
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                {/* Product Image */}
                <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
                  <img
                    src={activePromo.imageUrl}
                    alt={activePromo.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                  {activePromo.discountPercent && (
                    <span className="absolute left-1 top-1 rounded-md bg-rose-600 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white shadow-xs">
                      -{activePromo.discountPercent}%
                    </span>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-primary-800 shadow-2xs">
                      <MarketplaceIcon id={activePromo.marketplace} size={12} />
                      <span className="capitalize">
                        {activePromo.marketplace.replace('-', ' ')}
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                      <GoogleIcon name="trending_down" size={13} className="text-emerald-600" />
                      Penawaran Terbaik
                    </span>
                  </div>

                  <h2 className="font-display text-sm font-bold text-primary-900 sm:text-base truncate">
                    {activePromo.title}
                  </h2>

                  {activePromo.subtitle && (
                    <p className="text-xs text-primary-500 line-clamp-1">
                      {activePromo.subtitle}
                    </p>
                  )}

                  {/* Price Row */}
                  <div className="flex items-baseline gap-2 pt-0.5">
                    {activePromo.dealPrice && (
                      <span className="font-display text-base font-extrabold text-emerald-700 sm:text-lg">
                        {formatRupiah(activePromo.dealPrice)}
                      </span>
                    )}
                    {activePromo.originalPrice && (
                      <span className="text-xs text-stone-400 line-through">
                        {formatRupiah(activePromo.originalPrice)}
                      </span>
                    )}
                    {activePromo.discountPercent && (
                      <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-700 border border-rose-200/60">
                        Diskon {activePromo.discountPercent}%
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
                  <button
                    type="button"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition-all hover:bg-emerald-800 active:scale-95"
                  >
                    <span>{activePromo.ctaText}</span>
                    <GoogleIcon name="arrow_outward" size={15} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Manual Prev / Next Buttons */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              paginate(-1);
            }}
            aria-label="Slide sebelumnya"
            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full border border-stone-200 bg-white/90 text-primary-700 opacity-0 shadow-xs backdrop-blur-xs transition-all hover:bg-white hover:text-black group-hover:opacity-100"
          >
            <GoogleIcon name="chevron_left" size={16} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              paginate(1);
            }}
            aria-label="Slide berikutnya"
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full border border-stone-200 bg-white/90 text-primary-700 opacity-0 shadow-xs backdrop-blur-xs transition-all hover:bg-white hover:text-black group-hover:opacity-100"
          >
            <GoogleIcon name="chevron_right" size={16} />
          </button>
        </>
      )}
    </div>
  );
}
