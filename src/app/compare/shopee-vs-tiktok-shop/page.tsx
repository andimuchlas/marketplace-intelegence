import { constructMetadata } from '@/lib/seo/metadata';
import { ComparisonMatrix } from '@/components/comparison/ComparisonMatrix';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { FaqPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Shopee vs TikTok Shop: Perbandingan Potongan Komisi & Affiliate Seller',
  description:
    'Shopee vs TikTok Shop: Mana yang lebih menguntungkan untuk jualan online? Bandingkan potongan komisi seller, biaya live streaming, dan komisi affiliate kreator.',
  path: '/compare/shopee-vs-tiktok-shop',
  keywords: ['shopee vs tiktok shop', 'potongan tiktok seller vs shopee', 'komisi affiliate tiktok vs shopee'],
});

const faqItems = [
  {
    question: 'Mana yang lebih menguntungkan untuk fashion, Shopee atau TikTok Shop?',
    answer:
      'TikTok Shop memiliki algoritma penemuan konten (content-driven discovery) yang sangat kuat melalui video pendek dan live streaming, cocok untuk produk fashion yang mengandalkan visual. Shopee unggul pada retensi pencarian katalog dan kebiasaan voucher gratis ongkir pembeli setia.',
  },
  {
    question: 'Berapa rata-rata komisi affiliate yang diberikan di Shopee dan TikTok Shop?',
    answer:
      'Di kedua platform, penjual biasanya mengalokasikan 5% hingga 10% untuk produk standar, dan 10% hingga 15% untuk produk fashion atau kecantikan bermargin tinggi.',
  },
];

export default function ShopeeVsTikTokShopPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: 'https://kalkulatormarketplace.id' },
          { name: 'Bandingkan', url: 'https://kalkulatormarketplace.id/compare' },
          { name: 'Shopee vs TikTok Shop', url: 'https://kalkulatormarketplace.id/compare/shopee-vs-tiktok-shop' },
        ]}
      />
      <FaqPageJsonLd items={faqItems} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Bandingkan', href: '/compare' },
            { label: 'Shopee vs TikTok Shop' },
          ]}
        />

        {/* Header */}
        <section className="mb-8">
          <div className="flex items-center gap-2">
            <span className="text-xl">🟠</span>
            <span className="text-xs font-bold text-stone-400">VS</span>
            <span className="text-xl">⚫</span>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Pertarungan Live Commerce
            </span>
          </div>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-primary-900 sm:text-4xl">
            Shopee vs TikTok Shop: Perbandingan Komisi & Margin
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-primary-600 sm:text-base">
            Bandingkan struktur potongan komisi <strong>Shopee Star Seller</strong> dengan{' '}
            <strong>TikTok Shop Seller</strong>. Pelajari bagaimana komisi affiliate kreator dan biaya live
            shopping mempengaruhi laba bersih Anda.
          </p>
        </section>

        {/* Top Ad */}
        <AdSlot position="top" />

        {/* Live Matrix */}
        <ComparisonMatrix initialPrice={90000} initialCost={45000} showInputs={true} />

        {/* In-Content Ad */}
        <AdSlot position="in-content" />

        {/* Editorial Content */}
        <section className="my-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-xl font-bold text-primary-900 sm:text-2xl">
            Perbandingan Ekosistem: Shopee vs TikTok Shop
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-orange-200 bg-orange-50/30 p-5">
              <div className="flex items-center gap-2">
                <span className="text-xl">🟠</span>
                <h3 className="font-display text-base font-bold text-orange-950">Keunggulan Shopee</h3>
              </div>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-primary-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-orange-600 mt-0.5" />
                  <span><strong>Katalog Search Intent:</strong> Konsumen membuka Shopee dengan niat langsung membeli (high buying intent).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-orange-600 mt-0.5" />
                  <span><strong>Subsidi Ongkir Kuat:</strong> Program Gratis Ongkir XTRA sangat diandalkan pembeli di luar pulau Jawa.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-stone-300 bg-stone-100/50 p-5">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚫</span>
                <h3 className="font-display text-base font-bold text-stone-900">Keunggulan TikTok Shop</h3>
              </div>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-primary-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-stone-800 mt-0.5" />
                  <span><strong>Viral Discovery:</strong> Produk baru bisa langsung terjual ribuan unit dalam hitungan jam jika video FYP atau kreator live viral.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-stone-800 mt-0.5" />
                  <span><strong>Jaringan Affiliate Terbesar:</strong> Ratusan ribu kreator aktif mencari produk bertarget komisi menarik untuk dipromosikan.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FaqAccordion items={faqItems} title="FAQ Shopee vs TikTok Shop" />

        {/* Bottom Ad */}
        <AdSlot position="bottom" />
      </div>
    </>
  );
}
