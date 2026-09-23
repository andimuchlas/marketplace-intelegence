'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, ArrowLeftRight, FileText, Radar } from 'lucide-react';
import { GoogleIcon } from '@/components/ui/Icon';

export function Header() {
  const pathname = usePathname();
  const isSeller = pathname.startsWith('/seller');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Portal Switcher Tabs */}
        <div className="flex items-center gap-6 sm:gap-8">
          <Link href="/" className="group flex items-center gap-2.5 transition-opacity hover:opacity-90">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-900 text-white shadow-sm transition-transform group-hover:scale-105">
              <Calculator className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-base font-bold tracking-tight text-primary-900 sm:text-lg">
                Marketplace<span className="text-emerald-600">Intel</span>
              </span>
              <span className="text-[10px] font-medium tracking-wide text-primary-500 uppercase">
                {isSeller ? 'Portal Penjual' : 'Radar Harga Indonesia'}
              </span>
            </div>
          </Link>

          {/* Clean Segment Switcher Tabs with Underline */}
          <nav className="flex items-center gap-4 text-sm font-semibold sm:gap-6">
            <Link
              href="/"
              className={`relative py-5 transition-colors ${
                !isSeller
                  ? 'text-primary-900 font-bold'
                  : 'text-primary-500 hover:text-primary-800'
              }`}
            >
              <span>Pembeli</span>
              {!isSeller && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary-900" />
              )}
            </Link>

            <Link
              href="/seller"
              className={`relative py-5 transition-colors ${
                isSeller
                  ? 'text-emerald-800 font-bold'
                  : 'text-primary-500 hover:text-primary-800'
              }`}
            >
              <span>Penjual</span>
              {isSeller && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-emerald-600" />
              )}
            </Link>
          </nav>
        </div>

        {/* Secondary Contextual Navigation Links */}
        <div className="flex items-center gap-3">
          {isSeller ? (
            /* SELLER SUB-NAVIGATION (Under Seller Portal) */
            <nav className="hidden items-center gap-1 md:flex">
              <Link
                href="/seller/kalkulator"
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  pathname.includes('/kalkulator')
                    ? 'bg-stone-200/70 text-primary-900'
                    : 'text-primary-600 hover:bg-stone-100 hover:text-primary-900'
                }`}
              >
                <Calculator className="h-3.5 w-3.5 text-primary-500" />
                <span>Kalkulator</span>
              </Link>
              <Link
                href="/seller/komparasi-fee"
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  pathname.includes('/komparasi-fee')
                    ? 'bg-stone-200/70 text-primary-900'
                    : 'text-primary-600 hover:bg-stone-100 hover:text-primary-900'
                }`}
              >
                <ArrowLeftRight className="h-3.5 w-3.5 text-primary-500" />
                <span>Bandingkan</span>
              </Link>
              <Link
                href="/seller/biaya-admin/shopee"
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  pathname.includes('/biaya-admin')
                    ? 'bg-stone-200/70 text-primary-900'
                    : 'text-primary-600 hover:bg-stone-100 hover:text-primary-900'
                }`}
              >
                <FileText className="h-3.5 w-3.5 text-primary-500" />
                <span>Panduan Biaya</span>
              </Link>
            </nav>
          ) : (
            /* USER (PEMBELI) SUB-NAVIGATION */
            <nav className="hidden items-center gap-2 md:flex">
              <Link
                href="/"
                className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-50 hover:text-emerald-900"
              >
                <Radar className="h-3.5 w-3.5 text-emerald-600" />
                <span>Radar Harga</span>
              </Link>
            </nav>
          )}

          {/* Action Button CTA */}
          {isSeller ? (
            <Link
              href="/seller/kalkulator"
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-emerald-800 active:scale-95"
            >
              <GoogleIcon name="calculate" size={15} className="text-emerald-200" />
              <span>Hitung Margin</span>
            </Link>
          ) : (
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary-900 px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-primary-800 active:scale-95"
            >
              <GoogleIcon name="search" size={15} className="text-emerald-400" />
              <span>Cari Harga Termurah</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
