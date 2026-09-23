import { constructMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { FaqPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { MarketplaceIcon } from '@/components/ui/MarketplaceIcon';
import Link from 'next/link';
import { Calculator, ArrowRight, ExternalLink } from 'lucide-react';
import { shopeeConfig } from '@/data/marketplaces/shopee';

export const metadata = constructMetadata({
  title: 'Skema Biaya Admin Shopee Terbaru 2025: Rincian Lengkap Star & Mall',
  description:
    'Panduan lengkap skema persentase biaya administrasi Shopee 2025. Rincian komisi kategori produk A-E untuk Non-Star, Star Seller, Star+, dan Shopee Mall serta biaya Gratis Ongkir XTRA.',
  path: '/shopee-fee',
  keywords: ['biaya admin shopee 2025', 'biaya star seller shopee', 'potongan gratis ongkir xtra', 'skema komisi shopee'],
});

const faqItems = [
  {
    question: 'Kapan biaya admin Shopee dipotong?',
    answer:
      'Biaya administrasi dan layanan dipotong secara otomatis dari total pembayaran pembeli sesaat setelah pesanan berstatus Selesai, sebelum dana diteruskan ke Saldo Penjual Anda.',
  },
  {
    question: 'Apakah penjual Non-Star langsung dikenakan biaya admin?',
    answer:
      'Penjual Non-Star mendapatkan pembebasan biaya administrasi pada 50 hingga 100 pesanan pertama terselesaikan sejak bergabung. Setelah itu, komisi standar Non-Star mulai berlaku.',
  },
  {
    question: 'Apakah biaya Gratis Ongkir XTRA dihitung dari harga setelah voucher toko?',
    answer:
      'Ya, biaya layanan program dihitung berdasarkan harga asli produk yang telah dikurangi diskon produk atau voucher toko yang ditanggung oleh penjual.',
  },
];

export default function ShopeeFeePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: 'https://kalkulatormarketplace.id' },
          { name: 'Shopee', url: 'https://kalkulatormarketplace.id/shopee-fee' },
          { name: 'Skema Biaya Admin', url: 'https://kalkulatormarketplace.id/shopee-fee' },
        ]}
      />
      <FaqPageJsonLd items={faqItems} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Shopee', href: '/shopee-fee' },
            { label: 'Skema Biaya Admin' },
          ]}
        />

        {/* Header */}
        <section className="mb-8">
          <div className="flex items-center gap-2">
            <MarketplaceIcon id="shopee" size={18} withBackground />
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Panduan Edukasi Finansial
            </span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-primary-900 sm:text-4xl">
            Rincian Skema Biaya Admin Shopee 2025
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-primary-600 sm:text-base">
            Pelajari struktur potongan biaya administrasi, biaya layanan program promosi, dan biaya
            penanganan transaksi Shopee Indonesia agar Anda dapat menentukan margin harga jual yang sehat.
          </p>
        </section>

        {/* Quick CTA to Calculator */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-orange-200 bg-orange-50/50 p-5 shadow-sm">
          <div>
            <h2 className="font-display text-base font-bold text-orange-950">
              Ingin langsung menghitung profit SKU Anda?
            </h2>
            <p className="text-xs text-orange-800/80">
              Gunakan kalkulator profit interaktif untuk simulasi harga jual real-time.
            </p>
          </div>
          <Link
            href="/shopee-profit-calculator"
            className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-orange-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-orange-700 sm:mt-0"
          >
            <Calculator className="h-4 w-4" />
            <span>Buka Kalkulator Shopee</span>
          </Link>
        </div>

        {/* Top Ad */}
        <AdSlot position="top" />

        {/* Table 1: Seller Tiers */}
        <section className="my-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-xl font-bold text-primary-900">
            1. Perbandingan Tingkatan Penjual (Seller Tiers)
          </h2>
          <p className="mt-1 text-xs text-primary-500">
            Tingkat potongan admin bervariasi bergantung pada lencana status toko Anda:
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-stone-200 text-xs sm:text-sm">
            <table className="w-full text-left">
              <thead className="bg-stone-50 font-display font-semibold text-primary-900">
                <tr>
                  <th className="py-3 px-4">Tingkat Penjual</th>
                  <th className="py-3 px-4">Deskripsi</th>
                  <th className="py-3 px-4 text-right">Rentang Tarif Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {shopeeConfig.sellerTiers.map((tier) => (
                  <tr key={tier.id} className="hover:bg-stone-50/50">
                    <td className="py-3 px-4 font-bold text-primary-900">{tier.name}</td>
                    <td className="py-3 px-4 text-primary-600">{tier.description}</td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-orange-600">
                      {tier.id === 'non_star'
                        ? '4.00%'
                        : tier.id === 'star_seller'
                        ? '4.25% - 5.00%'
                        : tier.id === 'star_plus'
                        ? '4.75% - 5.50%'
                        : '6.50% - 8.50%'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Table 2: Product Category Groups */}
        <section className="my-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-xl font-bold text-primary-900">
            2. Kelompok Kategori Produk (Grup A s/d E)
          </h2>
          <p className="mt-1 text-xs text-primary-500">
            Shopee mengelompokkan kategori produk untuk menentukan besaran persentase komisi:
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {shopeeConfig.categories.map((cat) => (
              <div key={cat.id} className="rounded-xl border border-stone-200 p-4">
                <span className="font-display text-xs font-bold text-primary-900">{cat.name}</span>
                <p className="mt-1 text-xs text-primary-500">{cat.description}</p>
                <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-2 text-xs">
                  <span className="text-primary-400">Tarif dasar acuan:</span>
                  <span className="font-mono font-bold text-orange-600">
                    {(cat.defaultAdminFeeRate * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Extra Program Fees */}
        <section className="my-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-xl font-bold text-primary-900">
            3. Biaya Layanan Program Promosi Tambahan
          </h2>
          <p className="mt-1 text-xs text-primary-500">
            Program opsional yang memotong margin namun meningkatkan konversi pembeli:
          </p>

          <div className="mt-5 space-y-4 text-xs sm:text-sm">
            <div className="rounded-xl border border-stone-200 p-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary-900">Program Gratis Ongkir XTRA</span>
                <span className="font-mono font-bold text-orange-600">4.0% (Maks. Rp 10.000 / produk)</span>
              </div>
              <p className="mt-1 text-primary-600">
                Memberikan voucher gratis ongkir bernilai lebih tinggi bagi pengguna. Dikenakan batas maksimal
                potongan sebesar Rp 10.000 per kuantiti produk terjual.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 p-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary-900">Program Cashback XTRA</span>
                <span className="font-mono font-bold text-orange-600">1.4% (Maks. Rp 10.000 / produk)</span>
              </div>
              <p className="mt-1 text-primary-600">
                Memberikan koin cashback bagi pembeli saat menyelesaikan transaksi di toko Anda.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 p-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary-900">Biaya Penanganan Transaksi</span>
                <span className="font-mono font-bold text-orange-600">1.0% (Min. Rp 1.000)</span>
              </div>
              <p className="mt-1 text-primary-600">
                Biaya pemrosesan transaksi gateway yang berlaku untuk semua tipe penjual.
              </p>
            </div>
          </div>
        </section>

        {/* Source link & disclaimer */}
        <div className="my-6 rounded-xl border border-stone-200 bg-stone-50 p-4 text-xs text-primary-500 flex items-center justify-between">
          <span>
            Sumber resmi rujukan: <strong>Pusat Edukasi Penjual Shopee Indonesia</strong>
          </span>
          <a
            href={shopeeConfig.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-orange-600 hover:underline"
          >
            <span>Buka Sumber</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* FAQ */}
        <FaqAccordion items={faqItems} title="FAQ Biaya Admin Shopee" />

        {/* Bottom Ad */}
        <AdSlot position="bottom" />
      </div>
    </>
  );
}
