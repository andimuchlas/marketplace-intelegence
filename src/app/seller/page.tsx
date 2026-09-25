import Link from 'next/link';
import { ArrowRight, ShieldCheck, CheckCircle2, HelpCircle } from 'lucide-react';
import { GoogleIcon } from '@/components/ui/Icon';
import { MarketplaceIcon } from '@/components/ui/MarketplaceIcon';
import { constructMetadata } from '@/lib/seo/metadata';
import { MarketplaceCalculator } from '@/components/calculator/MarketplaceCalculator';
import { ComparisonMatrix } from '@/components/comparison/ComparisonMatrix';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { SoftwareApplicationJsonLd, FaqPageJsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/config/site';

export const metadata = constructMetadata({
  title: 'Portal Penjual: Kalkulator Profit & Biaya Admin Marketplace Indonesia',
  description:
    'Alat kalkulator komisi admin, margin bersih, dan break-even harga jual untuk penjual Shopee, Tokopedia, TikTok Shop, dan Lazada. Bandingkan potongan marketplace secara instan.',
  path: '/seller',
});

const faqItems = [
  {
    question: 'Berapa potongan rata-rata penjualan di marketplace Indonesia?',
    answer:
      'Total potongan marketplace umumnya berkisar antara 6% hingga 14% dari harga jual produk, tergantung pada level penjual (Regular, Star Seller, Power Merchant Pro, Mall), kategori barang, serta program promosi seperti Gratis Ongkir XTRA dan komisi affiliate.',
  },
  {
    question: 'Apa itu harga jual Break-Even (BEP) di kalkulator ini?',
    answer:
      'Harga jual Break-Even Point (BEP) adalah harga minimum yang harus Anda tetapkan kepada pembeli agar seluruh modal pokok (HPP), komisi admin marketplace, biaya transaksi, dan iklan tertutup tanpa mengalami kerugian (profit = Rp 0).',
  },
  {
    question: 'Apakah kalkulator ini menggunakan data resmi dan live?',
    answer:
      'Kalkulator ini menggunakan model kalkulasi simulasi berbasis tarif publik terbaru yang diverifikasi. Data ini ditujukan untuk edukasi dan perencanaan unit economics UMKM sebelum menetapkan harga jual di toko online.',
  },
  {
    question: 'Mengapa saya perlu memperhitungkan komisi affiliate dan iklan per unit?',
    answer:
      'Banyak penjual mengalami margin minus di akhir bulan karena tidak memasukkan biaya affiliate kreator (misalnya 5%-10%) dan biaya perolehan iklan (cost per order) ke dalam struktur modal awal produk.',
  },
];

export default function SellerPortalPage() {
  return (
    <>
      <SoftwareApplicationJsonLd
        name="Portal Penjual Marketplace Intelligence Indonesia"
        description={siteConfig.description}
        url={`${siteConfig.url}/seller`}
      />
      <FaqPageJsonLd items={faqItems} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Top Ad Slot Banner */}
        <AdSlot position="top" className="mb-8" />

        {/* Hero Section (Wise Style) */}
        <section className="mb-10 text-center sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 py-1 text-xs font-semibold text-primary-700 shadow-subtle">
            <GoogleIcon name="monitoring" size={16} className="text-emerald-600" />
            <span>Kalkulator Finansial Penjual E-Commerce 2025</span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-primary-900 sm:text-5xl lg:text-6xl">
            Hitung Profit & Potongan <br className="hidden sm:inline" />
            <span className="text-emerald-700">Marketplace Indonesia</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-primary-600 sm:text-base md:text-lg">
            Ketahui keuntungan bersih dan break-even harga jual produk toko Anda di{' '}
            <strong>Shopee</strong>, <strong>Tokopedia</strong>, <strong>TikTok Shop</strong>, dan{' '}
            <strong>Lazada</strong> secara transparan tanpa ribet.
          </p>
        </section>

        {/* Layout: Main Interactive Tool */}
        <section aria-label="Kalkulator Utama Penjual">
          <MarketplaceCalculator
            initialMarketplaceId="shopee"
            defaultSellingPrice={100000}
            defaultProductCost={60000}
          />
        </section>

        {/* In-Content Ad Slot */}
        <AdSlot position="in-content" className="my-10" />

        {/* 4-Way Comparison Section */}
        <section className="my-12 sm:my-16" aria-label="Perbandingan Marketplace">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Multi-Channel Economics
              </span>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-primary-900 sm:text-3xl">
                Bandingkan Margin di 4 Marketplace
              </h2>
              <p className="mt-1 text-sm text-primary-500">
                Lihat di platform mana produk Anda menghasilkan keuntungan paling optimal dengan modal yang sama.
              </p>
            </div>
            <Link
              href="/seller/komparasi-fee"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:underline sm:mt-0"
            >
              <span>Buka Halaman Komparasi Lengkap</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <ComparisonMatrix initialPrice={100000} initialCost={60000} showInputs={false} />
        </section>

        {/* Dedicated Marketplace Hub Cards */}
        <section className="my-12 sm:my-16">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold tracking-tight text-primary-900 sm:text-3xl">
              Pilih Marketplace Pilihan Anda
            </h2>
            <p className="mt-1 text-sm text-primary-500">
              Akses kalkulator khusus dan rincian skema komisi admin terbaru per platform:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Shopee Card */}
            <div className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-card transition-all hover:border-orange-300 hover:shadow-elevated">
              <div className="flex items-center justify-between">
                <MarketplaceIcon id="shopee" size={28} withBackground />
                <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-[10px] font-bold text-orange-700">
                  Fashion & FMCG
                </span>
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-primary-900">Shopee Indonesia</h3>
              <p className="mt-1 text-xs text-primary-500">
                Skema Star Seller, Star+, Shopee Mall, dan biaya Gratis Ongkir XTRA.
              </p>
              <div className="mt-4 flex flex-col gap-2 pt-3 border-t border-stone-100 text-xs">
                <Link
                  href="/seller/kalkulator/shopee"
                  className="font-semibold text-orange-600 hover:underline flex items-center justify-between"
                >
                  <span>Kalkulator Shopee</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link href="/seller/biaya-admin/shopee" className="text-primary-500 hover:text-primary-800">
                  Panduan Biaya Shopee →
                </Link>
              </div>
            </div>

            {/* Tokopedia Card */}
            <div className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-card transition-all hover:border-emerald-300 hover:shadow-elevated">
              <div className="flex items-center justify-between">
                <MarketplaceIcon id="tokopedia" size={28} withBackground />
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                  Gadget & Home
                </span>
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-primary-900">Tokopedia</h3>
              <p className="mt-1 text-xs text-primary-500">
                Skema Power Merchant, PM Pro, Official Store, dan layanan Bebas Ongkir.
              </p>
              <div className="mt-4 flex flex-col gap-2 pt-3 border-t border-stone-100 text-xs">
                <Link
                  href="/seller/kalkulator/tokopedia"
                  className="font-semibold text-emerald-600 hover:underline flex items-center justify-between"
                >
                  <span>Kalkulator Tokopedia</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link href="/seller/biaya-admin/tokopedia" className="text-primary-500 hover:text-primary-800">
                  Panduan Biaya Tokopedia →
                </Link>
              </div>
            </div>

            {/* TikTok Shop Card */}
            <div className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-card transition-all hover:border-stone-400 hover:shadow-elevated">
              <div className="flex items-center justify-between">
                <MarketplaceIcon id="tiktok-shop" size={28} withBackground />
                <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-bold text-stone-800">
                  Live & Affiliate
                </span>
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-primary-900">TikTok Shop</h3>
              <p className="mt-1 text-xs text-primary-500">
                Komisi penjualan video & live, komisi affiliate kreator, dan Mall fee.
              </p>
              <div className="mt-4 flex flex-col gap-2 pt-3 border-t border-stone-100 text-xs">
                <Link
                  href="/seller/kalkulator/tiktok-shop"
                  className="font-semibold text-stone-900 hover:underline flex items-center justify-between"
                >
                  <span>Kalkulator TikTok</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link href="/seller/biaya-admin/tiktok-shop" className="text-primary-500 hover:text-primary-800">
                  Panduan Biaya TikTok →
                </Link>
              </div>
            </div>

            {/* Lazada Card */}
            <div className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-card transition-all hover:border-blue-300 hover:shadow-elevated">
              <div className="flex items-center justify-between">
                <MarketplaceIcon id="lazada" size={28} withBackground />
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-700">
                  LazMall & Brand
                </span>
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-primary-900">Lazada Indonesia</h3>
              <p className="mt-1 text-xs text-primary-500">
                Komisi marketplace seller, LazMall commission, dan Free Shipping Max.
              </p>
              <div className="mt-4 flex flex-col gap-2 pt-3 border-t border-stone-100 text-xs">
                <Link
                  href="/seller/kalkulator/lazada"
                  className="font-semibold text-blue-700 hover:underline flex items-center justify-between"
                >
                  <span>Kalkulator Lazada</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link href="/seller/biaya-admin/lazada" className="text-primary-500 hover:text-primary-800">
                  Panduan Biaya Lazada →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Trust Us */}
        <section className="my-12 rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:my-16 sm:p-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Transparansi Unit Economics
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-primary-900 sm:text-3xl">
              Dibuat Khusus untuk Penjual E-Commerce Indonesia
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-primary-600">
              Perubahan struktur komisi e-commerce yang dinamis sering kali membuat seller merugi tanpa sadar.
              Kalkulator ini dirancang dengan prinsip keterbukaan finansial:
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-stone-100 bg-stone-50/50 p-4">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <h3 className="mt-2 font-display text-sm font-bold text-primary-900">
                Skema Tarif Terverifikasi 2025
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-primary-500">
                Rumus komisi diperbarui sesuai dengan kebijakan batas atas persentase kategori terbaru di masing-masing platform.
              </p>
            </div>

            <div className="rounded-xl border border-stone-100 bg-stone-50/50 p-4">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <h3 className="mt-2 font-display text-sm font-bold text-primary-900">
                Privasi 100% Aman
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-primary-500">
                Seluruh perhitungan berjalan langsung di peramban Anda (client-side). Kami tidak menyimpan angka omzet maupun HPP Anda.
              </p>
            </div>

            <div className="rounded-xl border border-stone-100 bg-stone-50/50 p-4">
              <HelpCircle className="h-5 w-5 text-emerald-600" />
              <h3 className="mt-2 font-display text-sm font-bold text-primary-900">
                Bebas Biaya & Tanpa Registrasi
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-primary-500">
                Akses seluruh simulasi dan ekspor data tanpa perlu login akun atau berlangganan software berbayar.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FaqAccordion items={faqItems} />

        {/* Bottom Ad Slot */}
        <AdSlot position="bottom" className="mt-12" />
      </div>
    </>
  );
}
