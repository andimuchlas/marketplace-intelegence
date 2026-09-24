import { constructMetadata } from '@/lib/seo/metadata';
import { MarketplaceCalculator } from '@/components/calculator/MarketplaceCalculator';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { SoftwareApplicationJsonLd, FaqPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { MarketplaceIcon } from '@/components/ui/MarketplaceIcon';
import Link from 'next/link';
import { ArrowRight, BookOpen, AlertCircle } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Kalkulator Profit Shopee: Hitung Potongan Biaya Admin & Margin Bersih',
  description:
    'Kalkulator profit Shopee gratis untuk Non-Star, Star Seller, Star+, dan Shopee Mall. Hitung potongan biaya admin, Gratis Ongkir XTRA, cashback, dan break-even harga jual.',
  path: '/seller/kalkulator/shopee',
  keywords: ['kalkulator shopee', 'kalkulator profit shopee', 'potongan star seller shopee', 'biaya gratis ongkir xtra'],
});

const faqItems = [
  {
    question: 'Berapa potongan biaya admin Shopee untuk Star Seller?',
    answer:
      'Biaya administrasi Shopee untuk penjual Star dan Star+ umumnya berkisar antara 4.25% hingga 5.25% tergantung kategori produk yang dijual (Kategori A, B, C, D, atau E), ditambah biaya transaksi penanganan 1%.',
  },
  {
    question: 'Apakah program Gratis Ongkir XTRA wajib diikuti di Shopee?',
    answer:
      'Tidak wajib, namun program ini memberikan eksposur voucher gratis ongkir bagi pembeli. Biaya layanan program Gratis Ongkir XTRA adalah 4% dengan batas potongan maksimal (cap) Rp10.000 per kuantiti produk.',
  },
  {
    question: 'Berapa biaya penanganan transaksi di Shopee?',
    answer:
      'Biaya penanganan transaksi pembayaran adalah 1% atau minimum Rp1.000 per pesanan berhasil, yang dipotong langsung dari saldo pelepasan dana penjualan.',
  },
];

