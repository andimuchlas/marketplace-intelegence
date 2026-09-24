'use client';

import { Trophy, TrendingDown, ArrowRight, ShieldCheck } from 'lucide-react';
import { PriceRadarResult } from '@/domain/radar/types';
import { formatRupiah } from '@/lib/formatting/currency';
import { MarketplaceIcon } from '@/components/ui/MarketplaceIcon';

interface SearchBestDealBannerProps {
  result: PriceRadarResult;
}

export function SearchBestDealBanner({ result }: SearchBestDealBannerProps) {
  if (!result || result.offers.length === 0) return null;

  const lowestOffer = result.offers.find((o) => o.isLowestPrice) || result.offers[0];
  const hasSavings = result.priceDelta > 0;
  const savingsPct = result.savingsPercentage || 0;

  const clickTrackingUrl = `/api/radar/click?marketplace=${encodeURIComponent(
    lowestOffer.marketplaceId
  )}&productId=${encodeURIComponent(lowestOffer.productId)}&q=${encodeURIComponent(
    result.query
  )}&targetUrl=${encodeURIComponent(lowestOffer.affiliateUrl)}`;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-300/80 bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white p-4 sm:p-5 shadow-card">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Side: Summary & Winner Badge */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-xs">
              <Trophy className="h-3.5 w-3.5" />
              <span>Penawaran Termurah Ditemukan</span>
            </span>

            {savingsPct > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                <TrendingDown className="h-3.5 w-3.5 text-emerald-700" />
                <span>{savingsPct}% Lebih Murah</span>
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-baseline gap-2.5 pt-1">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-stone-900 font-mono tabular-nums">
              {formatRupiah(result.lowestPrice)}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-stone-600 font-medium">di</span>
              <span className="inline-flex items-center gap-1 rounded-md bg-white border border-stone-200 px-2 py-0.5 text-xs font-bold text-stone-800 shadow-2xs">
                <MarketplaceIcon id={result.winningMarketplaceId} size={14} />
                <span>{result.winningMarketplaceName}</span>
              </span>
            </div>
          </div>

          {hasSavings && (
            <p className="text-xs text-stone-600 leading-relaxed">
              Hemat hingga{' '}
              <strong className="font-mono font-bold text-emerald-700 tabular-nums">
                {formatRupiah(result.priceDelta)}
              </strong>{' '}
              dibandingkan penawaran tertinggi di platform lain ({formatRupiah(result.highestPrice)}).
            </p>
          )}
        </div>

        {/* Right Side: Quick Action CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex flex-col items-end text-right">
            <span className="text-[11px] font-semibold text-stone-500 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Transaksi Langsung di Aplikasi Resmi
            </span>
            <span className="text-[10px] text-stone-400">Garansi & Perlindungan Konsumen</span>
          </div>

          <a
            href={clickTrackingUrl}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-subtle hover:bg-emerald-800 active:scale-95 transition-all"
          >
            <span>Beli Termurah di {result.winningMarketplaceName}</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
