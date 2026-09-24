'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { PriceRadarResult } from '@/domain/radar/types';
import { RadarSearchBar } from './RadarSearchBar';
import { RadarComparisonGrid } from './RadarComparisonGrid';
import { RadarDisclaimerBox } from './RadarDisclaimerBox';
import { CuratedTrendingGrid } from './CuratedTrendingGrid';
import { AffiliateCarousel } from '@/components/home/AffiliateCarousel';
import { InfiniteLogoSlider } from '@/components/home/InfiniteLogoSlider';
import { GoogleIcon } from '@/components/ui/Icon';
import Link from 'next/link';

interface RadarClientContainerProps {
  initialResult: PriceRadarResult;
  defaultQuery: string;
}

export function RadarClientContainer({
  initialResult,
  defaultQuery,
}: RadarClientContainerProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultQuery);
  const [result, setResult] = useState<PriceRadarResult>(initialResult);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (newQuery: string) => {
    if (!newQuery.trim()) return;
    setIsLoading(true);
    setError(null);
    setQuery(newQuery);

    try {
      const res = await fetch(`/api/radar/search?q=${encodeURIComponent(newQuery.trim())}`);
      const json = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setError(json.message || 'Terlalu banyak pencarian. Silakan tunggu beberapa detik.');
        } else {
          setError(json.message || 'Gagal memuat perbandingan harga.');
        }
        return;
      }

      if (json.success && json.data) {
        setResult(json.data);
      }
    } catch {
      setError('Terjadi kendala koneksi saat menghubungi server. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <RadarSearchBar
        initialQuery={query}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {/* Affiliate Promo & Spotlight Deals Carousel */}
      <AffiliateCarousel />

      {/* Infinite Ecosystem & Logistics Marquee */}
      <InfiniteLogoSlider />

      {/* Error / Rate Limit Alert */}
      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800 shadow-2xs flex items-center gap-2">
          <GoogleIcon name="error" size={16} filled className="text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Comparison Grid Results */}
      {result && <RadarComparisonGrid result={result} />}

      {/* Transparent Disclaimer Box */}
      <RadarDisclaimerBox />

      {/* Curated Trending Discovery */}
      <div className="mt-8 pt-6 border-t border-stone-200/80">
        <CuratedTrendingGrid
          onSelectProduct={(productName) =>
            router.push(`/search?q=${encodeURIComponent(productName)}`)
          }
        />
      </div>

      {/* Bridge to Seller Calculator */}
      <div className="mt-10 rounded-2xl border border-stone-200 bg-stone-100/70 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Anda Penjual / Reseller?
            </span>
            <h3 className="mt-1 font-display text-base font-bold text-primary-900 sm:text-lg">
              Hitung Berapa Laba Bersih & Potongan Komisi Barang Ini
            </h3>
            <p className="mt-1 text-xs text-primary-600 max-w-xl">
              Ingin tahu berapa margin bersih jika Anda menjual produk serupa di Shopee, Tokopedia, TikTok Shop, atau Lazada setelah dipotong biaya admin toko dan iklan?
            </p>
          </div>
          <Link
            href="/marketplace-calculator"
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-primary-900 px-5 py-3 text-xs font-semibold text-white shadow-card hover:bg-black transition-all active:scale-95"
          >
            <span>Buka Kalkulator Seller</span>
            <GoogleIcon name="arrow_outward" size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
