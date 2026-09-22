'use client';

import { motion } from 'framer-motion';
import { CalculationResult } from '@/domain/calculator/types';
import { formatRupiah, formatPercentage } from '@/lib/formatting/currency';

interface CostAnatomyBarProps {
  result: CalculationResult;
}

export function CostAnatomyBar({ result }: CostAnatomyBarProps) {
  const price = result.sellingPrice;
  if (price <= 0) return null;

  const hppPct = Math.max(0, (result.productCost / price) * 100);
  const platformFeePct = Math.max(0, ((result.totalMarketplaceFees + result.paymentFee) / price) * 100);
  const affiliatePct = Math.max(0, (result.affiliateFee / price) * 100);
  const adsPct = Math.max(0, (result.operationalCosts.total / price) * 100);
  const profitPct = Math.max(0, (result.netProfit / price) * 100);

  const segments = [
    {
      id: 'hpp',
      label: 'Modal (HPP)',
      amount: result.productCost,
      pct: hppPct,
      bgColor: 'bg-slate-600',
      textColor: 'text-slate-700',
      dotColor: 'bg-slate-600',
    },
    {
      id: 'platform',
      label: 'Komisi Platform',
      amount: result.totalMarketplaceFees + result.paymentFee,
      pct: platformFeePct,
      bgColor: 'bg-amber-500',
      textColor: 'text-amber-700',
      dotColor: 'bg-amber-500',
    },
    {
      id: 'affiliate',
      label: 'Affiliate',
      amount: result.affiliateFee,
      pct: affiliatePct,
      bgColor: 'bg-purple-500',
      textColor: 'text-purple-700',
      dotColor: 'bg-purple-500',
    },
    {
      id: 'ads',
      label: 'Iklan & Promo',
      amount: result.operationalCosts.total,
      pct: adsPct,
      bgColor: 'bg-sky-500',
      textColor: 'text-sky-700',
      dotColor: 'bg-sky-500',
    },
    {
      id: 'profit',
      label: result.netProfit >= 0 ? 'Laba Bersih' : 'Defisit (Rugi)',
      amount: Math.abs(result.netProfit),
      pct: profitPct,
      bgColor: result.netProfit >= 0 ? 'bg-emerald-500' : 'bg-rose-500',
      textColor: result.netProfit >= 0 ? 'text-emerald-700' : 'text-rose-700',
      dotColor: result.netProfit >= 0 ? 'bg-emerald-500' : 'bg-rose-500',
    },
  ].filter((s) => s.pct > 0);

  return (
    <div className="mt-6 border-t border-stone-200/80 pt-5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-display font-bold uppercase tracking-wider text-primary-500">
          Anatomi Alokasi Harga Jual (100%)
        </span>
        <span className="font-mono text-xs text-primary-500 tabular-nums">
          Total Omzet: {formatRupiah(price)}
        </span>
      </div>

      {/* Segmented Stacked Bar */}
      <div className="mt-2.5 flex h-4 w-full overflow-hidden rounded-full bg-stone-100 p-0.5 shadow-inner">
        {segments.map((seg) => (
          <motion.div
            key={seg.id}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, seg.pct)}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className={`h-full ${seg.bgColor} first:rounded-l-full last:rounded-r-full transition-all`}
            title={`${seg.label}: ${formatRupiah(seg.amount)} (${formatPercentage(seg.pct)})`}
          />
        ))}
      </div>

      {/* Legend Items */}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
        {segments.map((seg) => (
          <div key={seg.id} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${seg.dotColor}`} />
            <span className="text-primary-600 font-medium">{seg.label}:</span>
            <span className="font-mono font-bold text-primary-900 tabular-nums">
              {formatPercentage(seg.pct)}
            </span>
            <span className="font-mono text-[11px] text-primary-400 tabular-nums">
              ({formatRupiah(seg.amount)})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
