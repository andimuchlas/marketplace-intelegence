import { constructMetadata } from '@/lib/seo/metadata';
import { MarketplaceCalculator } from '@/components/calculator/MarketplaceCalculator';
import { ComparisonMatrix } from '@/components/comparison/ComparisonMatrix';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { SoftwareApplicationJsonLd, FaqPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { MarketplaceIcon } from '@/components/ui/MarketplaceIcon';
import Link from 'next/link';

export const metadata = constructMetadata({
  title: 'Kalkulator Marketplace: Hitung Profit & Margin Bersih Semua Platform',
  description:
    'Kalkulator profit marketplace universal untuk Shopee, Tokopedia, TikTok Shop, dan Lazada. Hitung rincian biaya admin, komisi affiliate, dan break-even harga jual.',
  path: '/marketplace-calculator',
  keywords: ['kalkulator marketplace', 'hitung profit marketplace', 'kalkulator margin e-commerce'],
});

const faqItems = [
  {
    question: 'Bagaimana cara menggunakan kalkulator marketplace ini?',
    answer:
      'Cukup pilih marketplace yang ingin dihitung, masukkan harga jual yang diinginkan pembeli, modal produk (HPP), serta estimasi biaya iklan atau komisi affiliate jika ada. Kalkulator akan langsung menampilkan laba bersih, persentase margin, dan harga break-even.',
  },
  {
    question: 'Apakah kalkulator ini sudah memperhitungkan biaya Gratis Ongkir?',
    answer:
      'Ya, program layanan seperti Gratis Ongkir XTRA (Shopee), Bebas Ongkir (Tokopedia), dan Free Shipping Max (Lazada) sudah tersedia dalam menu opsi program tambahan dengan batas maksimal (cap) yang disesuaikan dengan aturan masing-masing platform.',
  },
];

export default function MarketplaceCalculatorPage() {
  return (
    <>
      <SoftwareApplicationJsonLd
        name="Kalkulator Marketplace Indonesia Universal"
        description="Alat kalkulator keuntungan dan potongan biaya marketplace Indonesia."
        url="https://kalkulatormarketplace.id/marketplace-calculator"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: 'https://kalkulatormarketplace.id' },
          { name: 'Kalkulator Marketplace', url: 'https://kalkulatormarketplace.id/marketplace-calculator' },
        ]}
      />
      <FaqPageJsonLd items={faqItems} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Breadcrumbs items={[{ label: 'Kalkulator Marketplace' }]} />

        {/* Header */}
        <section className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Alat Finansial Penjual
          </span>
          <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-primary-900 sm:text-4xl">
            Kalkulator Margin & Profit Marketplace
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-primary-600 sm:text-base">
            Gunakan kalkulator universal di bawah ini untuk menghitung simulasi potongan komisi administrasi,
            biaya transaksi, komisi kreator affiliate, biaya iklan, serta laba bersih di Shopee, Tokopedia,
            TikTok Shop, dan Lazada.
          </p>
        </section>

        {/* Ad Slot Top */}
        <AdSlot position="top" />

        {/* Master Calculator */}
        <MarketplaceCalculator
          initialMarketplaceId="shopee"
          defaultSellingPrice={120000}
          defaultProductCost={70000}
        />

        {/* In-Content Ad */}
        <AdSlot position="in-content" />

        {/* Multi-Platform Comparison Table */}
        <section className="my-12">
          <div className="mb-4">
            <h2 className="font-display text-2xl font-bold tracking-tight text-primary-900">
              Perbandingan Langsung Antar Platform
            </h2>
            <p className="text-sm text-primary-500">
              Evaluasi perbedaan potongan harga dan take-home margin di seluruh marketplace:
            </p>
          </div>
          <ComparisonMatrix initialPrice={120000} initialCost={70000} showInputs={false} />
        </section>

        {/* Sibling Marketplace Calculators Links */}
        <section className="my-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-card">
          <h2 className="font-display text-lg font-bold text-primary-900">
            Kalkulator Spesifik per Marketplace
          </h2>
          <p className="mt-1 text-xs text-primary-500">
            Buka kalkulator khusus yang telah dioptimasi dengan aturan tier dan kategori mendalam:
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs font-semibold">
            <Link
              href="/shopee-profit-calculator"
              className="flex items-center gap-1.5 rounded-xl border border-orange-200 bg-orange-50/40 p-3 text-orange-900 hover:bg-orange-100/60"
            >
              <MarketplaceIcon id="shopee" size={16} />
              <span>Kalkulator Shopee →</span>
            </Link>
            <Link
              href="/tokopedia-profit-calculator"
              className="flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50/40 p-3 text-emerald-900 hover:bg-emerald-100/60"
            >
              <MarketplaceIcon id="tokopedia" size={16} />
              <span>Kalkulator Tokopedia →</span>
            </Link>
            <Link
              href="/tiktok-shop-profit-calculator"
              className="flex items-center gap-1.5 rounded-xl border border-stone-300 bg-stone-100/50 p-3 text-stone-900 hover:bg-stone-200/50"
            >
              <MarketplaceIcon id="tiktok-shop" size={16} />
              <span>Kalkulator TikTok Shop →</span>
            </Link>
            <Link
              href="/lazada-profit-calculator"
              className="flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50/40 p-3 text-blue-900 hover:bg-blue-100/60"
            >
              <MarketplaceIcon id="lazada" size={16} />
              <span>Kalkulator Lazada →</span>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <FaqAccordion items={faqItems} />

        {/* Bottom Ad */}
        <AdSlot position="bottom" />
      </div>
    </>
  );
}
