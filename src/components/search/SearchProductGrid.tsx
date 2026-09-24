'use client';

import { GoogleIcon } from '@/components/ui/Icon';
import { MarketplaceProductOffer } from '@/domain/radar/types';
import { SearchProductCard } from './SearchProductCard';

interface SearchProductGridProps {
  offers: MarketplaceProductOffer[];
  query: string;
  onResetFilters?: () => void;
}

export function SearchProductGrid({
  offers,
  query,
  onResetFilters,
}: SearchProductGridProps) {
  if (offers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center shadow-xs">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-stone-400">
          <GoogleIcon name="search_off" size={28} />
        </div>
        <h3 className="mt-4 font-display text-base font-bold text-stone-900">
          Tidak Ada Produk yang Cocok
        </h3>
        <p className="mt-1.5 max-w-md text-xs text-stone-500 leading-relaxed">
          Kriteria filter Anda terlalu spesifik atau belum ada penawaran di rentang harga yang dipilih.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-stone-900 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-stone-800 transition-all active:scale-95"
          >
            <GoogleIcon name="refresh" size={14} />
            <span>Reset Semua Filter</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-3.5 lg:grid-cols-4 xl:grid-cols-5">
      {offers.map((offer) => (
        <SearchProductCard
          key={`${offer.marketplaceId}-${offer.productId}`}
          offer={offer}
          query={query}
        />
      ))}
    </div>
  );
}
