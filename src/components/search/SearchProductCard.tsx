'use client';

import { GoogleIcon } from '@/components/ui/Icon';
import { MarketplaceProductOffer } from '@/domain/radar/types';
import { formatRupiah } from '@/lib/formatting/currency';
import { MarketplaceIcon } from '@/components/ui/MarketplaceIcon';

interface SearchProductCardProps {
  offer: MarketplaceProductOffer;
  query: string;
}

export function SearchProductCard({ offer, query }: SearchProductCardProps) {
  const clickTrackingUrl = `/api/radar/click?marketplace=${encodeURIComponent(
    offer.marketplaceId
  )}&productId=${encodeURIComponent(offer.productId)}&q=${encodeURIComponent(
    query
  )}&targetUrl=${encodeURIComponent(offer.affiliateUrl)}`;

  const hasDiscount = offer.originalPrice > offer.currentPrice && (offer.discountPercentage ?? 0) > 0;
  const formattedRating = Number(offer.rating || 4.8).toFixed(1);

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card ${
        offer.isLowestPrice
          ? 'border-emerald-500/80 shadow-xs ring-1 ring-emerald-500/30'
          : 'border-stone-200 hover:border-stone-300'
      }`}
    >
      {/* 1. Image Container with Badges */}
      <div>
        <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
          <img
            src={offer.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80'}
            alt={offer.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badges Overlay */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {/* Termurah / Paling Murah Winner Badge */}
            {offer.isLowestPrice && (
              <span className="inline-flex items-center gap-1 rounded bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                <GoogleIcon name="emoji_events" size={12} filled className="text-white" />
                <span>Paling Murah</span>
              </span>
            )}

            {/* Official Store Badge */}
            {offer.isOfficialStore && (
              <span className="inline-flex items-center gap-1 rounded bg-stone-900/85 px-1.5 py-0.5 text-[10px] font-semibold text-white shadow-xs backdrop-blur-xs">
                <GoogleIcon name="verified" size={11} filled className="text-emerald-400" />
                <span>Mall / Resmi</span>
              </span>
            )}
          </div>

          {/* Marketplace Platform Pill (Bottom Right of Image) */}
          <div className="absolute bottom-2 right-2 z-10">
            <span className="inline-flex items-center gap-1 rounded-md bg-white/95 px-1.5 py-0.5 text-[10px] font-bold shadow-xs backdrop-blur-xs border border-stone-200">
              <MarketplaceIcon id={offer.marketplaceId} size={13} />
              <span className="text-stone-800">{offer.marketplaceName}</span>
            </span>
          </div>
        </div>

        {/* 2. Product Information */}
        <div className="p-3 sm:p-3.5">
          {/* Title - 2 lines max */}
          <h3
            className="font-display text-xs font-semibold leading-snug text-stone-900 line-clamp-2 transition-colors group-hover:text-emerald-700 sm:text-sm"
            title={offer.title}
          >
            {offer.title}
          </h3>

          {/* Price Block */}
          <div className="mt-2.5">
            <div className="font-mono text-sm font-extrabold tracking-tight text-stone-900 tabular-nums sm:text-base">
              {formatRupiah(offer.currentPrice)}
            </div>

            {hasDiscount && (
              <div className="mt-0.5 flex items-center gap-1.5 text-[11px]">
                <span className="font-mono text-stone-400 line-through tabular-nums">
                  {formatRupiah(offer.originalPrice)}
                </span>
                <span className="rounded bg-rose-50 border border-rose-100 px-1 py-0.2 font-mono text-[10px] font-bold text-rose-600">
                  -{offer.discountPercentage}%
                </span>
              </div>
            )}
          </div>

          {/* Social Proof (Rating & Sold) */}
          <div className="mt-2 flex items-center gap-2 text-[11px]">
            <span className="inline-flex items-center gap-0.5 font-semibold text-amber-600">
              <GoogleIcon name="star" size={13} filled className="text-amber-500" />
              <span>{formattedRating}</span>
            </span>
            <span className="text-stone-300">•</span>
            <span className="font-mono text-stone-500 tabular-nums">
              {offer.totalSold > 1000
                ? `${(offer.totalSold / 1000).toFixed(1)}rb terjual`
                : `${offer.totalSold} terjual`}
            </span>
          </div>

          {/* Store Name & Location */}
          <div className="mt-2 flex items-center justify-between border-t border-stone-100 pt-2 text-[11px] text-stone-500">
            <span className="truncate max-w-[110px] sm:max-w-[130px] font-medium text-stone-600" title={offer.shopName}>
              {offer.shopName}
            </span>
            {offer.shopCity && (
              <span className="inline-flex items-center gap-0.5 text-stone-400 truncate shrink-0">
                <GoogleIcon name="location_on" size={11} className="text-stone-400" />
                <span className="truncate max-w-[80px]">{offer.shopCity}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 3. Outbound CTA Action */}
      <div className="p-3 pt-0 sm:p-3.5 sm:pt-0">
        <a
          href={clickTrackingUrl}
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
          className={`inline-flex w-full items-center justify-center gap-1.5 rounded-lg py-2 px-3 text-xs font-semibold shadow-2xs transition-all active:scale-[0.98] ${
            offer.isLowestPrice
              ? 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-subtle'
              : 'border border-stone-300 bg-white text-stone-800 hover:border-emerald-600 hover:text-emerald-800'
          }`}
        >
          <span>Beli di {offer.marketplaceName}</span>
          <GoogleIcon name="open_in_new" size={13} />
        </a>
      </div>
    </div>
  );
}
