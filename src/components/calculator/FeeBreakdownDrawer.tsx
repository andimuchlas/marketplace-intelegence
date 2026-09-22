'use client';

import { useState } from 'react';
import { ChevronDown, Receipt, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalculationResult } from '@/domain/calculator/types';
import { formatRupiah, formatPercentage } from '@/lib/formatting/currency';

interface FeeBreakdownDrawerProps {
  result: CalculationResult;
  marketplaceName: string;
}

export function FeeBreakdownDrawer({ result, marketplaceName }: FeeBreakdownDrawerProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="my-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-8">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-primary-700">
            <Receipt className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-primary-900 sm:text-lg">
              Rincian Potongan & Biaya ({marketplaceName})
            </h3>
            <p className="text-xs text-primary-500">
              Total potongan:{' '}
              <span className="font-mono font-semibold text-primary-900 tabular-nums">
                {formatRupiah(result.totalDeductions)}
              </span>{' '}
              ({formatPercentage((result.totalDeductions / result.sellingPrice) * 100 || 0)} dari harga jual)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-semibold text-primary-500">
          <span>{isOpen ? 'Tutup Rincian' : 'Buka Rincian'}</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-6 divide-y divide-stone-100 border-t border-stone-200 pt-4">
              {/* Marketplace Fees */}
              <div className="py-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary-400">
                  1. Biaya Layanan Platform & Administrasi
                </span>
                <div className="mt-2 space-y-2">
                  {result.feeBreakdown
                    .filter((f) => ['admin', 'service', 'program'].includes(f.category))
                    .map((fee) => (
                      <div key={fee.id} className="flex items-start justify-between text-xs sm:text-sm">
                        <div className="flex flex-col">
                          <span className="font-medium text-primary-800">{fee.name}</span>
                          {fee.description && (
                            <span className="text-[11px] text-primary-400">{fee.description}</span>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-primary-900 tabular-nums">
                            {formatRupiah(fee.calculatedAmount)}
                          </span>
                          {fee.rate > 0 && (
                            <div className="text-[10px] text-primary-400">
                              ({formatPercentage(fee.rate * 100)})
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Payment Processing Fee */}
              <div className="py-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary-400">
                  2. Biaya Transaksi & Pembayaran
                </span>
                <div className="mt-2 flex items-start justify-between text-xs sm:text-sm">
                  <div className="flex flex-col">
                    <span className="font-medium text-primary-800">Biaya Gerbang Pembayaran / Handling</span>
                    <span className="text-[11px] text-primary-400">
                      Biaya pemrosesan metode bayar (transfer bank, e-wallet, COD)
                    </span>
                  </div>
                  <span className="font-mono font-bold text-primary-900 tabular-nums">
                    {formatRupiah(result.paymentFee)}
                  </span>
                </div>
              </div>

              {/* Affiliate & Marketing */}
              <div className="py-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary-400">
                  3. Pemasaran, Affiliate & Operasional
                </span>
                <div className="mt-2 space-y-2">
                  {result.affiliateFee > 0 && (
                    <div className="flex items-start justify-between text-xs sm:text-sm">
                      <span className="font-medium text-primary-800">
                        Komisi Affiliate ({result.input.affiliatePercentage}%)
                      </span>
                      <span className="font-mono font-bold text-primary-900 tabular-nums">
                        {formatRupiah(result.affiliateFee)}
                      </span>
                    </div>
                  )}
                  {result.operationalCosts.advertisingCost > 0 && (
                    <div className="flex items-start justify-between text-xs sm:text-sm">
                      <span className="font-medium text-primary-800">Biaya Iklan per Unit</span>
                      <span className="font-mono font-bold text-primary-900 tabular-nums">
                        {formatRupiah(result.operationalCosts.advertisingCost)}
                      </span>
                    </div>
                  )}
                  {result.operationalCosts.voucherCost > 0 && (
                    <div className="flex items-start justify-between text-xs sm:text-sm">
                      <span className="font-medium text-primary-800">Subsidi Voucher Toko</span>
                      <span className="font-mono font-bold text-primary-900 tabular-nums">
                        {formatRupiah(result.operationalCosts.voucherCost)}
                      </span>
                    </div>
                  )}
                  {result.operationalCosts.shippingSubsidy > 0 && (
                    <div className="flex items-start justify-between text-xs sm:text-sm">
                      <span className="font-medium text-primary-800">Subsidi Ongkir Toko</span>
                      <span className="font-mono font-bold text-primary-900 tabular-nums">
                        {formatRupiah(result.operationalCosts.shippingSubsidy)}
                      </span>
                    </div>
                  )}
                  {result.affiliateFee === 0 && result.operationalCosts.total === 0 && (
                    <div className="text-xs italic text-primary-400">
                      Tidak ada biaya iklan atau komisi affiliate yang dimasukkan.
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Pokok Produk */}
              <div className="py-2.5">
                <div className="flex items-start justify-between text-xs sm:text-sm">
                  <div className="flex flex-col">
                    <span className="font-semibold text-primary-900">Modal Pokok Produk (HPP / COGS)</span>
                    <span className="text-[11px] text-primary-400">Biaya produksi atau modal kulakan</span>
                  </div>
                  <span className="font-mono font-bold text-primary-900 tabular-nums">
                    {formatRupiah(result.productCost)}
                  </span>
                </div>
              </div>

              {/* Final Math Sum */}
              <div className="bg-stone-50/70 -mx-6 -mb-6 mt-4 p-6 sm:-mx-8 sm:-mb-8 sm:p-8 rounded-b-2xl border-t border-stone-200">
                <div className="flex items-center justify-between text-xs font-medium text-primary-500">
                  <span>Total Pengeluaran (Modal + Seluruh Potongan)</span>
                  <span className="font-mono font-bold text-primary-800 tabular-nums">
                    {formatRupiah(result.totalCost)}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm sm:text-base font-bold text-primary-900">
                  <span>Keuntungan Bersih (Harga Jual - Total Pengeluaran)</span>
                  <span
                    className={`font-mono text-base sm:text-lg tabular-nums ${
                      result.netProfit >= 0 ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {formatRupiah(result.netProfit)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
