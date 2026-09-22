'use client';

import { ShieldCheck, AlertTriangle, AlertOctagon, Zap } from 'lucide-react';
import { formatPercentage } from '@/lib/formatting/currency';

interface MarginHealthBarometerProps {
  margin: number;
}

export function MarginHealthBarometer({ margin }: MarginHealthBarometerProps) {
  let status = 'Sehat';
  let badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
  let icon = <ShieldCheck className="h-4 w-4 text-emerald-600" />;
  let advice =
    'Margin ideal untuk standar ritel e-commerce. Toko Anda memiliki daya tahan yang baik terhadap biaya operasional.';
  let barColor = 'bg-emerald-500';

  if (margin <= 0) {
    status = 'Defisit / Rugi';
    badgeColor = 'bg-rose-100 text-rose-800 border-rose-200';
    icon = <AlertOctagon className="h-4 w-4 text-rose-600" />;
    advice =
      'Harga jual belum menutup modal pokok dan komisi platform. Segera naikkan harga jual atau turunkan alokasi iklan/affiliate.';
    barColor = 'bg-rose-500';
  } else if (margin < 10) {
    status = 'Margin Tipis (< 10%)';
    badgeColor = 'bg-amber-100 text-amber-800 border-amber-200';
    icon = <AlertTriangle className="h-4 w-4 text-amber-600" />;
    advice =
      'Rentan merugi jika terjadi retur paket COD (RTS), kerusakan kemasan, atau selisih timbangan kurir. Disarankan menaikkan harga sedikit.';
    barColor = 'bg-amber-500';
  } else if (margin >= 25) {
    status = 'Margin Sangat Kuat (> 25%)';
    badgeColor = 'bg-emerald-100 text-emerald-900 border-emerald-300';
    icon = <Zap className="h-4 w-4 text-emerald-600" />;
    advice =
      'Margin sangat tebal! Anda memiliki ruang aman yang besar untuk meningkatkan anggaran iklan (Shopee Ads/GMV Max) atau live voucher.';
    barColor = 'bg-emerald-600';
  }

  // Clamped progress percentage (0% to 40% maps to 0% to 100% of the bar)
  const progressPct = Math.max(0, Math.min(100, (margin / 40) * 100));

  return (
    <div className="mt-6 rounded-xl border border-stone-200/90 bg-stone-50/60 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-display text-xs font-bold uppercase tracking-wider text-primary-900">
            Analisis Kesehatan Margin:
          </span>
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${badgeColor}`}>
            {status} ({formatPercentage(margin)})
          </span>
        </div>
      </div>

      {/* Visual Barometer Bar */}
      <div className="mt-3">
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-stone-200">
          <div
            className={`h-full ${barColor} transition-all duration-300`}
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="mt-1 flex justify-between text-[10px] font-mono text-primary-400">
          <span>0% (Rugi)</span>
          <span>10% (Tipis)</span>
          <span>25% (Sehat)</span>
          <span>40%+ (Tebal)</span>
        </div>
      </div>

      {/* Actionable Advice */}
      <p className="mt-2.5 text-xs leading-relaxed text-primary-600">
        <strong className="text-primary-800">Saran Ahli:</strong> {advice}
      </p>
    </div>
  );
}
