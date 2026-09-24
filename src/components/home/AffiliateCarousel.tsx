'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PromoSlide, DEFAULT_PROMOTIONS } from '@/config/promos';
import { MarketplaceIcon } from '@/components/ui/MarketplaceIcon';
import { formatRupiah } from '@/lib/formatting/currency';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Tag,
  TrendingDown,
} from 'lucide-react';

interface AffiliateCarouselProps {
  initialPromos?: PromoSlide[];
  className?: string;
}

export function AffiliateCarousel({
  initialPromos = DEFAULT_PROMOTIONS,
  className = '',
}: AffiliateCarouselProps) {
  const [promos, setPromos] = useState<PromoSlide[]>(initialPromos);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

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

  const nextSlide = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay rotation every 5 seconds
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, total]);

  // Mobile swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
    setIsPaused(false);
  };

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
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar Indicator */}
      <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50/70 px-4 py-2 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Sparkles className="h-3 w-3" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary-900">
            Radar Spotlight
          </span>
          <span className="rounded-full bg-stone-200/70 px-2 py-0.5 text-[10px] font-semibold text-primary-600">
            {activePromo.badge}
          </span>
        </div>

        {/* Slide Counter & Dots */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {promos.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setCurrentIndex(idx)}
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

      {/* Main Slide Body */}
      <div
        onClick={() => handleSlideClick(activePromo)}
        className="cursor-pointer p-4 sm:p-5 transition-colors hover:bg-stone-50/40"
      >
        {activePromo.type === 'campaign_banner' ? (
          // Mode A: Campaign Banner (e.g. 10.10, WIB)
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                {activePromo.marketplace !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-primary-800 shadow-xs">
                    <MarketplaceIcon id={activePromo.marketplace} size={14} />
                    <span className="capitalize">
                      {activePromo.marketplace.replace('-', ' ')}
                    </span>
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                  <Tag className="h-3 w-3" />
                  Promo Terverifikasi
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
                className="inline-flex items-center gap-1.5 rounded-xl bg-primary-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-transform group-hover:scale-[1.02] active:scale-95 sm:text-sm"
              >
                <span>{activePromo.ctaText}</span>
                <ArrowUpRight className="h-4 w-4" />
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
                <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-primary-800 shadow-xs">
                  <MarketplaceIcon id={activePromo.marketplace} size={12} />
                  <span className="capitalize">
                    {activePromo.marketplace.replace('-', ' ')}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                  <TrendingDown className="h-3 w-3" />
                  Penurunan Harga
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
                    Hemat {activePromo.discountPercent}%
                  </span>
                )}
              </div>
            </div>

            {/* CTA Button */}
            <div className="w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-transform group-hover:bg-emerald-800 active:scale-95"
              >
                <span>{activePromo.ctaText}</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Manual Prev / Next Buttons */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Slide sebelumnya"
            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full border border-stone-200 bg-white/90 text-primary-700 opacity-0 shadow-sm backdrop-blur-xs transition-all hover:bg-white hover:text-black group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Slide berikutnya"
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full border border-stone-200 bg-white/90 text-primary-700 opacity-0 shadow-sm backdrop-blur-xs transition-all hover:bg-white hover:text-black group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );
}
