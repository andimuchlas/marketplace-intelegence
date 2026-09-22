'use client';

import { Sparkles, ArrowRight } from 'lucide-react';
import { TRENDING_PRODUCTS, TrendingProductItem } from '@/data/radar/trendingProducts';
import { formatRupiah } from '@/lib/formatting/currency';

interface CuratedTrendingGridProps {
  onSelectProduct: (productName: string) => void;
}

export function CuratedTrendingGrid({ onSelectProduct }: CuratedTrendingGridProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary-500">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            Produk Terpopuler Minggu Ini
          </div>
          <p className="mt-0.5 text-xs text-primary-500">
            Klik salah satu produk untuk membandingkan harga langsung di 4 marketplace.
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {TRENDING_PRODUCTS.map((item: TrendingProductItem) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => onSelectProduct(item.name)}
            className="group flex flex-col justify-between rounded-xl border border-stone-200 bg-white p-4 text-left shadow-subtle transition-all hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-card active:scale-[0.99]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-primary-600">
                  {item.category}
                </span>
                <span className="text-[11px] font-bold text-emerald-700">{item.badge}</span>
              </div>

              <h4 className="mt-2.5 font-display text-xs font-bold leading-snug text-primary-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                {item.name}
              </h4>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-2.5">
              <div>
                <span className="text-[10px] text-primary-400">Mulai dari:</span>
                <div className="font-mono text-xs font-bold text-primary-900 tabular-nums">
                  {formatRupiah(item.estimatedBasePrice)}
                </div>
              </div>
              <span className="flex items-center text-xs font-semibold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
                Bandingkan <ArrowRight className="ml-1 h-3 w-3" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
