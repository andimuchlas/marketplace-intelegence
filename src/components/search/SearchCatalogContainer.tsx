'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleIcon } from '@/components/ui/Icon';
import { PriceRadarResult, MarketplaceProductOffer } from '@/domain/radar/types';
import { SearchBestDealBanner } from './SearchBestDealBanner';
import { SearchFilterSidebar, FilterState } from './SearchFilterSidebar';
import { SearchProductGrid } from './SearchProductGrid';
import { RadarDisclaimerBox } from '@/components/radar/RadarDisclaimerBox';

interface SearchCatalogContainerProps {
  initialResult: PriceRadarResult;
  initialQuery: string;
}

type SortOption = 'relevance' | 'price_asc' | 'price_desc' | 'rating_desc' | 'sales_desc';

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: 'relevance', label: 'Paling Sesuai' },
  { id: 'price_asc', label: 'Harga Terendah' },
  { id: 'price_desc', label: 'Harga Tertinggi' },
  { id: 'rating_desc', label: 'Rating Tertinggi' },
  { id: 'sales_desc', label: 'Terlaris' },
];

const INITIAL_FILTERS: FilterState = {
  marketplaces: [],
  minPrice: null,
  maxPrice: null,
  officialOnly: false,
  minRating: null,
  hasDiscountOnly: false,
};

export function SearchCatalogContainer({
  initialResult,
  initialQuery,
}: SearchCatalogContainerProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [sortOption, setSortOption] = useState<SortOption>('relevance');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Marketplace item counts from base catalog
  const marketplaceCounts = useMemo(() => {
    const counts: Record<string, number> = {
      shopee: 0,
      tokopedia: 0,
      'tiktok-shop': 0,
      lazada: 0,
    };
    initialResult.offers.forEach((o) => {
      if (counts[o.marketplaceId] !== undefined) {
        counts[o.marketplaceId]++;
      }
    });
    return counts;
  }, [initialResult.offers]);

  // Filter & Sort Logic
  const filteredOffers = useMemo(() => {
    let list = [...initialResult.offers];

    // 1. Marketplace Filter
    if (filters.marketplaces.length > 0) {
      list = list.filter((o) => filters.marketplaces.includes(o.marketplaceId));
    }

    // 2. Price Min Filter
    if (filters.minPrice !== null) {
      list = list.filter((o) => o.currentPrice >= filters.minPrice!);
    }

    // 3. Price Max Filter
    if (filters.maxPrice !== null) {
      list = list.filter((o) => o.currentPrice <= filters.maxPrice!);
    }

    // 4. Official Store Filter
    if (filters.officialOnly) {
      list = list.filter((o) => o.isOfficialStore);
    }

    // 5. Rating Filter
    if (filters.minRating !== null) {
      list = list.filter((o) => o.rating >= filters.minRating!);
    }

    // 6. Discount Only Filter
    if (filters.hasDiscountOnly) {
      list = list.filter((o) => o.originalPrice > o.currentPrice && (o.discountPercentage ?? 0) > 0);
    }

    // Sort
    switch (sortOption) {
      case 'price_asc':
        list.sort((a, b) => a.currentPrice - b.currentPrice);
        break;
      case 'price_desc':
        list.sort((a, b) => b.currentPrice - a.currentPrice);
        break;
      case 'rating_desc':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'sales_desc':
        list.sort((a, b) => b.totalSold - a.totalSold);
        break;
      case 'relevance':
      default:
        // Default: Keep order with lowest price item prominently featured
        break;
    }

    return list;
  }, [initialResult.offers, filters, sortOption]);

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const activeFilterCount =
    filters.marketplaces.length +
    (filters.minPrice !== null || filters.maxPrice !== null ? 1 : 0) +
    (filters.officialOnly ? 1 : 0) +
    (filters.minRating !== null ? 1 : 0) +
    (filters.hasDiscountOnly ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* 1. Best Deal Highlight Banner */}
      <SearchBestDealBanner result={initialResult} />

      {/* 2. Catalog Control Bar (Count, Sort tabs, Mobile filter trigger) */}
      <div className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-3 sm:p-4 shadow-2xs sm:flex-row sm:items-center sm:justify-between">
        {/* Result Counter & Search Keywords */}
        <div className="flex items-center justify-between sm:justify-start gap-2">
          <p className="text-xs text-stone-600">
            Menampilkan{' '}
            <strong className="font-mono text-stone-900 font-bold tabular-nums">
              {filteredOffers.length}
            </strong>{' '}
            penawaran untuk &quot;<strong className="text-emerald-800">{initialQuery}</strong>&quot;
          </p>

          {/* Mobile Filter Trigger Button */}
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-800 lg:hidden hover:bg-stone-100"
          >
            <GoogleIcon name="tune" size={14} className="text-emerald-700" />
            <span>Filter</span>
            {activeFilterCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Sort Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-stone-500 mr-2 shrink-0">
            <GoogleIcon name="swap_vert" size={15} />
            <span>Urutkan:</span>
          </div>

          {SORT_OPTIONS.map((opt) => {
            const isActive = sortOption === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSortOption(opt.id)}
                className={`shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-stone-900 font-bold text-white shadow-2xs'
                    : 'bg-stone-100/80 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main 2-Column Catalog Body (Sidebar Filter + Product Grid) */}
      <div className="flex gap-6 items-start">
        {/* Left Filter Sidebar */}
        <SearchFilterSidebar
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleResetFilters}
          marketplaceCounts={marketplaceCounts}
          isOpenMobile={isMobileFilterOpen}
          onCloseMobile={() => setIsMobileFilterOpen(false)}
        />

        {/* Right Product Grid */}
        <main className="flex-1 min-w-0">
          <SearchProductGrid
            offers={filteredOffers}
            query={initialQuery}
            onResetFilters={handleResetFilters}
          />
        </main>
      </div>

      {/* 4. Consumer Price Transparency Box */}
      <div className="pt-6">
        <RadarDisclaimerBox />
      </div>
    </div>
  );
}
