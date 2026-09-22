import Link from 'next/link';
import { Calculator, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 text-primary-900 shadow-sm">
        <Calculator className="h-6 w-6" />
      </div>
      <span className="mt-4 font-mono text-xs font-bold uppercase tracking-widest text-emerald-700">
        Error 404
      </span>
      <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-primary-900 sm:text-4xl">
        Halaman Tidak Ditemukan
      </h1>
      <p className="mt-3 max-w-md text-sm text-primary-500">
        Halaman kalkulator atau panduan yang Anda cari tidak tersedia atau tautan telah dipindahkan.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-xs font-semibold text-primary-800 shadow-subtle hover:bg-stone-50"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Beranda</span>
        </Link>
        <Link
          href="/marketplace-calculator"
          className="inline-flex items-center gap-2 rounded-xl bg-primary-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-primary-800"
        >
          <Calculator className="h-4 w-4" />
          <span>Buka Kalkulator Universal</span>
        </Link>
      </div>
    </div>
  );
}
