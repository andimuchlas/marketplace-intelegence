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
  title: 'Kalkulator Profit Tokopedia: Hitung Biaya Power Merchant Pro & Bebas Ongkir',
  description:
    'Kalkulator profit Tokopedia gratis untuk Power Merchant, PM Pro, dan Official Store. Hitung komisi grup kategori 1-5, biaya Bebas Ongkir, dan break-even harga jual.',
  path: '/seller/kalkulator/tokopedia',
  keywords: ['kalkulator tokopedia', 'kalkulator profit tokopedia', 'biaya power merchant pro', 'komisi bebas ongkir'],
});

const faqItems = [
  {
    question: 'Berapa potongan biaya layanan Tokopedia untuk Power Merchant Pro?',
    answer:
      'Biaya layanan dasar Power Merchant Pro berkisar antara 3.0% hingga 5.5% tergantung pada grup kategori produk (Grup 1 hingga Grup 5), ditambah biaya jasa aplikasi Rp 1.000 per pesanan.',
  },
  {
    question: 'Bagaimana perhitungan biaya layanan Bebas Ongkir di Tokopedia?',
    answer:
      'Layanan Bebas Ongkir dikenakan biaya 4% dari harga produk terjual dengan batas maksimal (cap) sebesar Rp 10.000 per kuantiti barang.',
  },
  {
    question: 'Kapan status Power Merchant dikenakan biaya?',
    answer:
      'Biaya layanan berlaku untuk setiap transaksi produk yang berhasil diselesaikan dan dananya diteruskan ke Saldo Penghasilan penjual.',
  },
];

