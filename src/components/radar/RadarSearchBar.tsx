'use client';

import { useState, useEffect, FormEvent, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleIcon } from '@/components/ui/Icon';

interface TrendingItem {
  query: string;
  tag?: string;
}

interface RadarSearchBarProps {
  initialQuery?: string;
  activeBenchmark?: string;
  onSearch?: (query: string) => void;
  redirectToSearchPage?: boolean;
  isLoading?: boolean;
  placeholder?: string;
}

const DEFAULT_POPULAR_POOL: TrendingItem[] = [
  { query: 'iPhone 15 128GB', tag: 'Populer' },
  { query: 'Skintific 5X Ceramide', tag: 'Trending' },
  { query: 'Air Fryer Gaabor 4L', tag: 'Diskon' },
  { query: 'Sony WH-1000XM5', tag: 'Elektronik' },
  { query: 'Ventela Public Low', tag: 'Sepatu' },
  { query: 'TWS Baseus Bowie WM02', tag: 'Murah' },
  { query: 'Xiaomi Smart Band 8', tag: 'Gadget' },
  { query: 'The Originote Hyalucera', tag: 'Skincare' },
  { query: 'Logitech Pebble M350', tag: 'Komputer' },
  { query: 'Aerostreet Massive Low', tag: 'Fashion' },
];

export function RadarSearchBar({
  initialQuery = '',
  activeBenchmark = 'iPhone 15 128GB',
  onSearch,
  redirectToSearchPage = false,
  isLoading = false,
  placeholder,
}: RadarSearchBarProps) {
  const router = useRouter();
  // Input starts empty by default so user can type immediately from blank without backspacing
  const [query, setQuery] = useState(initialQuery);
  const [pool, setPool] = useState<TrendingItem[]>(DEFAULT_POPULAR_POOL);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch real-time trending searches from database API on mount
  useEffect(() => {
    let isMounted = true;
    async function loadTrending() {
      try {
        const res = await fetch('/api/radar/popular');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.queries) && data.queries.length > 0 && isMounted) {
            setPool(data.queries);
          }
        }
      } catch {
        // Silently keep default pool on network error
      }
    }
    loadTrending();
    return () => {
      isMounted = false;
    };
  }, []);

  const executeSearch = useCallback(
    (targetQuery: string) => {
      const trimmed = targetQuery.trim();
      if (trimmed.length < 2) return;

      if (onSearch) {
        onSearch(trimmed);
      }

      if (redirectToSearchPage) {
        router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      }
    },
    [onSearch, redirectToSearchPage, router]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      executeSearch(query);
    } else if (activeBenchmark) {
      executeSearch(activeBenchmark);
    }
  };

  const handleChipClick = (chipQuery: string) => {
    executeSearch(chipQuery);
  };

  // Dynamic shuffle / rotate through pool
  const handleShuffle = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setVisibleStartIndex((prev) => (prev + 4) % Math.max(1, pool.length));
      setIsRefreshing(false);
    }, 200);
  };

  // Slice 6 items for display, ensuring activeBenchmark is visible if in pool
  const visibleChips = (() => {
    const total = pool.length;
    if (total <= 6) return pool;

    const items: TrendingItem[] = [];
    for (let i = 0; i < 6; i++) {
      items.push(pool[(visibleStartIndex + i) % total]);
    }

    // If activeBenchmark is not in the visible slice, inject it at position 0 so it's always highlighted
    const hasBenchmark = items.some(
      (item) => item.query.toLowerCase() === activeBenchmark.toLowerCase()
    );
    if (!hasBenchmark && activeBenchmark) {
      items.unshift({ query: activeBenchmark, tag: 'Aktif' });
      items.pop();
    }

    return items;
  })();

  const defaultPlaceholderText = activeBenchmark
    ? `Ketik nama barang... (sedang melihat: ${activeBenchmark})`
    : 'Cari barang untuk bandingkan harga (contoh: iPhone 15, Skintific, TWS)...';

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex h-14 w-full items-center rounded-2xl border-2 border-stone-200 bg-white shadow-card transition-all focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-600/10">
          <GoogleIcon name="search" size={20} className="ml-4 shrink-0 text-primary-400" />

          {/* Search input field starts empty so user types from clean slate */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder || defaultPlaceholderText}
            className="h-full w-full rounded-2xl bg-transparent px-3 text-sm font-medium text-primary-900 placeholder:text-stone-400 focus:outline-none sm:text-base"
          />

          {/* Clear input button */}
          {query.length > 0 && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="mr-2 p-1.5 text-stone-400 hover:text-stone-700 rounded-full transition-colors"
              aria-label="Bersihkan pencarian"
            >
              <GoogleIcon name="close" size={16} />
            </button>
          )}

          {/* Robust Search Button: whitespace-nowrap & shrink-0 prevents line break */}
          <button
            type="submit"
            disabled={isLoading || (!query.trim() && !activeBenchmark)}
            className="mr-2 inline-flex h-10 sm:h-11 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-emerald-700 px-4 sm:px-6 text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            {isLoading ? (
              <>
                <GoogleIcon name="progress_activity" size={16} className="animate-spin" />
                <span className="hidden sm:inline">Membandingkan...</span>
                <span className="sm:hidden">Mencari...</span>
              </>
            ) : (
              <>
                <GoogleIcon name="search" size={17} />
                <span className="hidden sm:inline">Cari Harga</span>
                <span className="sm:hidden">Cari</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Dynamic & Live Popular Searches with Active Highlight */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        {/* Live Indicator */}
        <div className="flex items-center gap-1.5 font-bold text-stone-600">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] uppercase tracking-wider">Tren Populer:</span>
        </div>

        {/* Dynamic Chips with Active Benchmark Highlight */}
        {visibleChips.map((chip) => {
          const isActive =
            activeBenchmark && chip.query.toLowerCase() === activeBenchmark.toLowerCase();

          return (
            <button
              key={chip.query}
              type="button"
              onClick={() => handleChipClick(chip.query)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all active:scale-95 ${
                isActive
                  ? 'border border-emerald-400 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20 shadow-2xs'
                  : 'border border-stone-200 bg-stone-50 text-stone-700 hover:border-emerald-400 hover:bg-emerald-50/50 hover:text-emerald-900'
              }`}
            >
              {isActive && (
                <GoogleIcon name="check" size={13} className="text-emerald-700" />
              )}
              <span>{chip.query}</span>
              {chip.tag && !isActive && (
                <span className="text-[9px] px-1 py-0.2 rounded bg-stone-200/70 text-stone-600 font-normal">
                  {chip.tag}
                </span>
              )}
            </button>
          );
        })}

        {/* Shuffle / Refresh Button to explore non-static trends */}
        <button
          type="button"
          onClick={handleShuffle}
          title="Lihat tren lainnya"
          className="inline-flex items-center gap-1 rounded-lg border border-dashed border-stone-300 bg-white px-2 py-1 text-xs font-medium text-stone-600 hover:border-emerald-500 hover:text-emerald-700 transition-colors shadow-2xs"
        >
          <GoogleIcon
            name="refresh"
            size={13}
            className={`transition-transform duration-300 ${isRefreshing ? 'rotate-180' : ''}`}
          />
          <span className="text-[11px]">Acak Tren</span>
        </button>
      </div>
    </div>
  );
}
