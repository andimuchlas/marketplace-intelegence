import { constructMetadata } from '@/lib/seo/metadata';
import { ComparisonMatrix } from '@/components/comparison/ComparisonMatrix';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { FaqPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { MarketplaceIcon } from '@/components/ui/MarketplaceIcon';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Shopee vs Tokopedia: Perbandingan Potongan Biaya Admin & Keuntungan Seller',
  description:
    'Shopee vs Tokopedia: Mana yang lebih murah biaya admin untuk penjual? Bandingkan potongan Star Seller vs Power Merchant Pro, biaya ongkir, dan margin bersih.',
  path: '/seller/komparasi-fee/shopee-vs-tokopedia',
  keywords: ['shopee vs tokopedia', 'biaya admin shopee vs tokopedia', 'potongan shopee star vs tokopedia pm pro'],
});

const faqItems = [
  {
    question: 'Shopee vs Tokopedia, mana yang biaya adminnya lebih murah untuk seller?',
    answer:
      'Untuk kategori Elektronik dan Komputer, Tokopedia umumnya sedikit lebih hemat dengan biaya admin 3.5% - 4.0% dan biaya aplikasi flat Rp 1.000. Untuk kategori Fashion dan Kosmetik, tarif komisi keduanya relatif setara (berkisar antara 4.5% hingga 5.5%), namun Shopee memiliki biaya penanganan persentase 1% sementara Tokopedia menggunakan fixed fee Rp 1.000.',
  },
  {
    question: 'Apa perbedaan program Gratis Ongkir XTRA Shopee dan Bebas Ongkir Tokopedia?',
    answer:
      'Keduanya sama-sama mengenakan biaya layanan 4.0% dengan batas maksimal pemotongan sebesar Rp 10.000 per produk terjual. Perbedaannya terletak pada jangkauan ekspedisi mitra logistik yang didukung masing-masing platform.',
  },
];

export default function ShopeeVsTokopediaPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: 'https://www.radarharga.shop' },
          { name: 'Bandingkan', url: 'https://www.radarharga.shop/seller/komparasi-fee' },
          { name: 'Shopee vs Tokopedia', url: 'https://www.radarharga.shop/seller/komparasi-fee/shopee-vs-tokopedia' },
        ]}
      />
      <FaqPageJsonLd items={faqItems} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Bandingkan', href: '/seller/komparasi-fee' },
            { label: 'Shopee vs Tokopedia' },
          ]}
        />

        {/* Header */}
        <section className="mb-8">
          <div className="flex items-center gap-2">
            <MarketplaceIcon id="shopee" size={18} withBackground />
            <span className="text-xs font-bold text-stone-400">VS</span>
            <MarketplaceIcon id="tokopedia" size={18} withBackground />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Analisis Komparasi Head-to-Head
            </span>
          </div>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-primary-900 sm:text-4xl">
            Shopee vs Tokopedia: Mana yang Lebih Menguntungkan?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-primary-600 sm:text-base">
            Bandingkan struktur potongan biaya admin <strong>Shopee Star Seller</strong> dengan{' '}
            <strong>Tokopedia Power Merchant Pro</strong>. Gunakan kalkulator komparasi live di bawah ini untuk
            melihat selisih margin keuntungan pada produk Anda.
          </p>
        </section>

        {/* Top Ad */}
        <AdSlot position="top" />

        {/* Live Matrix */}
        <ComparisonMatrix initialPrice={100000} initialCost={60000} showInputs={true} />

        {/* In-Content Ad */}
        <AdSlot position="in-content" />

        {/* Editorial Comparison Breakdown */}
        <section className="my-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-xl font-bold text-primary-900 sm:text-2xl">
            Rangkuman Perbedaan Utama: Shopee vs Tokopedia
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Shopee Card */}
            <div className="rounded-xl border border-orange-200 bg-orange-50/30 p-5">
              <div className="flex items-center gap-2">
                <MarketplaceIcon id="shopee" size={18} withBackground />
                <h3 className="font-display text-base font-bold text-orange-950">Karakteristik Shopee</h3>
              </div>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-primary-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-orange-600 mt-0.5" />
                  <span><strong>Kategori Unggulan:</strong> Sangat dominan pada produk fashion, skincare, kosmetik, dan barang konsumsi harian (FMCG).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-orange-600 mt-0.5" />
                  <span><strong>Biaya Transaksi:</strong> 1.0% (min. Rp 1.000). Pada transaksi bernilai besar (di atas Rp 100.000), potongan persentase ini terus bertambah secara proporsional.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-orange-600 mt-0.5" />
                  <span><strong>Fitur Konversi:</strong> Shopee Video dan Shopee Live memiliki traffic tinggi untuk impulse buying dengan voucher diskon live.</span>
                </li>
              </ul>
            </div>

            {/* Tokopedia Card */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/30 p-5">
              <div className="flex items-center gap-2">
                <MarketplaceIcon id="tokopedia" size={18} withBackground />
                <h3 className="font-display text-base font-bold text-emerald-950">Karakteristik Tokopedia</h3>
              </div>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-primary-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-600 mt-0.5" />
                  <span><strong>Kategori Unggulan:</strong> Menjadi rujukan utama konsumen untuk pembelian smartphone, laptop, peripheral komputer, dan hobi otomotif.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-600 mt-0.5" />
                  <span><strong>Biaya Transaksi:</strong> Flat Rp 1.000 per pesanan. Sangat menguntungkan bagi penjual barang berharga tinggi (high AOV).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-600 mt-0.5" />
                  <span><strong>Fitur Bebas Ongkir:</strong> Didukung integrasi GoSend Instant / Sameday yang sangat disukai konsumen area Jabodetabek dan kota besar.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FaqAccordion items={faqItems} title="FAQ Shopee vs Tokopedia" />

        {/* Bottom Ad */}
        <AdSlot position="bottom" />
      </div>
    </>
  );
}
