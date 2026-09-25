'use client';

import { Suspense, useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { GoogleIcon } from '@/components/ui/Icon';

function HeaderSearchInput() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(currentQuery);

  useEffect(() => {
    setQuery(currentQuery);
  }, [currentQuery]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-md mx-2 sm:mx-6">
      <div className="relative flex items-center h-10 w-full rounded-xl border border-stone-300 bg-stone-50 transition-all focus-within:border-emerald-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-600/10">
        <GoogleIcon name="search" size={16} className="ml-3 text-stone-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari barang lain di 4 marketplace..."
          className="w-full bg-transparent px-2.5 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={query.trim().length < 2}
          className="mr-1.5 rounded-lg bg-emerald-700 px-3 py-1 text-xs font-semibold text-white shadow-2xs hover:bg-emerald-800 disabled:opacity-40 transition-colors"
        >
          Cari
        </button>
      </div>
    </form>
  );
}

function MobileModeDropdown({ isSeller }: { isSeller: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative sm:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 rounded-lg border border-stone-200/90 bg-white/90 px-2.5 py-1 text-xs font-semibold text-primary-900 shadow-2xs hover:bg-stone-50 active:scale-95 transition-all"
        aria-label="Pilih Mode Pengguna"
        aria-expanded={isOpen}
      >
        <span>{isSeller ? 'Penjual' : 'Pembeli'}</span>
        <GoogleIcon
          name="expand_more"
          size={15}
          className={`text-stone-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 mt-1.5 w-40 rounded-xl border border-stone-200 bg-white p-1 shadow-lg ring-1 ring-black/5 z-50 animate-in fade-in zoom-in-95 duration-100">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors ${
                !isSeller
                  ? 'bg-primary-900 text-white font-bold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span>Pembeli (Radar)</span>
              {!isSeller && <GoogleIcon name="check" size={14} className="text-emerald-400" />}
            </Link>
            <Link
              href="/seller"
              onClick={() => setIsOpen(false)}
              className={`mt-0.5 flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors ${
                isSeller
                  ? 'bg-emerald-700 text-white font-bold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span>Penjual (Kalkulator)</span>
              {isSeller && <GoogleIcon name="check" size={14} className="text-emerald-200" />}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const isSeller = pathname.startsWith('/seller');
  const isSearch = pathname.startsWith('/search');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        {/* Brand Logo & Switcher */}
        <div className="flex items-center gap-2 sm:gap-8 shrink-0">
          <Link href="/" className="group flex items-center gap-2 transition-opacity hover:opacity-90">
            <img
              src="/logo-icon.png"
              alt="MarketplaceIntel Logo"
              className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold tracking-tight text-primary-900 sm:text-lg">
                Marketplace<span className="text-emerald-600">Intel</span>
              </span>
              <span className="text-[9px] font-medium tracking-wide text-primary-500 uppercase sm:text-[10px]">
                {isSeller ? 'Portal Penjual' : isSearch ? 'Katalog Radar' : 'Radar Harga'}
              </span>
            </div>
          </Link>

          {/* Mobile Mode Dropdown (Pembeli / Penjual) */}
          {!isSearch && <MobileModeDropdown isSeller={isSeller} />}

          {/* Clean Segment Switcher Tabs with Underline (DESKTOP ONLY) */}
          {!isSearch && (
            <nav className="hidden sm:flex items-center gap-4 text-sm font-semibold sm:gap-6">
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
          )}
        </div>

        {/* Center: Search Input when on /search page */}
        {isSearch && (
          <Suspense fallback={<div className="flex-1 max-w-md mx-2 sm:mx-6 h-10" />}>
            <HeaderSearchInput />
          </Suspense>
        )}

        {/* Secondary Contextual Navigation Links */}
        <div className="flex items-center gap-3 shrink-0">
          {isSearch ? (
            /* ON /SEARCH: 100% BUYER FOCUSED, NO PENJUAL BUTTON */
            <nav className="flex items-center gap-2">
              <Link
                href="/"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
              >
                <GoogleIcon name="radar" size={15} className="text-emerald-600" />
                <span>Beranda Radar</span>
              </Link>
            </nav>
          ) : isSeller ? (
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
                <GoogleIcon name="calculate" size={15} className="text-primary-500" />
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
                <GoogleIcon name="compare_arrows" size={15} className="text-primary-500" />
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
                <GoogleIcon name="description" size={15} className="text-primary-500" />
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
                <GoogleIcon name="radar" size={15} className="text-emerald-600" />
                <span>Radar Harga</span>
              </Link>
            </nav>
          )}

          {/* Action Button CTA (Hidden on /search to avoid clutter) */}
          {!isSearch &&
            (isSeller ? (
              <>
                {/* Desktop Full Button */}
                <Link
                  href="/seller/kalkulator"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-emerald-800 active:scale-95"
                >
                  <GoogleIcon name="calculate" size={15} className="text-emerald-200" />
                  <span>Hitung Margin</span>
                </Link>
                {/* Mobile Icon Button */}
                <Link
                  href="/seller/kalkulator"
                  className="sm:hidden flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 text-white shadow-2xs hover:bg-emerald-800 active:scale-95 transition-all"
                  title="Hitung Margin"
                  aria-label="Hitung Margin"
                >
                  <GoogleIcon name="calculate" size={16} />
                </Link>
              </>
            ) : (
              <>
                {/* Desktop Full Button */}
                <Link
                  href="/#search"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-primary-900 px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-primary-800 active:scale-95"
                >
                  <GoogleIcon name="search" size={15} className="text-emerald-400" />
                  <span>Cari Harga Termurah</span>
                </Link>
                {/* Mobile Icon Button */}
                <Link
                  href="/#search"
                  className="sm:hidden flex h-8 w-8 items-center justify-center rounded-lg bg-primary-900 text-emerald-400 shadow-2xs hover:bg-primary-800 active:scale-95 transition-all"
                  title="Cari Harga Termurah"
                  aria-label="Cari Harga"
                >
                  <GoogleIcon name="search" size={16} />
                </Link>
              </>
            ))}
        </div>
      </div>
    </header>
  );
}
