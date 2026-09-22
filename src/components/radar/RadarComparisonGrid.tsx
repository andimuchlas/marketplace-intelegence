'use client';

import { motion } from 'framer-motion';
import { Trophy, ExternalLink, Star, ShieldCheck, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { PriceRadarResult, MarketplaceProductOffer } from '@/domain/radar/types';
import { formatRupiah } from '@/lib/formatting/currency';

interface RadarComparisonGridProps {
  result: PriceRadarResult;
}

const MARKETPLACE_STYLES: Record<
  string,
  { badgeBg: string; badgeText: string; dotColor: string; name: string }
> = {
  shopee: {
    badgeBg: 'bg-orange-50 border-orange-200 text-orange-800',
    badgeText: 'Shopee Mall',
    dotColor: 'bg-[#EE4D2D]',
    name: 'Shopee',
  },
  tokopedia: {
    badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    badgeText: 'Official Store',
    dotColor: 'bg-[#03AC0E]',
    name: 'Tokopedia',
  },
  'tiktok-shop': {
    badgeBg: 'bg-stone-100 border-stone-300 text-stone-900',
    badgeText: 'TikTok Mall',
    dotColor: 'bg-black',
    name: 'TikTok Shop',
  },
  lazada: {
    badgeBg: 'bg-blue-50 border-blue-200 text-blue-800',
    badgeText: 'LazMall',
    dotColor: 'bg-[#0F146D]',
    name: 'Lazada',
  },
};

export function RadarComparisonGrid({ result }: RadarComparisonGridProps) {
  if (!result || result.offers.length === 0) {
    return null;
  }

  const hasSavings = result.priceDelta > 0;

  return (
    <div className="w-full">
      {/* 1. Comparative Summary Bar */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-card sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                <Trophy className="h-3.5 w-3.5" />
                Hasil Radar Harga
              </span>
              <span className="text-xs text-primary-400">
                Pencarian: &quot;<strong className="text-primary-800">{result.query}</strong>&quot;
              </span>
            </div>

            <div className="mt-1.5 flex flex-wrap items-baseline gap-2">
              <span className="text-lg font-bold text-primary-900 sm:text-xl">
                Harga Termurah:{' '}
                <span className="font-mono text-emerald-600 tabular-nums">
                  {formatRupiah(result.lowestPrice)}
                </span>
              </span>
              <span className="text-xs font-semibold text-primary-500">
                di {result.winningMarketplaceName}
              </span>
            </div>

            {hasSavings && (
              <p className="mt-1 text-xs text-primary-600">
                💡 Potensi hemat hingga{' '}
                <strong className="font-mono font-bold text-emerald-700 tabular-nums">
                  {formatRupiah(result.priceDelta)}
                </strong>{' '}
                dibandingkan penawaran tertinggi ({formatRupiah(result.highestPrice)}).
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            {result.cached ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-[11px] font-medium text-primary-500">
                <Clock className="h-3 w-3 text-primary-400" />
                Data Cache 1 Jam
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                Live Price Fetch
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Side-by-Side 4 Platform Grid */}
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {result.offers.map((offer) => (
          <OfferCard key={`${offer.marketplaceId}-${offer.productId}`} offer={offer} query={result.query} />
        ))}
      </div>
    </div>
  );
}

function OfferCard({ offer, query }: { offer: MarketplaceProductOffer; query: string }) {
  const meta = MARKETPLACE_STYLES[offer.marketplaceId] || {
    badgeBg: 'bg-stone-100 border-stone-200 text-stone-800',
    badgeText: offer.marketplaceName,
    dotColor: 'bg-primary-500',
    name: offer.marketplaceName,
  };

  // Build safe outbound link routing through click tracking
  const clickTrackingUrl = `/api/radar/click?marketplace=${encodeURIComponent(
    offer.marketplaceId
  )}&productId=${encodeURIComponent(offer.productId)}&q=${encodeURIComponent(query)}&targetUrl=${encodeURIComponent(
    offer.affiliateUrl
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border transition-all ${
        offer.isLowestPrice
          ? 'border-emerald-500 bg-gradient-to-b from-emerald-50/30 to-white shadow-elevated ring-2 ring-emerald-500/20'
          : 'border-stone-200 bg-white shadow-card hover:border-stone-300'
      }`}
    >
      {/* Lowest Price Winner Banner */}
      {offer.isLowestPrice && (
        <div className="flex items-center justify-center gap-1 bg-emerald-600 py-1.5 px-3 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
          <Trophy className="h-3 w-3" />
          <span>Paling Termurah</span>
        </div>
      )}

      <div className="p-5">
        {/* Marketplace Pill */}
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-semibold ${meta.badgeBg}`}
          >
            <span className={`h-2 w-2 rounded-full ${meta.dotColor}`} />
            {meta.name}
          </span>
          {offer.isOfficialStore && (
            <span className="flex items-center gap-0.5 text-[11px] font-semibold text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Resmi
            </span>
          )}
        </div>

        {/* Product Title */}
        <h3
          className="mt-3 font-display text-sm font-semibold leading-snug text-primary-900 line-clamp-2"
          title={offer.title}
        >
          {offer.title}
        </h3>

        {/* Price Tag */}
        <div className="mt-3">
          <div className="font-mono text-2xl font-extrabold tracking-tight text-primary-900 tabular-nums">
            {formatRupiah(offer.currentPrice)}
          </div>
          {offer.originalPrice > offer.currentPrice && (
            <div className="mt-0.5 flex items-center gap-1.5 text-xs">
              <span className="font-mono text-primary-400 line-through tabular-nums">
                {formatRupiah(offer.originalPrice)}
              </span>
              {offer.discountPercentage && (
                <span className="rounded bg-rose-50 px-1.5 py-0.2 font-mono text-[10px] font-bold text-rose-600">
                  -{offer.discountPercentage}%
                </span>
              )}
            </div>
          )}
        </div>

        {/* Merchant & Social Proof */}
        <div className="mt-4 border-t border-stone-100 pt-3 text-xs text-primary-500">
          <div className="flex items-center justify-between">
            <span className="truncate font-medium text-primary-700">{offer.shopName}</span>
            {offer.shopCity && (
              <span className="flex items-center gap-0.5 text-[11px] text-primary-400">
                <MapPin className="h-3 w-3" />
                {offer.shopCity}
              </span>
            )}
          </div>

          <div className="mt-1.5 flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1 font-semibold text-amber-600">
              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
              {offer.rating}
            </span>
            <span className="font-mono text-primary-400 tabular-nums">
              {offer.totalSold > 1000 ? `${(offer.totalSold / 1000).toFixed(1)}rb terjual` : `${offer.totalSold} terjual`}
            </span>
          </div>
        </div>
      </div>

      {/* Outbound Action Button */}
      <div className="p-5 pt-0">
        <a
          href={clickTrackingUrl}
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
          className={`flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 px-4 text-xs font-semibold shadow-sm transition-all active:scale-95 ${
            offer.isLowestPrice
              ? 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-subtle'
              : 'border border-stone-300 bg-white text-primary-800 hover:border-emerald-600 hover:text-emerald-800'
          }`}
        >
          <span>Beli di {meta.name}</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.div>
  );
}
