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
  title: 'Kalkulator Profit Lazada: Hitung Komisi Marketplace, LazMall & Free Shipping',
  description:
    'Kalkulator profit Lazada gratis untuk Marketplace Seller dan LazMall. Hitung komisi kategori, biaya Free Shipping Max, payment fee 1.8%, dan break-even harga jual.',
  path: '/seller/kalkulator/lazada',
  keywords: ['kalkulator lazada', 'kalkulator profit lazada', 'komisi lazmall', 'biaya free shipping max'],
});

const faqItems = [
  {
    question: 'Berapa biaya komisi standar Lazada untuk penjual marketplace?',
    answer:
      'Komisi penjualan standar Lazada berkisar antara 2.5% hingga 4.5% tergantung kategori produk, dengan biaya penanganan pembayaran (payment fee) sebesar 1.8%.',
  },
  {
    question: 'Berapa biaya program Free Shipping Max di Lazada?',
    answer:
      'Program subsidi ongkir Free Shipping Max mengenakan biaya layanan sebesar 3.0% dari harga jual produk dengan batas maksimal Rp 10.000 per unit.',
  },
  {
    question: 'Apa perbedaan potongan Marketplace Seller dan LazMall?',
    answer:
      'Toko resmi LazMall dikenakan komisi yang lebih tinggi (berkisar 4.0% hingga 7.0%) namun mendapatkan prioritas algoritma pencarian, eksposur homepage, dan lencana 100% original.',
  },
];

export default function LazadaProfitCalculatorPage() {
  return (
    <>
      <SoftwareApplicationJsonLd
        name="Kalkulator Profit Lazada Indonesia"
        description="Kalkulator komisi admin, margin bersih, dan break-even penjual Lazada."
        url="https://kalkulatormarketplace.id/seller/kalkulator/lazada"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: 'https://kalkulatormarketplace.id' },
          { name: 'Lazada', url: 'https://kalkulatormarketplace.id/seller/biaya-admin/lazada' },
          { name: 'Kalkulator Profit', url: 'https://kalkulatormarketplace.id/seller/kalkulator/lazada' },
        ]}
      />
      <FaqPageJsonLd items={faqItems} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Lazada', href: '/seller/biaya-admin/lazada' },
            { label: 'Kalkulator Profit Lazada' },
          ]}
        />

        {/* Hero Section */}
        <section className="mb-8">
          <div className="flex items-center gap-2">
            <MarketplaceIcon id="lazada" size={18} withBackground />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Lazada Seller Economics
            </span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-primary-900 sm:text-4xl">
            Kalkulator Profit Lazada Indonesia
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-primary-600 sm:text-base">
            Hitung simulasi keuntungan bersih penjualan di Lazada untuk <strong>Marketplace Seller</strong> maupun{' '}
            <strong>LazMall</strong>. Perhitungkan biaya komisi kategori, payment fee 1.8%, serta keikutsertaan
            program Free Shipping Max secara akurat.
          </p>
        </section>

        {/* Top Ad */}
        <AdSlot position="top" />

        {/* Interactive Lazada Calculator */}
        <MarketplaceCalculator
          initialMarketplaceId="lazada"
          defaultSellingPrice={120000}
          defaultProductCost={75000}
        />

        {/* In-Content Ad */}
        <AdSlot position="in-content" />

        {/* Mathematical Walkthrough */}
        <section className="my-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-xl font-bold text-primary-900 sm:text-2xl">
            Simulasi Contoh Perhitungan: Produk Hobi Rp 120.000
          </h2>
          <p className="mt-2 text-xs text-primary-500">
            Berikut simulasi bagaimana saldo pelepasan dana dihitung pada pesanan produk kategori hobi seharga Rp 120.000:
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
                  <td className="py-2 px-4 text-right font-mono font-bold text-emerald-700">Rp 120.000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Komisi Marketplace Seller (Hobi)</td>
                  <td className="py-2 px-4 text-primary-500">4.0% x Rp 120.000</td>
                  <td className="py-2 px-4 text-right font-mono text-rose-600">-Rp 4.800</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Program Free Shipping Max</td>
                  <td className="py-2 px-4 text-primary-500">3.0% (maks Rp 10.000)</td>
                  <td className="py-2 px-4 text-right font-mono text-rose-600">-Rp 3.600</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Biaya Pembayaran (Payment Fee)</td>
                  <td className="py-2 px-4 text-primary-500">1.8% x Rp 120.000</td>
                  <td className="py-2 px-4 text-right font-mono text-rose-600">-Rp 2.160</td>
                </tr>
                <tr className="bg-stone-50/60 font-semibold">
                  <td className="py-2 px-4">Total Potongan Lazada</td>
                  <td className="py-2 px-4 text-primary-500">Komisi + Gratis Ongkir + Bayar</td>
                  <td className="py-2 px-4 text-right font-mono text-rose-700">-Rp 10.560</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Modal Pokok Produk (HPP)</td>
                  <td className="py-2 px-4 text-primary-500">Modal barang</td>
                  <td className="py-2 px-4 text-right font-mono">-Rp 75.000</td>
                </tr>
                <tr className="bg-emerald-50/80 font-display font-bold text-emerald-900">
                  <td className="py-3 px-4">Keuntungan Bersih (Net Profit)</td>
                  <td className="py-3 px-4">Rp 120.000 - Rp 85.560</td>
                  <td className="py-3 px-4 text-right font-mono text-base text-emerald-800">Rp 34.440 (28.7%)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-xl bg-blue-50/60 p-3 text-xs text-blue-900">
            <AlertCircle className="h-4 w-4 flex-shrink-0 text-blue-600 mt-0.5" />
            <p>
              Pada skenario di atas, harga jual minimum break-even (BEP) Anda adalah <strong>Rp 82.237</strong>.
            </p>
          </div>
        </section>

        {/* Links Hub */}
        <section className="my-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-card">
          <h2 className="font-display text-base font-bold text-primary-900 sm:text-lg">
            Navigasi Terkait Lazada
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
            <Link
              href="/seller/biaya-admin/lazada"
              className="flex items-center justify-between rounded-xl border border-stone-200 p-3 hover:border-blue-300 hover:bg-blue-50/30"
            >
              <span className="font-semibold text-primary-800">Tabel Rincian Biaya Komisi Lazada</span>
              <ArrowRight className="h-4 w-4 text-blue-600" />
            </Link>
            <Link
              href="/seller/komparasi-fee/shopee-vs-tokopedia"
              className="flex items-center justify-between rounded-xl border border-stone-200 p-3 hover:border-blue-300 hover:bg-blue-50/30"
            >
              <span className="font-semibold text-primary-800">Bandingkan: Shopee vs Tokopedia</span>
              <ArrowRight className="h-4 w-4 text-blue-600" />
            </Link>
            <Link
              href="/seller/komparasi-fee"
              className="flex items-center justify-between rounded-xl border border-stone-200 p-3 hover:border-blue-300 hover:bg-blue-50/30"
            >
              <span className="font-semibold text-primary-800">Bandingkan 4 Marketplace Sekaligus</span>
              <ArrowRight className="h-4 w-4 text-blue-600" />
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <FaqAccordion items={faqItems} title="FAQ Kalkulator Lazada" />

        {/* Bottom Ad */}
        <AdSlot position="bottom" />
      </div>
    </>
  );
}
