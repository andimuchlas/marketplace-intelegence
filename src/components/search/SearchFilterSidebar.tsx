'use client';

import { useState } from 'react';
import { Filter, RotateCcw, ShieldCheck, Star, X } from 'lucide-react';
import { MarketplaceIcon } from '@/components/ui/MarketplaceIcon';

export interface FilterState {
  marketplaces: string[];
  minPrice: number | null;
  maxPrice: number | null;
  officialOnly: boolean;
  minRating: number | null;
  hasDiscountOnly: boolean;
}

interface SearchFilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  marketplaceCounts: Record<string, number>;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

const MARKETPLACE_OPTIONS = [
  { id: 'shopee', name: 'Shopee' },
  { id: 'tokopedia', name: 'Tokopedia' },
  { id: 'tiktok-shop', name: 'TikTok Shop' },
  { id: 'lazada', name: 'Lazada' },
];

const PRICE_PRESETS = [
  { label: '< Rp 100rb', min: null, max: 100000 },
  { label: 'Rp 100rb - 500rb', min: 100000, max: 500000 },
  { label: 'Rp 500rb - 1jt', min: 500000, max: 1000000 },
  { label: '> Rp 1jt', min: 1000000, max: null },
];

export function SearchFilterSidebar({
  filters,
  onFilterChange,
  onReset,
  marketplaceCounts,
  isOpenMobile = false,
  onCloseMobile,
}: SearchFilterSidebarProps) {
  const [minInput, setMinInput] = useState(filters.minPrice ? String(filters.minPrice) : '');
  const [maxInput, setMaxInput] = useState(filters.maxPrice ? String(filters.maxPrice) : '');

  const hasActiveFilters =
    filters.marketplaces.length > 0 ||
    filters.minPrice !== null ||
    filters.maxPrice !== null ||
    filters.officialOnly ||
    filters.minRating !== null ||
    filters.hasDiscountOnly;

  const handleMarketplaceToggle = (id: string) => {
    const exists = filters.marketplaces.includes(id);
    const updated = exists
      ? filters.marketplaces.filter((m) => m !== id)
      : [...filters.marketplaces, id];
    onFilterChange({ ...filters, marketplaces: updated });
  };

  const handleApplyPrice = (e: React.FormEvent) => {
    e.preventDefault();
    const minVal = minInput.trim() ? Math.max(0, parseInt(minInput.replace(/\D/g, ''), 10)) : null;
    const maxVal = maxInput.trim() ? Math.max(0, parseInt(maxInput.replace(/\D/g, ''), 10)) : null;
    onFilterChange({ ...filters, minPrice: minVal, maxPrice: maxVal });
  };

  const handlePresetClick = (min: number | null, max: number | null) => {
    setMinInput(min !== null ? String(min) : '');
    setMaxInput(max !== null ? String(max) : '');
    onFilterChange({ ...filters, minPrice: min, maxPrice: max });
  };

  const content = (
    <div className="space-y-6">
      {/* Header with Title and Reset */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-emerald-700" />
          <h2 className="font-display text-sm font-bold text-stone-900 uppercase tracking-wider">
            Filter Katalog
          </h2>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              setMinInput('');
              setMaxInput('');
              onReset();
            }}
            className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 1. Marketplace Filter */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
          Marketplace
        </h3>
        <div className="space-y-2">
          {MARKETPLACE_OPTIONS.map((item) => {
            const isChecked = filters.marketplaces.includes(item.id);
            const count = marketplaceCounts[item.id] || 0;
            return (
              <label
                key={item.id}
                className="flex items-center justify-between text-xs text-stone-700 cursor-pointer select-none hover:text-stone-900 group"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleMarketplaceToggle(item.id)}
                    className="h-4 w-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <MarketplaceIcon id={item.id} size={14} />
                  <span className="font-medium group-hover:text-stone-900">{item.name}</span>
                </div>
                <span className="text-[11px] font-mono text-stone-400">({count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Price Range Filter */}
      <div className="space-y-2.5 border-t border-stone-100 pt-4">
        <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
          Rentang Harga (Rp)
        </h3>
        <form onSubmit={handleApplyPrice} className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-2 text-[10px] font-semibold text-stone-400">
                Min
              </span>
              <input
                type="text"
                value={minInput}
                onChange={(e) => setMinInput(e.target.value.replace(/\D/g, ''))}
                placeholder="0"
                className="w-full rounded-lg border border-stone-200 bg-white py-1.5 pl-9 pr-2 text-xs font-mono text-stone-800 placeholder:text-stone-300 focus:border-emerald-600 focus:outline-none"
              />
            </div>
            <span className="text-stone-400">-</span>
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-2 text-[10px] font-semibold text-stone-400">
                Max
              </span>
              <input
                type="text"
                value={maxInput}
                onChange={(e) => setMaxInput(e.target.value.replace(/\D/g, ''))}
                placeholder="Maks"
                className="w-full rounded-lg border border-stone-200 bg-white py-1.5 pl-9 pr-2 text-xs font-mono text-stone-800 placeholder:text-stone-300 focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-stone-900 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-stone-800 active:scale-95 transition-all"
          >
            Terapkan Harga
          </button>
        </form>

        {/* Quick Price Preset Chips */}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {PRICE_PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => handlePresetClick(preset.min, preset.max)}
              className="rounded-md border border-stone-200 bg-stone-50 px-2 py-1 text-[11px] font-medium text-stone-600 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-900 transition-colors text-center"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Tipe Penjual Filter */}
      <div className="space-y-2.5 border-t border-stone-100 pt-4">
        <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
          Tipe Toko
        </h3>
        <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer select-none hover:text-stone-900">
          <input
            type="checkbox"
            checked={filters.officialOnly}
            onChange={(e) => onFilterChange({ ...filters, officialOnly: e.target.checked })}
            className="h-4 w-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
          />
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span className="font-medium">Hanya Official Store / Mall</span>
        </label>
      </div>

      {/* 4. Rating Minimal Filter */}
      <div className="space-y-2.5 border-t border-stone-100 pt-4">
        <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
          Rating Toko
        </h3>
        <div className="flex flex-col gap-1.5">
          {[
            { label: 'Semua Rating', value: null },
            { label: '4.5 ke atas', value: 4.5 },
            { label: '4.0 ke atas', value: 4.0 },
          ].map((r) => {
            const isSelected = filters.minRating === r.value;
            return (
              <button
                key={r.label}
                type="button"
                onClick={() => onFilterChange({ ...filters, minRating: r.value })}
                className={`flex items-center justify-between rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  {r.value !== null ? (
                    <>
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span>{r.value}+</span>
                    </>
                  ) : (
                    <span>Semua</span>
                  )}
                </div>
                {isSelected && <span className="text-emerald-700 text-xs">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Special Filter: Promo / Diskon */}
      <div className="space-y-2.5 border-t border-stone-100 pt-4">
        <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
          Penawaran Khusus
        </h3>
        <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer select-none hover:text-stone-900">
          <input
            type="checkbox"
            checked={filters.hasDiscountOnly}
            onChange={(e) => onFilterChange({ ...filters, hasDiscountOnly: e.target.checked })}
            className="h-4 w-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span className="font-medium">Hanya Produk Berdiskon</span>
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-20 rounded-2xl border border-stone-200 bg-white p-5 shadow-2xs">
          {content}
        </div>
      </aside>

      {/* Mobile Drawer / Slide-Over */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4">
              <span className="font-display text-base font-bold text-stone-900">Filter Pencarian</span>
              <button
                type="button"
                onClick={onCloseMobile}
                className="rounded-lg p-1.5 text-stone-500 hover:bg-stone-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {content}
            <div className="mt-8 border-t border-stone-100 pt-4">
              <button
                type="button"
                onClick={onCloseMobile}
                className="w-full rounded-xl bg-emerald-700 py-3 text-xs font-bold text-white shadow-sm hover:bg-emerald-800"
              >
                Terapkan & Lihat Hasil
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
