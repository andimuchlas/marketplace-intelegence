import { constructMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { FaqPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { MarketplaceIcon } from '@/components/ui/MarketplaceIcon';
import Link from 'next/link';
import { Calculator, ExternalLink } from 'lucide-react';
import { lazadaConfig } from '@/data/marketplaces/lazada';

export const metadata = constructMetadata({
  title: 'Skema Biaya Komisi Lazada 2025: Marketplace Seller & LazMall',
  description:
    'Panduan resmi persentase potongan komisi Lazada Indonesia 2025. Rincian komisi kategori produk, biaya program Free Shipping Max, dan payment fee 1.8%.',
  path: '/lazada-fee',
  keywords: ['biaya komisi lazada 2025', 'biaya lazada seller', 'tarif free shipping max lazada', 'potongan lazmall'],
});

const faqItems = [
  {
    question: 'Berapa persen komisi jualan di Lazada untuk seller biasa?',
    answer:
      'Komisi penjualan standar Lazada berkisar antara 2.5% hingga 4.5% tergantung kategori barang yang dijual, ditambah biaya transaksi pembayaran 1.8%.',
  },
  {
    question: 'Berapa biaya program Free Shipping Max Lazada?',
    answer:
      'Program Free Shipping Max mengenakan biaya komisi 3.0% dengan batas potongan maksimal sebesar Rp 10.000 per kuantiti produk.',
  },
  {
    question: 'Kapan komisi penjualan Lazada dipotong?',
    answer:
      'Komisi dipotong otomatis saat pesanan telah terkirim dan diselesaikan oleh pembeli, sebelum dana dicairkan pada siklus payout mingguan penjual.',
  },
];

export default function LazadaFeePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: 'https://www.radarharga.shop' },
          { name: 'Lazada', url: 'https://www.radarharga.shop/lazada-fee' },
          { name: 'Skema Biaya Komisi', url: 'https://www.radarharga.shop/lazada-fee' },
        ]}
      />
      <FaqPageJsonLd items={faqItems} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Lazada', href: '/lazada-fee' },
            { label: 'Skema Biaya Komisi' },
          ]}
        />

        {/* Header */}
        <section className="mb-8">
          <div className="flex items-center gap-2">
            <MarketplaceIcon id="lazada" size={18} withBackground />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Panduan Edukasi Finansial
            </span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-primary-900 sm:text-4xl">
            Rincian Skema Biaya Komisi Lazada 2025
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-primary-600 sm:text-base">
            Pelajari struktur komisi marketplace, ketentuan toko resmi LazMall, biaya transaksi, serta program
            Free Shipping Max di Lazada Indonesia untuk merencanakan margin keuntungan yang sehat.
          </p>
        </section>

        {/* Quick CTA */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-blue-200 bg-blue-50/50 p-5 shadow-sm">
          <div>
            <h2 className="font-display text-base font-bold text-blue-950">
              Ingin langsung menguji laba bersih toko Lazada Anda?
            </h2>
            <p className="text-xs text-blue-800/80">
              Gunakan kalkulator profit interaktif untuk simulasi harga jual dan biaya komisi Lazada.
            </p>
          </div>
          <Link
            href="/lazada-profit-calculator"
            className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-blue-700 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-800 sm:mt-0"
          >
            <Calculator className="h-4 w-4" />
            <span>Buka Kalkulator Lazada</span>
          </Link>
        </div>

        {/* Top Ad */}
        <AdSlot position="top" />

        {/* Table 1: Seller Tiers */}
        <section className="my-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-xl font-bold text-primary-900">
            1. Perbedaan Status Toko: Marketplace vs LazMall
          </h2>
          <div className="mt-5 overflow-hidden rounded-xl border border-stone-200 text-xs sm:text-sm">
            <table className="w-full text-left">
              <thead className="bg-stone-50 font-display font-semibold text-primary-900">
                <tr>
                  <th className="py-3 px-4">Tipe Toko</th>
                  <th className="py-3 px-4">Deskripsi</th>
                  <th className="py-3 px-4 text-right">Rentang Komisi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {lazadaConfig.sellerTiers.map((tier) => (
                  <tr key={tier.id} className="hover:bg-stone-50/50">
                    <td className="py-3 px-4 font-bold text-primary-900">{tier.name}</td>
                    <td className="py-3 px-4 text-primary-600">{tier.description}</td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-blue-700">
                      {tier.id === 'marketplace_seller' ? '2.50% - 4.50%' : '4.00% - 7.00%'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Table 2: Product Categories */}
        <section className="my-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-xl font-bold text-primary-900">
            2. Komisi Berdasarkan Kategori Barang
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {lazadaConfig.categories.map((cat) => (
              <div key={cat.id} className="rounded-xl border border-stone-200 p-4">
                <span className="font-display text-xs font-bold text-primary-900">{cat.name}</span>
                <p className="mt-1 text-xs text-primary-500">{cat.description}</p>
                <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-2 text-xs">
                  <span className="text-primary-400">Tarif komisi acuan:</span>
                  <span className="font-mono font-bold text-blue-700">
                    {(cat.defaultAdminFeeRate * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Free Shipping Max & Payment Fee */}
        <section className="my-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-xl font-bold text-primary-900">
            3. Program Free Shipping Max & Biaya Transaksi
          </h2>
          <div className="mt-5 space-y-4 text-xs sm:text-sm">
            <div className="rounded-xl border border-stone-200 p-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary-900">Program Free Shipping Max</span>
                <span className="font-mono font-bold text-blue-700">3.0% (Maks. Rp 10.000 / produk)</span>
              </div>
              <p className="mt-1 text-primary-600">
                Program subsidi ongkos kirim resmi Lazada yang memberikan eksposur voucher gratis ongkir bagi pembeli.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 p-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary-900">Biaya Penanganan Pembayaran (Payment Fee)</span>
                <span className="font-mono font-bold text-blue-700">1.8% dari nilai pesanan</span>
              </div>
              <p className="mt-1 text-primary-600">
                Dikenakan untuk pemrosesan metode bayar (kartu kredit, transfer, e-wallet, dan COD).
              </p>
            </div>
          </div>
        </section>

        {/* Source link */}
        <div className="my-6 rounded-xl border border-stone-200 bg-stone-50 p-4 text-xs text-primary-500 flex items-center justify-between">
          <span>
            Sumber resmi rujukan: <strong>Pusat Bantuan Lazada Seller Center</strong>
          </span>
          <a
            href={lazadaConfig.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:underline"
          >
            <span>Buka Sumber</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* FAQ */}
        <FaqAccordion items={faqItems} title="FAQ Biaya Komisi Lazada" />

        {/* Bottom Ad */}
        <AdSlot position="bottom" />
      </div>
    </>
  );
}
