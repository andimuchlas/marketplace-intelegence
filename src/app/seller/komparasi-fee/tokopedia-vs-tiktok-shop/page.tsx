import { constructMetadata } from '@/lib/seo/metadata';
import { ComparisonMatrix } from '@/components/comparison/ComparisonMatrix';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { FaqPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { MarketplaceIcon } from '@/components/ui/MarketplaceIcon';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Tokopedia vs TikTok Shop: Perbandingan Komisi Seller & Ekosistem Shop Tokopedia',
  description:
    'Tokopedia vs TikTok Shop: Bagaimana perbandingan potongan biaya admin setelah integrasi Shop | Tokopedia? Bandingkan komisi produk, biaya pembayaran, dan laba bersih.',
  path: '/seller/komparasi-fee/tokopedia-vs-tiktok-shop',
  keywords: ['tokopedia vs tiktok shop', 'biaya admin shop tokopedia', 'komisi seller tiktok vs tokopedia'],
});

const faqItems = [
  {
    question: 'Bagaimana integrasi Shop | Tokopedia mempengaruhi biaya admin penjual?',
    answer:
      'Meskipun sistem operasional e-commerce di TikTok kini dikelola dalam kemitraan Shop | Tokopedia, skema komisi kategori dan biaya promosi pada aplikasi Tokopedia dan aplikasi TikTok tetap memiliki ketentuan masing-masing sesuai jalur pesanan masuk.',
  },
  {
    question: 'Kapan sebaiknya fokus ke Tokopedia vs TikTok Shop?',
    answer:
      'Gunakan Tokopedia untuk produk yang membutuhkan spesifikasi detail, garansi resmi, dan pencarian katalog terencana (gadget, otomotif, komputer). Gunakan TikTok Shop untuk produk visual, tren viral, dan pembelian impulsif (fashion, camilan, skincare).',
  },
];

export default function TokopediaVsTikTokShopPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: 'https://kalkulatormarketplace.id' },
          { name: 'Bandingkan', url: 'https://kalkulatormarketplace.id/seller/komparasi-fee' },
          { name: 'Tokopedia vs TikTok Shop', url: 'https://kalkulatormarketplace.id/seller/komparasi-fee/tokopedia-vs-tiktok-shop' },
        ]}
      />
      <FaqPageJsonLd items={faqItems} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Bandingkan', href: '/seller/komparasi-fee' },
            { label: 'Tokopedia vs TikTok Shop' },
          ]}
        />

        {/* Header */}
        <section className="mb-8">
          <div className="flex items-center gap-2">
            <MarketplaceIcon id="tokopedia" size={18} withBackground />
            <span className="text-xs font-bold text-stone-400">VS</span>
            <MarketplaceIcon id="tiktok-shop" size={18} withBackground />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Sinergi & Komparasi Ekosistem
            </span>
          </div>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-primary-900 sm:text-4xl">
            Tokopedia vs TikTok Shop: Analisis Komisi & Potongan
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-primary-600 sm:text-base">
            Pelajari perbedaan skema komisi admin antara <strong>Tokopedia Power Merchant</strong> dan{' '}
            <strong>TikTok Shop Seller</strong>. Simulasikan margin keuntungan produk Anda di kedua platform
            secara langsung.
          </p>
        </section>

        {/* Top Ad */}
        <AdSlot position="top" />

        {/* Live Matrix */}
        <ComparisonMatrix initialPrice={110000} initialCost={65000} showInputs={true} />

        {/* In-Content Ad */}
        <AdSlot position="in-content" />

        {/* Comparison Insight */}
        <section className="my-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-xl font-bold text-primary-900 sm:text-2xl">
            Kelebihan Masing-Masing Platform
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/30 p-5">
              <div className="flex items-center gap-2">
                <MarketplaceIcon id="tokopedia" size={18} withBackground />
                <h3 className="font-display text-base font-bold text-emerald-950">Kelebihan Tokopedia</h3>
              </div>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-primary-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-600 mt-0.5" />
                  <span><strong>Biaya Transaksi Flat:</strong> Cuma Rp 1.000 per pesanan, sangat hemat untuk transaksi ratusan ribu hingga jutaan rupiah.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-600 mt-0.5" />
                  <span><strong>Tingkat Return Lebih Rendah:</strong> Pembeli Tokopedia mayoritas menggunakan pembayaran non-COD, meminimalkan risiko paket retur (RTS).</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-stone-300 bg-stone-100/50 p-5">
              <div className="flex items-center gap-2">
                <MarketplaceIcon id="tiktok-shop" size={18} withBackground />
                <h3 className="font-display text-base font-bold text-stone-900">Kelebihan TikTok Shop</h3>
              </div>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-primary-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-stone-800 mt-0.5" />
                  <span><strong>Konversi Live Streaming:</strong> Kemampuan demo produk langsung di depan ribuan penonton mendorong pembelian spontan yang masif.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-stone-800 mt-0.5" />
                  <span><strong>Skalabilitas Kreator:</strong> Tidak perlu memiliki follower besar, Anda bisa memanfaatkan creator affiliate marketplace untuk menjualkan produk Anda.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FaqAccordion items={faqItems} title="FAQ Tokopedia vs TikTok Shop" />

        {/* Bottom Ad */}
        <AdSlot position="bottom" />
      </div>
    </>
  );
}
