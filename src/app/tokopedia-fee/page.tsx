import { constructMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { FaqPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { MarketplaceIcon } from '@/components/ui/MarketplaceIcon';
import Link from 'next/link';
import { Calculator, ExternalLink } from 'lucide-react';
import { tokopediaConfig } from '@/data/marketplaces/tokopedia';

export const metadata = constructMetadata({
  title: 'Skema Biaya Layanan Tokopedia 2025: Power Merchant, PM Pro & Mall',
  description:
    'Panduan lengkap rincian komisi admin dan biaya layanan Tokopedia 2025. Struktur tarif grup kategori 1-5 untuk Regular, Power Merchant, PM Pro, dan Official Store.',
  path: '/tokopedia-fee',
  keywords: ['biaya admin tokopedia 2025', 'biaya power merchant tokopedia', 'tarif bebas ongkir', 'potongan komisi tokopedia'],
});

const faqItems = [
  {
    question: 'Berapa persen biaya layanan Tokopedia untuk Power Merchant?',
    answer:
      'Biaya layanan Power Merchant berada di rentang 2.5% hingga 5.0% tergantung kelompok kategori produk. Untuk Power Merchant Pro, tarif berkisar antara 3.0% hingga 5.5%.',
  },
  {
    question: 'Berapa batas maksimal (cap) biaya Bebas Ongkir Tokopedia?',
    answer:
      'Biaya Bebas Ongkir memiliki batas maksimal potongan sebesar Rp 10.000 per kuantiti produk terjual (tarif 4%).',
  },
  {
    question: 'Apakah ada biaya tambahan per transaksi selain persentase komisi?',
    answer:
      'Ya, Tokopedia memberlakukan biaya jasa aplikasi / transaksi sebesar flat Rp 1.000 pada setiap pesanan yang berhasil diselesaikan.',
  },
];

export default function TokopediaFeePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: 'https://www.radarharga.shop' },
          { name: 'Tokopedia', url: 'https://www.radarharga.shop/tokopedia-fee' },
          { name: 'Skema Biaya Layanan', url: 'https://www.radarharga.shop/tokopedia-fee' },
        ]}
      />
      <FaqPageJsonLd items={faqItems} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Tokopedia', href: '/tokopedia-fee' },
            { label: 'Skema Biaya Layanan' },
          ]}
        />

        {/* Header */}
        <section className="mb-8">
          <div className="flex items-center gap-2">
            <MarketplaceIcon id="tokopedia" size={18} withBackground />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Panduan Edukasi Finansial
            </span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-primary-900 sm:text-4xl">
            Rincian Skema Biaya Layanan Tokopedia 2025
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-primary-600 sm:text-base">
            Pelajari struktur komisi administrasi, tingkatan keanggotaan toko, program Bebas Ongkir, dan
            biaya aplikasi Tokopedia (Shop | Tokopedia) untuk merancang kalkulasi harga jual yang menguntungkan.
          </p>
        </section>

        {/* Quick CTA to Calculator */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-sm">
          <div>
            <h2 className="font-display text-base font-bold text-emerald-950">
              Ingin langsung menguji laba bersih toko Anda?
            </h2>
            <p className="text-xs text-emerald-800/80">
              Buka kalkulator profit Tokopedia interaktif untuk menghitung otomatis dalam hitungan detik.
            </p>
          </div>
          <Link
            href="/tokopedia-profit-calculator"
            className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 sm:mt-0"
          >
            <Calculator className="h-4 w-4" />
            <span>Buka Kalkulator Tokopedia</span>
          </Link>
        </div>

        {/* Top Ad */}
        <AdSlot position="top" />

        {/* Table 1: Seller Tiers */}
        <section className="my-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-xl font-bold text-primary-900">
            1. Tingkatan Status Toko Tokopedia
          </h2>
          <p className="mt-1 text-xs text-primary-500">
            Besaran komisi layanan disesuaikan dengan tingkat status keanggotaan toko Anda:
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-stone-200 text-xs sm:text-sm">
            <table className="w-full text-left">
              <thead className="bg-stone-50 font-display font-semibold text-primary-900">
                <tr>
                  <th className="py-3 px-4">Tingkat Toko</th>
                  <th className="py-3 px-4">Deskripsi Status</th>
                  <th className="py-3 px-4 text-right">Rentang Biaya Layanan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {tokopediaConfig.sellerTiers.map((tier) => (
                  <tr key={tier.id} className="hover:bg-stone-50/50">
                    <td className="py-3 px-4 font-bold text-primary-900">{tier.name}</td>
                    <td className="py-3 px-4 text-primary-600">{tier.description}</td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-emerald-600">
                      {tier.id === 'regular_merchant'
                        ? '2.50%'
                        : tier.id === 'power_merchant'
                        ? '2.50% - 5.00%'
                        : tier.id === 'power_merchant_pro'
                        ? '3.00% - 5.50%'
                        : '3.50% - 6.50%'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Table 2: Category Groups 1 - 5 */}
        <section className="my-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-xl font-bold text-primary-900">
            2. Pembagian Grup Kategori Produk (Grup 1 s/d 5)
          </h2>
          <p className="mt-1 text-xs text-primary-500">
            Rincian grup kategori yang menentukan persentase komisi produk Anda:
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tokopediaConfig.categories.map((cat) => (
              <div key={cat.id} className="rounded-xl border border-stone-200 p-4">
                <span className="font-display text-xs font-bold text-primary-900">{cat.name}</span>
                <p className="mt-1 text-xs text-primary-500">{cat.description}</p>
                <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-2 text-xs">
                  <span className="text-primary-400">Tarif dasar rujukan:</span>
                  <span className="font-mono font-bold text-emerald-600">
                    {(cat.defaultAdminFeeRate * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Bebas Ongkir & Fixed Fee */}
        <section className="my-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-xl font-bold text-primary-900">
            3. Biaya Layanan Bebas Ongkir & Transaksi
          </h2>
          <div className="mt-5 space-y-4 text-xs sm:text-sm">
            <div className="rounded-xl border border-stone-200 p-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary-900">Program Bebas Ongkir</span>
                <span className="font-mono font-bold text-emerald-600">4.0% (Maks. Rp 10.000 / produk)</span>
              </div>
              <p className="mt-1 text-primary-600">
                Memberikan fasilitas bebas ongkir kepada pembeli di seluruh Indonesia, dibatasi maksimal Rp 10.000 per unit.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 p-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary-900">Biaya Jasa Aplikasi / Transaksi</span>
                <span className="font-mono font-bold text-emerald-600">Flat Rp 1.000 per transaksi</span>
              </div>
              <p className="mt-1 text-primary-600">
                Dikenakan pada setiap transaksi pesanan berhasil di Tokopedia.
              </p>
            </div>
          </div>
        </section>

        {/* Source link */}
        <div className="my-6 rounded-xl border border-stone-200 bg-stone-50 p-4 text-xs text-primary-500 flex items-center justify-between">
          <span>
            Sumber resmi rujukan: <strong>Pusat Edukasi Seller Tokopedia</strong>
          </span>
          <a
            href={tokopediaConfig.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-emerald-600 hover:underline"
          >
            <span>Buka Sumber</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* FAQ */}
        <FaqAccordion items={faqItems} title="FAQ Biaya Layanan Tokopedia" />

        {/* Bottom Ad */}
        <AdSlot position="bottom" />
      </div>
    </>
  );
}
