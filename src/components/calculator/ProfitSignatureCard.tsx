'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Target, Info, CheckCircle2, Copy, Check } from 'lucide-react';
import { CalculationResult } from '@/domain/calculator/types';
import { formatRupiah, formatPercentage } from '@/lib/formatting/currency';
import { CostAnatomyBar } from './CostAnatomyBar';
import { MarginHealthBarometer } from './MarginHealthBarometer';

interface ProfitSignatureCardProps {
  result: CalculationResult;
  marketplaceName: string;
  previewItems?: {
    marketplaceId: string;
    marketplaceName: string;
    profit: number;
    margin: number;
    color: string;
  }[];
  onSelectPreview?: (marketplaceId: string) => void;
}

export function ProfitSignatureCard({
  result,
  marketplaceName,
  previewItems = [],
  onSelectPreview,
}: ProfitSignatureCardProps) {
  const [copied, setCopied] = useState(false);
  const isProfitable = result.netProfit > 0;
  const isBreakEven = result.netProfit === 0;

  const handleCopySummary = () => {
    const summaryText = `[Ringkasan Laba Penjualan - ${marketplaceName}]
---------------------------------------
Harga Jual    : ${formatRupiah(result.sellingPrice)}
Modal (HPP)   : ${formatRupiah(result.productCost)}
Potongan Fee  : ${formatRupiah(result.totalMarketplaceFees + result.paymentFee)}
Iklan & Promo : ${formatRupiah(result.operationalCosts.total + result.affiliateFee)}
---------------------------------------
${isProfitable ? '[PROFIT]' : '[DEFISIT]'} Laba Bersih : ${formatRupiah(result.netProfit)} (${formatPercentage(result.netMargin)} margin)
• Harga BEP (Titik Impas) : ${formatRupiah(result.breakEvenPrice)}
---------------------------------------
Dihitung via MarketplaceIntel.id`;

    navigator.clipboard.writeText(summaryText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-6 transition-all sm:p-8 ${
        isProfitable
          ? 'border-emerald-200/80 bg-gradient-to-b from-emerald-50/50 to-white shadow-elevated'
          : isBreakEven
          ? 'border-amber-200 bg-amber-50/30 shadow-card'
          : 'border-rose-200/80 bg-gradient-to-b from-rose-50/50 to-white shadow-elevated'
      }`}
    >
      {/* Top Tag & Actions */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary-500">
            ESTIMASI KEUNTUNGAN BERSIH ({marketplaceName.toUpperCase()})
          </span>
          <div
            className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              isProfitable
                ? 'bg-emerald-100 text-emerald-800'
                : isBreakEven
                ? 'bg-amber-100 text-amber-800'
                : 'bg-rose-100 text-rose-800'
            }`}
          >
            {isProfitable ? (
              <>
                <TrendingUp className="h-3.5 w-3.5" />
                <span>Untung</span>
              </>
            ) : isBreakEven ? (
              <>
                <Info className="h-3.5 w-3.5" />
                <span>Impas (BEP)</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-3.5 w-3.5" />
                <span>Rugi</span>
              </>
            )}
          </div>
        </div>

        {/* 1-Click Copy Summary Button */}
        <button
          type="button"
          onClick={handleCopySummary}
          className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-primary-700 shadow-subtle transition-all hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-800 active:scale-95"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-emerald-700">Tersalin ke Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-primary-500" />
              <span>Salin Ringkasan</span>
            </>
          )}
        </button>
      </div>

      {/* Big Typographic Profit Number */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <motion.div
            key={result.netProfit}
            initial={{ opacity: 0.6, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`font-mono text-3xl font-extrabold tracking-tight tabular-nums sm:text-4xl md:text-5xl ${
              isProfitable ? 'text-emerald-700' : isBreakEven ? 'text-amber-700' : 'text-rose-700'
            }`}
          >
            {formatRupiah(result.netProfit)}
          </motion.div>
          <div className="mt-1 flex items-center gap-2">
            <span
              className={`text-sm font-semibold sm:text-base ${
                isProfitable ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {isProfitable ? '↑' : '↓'} {formatPercentage(result.netMargin)} margin
            </span>
            <span className="text-xs text-primary-400">•</span>
            <span className="text-xs text-primary-500">
              dari omzet {formatRupiah(result.sellingPrice)}
            </span>
          </div>
        </div>

        {/* Break-Even Indicator */}
        <div className="mt-4 rounded-xl border border-stone-200/80 bg-white/90 p-3 shadow-subtle sm:mt-0 sm:text-right">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-primary-500 sm:justify-end">
            <Target className="h-3.5 w-3.5 text-primary-600" />
            <span>Harga Jual Break-Even (BEP):</span>
          </div>
          <div className="mt-0.5 font-mono text-sm font-bold text-primary-900 tabular-nums sm:text-base">
            {formatRupiah(result.breakEvenPrice)}
          </div>
          <div className="text-[10px] text-primary-400">
            Titik impas agar modal & potongan tertutup
          </div>
        </div>
      </div>

      {/* Summary Chips */}
      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-stone-200/80 pt-4 sm:grid-cols-4">
        <div>
          <span className="text-[10px] font-medium text-primary-500 uppercase">Modal Produk (HPP)</span>
          <div className="font-mono text-sm font-semibold text-primary-900 tabular-nums">
            {formatRupiah(result.productCost)}
          </div>
        </div>
        <div>
          <span className="text-[10px] font-medium text-primary-500 uppercase">Total Biaya Platform</span>
          <div className="font-mono text-sm font-semibold text-primary-900 tabular-nums">
            {formatRupiah(result.totalMarketplaceFees + result.paymentFee)}
          </div>
        </div>
        <div>
          <span className="text-[10px] font-medium text-primary-500 uppercase">Iklan & Promo</span>
          <div className="font-mono text-sm font-semibold text-primary-900 tabular-nums">
            {formatRupiah(result.operationalCosts.total + result.affiliateFee)}
          </div>
        </div>
        <div>
          <span className="text-[10px] font-medium text-primary-500 uppercase">Tarif Potongan Efektif</span>
          <div className="font-mono text-sm font-semibold text-primary-900 tabular-nums">
            {formatPercentage(result.effectiveFeeRate)}
          </div>
        </div>
      </div>

      {/* 1. Visual Cost Anatomy Bar */}
      <CostAnatomyBar result={result} />

      {/* 2. Margin Health Barometer & Advisory */}
      <MarginHealthBarometer margin={result.netMargin} />

      {/* 3. 4-Platform Preview Pills */}
      {previewItems.length > 0 && (
        <div className="mt-6 border-t border-stone-200/80 pt-4">
          <div className="text-[11px] font-semibold text-primary-500">
            Bandingkan profit produk ini di marketplace lain:
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {previewItems.map((p) => {
              const isCurrent = p.marketplaceId === result.input.marketplaceId;
              return (
                <button
                  key={p.marketplaceId}
                  type="button"
                  onClick={() => onSelectPreview?.(p.marketplaceId)}
                  className={`flex flex-col items-start rounded-xl p-2.5 text-left transition-all ${
                    isCurrent
                      ? 'border border-primary-900 bg-primary-900 text-white shadow-sm'
                      : 'border border-stone-200 bg-white hover:border-stone-400 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className={`text-[11px] font-bold ${isCurrent ? 'text-white' : 'text-primary-800'}`}>
                      {p.marketplaceName}
                    </span>
                    {isCurrent && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
                  </div>
                  <div
                    className={`mt-1 font-mono text-xs font-bold tabular-nums ${
                      isCurrent
                        ? 'text-white'
                        : p.profit > 0
                        ? 'text-emerald-600'
                        : 'text-rose-600'
                    }`}
                  >
                    {formatRupiah(p.profit)}
                  </div>
                  <div className={`text-[10px] ${isCurrent ? 'text-stone-300' : 'text-primary-400'}`}>
                    {formatPercentage(p.margin)} margin
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
