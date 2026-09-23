import type { Metadata } from 'next';
import { radarAggregator } from '@/domain/radar/radarAggregator';
import { RadarClientContainer } from '@/components/radar/RadarClientContainer';
import { AdSlot } from '@/components/ads/AdSlot';
import { Radar, Compass, HelpCircle, ShieldCheck, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Marketplace Intelligence: Bandingkan Harga Shopee, Tokopedia, TikTok, Lazada',
  description:
    'Bandingkan harga barang secara live di Shopee, Tokopedia, TikTok Shop, dan Lazada. Temukan toko dengan harga termurah, selisih diskon, dan hemat belanja online secara instan.',
  keywords: [
    'radar harga marketplace',
    'bandingkan harga shopee tokopedia',
    'cek harga termurah tiktok shop',
    'perbandingan harga lazada shopee',
    'cari barang termurah marketplace',
    'alat cek harga e-commerce indonesia',
  ],
  alternates: {
    canonical: 'https://kalkulatormarketplace.id',
  },
  openGraph: {
    title: 'Marketplace Intelligence: Bandingkan Harga Shopee, Tokopedia, TikTok, Lazada Termurah',
    description:
      'Bandingkan harga barang secara live di marketplace terbesar Indonesia. Temukan toko termurah dalam hitungan detik.',
    url: 'https://kalkulatormarketplace.id',
    type: 'website',
  },
};

const DEFAULT_QUERY = 'iPhone 15 128GB';

export default async function HomePage() {
  // Pre-fetch initial benchmark result on server for instantaneous first load & SEO
  const initialResult = await radarAggregator.search(DEFAULT_QUERY);

  // JSON-LD Structured Data for Search Engines
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Radar Harga Marketplace Indonesia',
    description:
      'Alat pembanding harga e-commerce independen untuk mencari harga termurah di Shopee, Tokopedia, TikTok Shop, dan Lazada.',
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Bagaimana cara kerja perbandingan harga ini?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sistem mengumpulkan katalog penawaran harga dari Shopee, Tokopedia, TikTok Shop, dan Lazada secara terpadu dan mengurutkannya dari yang paling hemat.',
          },
        },
        {
          '@type': 'Question',
          name: 'Mengapa harga produk bisa berbeda antar marketplace?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Setiap marketplace memiliki struktur biaya komisi admin, program subsidi gratis ongkir, dan promo flash deal yang berbeda-beda, sehingga penjual sering menyesuaikan harga jual untuk menjaga margin keuntungan.',
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-canvas py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top Banner Ad Zone */}
          <div className="mb-8 flex justify-center">
            <AdSlot position="top" />
          </div>

          {/* Hero Section (Consumer Focused) */}
          <div className="mb-8 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 py-1 shadow-subtle">
              <Radar className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
              <span className="text-xs font-semibold text-primary-800">
                Radar Harga Multi-Marketplace 2025
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-primary-900 sm:text-4xl lg:text-5xl">
              Cari & Bandingkan Harga Barang{' '}
              <span className="text-emerald-700">Termurah</span>
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-primary-600 sm:text-base">
              Ketik nama barang yang ingin Anda beli. Sistem kami membandingkan penawaran aktif di{' '}
              <strong>Shopee</strong>, <strong>Tokopedia</strong>, <strong>TikTok Shop</strong>, dan{' '}
              <strong>Lazada</strong> agar Anda selalu mendapatkan harga paling hemat tanpa repot membuka 4 aplikasi sekaligus.
            </p>
          </div>

          {/* Interactive Radar Tool Card */}
          <section id="search" aria-label="Alat Pencarian Radar Harga">
            <RadarClientContainer
              initialResult={initialResult}
              defaultQuery={DEFAULT_QUERY}
            />
          </section>

          {/* In-Content Ad Zone */}
          <div className="my-12 flex justify-center">
            <AdSlot position="in-content" />
          </div>

          {/* Editorial Educational & FAQ Section */}
          <div id="panduan" className="mt-16 border-t border-stone-200 pt-12">
            <div className="max-w-4xl">
              <h2 className="font-display text-2xl font-bold text-primary-900">
                Panduan Cerdas Membandingkan Harga E-commerce
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-subtle">
                  <Zap className="h-5 w-5 text-amber-600" />
                  <h3 className="mt-3 font-display text-sm font-bold text-primary-900">
                    Katalog Real-Time
                  </h3>
                  <p className="mt-1.5 text-xs text-primary-600 leading-relaxed">
                    Data harga ditarik secara on-demand dan di-cache secara efisien untuk menyajikan perbandingan akurat dengan waktu tunggu sangat cepat.
                  </p>
                </div>

                <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-subtle">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  <h3 className="mt-3 font-display text-sm font-bold text-primary-900">
                    Prioritas Toko Resmi
                  </h3>
                  <p className="mt-1.5 text-xs text-primary-600 leading-relaxed">
                    Sistem memprioritaskan toko Official Store, Mall, dan Star Seller untuk meminimalkan risiko produk tiruan atau toko tidak aktif.
                  </p>
                </div>

                <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-subtle">
                  <Compass className="h-5 w-5 text-blue-600" />
                  <h3 className="mt-3 font-display text-sm font-bold text-primary-900">
                    Transparansi Penuh
                  </h3>
                  <p className="mt-1.5 text-xs text-primary-600 leading-relaxed">
                    Kami tidak memihak satu marketplace mana pun. Seluruh selisih harga disajikan murni berbasis angka penawaran katalog publik.
                  </p>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mt-10">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary-500" />
                  <h3 className="font-display text-base font-bold text-primary-900">
                    Pertanyaan yang Sering Diajukan (FAQ)
                  </h3>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="rounded-xl border border-stone-200 bg-white p-4">
                    <h4 className="text-xs font-bold text-primary-900">
                      Apakah harga yang tertera sudah termasuk biaya ongkos kirim?
                    </h4>
                    <p className="mt-1 text-xs text-primary-600 leading-relaxed">
                      Harga yang tertera adalah harga dasar produk di masing-masing platform. Biaya ongkir aktual dapat bervariasi tergantung lokasi alamat Anda, voucher Gratis Ongkir yang Anda miliki di akun masing-masing aplikasi, serta ekspedisi logistik yang dipilih.
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-200 bg-white p-4">
                    <h4 className="text-xs font-bold text-primary-900">
                      Mengapa produk di TikTok Shop kadang lebih murah dari Tokopedia?
                    </h4>
                    <p className="mt-1 text-xs text-primary-600 leading-relaxed">
                      TikTok Shop sering memberikan subsidi diskon promosi streaming live atau komisi kreator khusus untuk mendongkrak penjualan cepat, sementara Tokopedia sering unggul pada ketersediaan voucher cashback dan gratis ongkir instan perkotaan.
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-200 bg-white p-4">
                    <h4 className="text-xs font-bold text-primary-900">
                      Bagaimana cara mendapatkan harga termurah yang ditampilkan?
                    </h4>
                    <p className="mt-1 text-xs text-primary-600 leading-relaxed">
                      Cukup klik tombol &quot;Beli di [Marketplace]&quot; pada kartu yang memiliki label &quot;Paling Termurah&quot;. Anda akan langsung diarahkan ke halaman produk resmi pada aplikasi marketplace terkait untuk menyelesaikan transaksi dengan aman.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