export default function ShopeeProfitCalculatorPage() {
  return (
    <>
      <SoftwareApplicationJsonLd
        name="Kalkulator Profit Shopee Indonesia"
        description="Kalkulator komisi admin, margin bersih, dan break-even penjual Shopee."
        url="https://www.radarharga.shop/seller/kalkulator/shopee"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: 'https://www.radarharga.shop' },
          { name: 'Shopee', url: 'https://www.radarharga.shop/seller/biaya-admin/shopee' },
          { name: 'Kalkulator Profit', url: 'https://www.radarharga.shop/seller/kalkulator/shopee' },
        ]}
      />
      <FaqPageJsonLd items={faqItems} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Shopee', href: '/seller/biaya-admin/shopee' },
            { label: 'Kalkulator Profit Shopee' },
          ]}
        />

        {/* Hero Section */}
        <section className="mb-8">
          <div className="flex items-center gap-2">
            <MarketplaceIcon id="shopee" size={18} withBackground />
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Shopee Seller Economics
            </span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-primary-900 sm:text-4xl">
            Kalkulator Profit Shopee Indonesia
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-primary-600 sm:text-base">
            Hitung simulasi keuntungan bersih penjualan di Shopee untuk toko <strong>Non-Star</strong>,{' '}
            <strong>Star Seller</strong>, <strong>Star+</strong>, hingga <strong>Shopee Mall</strong>.
            Faktorkan potongan komisi admin per kategori, program Gratis Ongkir XTRA, biaya penanganan,
            serta komisi Shopee Video & Live Affiliate.
          </p>
        </section>

        {/* Top Ad */}
        <AdSlot position="top" />

        {/* Interactive Shopee Calculator */}
        <MarketplaceCalculator
          initialMarketplaceId="shopee"
          defaultSellingPrice={100000}
          defaultProductCost={60000}
        />

        {/* In-Content Ad */}
        <AdSlot position="in-content" />

        {/* Mathematical Walkthrough & Example */}
        <section className="my-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-xl font-bold text-primary-900 sm:text-2xl">
            Simulasi Contoh Perhitungan: Star Seller Fashion Rp 100.000
          </h2>
          <p className="mt-2 text-xs text-primary-500">
            Berikut adalah simulasi alur matematika bagaimana saldo pelepasan dana dihitung pada pesanan baju seharga Rp 100.000:
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-stone-200 text-xs sm:text-sm">
            <table className="w-full text-left">
              <thead className="bg-stone-50 font-display font-semibold text-primary-900">
                <tr>
                  <th className="py-2.5 px-4">Komponen Keuangan</th>
                  <th className="py-2.5 px-4">Tarif / Aturan</th>
                  <th className="py-2.5 px-4 text-right">Jumlah (IDR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="py-2 px-4 font-semibold">Harga Jual Produk</td>
                  <td className="py-2 px-4 text-primary-500">Dibayar pembeli</td>
                  <td className="py-2 px-4 text-right font-mono font-bold text-emerald-700">Rp 100.000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Biaya Administrasi Star (Kategori A)</td>
                  <td className="py-2 px-4 text-primary-500">5.0% x Rp 100.000</td>
                  <td className="py-2 px-4 text-right font-mono text-rose-600">-Rp 5.000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Gratis Ongkir XTRA (Subsidi)</td>
                  <td className="py-2 px-4 text-primary-500">4.0% (maks Rp 10.000)</td>
                  <td className="py-2 px-4 text-right font-mono text-rose-600">-Rp 4.000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Biaya Penanganan Transaksi</td>
                  <td className="py-2 px-4 text-primary-500">1.0% (min Rp 1.000)</td>
                  <td className="py-2 px-4 text-right font-mono text-rose-600">-Rp 1.000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Komisi Shopee Affiliate</td>
                  <td className="py-2 px-4 text-primary-500">5.0% dari harga jual</td>
                  <td className="py-2 px-4 text-right font-mono text-rose-600">-Rp 5.000</td>
                </tr>
                <tr className="bg-stone-50/60 font-semibold">
                  <td className="py-2 px-4">Total Potongan Platform</td>
                  <td className="py-2 px-4 text-primary-500">15% total potongan</td>
                  <td className="py-2 px-4 text-right font-mono text-rose-700">-Rp 15.000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Modal Pokok Produk (HPP)</td>
                  <td className="py-2 px-4 text-primary-500">Biaya kulakan/produksi</td>
                  <td className="py-2 px-4 text-right font-mono">-Rp 60.000</td>
                </tr>
                <tr className="bg-emerald-50/80 font-display font-bold text-emerald-900">
                  <td className="py-3 px-4">Keuntungan Bersih (Net Profit)</td>
                  <td className="py-3 px-4">Rp 100.000 - Rp 75.000</td>
                  <td className="py-3 px-4 text-right font-mono text-base text-emerald-800">Rp 25.000 (25%)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-xl bg-orange-50/60 p-3 text-xs text-orange-900">
            <AlertCircle className="h-4 w-4 flex-shrink-0 text-orange-600 mt-0.5" />
            <p>
              Pada contoh di atas, harga jual break-even (BEP) Anda adalah <strong>Rp 70.588</strong>. Jika
              menjual di bawah harga tersebut dengan struktur potongan yang sama, toko Anda akan mengalami kerugian.
            </p>
          </div>
        </section>

        {/* Internal Links Hub */}
        <section className="my-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-card">
          <h2 className="font-display text-base font-bold text-primary-900 sm:text-lg">
            Navigasi & Panduan Terkait Shopee
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
            <Link
              href="/seller/biaya-admin/shopee"
              className="flex items-center justify-between rounded-xl border border-stone-200 p-3 hover:border-orange-300 hover:bg-orange-50/30"
            >
              <span className="font-semibold text-primary-800">Tabel Rincian Biaya Admin Shopee</span>
              <ArrowRight className="h-4 w-4 text-orange-600" />
            </Link>
            <Link
              href="/seller/komparasi-fee/shopee-vs-tokopedia"
              className="flex items-center justify-between rounded-xl border border-stone-200 p-3 hover:border-orange-300 hover:bg-orange-50/30"
            >
              <span className="font-semibold text-primary-800">Bandingkan: Shopee vs Tokopedia</span>
              <ArrowRight className="h-4 w-4 text-orange-600" />
            </Link>
            <Link
              href="/seller/komparasi-fee/shopee-vs-tiktok-shop"
              className="flex items-center justify-between rounded-xl border border-stone-200 p-3 hover:border-orange-300 hover:bg-orange-50/30"
            >
              <span className="font-semibold text-primary-800">Bandingkan: Shopee vs TikTok Shop</span>
              <ArrowRight className="h-4 w-4 text-orange-600" />
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <FaqAccordion items={faqItems} title="Pertanyaan Seputar Kalkulator Shopee" />

        {/* Bottom Ad */}
        <AdSlot position="bottom" />
      </div>
    </>
  );
}
