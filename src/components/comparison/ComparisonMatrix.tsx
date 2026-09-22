'use client';

import { useState, useMemo } from 'react';
import { Trophy, TrendingUp, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CalculatorInput, MarketplaceId } from '@/domain/calculator/types';
import { getAllMarketplaceConfigs } from '@/data/marketplaces/registry';
import { compareMarketplaces } from '@/domain/calculator/comparison';
import { formatRupiah, formatPercentage } from '@/lib/formatting/currency';
import { CurrencyInput } from '@/components/ui/CurrencyInput';

interface ComparisonMatrixProps {
  initialPrice?: number;
  initialCost?: number;
  showInputs?: boolean;
}

export function ComparisonMatrix({
  initialPrice = 100000,
  initialCost = 60000,
  showInputs = true,
}: ComparisonMatrixProps) {
  const [sellingPrice, setSellingPrice] = useState<number>(initialPrice);
  const [productCost, setProductCost] = useState<number>(initialCost);
  const [advertisingCost, setAdvertisingCost] = useState<number>(5000);
  const [affiliatePercentage, setAffiliatePercentage] = useState<number>(5);

  const baseInput: CalculatorInput = useMemo(
    () => ({
      marketplaceId: 'shopee',
      sellerTierId: 'star_seller',
      categoryId: 'fashion',
      sellingPrice,
      productCost,
      advertisingCost,
      affiliatePercentage,
      voucherCost: 0,
      shippingSubsidy: 0,
    }),
    [sellingPrice, productCost, advertisingCost, affiliatePercentage]
  );

  const configs = useMemo(() => getAllMarketplaceConfigs(), []);
  const comparison = useMemo(() => compareMarketplaces(baseInput, configs), [baseInput, configs]);

  return (
    <div className="w-full">
      {/* Optional Top Inputs Bar */}
      {showInputs && (
        <div className="mb-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-card">
          <div className="mb-4">
            <h3 className="font-display text-base font-bold text-primary-900 sm:text-lg">
              Parameter Perbandingan SKU Produk
            </h3>
            <p className="text-xs text-primary-500">
              Ubah angka di bawah untuk melihat perbandingan margin secara live di 4 marketplace sekaligus.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <CurrencyInput
              id="compSellingPrice"
              label="Harga Jual"
              value={sellingPrice}
              onChange={setSellingPrice}
              placeholder="100.000"
            />
            <CurrencyInput
              id="compProductCost"
              label="Modal Produk (HPP)"
              value={productCost}
              onChange={setProductCost}
              placeholder="60.000"
            />
            <CurrencyInput
              id="compAdsCost"
              label="Biaya Iklan / Unit"
              value={advertisingCost}
              onChange={setAdvertisingCost}
              placeholder="0"
            />
            <div className="flex flex-col gap-1.5">
              <label htmlFor="compAffPct" className="font-display text-xs font-semibold text-primary-800 sm:text-sm">
                Komisi Affiliate (%)
              </label>
              <div className="relative flex items-center rounded-xl border border-stone-300 bg-white shadow-subtle focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20">
                <input
                  id="compAffPct"
                  type="number"
                  min="0"
                  max="100"
                  value={affiliatePercentage === 0 ? '' : affiliatePercentage}
                  onChange={(e) => setAffiliatePercentage(Math.max(0, Math.min(100, Number(e.target.value))))}
                  placeholder="0"
                  className="w-full rounded-xl bg-transparent py-2.5 pl-3.5 pr-8 font-mono text-base font-semibold tracking-tight text-primary-900 tabular-nums focus:outline-none sm:text-lg"
                />
                <span className="absolute right-3.5 font-mono text-sm font-semibold text-primary-500">%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Matrix Table */}
      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/80">
                <th className="py-4 px-4 font-display font-bold text-primary-900 sm:px-6">
                  Metrik Perhitungan
                </th>
                {comparison.items.map((item) => (
                  <th
                    key={item.marketplaceId}
                    className={`py-4 px-4 text-right font-display sm:px-6 ${
                      item.isBestMargin ? 'bg-emerald-50/60' : ''
                    }`}
                  >
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-primary-900">{item.marketplaceName}</span>
                      <span className="text-[10px] text-primary-500 font-normal">{item.sellerTierName}</span>
                      {item.isBestMargin && (
                        <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                          <Trophy className="h-3 w-3 text-emerald-600" />
                          <span>Margin Tertinggi</span>
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {/* Row: Harga Jual */}
              <tr className="hover:bg-stone-50/50">
                <td className="py-3 px-4 font-medium text-primary-700 sm:px-6">Harga Jual</td>
                {comparison.items.map((item) => (
                  <td key={item.marketplaceId} className="py-3 px-4 text-right font-mono font-semibold tabular-nums sm:px-6">
                    {formatRupiah(item.result.sellingPrice)}
                  </td>
                ))}
              </tr>

              {/* Row: Komisi Admin Platform */}
              <tr className="hover:bg-stone-50/50">
                <td className="py-3 px-4 font-medium text-primary-700 sm:px-6">Biaya Admin Platform</td>
                {comparison.items.map((item) => (
                  <td key={item.marketplaceId} className="py-3 px-4 text-right font-mono text-primary-800 tabular-nums sm:px-6">
                    {formatRupiah(item.result.totalMarketplaceFees)}
                  </td>
                ))}
              </tr>

              {/* Row: Biaya Pembayaran */}
              <tr className="hover:bg-stone-50/50">
                <td className="py-3 px-4 font-medium text-primary-700 sm:px-6">Biaya Pembayaran / Handling</td>
                {comparison.items.map((item) => (
                  <td key={item.marketplaceId} className="py-3 px-4 text-right font-mono text-primary-800 tabular-nums sm:px-6">
                    {formatRupiah(item.result.paymentFee)}
                  </td>
                ))}
              </tr>

              {/* Row: Komisi Affiliate */}
              <tr className="hover:bg-stone-50/50">
                <td className="py-3 px-4 font-medium text-primary-700 sm:px-6">Komisi Affiliate</td>
                {comparison.items.map((item) => (
                  <td key={item.marketplaceId} className="py-3 px-4 text-right font-mono text-primary-800 tabular-nums sm:px-6">
                    {formatRupiah(item.result.affiliateFee)}
                  </td>
                ))}
              </tr>

              {/* Row: Iklan */}
              <tr className="hover:bg-stone-50/50">
                <td className="py-3 px-4 font-medium text-primary-700 sm:px-6">Biaya Iklan per Unit</td>
                {comparison.items.map((item) => (
                  <td key={item.marketplaceId} className="py-3 px-4 text-right font-mono text-primary-800 tabular-nums sm:px-6">
                    {formatRupiah(item.result.operationalCosts.advertisingCost)}
                  </td>
                ))}
              </tr>

              {/* Row: Modal Pokok (HPP) */}
              <tr className="hover:bg-stone-50/50 bg-stone-50/30">
                <td className="py-3 px-4 font-semibold text-primary-900 sm:px-6">Modal Pokok (HPP)</td>
                {comparison.items.map((item) => (
                  <td key={item.marketplaceId} className="py-3 px-4 text-right font-mono font-semibold text-primary-900 tabular-nums sm:px-6">
                    {formatRupiah(item.result.productCost)}
                  </td>
                ))}
              </tr>

              {/* Row: Total Potongan */}
              <tr className="hover:bg-stone-50/50">
                <td className="py-3 px-4 font-semibold text-primary-700 sm:px-6">Total Seluruh Potongan</td>
                {comparison.items.map((item) => (
                  <td key={item.marketplaceId} className="py-3 px-4 text-right font-mono font-semibold text-primary-800 tabular-nums sm:px-6">
                    {formatRupiah(item.result.totalDeductions)}
                  </td>
                ))}
              </tr>

              {/* Row: Net Profit (PROMINENT) */}
              <tr className="border-t-2 border-stone-200 bg-stone-50/60 font-bold">
                <td className="py-4 px-4 font-display text-primary-900 sm:px-6">
                  KEUNTUNGAN BERSIH
                </td>
                {comparison.items.map((item) => (
                  <td
                    key={item.marketplaceId}
                    className={`py-4 px-4 text-right font-mono text-base sm:text-lg tabular-nums sm:px-6 ${
                      item.isBestMargin ? 'bg-emerald-100/60 text-emerald-800' : 'text-primary-900'
                    }`}
                  >
                    {formatRupiah(item.result.netProfit)}
                  </td>
                ))}
              </tr>

              {/* Row: Margin Bersih */}
              <tr className="bg-stone-50/60 font-bold">
                <td className="py-3 px-4 font-display text-primary-900 sm:px-6">
                  MARGIN BERSIH (%)
                </td>
                {comparison.items.map((item) => (
                  <td
                    key={item.marketplaceId}
                    className={`py-3 px-4 text-right font-mono text-sm sm:text-base tabular-nums sm:px-6 ${
                      item.isBestMargin ? 'bg-emerald-100/60 text-emerald-800' : 'text-primary-800'
                    }`}
                  >
                    {formatPercentage(item.result.netMargin)}
                  </td>
                ))}
              </tr>

              {/* Row: Break-Even Price */}
              <tr className="hover:bg-stone-50/50">
                <td className="py-3 px-4 font-medium text-primary-700 sm:px-6">Harga Jual Break-Even (BEP)</td>
                {comparison.items.map((item) => (
                  <td key={item.marketplaceId} className="py-3 px-4 text-right font-mono font-semibold text-primary-900 tabular-nums sm:px-6">
                    {formatRupiah(item.result.breakEvenPrice)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Comparison Takeaway Footer */}
        <div className="border-t border-stone-200 bg-stone-50 p-4 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-primary-600">
              Platform dengan margin bersih tertinggi pada simulasi ini adalah{' '}
              <strong className="text-emerald-700">
                {comparison.items.find((i) => i.isBestMargin)?.marketplaceName}
              </strong>{' '}
              ({formatPercentage(comparison.highestMargin)} margin).
            </div>
            <Link
              href="/marketplace-calculator"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline"
            >
              <span>Hitung kustom di kalkulator</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