export default function TokopediaProfitCalculatorPage() {
  return (
    <>
      <SoftwareApplicationJsonLd
        name="Kalkulator Profit Tokopedia Indonesia"
        description="Kalkulator komisi admin, margin bersih, dan break-even penjual Tokopedia."
        url="https://kalkulatormarketplace.id/seller/kalkulator/tokopedia"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: 'https://kalkulatormarketplace.id' },
          { name: 'Tokopedia', url: 'https://kalkulatormarketplace.id/seller/biaya-admin/tokopedia' },
          { name: 'Kalkulator Profit', url: 'https://kalkulatormarketplace.id/seller/kalkulator/tokopedia' },
        ]}
      />
      <FaqPageJsonLd items={faqItems} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Tokopedia', href: '/seller/biaya-admin/tokopedia' },
            { label: 'Kalkulator Profit Tokopedia' },
          ]}
        />

        {/* Hero Section */}
        <section className="mb-8">
          <div className="flex items-center gap-2">
            <MarketplaceIcon id="tokopedia" size={18} withBackground />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Tokopedia Seller Economics
            </span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-primary-900 sm:text-4xl">
            Kalkulator Profit Tokopedia Indonesia
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-primary-600 sm:text-base">
            Hitung estimasi laba bersih dan biaya layanan di Tokopedia untuk seller <strong>Power Merchant</strong>,{' '}
            <strong>Power Merchant Pro</strong>, hingga <strong>Official Store</strong>. Faktorkan biaya
            layanan kategori produk grup 1-5 dan subsidi Bebas Ongkir secara transparan.
          </p>
        </section>

        {/* Top Ad */}
        <AdSlot position="top" />

        {/* Interactive Tokopedia Calculator */}
        <MarketplaceCalculator
          initialMarketplaceId="tokopedia"
          defaultSellingPrice={150000}
          defaultProductCost={100000}
        />

        {/* In-Content Ad */}
        <AdSlot position="in-content" />

        {/* Mathematical Walkthrough & Example */}
        <section className="my-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-xl font-bold text-primary-900 sm:text-2xl">
            Simulasi Contoh Perhitungan: Power Merchant Pro Gadget Rp 150.000
          </h2>
          <p className="mt-2 text-xs text-primary-500">
            Berikut simulasi bagaimana penerimaan saldo bersih dihitung pada produk elektronik/gadget seharga Rp 150.000:
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-stone-200 text-xs sm:text-sm">
            <table className="w-full text-left">
              <thead className="bg-stone-50 font-display font-semibold text-primary-900">
                <tr>
                  <th className="py-2.5 px-4">Komponen Keuangan</th>
                  <th className="py-2.5 px-4">Tarif / Ketentuan</th>
                  <th className="py-2.5 px-4 text-right">Jumlah (IDR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="py-2 px-4 font-semibold">Harga Jual Produk</td>
                  <td className="py-2 px-4 text-primary-500">Dibayar pembeli</td>
                  <td className="py-2 px-4 text-right font-mono font-bold text-emerald-700">Rp 150.000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Biaya Layanan PM Pro (Grup 3 Gadget)</td>
                  <td className="py-2 px-4 text-primary-500">4.0% x Rp 150.000</td>
                  <td className="py-2 px-4 text-right font-mono text-rose-600">-Rp 6.000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Layanan Bebas Ongkir</td>
                  <td className="py-2 px-4 text-primary-500">4.0% (maks Rp 10.000)</td>
                  <td className="py-2 px-4 text-right font-mono text-rose-600">-Rp 6.000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Biaya Jasa Aplikasi</td>
                  <td className="py-2 px-4 text-primary-500">Flat per transaksi</td>
                  <td className="py-2 px-4 text-right font-mono text-rose-600">-Rp 1.000</td>
                </tr>
                <tr className="bg-stone-50/60 font-semibold">
                  <td className="py-2 px-4">Total Potongan Marketplace</td>
                  <td className="py-2 px-4 text-primary-500">Admin + Bebas Ongkir + Aplikasi</td>
                  <td className="py-2 px-4 text-right font-mono text-rose-700">-Rp 13.000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Modal Pokok Produk (HPP)</td>
                  <td className="py-2 px-4 text-primary-500">Harga kulakan</td>
                  <td className="py-2 px-4 text-right font-mono">-Rp 100.000</td>
                </tr>
                <tr className="bg-emerald-50/80 font-display font-bold text-emerald-900">
                  <td className="py-3 px-4">Keuntungan Bersih (Net Profit)</td>
                  <td className="py-3 px-4">Rp 150.000 - Rp 113.000</td>
                  <td className="py-3 px-4 text-right font-mono text-base text-emerald-800">Rp 37.000 (24.7%)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-xl bg-emerald-50/60 p-3 text-xs text-emerald-900">
            <AlertCircle className="h-4 w-4 flex-shrink-0 text-emerald-600 mt-0.5" />
            <p>
              Dengan beban potongan di atas, harga jual minimum break-even (BEP) Anda adalah{' '}
              <strong>Rp 109.783</strong>.
            </p>
          </div>
        </section>

        {/* Links Hub */}
        <section className="my-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-card">
          <h2 className="font-display text-base font-bold text-primary-900 sm:text-lg">
            Navigasi Terkait Tokopedia
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
            <Link
              href="/seller/biaya-admin/tokopedia"
              className="flex items-center justify-between rounded-xl border border-stone-200 p-3 hover:border-emerald-300 hover:bg-emerald-50/30"
            >
              <span className="font-semibold text-primary-800">Tabel Rincian Biaya Admin Tokopedia</span>
              <ArrowRight className="h-4 w-4 text-emerald-600" />
            </Link>
            <Link
              href="/seller/komparasi-fee/shopee-vs-tokopedia"
              className="flex items-center justify-between rounded-xl border border-stone-200 p-3 hover:border-emerald-300 hover:bg-emerald-50/30"
            >
              <span className="font-semibold text-primary-800">Bandingkan: Tokopedia vs Shopee</span>
              <ArrowRight className="h-4 w-4 text-emerald-600" />
            </Link>
            <Link
              href="/seller/komparasi-fee/tokopedia-vs-tiktok-shop"
              className="flex items-center justify-between rounded-xl border border-stone-200 p-3 hover:border-emerald-300 hover:bg-emerald-50/30"
            >
              <span className="font-semibold text-primary-800">Bandingkan: Tokopedia vs TikTok Shop</span>
              <ArrowRight className="h-4 w-4 text-emerald-600" />
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <FaqAccordion items={faqItems} title="FAQ Kalkulator Tokopedia" />

        {/* Bottom Ad */}
        <AdSlot position="bottom" />
      </div>
    </>
  );
}
