import Link from 'next/link';
import { Calculator, ArrowLeftRight, FileText, Sparkles } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link href="/" className="group flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-900 text-white shadow-sm transition-transform group-hover:scale-105">
            <Calculator className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-base font-bold tracking-tight text-primary-900 sm:text-lg">
              Marketplace<span className="text-emerald-600">Intel</span>
            </span>
            <span className="text-[10px] font-medium tracking-wide text-primary-500 uppercase">
              Kalkulator Margin Indonesia
            </span>
          </div>
        </Link>

        {/* Primary Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/marketplace-calculator"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-primary-700 transition-colors hover:bg-stone-200/50 hover:text-primary-900"
          >
            <Calculator className="h-4 w-4 text-primary-500" />
            <span>Kalkulator</span>
          </Link>
          <Link
            href="/compare"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-primary-700 transition-colors hover:bg-stone-200/50 hover:text-primary-900"
          >
            <ArrowLeftRight className="h-4 w-4 text-primary-500" />
            <span>Bandingkan</span>
          </Link>
          <Link
            href="/shopee-fee"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-primary-700 transition-colors hover:bg-stone-200/50 hover:text-primary-900"
          >
            <FileText className="h-4 w-4 text-primary-500" />
            <span>Panduan Biaya</span>
          </Link>
        </nav>

        {/* Action / Badge */}
        <div className="flex items-center gap-2">
          <Link
            href="/marketplace-calculator"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-900 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-primary-800 active:scale-95 sm:text-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Mulai Hitung</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
