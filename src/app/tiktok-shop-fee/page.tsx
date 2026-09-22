import { constructMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { FaqPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import Link from 'next/link';
import { Calculator, ExternalLink } from 'lucide-react';
import { tiktokShopConfig } from '@/data/marketplaces/tiktok-shop';

export const metadata = constructMetadata({
  title: 'Skema Biaya Komisi TikTok Shop 2025: Panduan Lengkap Seller & Mall',
  description:
    'Panduan resmi persentase komisi admin TikTok Shop Indonesia 2025. Rincian potongan kategori fashion, beauty, gadget, biaya pembayaran, dan sistem komisi affiliate.',
  path: '/tiktok-shop-fee',
  keywords: ['biaya admin tiktok shop 2025', 'komisi seller tiktok', 'potongan affiliate tiktok', 'biaya tiktok shop mall'],
});

const faqItems = [
  {
    question: 'Berapa persen komisi TikTok Shop untuk seller baru?',
    answer:
      'TikTok Shop mengenakan komisi berkisar antara 3.5% hingga 5.0% tergantung kategori produk yang dijual, ditambah biaya pemrosesan transaksi 1%.',
  },
  {
    question: 'Apakah TikTok Shop memotong komisi jika pesanan dibatalkan?',
    answer:
      'Tidak. Komisi marketplace dan biaya transaksi hanya dipotong pada pesanan yang berhasil dikirim dan diterima oleh pembeli.',
  },
  {
    question: 'Bagaimana cara kerja komisi TikTok Affiliate?',
    answer:
      'Penjual menentukan persentase komisi secara sukarela di TikTok Shop Seller Center. Saat kreator menautkan produk ke video atau sesi live shopping dan terjadi pembelian, sistem secara otomatis memotong komisi tersebut untuk kreator.',
  },
];

export default function TikTokShopFeePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: 'https://kalkulatormarketplace.id' },
          { name: 'TikTok Shop', url: 'https://kalkulatormarketplace.id/tiktok-shop-fee' },
          { name: 'Skema Biaya Komisi', url: 'https://kalkulatormarketplace.id/tiktok-shop-fee' },
        ]}
      />
      <FaqPageJsonLd items={faqItems} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'TikTok Shop', href: '/tiktok-shop-fee' },
            { label: 'Skema Biaya Komisi' },
          ]}
        />

        {/* Header */}
        <section className="mb-8">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚫</span>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Panduan Edukasi Finansial
            </span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-primary-900 sm:text-4xl">
            Rincian Skema Biaya Komisi TikTok Shop 2025
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-primary-600 sm:text-base">
            Pelajari struktur komisi administrasi, skema toko resmi TikTok Shop Mall, pemrosesan pembayaran,
            serta strategi penetapan komisi affiliate kreator.
          </p>
        </section>

        {/* Quick CTA */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-stone-300 bg-stone-100/70 p-5 shadow-sm">
          <div>
            <h2 className="font-display text-base font-bold text-primary-950">
              Ingin langsung menguji laba bersih toko TikTok Anda?
            </h2>
            <p className="text-xs text-primary-700">
              Buka kalkulator profit interaktif untuk simulasi harga jual dan komisi affiliate live.
            </p>
          </div>
          <Link
            href="/tiktok-shop-profit-calculator"
            className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-primary-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-primary-800 sm:mt-0"
          >
            <Calculator className="h-4 w-4" />
            <span>Buka Kalkulator TikTok Shop</span>
          </Link>
        </div>

        {/* Top Ad */}
        <AdSlot position="top" />

        {/* Table 1: Seller Tiers */}
        <section className="my-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-xl font-bold text-primary-900">
            1. Tipe Toko: Seller Reguler vs TikTok Shop Mall
          </h2>
          <div className="mt-5 overflow-hidden rounded-xl border border-stone-200 text-xs sm:text-sm">
            <table className="w-full text-left">
              <thead className="bg-stone-50 font-display font-semibold text-primary-900">
                <tr>
                  <th className="py-3 px-4">Tipe Toko</th>
                  <th className="py-3 px-4">Deskripsi</th>
                  <th className="py-3 px-4 text-right">Rentang Komisi Dasar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {tiktokShopConfig.sellerTiers.map((tier) => (
                  <tr key={tier.id} className="hover:bg-stone-50/50">
                    <td className="py-3 px-4 font-bold text-primary-900">{tier.name}</td>
                    <td className="py-3 px-4 text-primary-600">{tier.description}</td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-primary-900">
                      {tier.id === 'standard_seller' ? '3.50% - 5.00%' : '4.50% - 7.50%'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Table 2: Category Commission Rates */}
        <section className="my-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-xl font-bold text-primary-900">
            2. Komisi Berdasarkan Kategori Produk
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tiktokShopConfig.categories.map((cat) => (
              <div key={cat.id} className="rounded-xl border border-stone-200 p-4">
                <span className="font-display text-xs font-bold text-primary-900">{cat.name}</span>
                <p className="mt-1 text-xs text-primary-500">{cat.description}</p>
                <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-2 text-xs">
                  <span className="text-primary-400">Tarif komisi dasar:</span>
                  <span className="font-mono font-bold text-primary-900">
                    {(cat.defaultAdminFeeRate * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Affiliate & Payment Fees */}
        <section className="my-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-xl font-bold text-primary-900">
            3. Biaya Pembayaran & Bagi Hasil Affiliate
          </h2>
          <div className="mt-5 space-y-4 text-xs sm:text-sm">
            <div className="rounded-xl border border-stone-200 p-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary-900">Biaya Pemrosesan Transaksi</span>
                <span className="font-mono font-bold text-primary-900">1.0% (Min. Rp 1.000)</span>
              </div>
              <p className="mt-1 text-primary-600">
                Biaya transaksi payment gateway untuk seluruh pesanan yang berhasil diselesaikan.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 p-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary-900">Komisi Affiliate Kreator</span>
                <span className="font-mono font-bold text-purple-700">Disesuaikan Penjual (5% - 20%)</span>
              </div>
              <p className="mt-1 text-primary-600">
                Komisi yang Anda tawarkan kepada kreator video & live streamer yang mempromosikan produk Anda.
              </p>
            </div>
          </div>
        </section>

        {/* Source link */}
        <div className="my-6 rounded-xl border border-stone-200 bg-stone-50 p-4 text-xs text-primary-500 flex items-center justify-between">
          <span>
            Sumber resmi rujukan: <strong>TikTok Shop Academy Indonesia</strong>
          </span>
          <a
            href={tiktokShopConfig.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-primary-900 hover:underline"
          >
            <span>Buka Sumber</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* FAQ */}
        <FaqAccordion items={faqItems} title="FAQ Biaya Komisi TikTok Shop" />

        {/* Bottom Ad */}
        <AdSlot position="bottom" />
      </div>
    </>
  );
}
