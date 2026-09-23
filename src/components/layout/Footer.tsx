import Link from 'next/link';
import { Calculator } from 'lucide-react';
import { MarketplaceIcon } from '@/components/ui/MarketplaceIcon';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-100/60 text-primary-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-900 text-white">
                <Calculator className="h-4 w-4" />
              </div>
              <span className="font-display text-base font-bold text-primary-900">
                Marketplace<span className="text-emerald-600">Intel</span>
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-primary-500">
              Alat utilitas finansial gratis untuk penjual e-commerce Indonesia. Membantu UMKM menghitung
              komisi admin, estimasi keuntungan bersih, dan break-even harga jual produk secara transparan.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-primary-400">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-200/60 px-2.5 py-0.5 font-medium text-stone-700">
                <MarketplaceIcon id="shopee" size={14} /> Shopee
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-200/60 px-2.5 py-0.5 font-medium text-stone-700">
                <MarketplaceIcon id="tokopedia" size={14} /> Tokopedia
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-200/60 px-2.5 py-0.5 font-medium text-stone-700">
                <MarketplaceIcon id="tiktok-shop" size={14} /> TikTok Shop
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-200/60 px-2.5 py-0.5 font-medium text-stone-700">
                <MarketplaceIcon id="lazada" size={14} /> Lazada
              </span>
            </div>
          </div>

          {/* Col 1: Kalkulator Profit */}
          <div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-primary-900">
              Kalkulator Profit
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/marketplace-calculator" className="hover:text-primary-900 hover:underline">
                  Kalkulator Universal
                </Link>
              </li>
              <li>
                <Link href="/shopee-profit-calculator" className="hover:text-primary-900 hover:underline">
                  Kalkulator Shopee
                </Link>
              </li>
              <li>
                <Link href="/tokopedia-profit-calculator" className="hover:text-primary-900 hover:underline">
                  Kalkulator Tokopedia
                </Link>
              </li>
              <li>
                <Link href="/tiktok-shop-profit-calculator" className="hover:text-primary-900 hover:underline">
                  Kalkulator TikTok Shop
                </Link>
              </li>
              <li>
                <Link href="/lazada-profit-calculator" className="hover:text-primary-900 hover:underline">
                  Kalkulator Lazada
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Panduan Biaya Admin */}
          <div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-primary-900">
              Panduan Biaya
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/shopee-fee" className="hover:text-primary-900 hover:underline">
                  Biaya Admin Shopee
                </Link>
              </li>
              <li>
                <Link href="/tokopedia-fee" className="hover:text-primary-900 hover:underline">
                  Biaya Admin Tokopedia
                </Link>
              </li>
              <li>
                <Link href="/tiktok-shop-fee" className="hover:text-primary-900 hover:underline">
                  Biaya Admin TikTok Shop
                </Link>
              </li>
              <li>
                <Link href="/lazada-fee" className="hover:text-primary-900 hover:underline">
                  Biaya Komisi Lazada
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Komparasi Marketplace */}
          <div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-primary-900">
              Bandingkan
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/compare" className="hover:text-primary-900 hover:underline">
                  Semua Marketplace (4-Way)
                </Link>
              </li>
              <li>
                <Link href="/compare/shopee-vs-tokopedia" className="hover:text-primary-900 hover:underline">
                  Shopee vs Tokopedia
                </Link>
              </li>
              <li>
                <Link href="/compare/shopee-vs-tiktok-shop" className="hover:text-primary-900 hover:underline">
                  Shopee vs TikTok Shop
                </Link>
              </li>
              <li>
                <Link href="/compare/tokopedia-vs-tiktok-shop" className="hover:text-primary-900 hover:underline">
                  Tokopedia vs TikTok Shop
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer and Copyright */}
        <div className="mt-8 border-t border-stone-200/80 pt-6">
          <p className="text-[11px] leading-relaxed text-primary-400">
            <strong>Disclaimer:</strong> {siteConfig.disclaimer} Seluruh simulasi tarif komisi dihitung
            berdasarkan model prototype edukasi dan estimasi publik terakhir yang diverifikasi. Selalu
            periksa tagihan faktur settlement resmi pada seller center masing-masing marketplace.
          </p>
          <p className="mt-3 text-[11px] text-primary-400">
            © {new Date().getFullYear()} {siteConfig.name}. Hak cipta dilindungi undang-undang.
          </p>
        </div>
      </div>
    </footer>
  );
}
