import { constructMetadata } from '@/lib/seo/metadata';
import { MarketplaceCalculator } from '@/components/calculator/MarketplaceCalculator';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { SoftwareApplicationJsonLd, FaqPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { MarketplaceIcon } from '@/components/ui/MarketplaceIcon';
import Link from 'next/link';
import { ArrowRight, AlertCircle } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Kalkulator Profit TikTok Shop: Hitung Komisi Seller & Affiliate Kreator',
  description:
    'Kalkulator profit TikTok Shop gratis untuk seller reguler dan Mall. Hitung potongan komisi kategori, bagi hasil affiliate video/live, biaya transaksi, dan margin bersih.',
  path: '/seller/kalkulator/tiktok-shop',
  keywords: ['kalkulator tiktok shop', 'hitung profit tiktok affiliate', 'potongan komisi tiktok seller', 'biaya live shopping'],
});

const faqItems = [
  {
    question: 'Berapa persen potongan komisi TikTok Shop untuk seller?',
    answer:
      'Komisi penjualan standar TikTok Shop berkisar antara 3.5% hingga 5.0% tergantung kategori produk, ditambah biaya pemrosesan pembayaran sebesar 1% (minimum Rp 1.000).',
  },
  {
    question: 'Bagaimana cara menghitung komisi affiliate TikTok Shop?',
    answer:
      'Komisi affiliate ditentukan oleh penjual (biasanya antara 5% hingga 15%). Komisi ini dipotong langsung dari harga jual produk saat pesanan yang ditautkan keranjang kuning berhasil diselesaikan oleh kreator.',
  },
  {
    question: 'Apakah berjualan di TikTok Live memiliki biaya tambahan?',
    answer:
      'Penjualan live streaming reguler menggunakan komisi standar. Namun, jika Anda mengikuti kampanye Mega Sale promosi berbayar dari platform, ada tambahan subsidi kupon sebesar 1.5% hingga 2%.',
  },
];

