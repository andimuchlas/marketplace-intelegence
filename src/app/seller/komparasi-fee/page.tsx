import { constructMetadata } from '@/lib/seo/metadata';
import { ComparisonMatrix } from '@/components/comparison/ComparisonMatrix';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { FaqPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { MarketplaceIcon } from '@/components/ui/MarketplaceIcon';
import Link from 'next/link';
import { ArrowRight, Trophy } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Perbandingan Biaya & Potongan Marketplace 2025: Shopee, Tokopedia, TikTok, Lazada',
  description:
    'Bandingkan potongan komisi admin, margin keuntungan bersih, dan break-even harga jual produk di Shopee, Tokopedia, TikTok Shop, dan Lazada secara real-time.',
  path: '/seller/komparasi-fee',
  keywords: ['perbandingan marketplace', 'shopee vs tokopedia', 'potongan marketplace termurah', 'komisi seller indonesia'],
});

const faqItems = [
  {
    question: 'Marketplace mana yang potongan komisi adminnya paling murah?',
    answer:
      'Tingkat potongan bervariasi bergantung pada kategori produk dan program yang Anda ikuti. Untuk elektronik, Tokopedia dan Shopee menawarkan komisi terendah (mulai 3.5%). Untuk fashion dan beauty, TikTok Shop dan Shopee menawarkan konversi volume tinggi meskipun dengan komisi 4.75% - 5.5% plus biaya affiliate.',
  },
  {
    question: 'Mengapa hasil margin bersih bisa berbeda padahal modal HPP sama?',
    answer:
      'Perbedaan margin bersih disebabkan oleh variasi tarif komisi per kategori, perbedaan skema batas maksimal (cap) subsidi program gratis ongkir, serta biaya pemrosesan pembayaran gateway di masing-masing platform.',
  },
];

export default function CompareLandingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: 'https://www.radarharga.shop' },
          { name: 'Bandingkan Marketplace', url: 'https://www.radarharga.shop/seller/komparasi-fee' },
        ]}
      />
      <FaqPageJsonLd items={faqItems} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Breadcrumbs items={[{ label: 'Bandingkan Marketplace' }]} />

        {/* Header */}
        <section className="mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
            <Trophy className="h-3.5 w-3.5 text-emerald-700" />
            <span>Matriks Komparasi 4 Platform E-commerce</span>
          </div>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-primary-900 sm:text-4xl">
            Perbandingan Margin & Potongan Marketplace Indonesia
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-primary-600 sm:text-base">
            Bandingkan struktur unit economics produk Anda secara langsung di <strong>Shopee</strong>,{' '}
            <strong>Tokopedia</strong>, <strong>TikTok Shop</strong>, dan <strong>Lazada</strong>.
            Gunakan tabel interaktif di bawah ini untuk melihat perbandingan laba bersih dan break-even price.
          </p>
        </section>

        {/* Top Ad */}
        <AdSlot position="top" />

        {/* 4-Way Comparison Matrix with Interactive Inputs */}
        <ComparisonMatrix initialPrice={100000} initialCost={60000} showInputs={true} />

        {/* In-Content Ad */}
        <AdSlot position="in-content" />

        {/* Head-to-Head Comparison Links */}
        <section className="my-12">
          <h2 className="font-display text-xl font-bold text-primary-900 sm:text-2xl">
            Perbandingan Head-to-Head Populer
          </h2>
          <p className="mt-1 text-xs text-primary-500">
            Pelajari analisis komparasi mendalam antara dua platform kompetitor utama:
          </p>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Link
              href="/seller/komparasi-fee/shopee-vs-tokopedia"
              className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-card transition-all hover:border-emerald-300 hover:shadow-elevated"
            >
              <div className="flex items-center gap-2 text-lg">
                <MarketplaceIcon id="shopee" size={18} withBackground />
                <span className="text-xs font-bold text-stone-400">VS</span>
                <MarketplaceIcon id="tokopedia" size={18} withBackground />
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-primary-900 group-hover:text-emerald-700">
                Shopee vs Tokopedia
              </h3>
              <p className="mt-1 text-xs text-primary-500">
                Perbandingan Star Seller vs Power Merchant Pro & efisiensi biaya gratis ongkir.
              </p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                <span>Lihat Analisis</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>

            <Link
              href="/seller/komparasi-fee/shopee-vs-tiktok-shop"
              className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-card transition-all hover:border-stone-400 hover:shadow-elevated"
            >
              <div className="flex items-center gap-2 text-lg">
                <MarketplaceIcon id="shopee" size={18} withBackground />
                <span className="text-xs font-bold text-stone-400">VS</span>
                <MarketplaceIcon id="tiktok-shop" size={18} withBackground />
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-primary-900 group-hover:text-stone-900">
                Shopee vs TikTok Shop
              </h3>
              <p className="mt-1 text-xs text-primary-500">
                Pertarungan dua raksasa live commerce dan skema komisi affiliate kreator.
              </p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary-800">
                <span>Lihat Analisis</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>

            <Link
              href="/seller/komparasi-fee/tokopedia-vs-tiktok-shop"
              className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-card transition-all hover:border-emerald-300 hover:shadow-elevated"
            >
              <div className="flex items-center gap-2 text-lg">
                <MarketplaceIcon id="tokopedia" size={18} withBackground />
                <span className="text-xs font-bold text-stone-400">VS</span>
                <MarketplaceIcon id="tiktok-shop" size={18} withBackground />
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-primary-900 group-hover:text-emerald-700">
                Tokopedia vs TikTok Shop
              </h3>
              <p className="mt-1 text-xs text-primary-500">
                Integrasi Shop | Tokopedia dan perbedaan komisi pencarian katalog vs video live.
              </p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                <span>Lihat Analisis</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <FaqAccordion items={faqItems} title="FAQ Perbandingan Marketplace" />

        {/* Bottom Ad */}
        <AdSlot position="bottom" />
      </div>
    </>
  );
}
