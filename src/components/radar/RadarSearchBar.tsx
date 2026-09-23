'use client';

import { useState, FormEvent } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { GoogleIcon } from '@/components/ui/Icon';

interface RadarSearchBarProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const QUICK_SEARCH_CHIPS = [
  'iPhone 15 128GB',
  'Skintific 5X Ceramide',
  'Sony WH-1000XM5',
  'Ventela Public Low',
  'TWS Baseus Bowie WM02',
  'Xiaomi Smart Band 8',
];

export function RadarSearchBar({
  initialQuery = '',
  onSearch,
  isLoading = false,
}: RadarSearchBarProps) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      onSearch(query.trim());
    }
  };

  const handleChipClick = (chip: string) => {
    setQuery(chip);
    onSearch(chip);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex h-14 w-full items-center rounded-2xl border-2 border-stone-200 bg-white shadow-card transition-all focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-600/10">
          <Search className="ml-4 h-5 w-5 shrink-0 text-primary-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari barang untuk bandingkan harga (contoh: iPhone 15, Skintific, TWS Anker)..."
            className="h-full w-full rounded-2xl bg-transparent px-3 text-sm font-medium text-primary-900 placeholder:text-stone-400 focus:outline-none sm:text-base"
          />
          <button
            type="submit"
            disabled={isLoading || query.trim().length < 2}
            className="mr-2 inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-emerald-700 px-5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed sm:text-sm active:scale-95"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="hidden sm:inline">Membandingkan...</span>
              </>
            ) : (
              <span>Search</span>
            )}
          </button>
        </div>
      </form>

      {/* Quick Discovery Chips */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
        <span className="flex items-center gap-1 font-semibold text-primary-500">
          <GoogleIcon name="trending_up" size={16} className="text-emerald-600" />
          Pencarian Populer:
        </span>
        {QUICK_SEARCH_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => handleChipClick(chip)}
            className="rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs font-medium text-primary-700 transition-colors hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-900 active:scale-95"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