export default function TikTokShopProfitCalculatorPage() {
  return (
    <>
      <SoftwareApplicationJsonLd
        name="Kalkulator Profit TikTok Shop Indonesia"
        description="Kalkulator komisi admin, komisi affiliate kreator, dan margin penjual TikTok Shop."
        url="https://www.radarharga.shop/seller/kalkulator/tiktok-shop"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: 'https://www.radarharga.shop' },
          { name: 'TikTok Shop', url: 'https://www.radarharga.shop/seller/biaya-admin/tiktok-shop' },
          { name: 'Kalkulator Profit', url: 'https://www.radarharga.shop/seller/kalkulator/tiktok-shop' },
        ]}
      />
      <FaqPageJsonLd items={faqItems} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'TikTok Shop', href: '/seller/biaya-admin/tiktok-shop' },
            { label: 'Kalkulator Profit TikTok Shop' },
          ]}
        />

        {/* Hero Section */}
        <section className="mb-8">
          <div className="flex items-center gap-2">
            <MarketplaceIcon id="tiktok-shop" size={18} withBackground />
            <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
              TikTok Shop & Affiliate Economics
            </span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-primary-900 sm:text-4xl">
            Kalkulator Profit TikTok Shop Indonesia
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-primary-600 sm:text-base">
            Hitung keuntungan bersih penjualan produk di TikTok Shop. Masukkan modal HPP, komisi kategori,
            biaya iklan GMV Max, serta <strong>bagi hasil komisi affiliate kreator (keranjang kuning)</strong>{' '}
            agar harga jual tetap menguntungkan.
          </p>
        </section>

        {/* Top Ad */}
        <AdSlot position="top" />

        {/* Interactive TikTok Shop Calculator */}
        <MarketplaceCalculator
          initialMarketplaceId="tiktok-shop"
          defaultSellingPrice={90000}
          defaultProductCost={45000}
        />

        {/* In-Content Ad */}
        <AdSlot position="in-content" />

        {/* Mathematical Walkthrough */}
        <section className="my-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-xl font-bold text-primary-900 sm:text-2xl">
            Simulasi Contoh Perhitungan: Skincare Rp 90.000 via Affiliate Live 10%
          </h2>
          <p className="mt-2 text-xs text-primary-500">
            Berikut simulasi bagaimana saldo pelepasan dana dihitung pada pesanan produk kecantikan Rp 90.000 dengan affiliate:
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-stone-200 text-xs sm:text-sm">
            <table className="w-full text-left">
              <thead className="bg-stone-50 font-display font-semibold text-primary-900">
                <tr>
                  <th className="py-2.5 px-4">Komponen Biaya</th>
                  <th className="py-2.5 px-4">Persentase / Aturan</th>
                  <th className="py-2.5 px-4 text-right">Jumlah (IDR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="py-2 px-4 font-semibold">Harga Jual Produk</td>
                  <td className="py-2 px-4 text-primary-500">Dibayar pembeli</td>
                  <td className="py-2 px-4 text-right font-mono font-bold text-emerald-700">Rp 90.000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Komisi Dasar TikTok Shop (Beauty)</td>
                  <td className="py-2 px-4 text-primary-500">4.75% x Rp 90.000</td>
                  <td className="py-2 px-4 text-right font-mono text-rose-600">-Rp 4.275</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Biaya Pemrosesan Pembayaran</td>
                  <td className="py-2 px-4 text-primary-500">1.0% (min Rp 1.000)</td>
                  <td className="py-2 px-4 text-right font-mono text-rose-600">-Rp 1.000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-medium text-purple-900">Komisi Affiliate Kreator</td>
                  <td className="py-2 px-4 text-primary-500">10.0% dari harga jual</td>
                  <td className="py-2 px-4 text-right font-mono font-bold text-purple-700">-Rp 9.000</td>
                </tr>
                <tr className="bg-stone-50/60 font-semibold">
                  <td className="py-2 px-4">Total Potongan Komisi</td>
                  <td className="py-2 px-4 text-primary-500">Platform + Pembayaran + Affiliate</td>
                  <td className="py-2 px-4 text-right font-mono text-rose-700">-Rp 14.275</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Modal Pokok Produk (HPP)</td>
                  <td className="py-2 px-4 text-primary-500">Bahan baku & packaging</td>
                  <td className="py-2 px-4 text-right font-mono">-Rp 45.000</td>
                </tr>
                <tr className="bg-emerald-50/80 font-display font-bold text-emerald-900">
                  <td className="py-3 px-4">Keuntungan Bersih (Net Profit)</td>
                  <td className="py-3 px-4">Rp 90.000 - Rp 59.275</td>
                  <td className="py-3 px-4 text-right font-mono text-base text-emerald-800">Rp 30.725 (34.1%)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-xl bg-stone-100 p-3 text-xs text-primary-800">
            <AlertCircle className="h-4 w-4 flex-shrink-0 text-primary-600 mt-0.5" />
            <p>
              Dengan komisi affiliate 10%, break-even price (BEP) Anda adalah <strong>Rp 54.600</strong>.
              Jika affiliate dinaikkan menjadi 15%, BEP Anda naik menjadi <strong>Rp 58.044</strong>.
            </p>
          </div>
        </section>

        {/* Links Hub */}
        <section className="my-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-card">
          <h2 className="font-display text-base font-bold text-primary-900 sm:text-lg">
            Navigasi Terkait TikTok Shop
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
            <Link
              href="/seller/biaya-admin/tiktok-shop"
              className="flex items-center justify-between rounded-xl border border-stone-200 p-3 hover:border-stone-400 hover:bg-stone-50"
            >
              <span className="font-semibold text-primary-800">Tabel Rincian Biaya Admin TikTok Shop</span>
              <ArrowRight className="h-4 w-4 text-primary-600" />
            </Link>
            <Link
              href="/seller/komparasi-fee/shopee-vs-tiktok-shop"
              className="flex items-center justify-between rounded-xl border border-stone-200 p-3 hover:border-stone-400 hover:bg-stone-50"
            >
              <span className="font-semibold text-primary-800">Bandingkan: TikTok Shop vs Shopee</span>
              <ArrowRight className="h-4 w-4 text-primary-600" />
            </Link>
            <Link
              href="/seller/komparasi-fee/tokopedia-vs-tiktok-shop"
              className="flex items-center justify-between rounded-xl border border-stone-200 p-3 hover:border-stone-400 hover:bg-stone-50"
            >
              <span className="font-semibold text-primary-800">Bandingkan: TikTok Shop vs Tokopedia</span>
              <ArrowRight className="h-4 w-4 text-primary-600" />
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <FaqAccordion items={faqItems} title="FAQ Kalkulator TikTok Shop" />

        {/* Bottom Ad */}
        <AdSlot position="bottom" />
      </div>
    </>
  );
}
