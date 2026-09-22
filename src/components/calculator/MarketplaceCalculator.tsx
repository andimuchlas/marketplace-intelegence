'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ArrowRight, RotateCcw, Check, Sparkles } from 'lucide-react';
import { MarketplaceId, CalculatorInput } from '@/domain/calculator/types';
import {
  MARKETPLACE_CONFIGS,
  getMarketplaceConfig,
  getAllMarketplaceConfigs,
  getDefaultTier,
  getDefaultCategory,
} from '@/data/marketplaces/registry';
import { calculateProfit } from '@/domain/calculator/engine';
import { compareMarketplaces } from '@/domain/calculator/comparison';
import { CurrencyInput } from '@/components/ui/CurrencyInput';
import { ProfitSignatureCard } from './ProfitSignatureCard';
import { FeeBreakdownDrawer } from './FeeBreakdownDrawer';
import { siteConfig } from '@/config/site';

interface MarketplaceCalculatorProps {
  initialMarketplaceId?: MarketplaceId;
  defaultSellingPrice?: number;
  defaultProductCost?: number;
  showComparisonLink?: boolean;
}

export function MarketplaceCalculator({
  initialMarketplaceId = 'shopee',
  defaultSellingPrice = 100000,
  defaultProductCost = 60000,
  showComparisonLink = true,
}: MarketplaceCalculatorProps) {
  const [marketplaceId, setMarketplaceId] = useState<MarketplaceId>(initialMarketplaceId);
  const [sellingPrice, setSellingPrice] = useState<number>(defaultSellingPrice);
  const [productCost, setProductCost] = useState<number>(defaultProductCost);
  const [advertisingCost, setAdvertisingCost] = useState<number>(5000);
  const [affiliatePercentage, setAffiliatePercentage] = useState<number>(5);
  const [voucherCost, setVoucherCost] = useState<number>(0);
  const [shippingSubsidy, setShippingSubsidy] = useState<number>(0);

  // Active marketplace config
  const config = useMemo(() => getMarketplaceConfig(marketplaceId), [marketplaceId]);

  // Tier and category states
  const [sellerTierId, setSellerTierId] = useState<string>(() => getDefaultTier(initialMarketplaceId));
  const [categoryId, setCategoryId] = useState<string>(() => getDefaultCategory(initialMarketplaceId));

  // Optional program toggles
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>(() => {
    return config.rules.filter((r) => r.isOptional && r.isDefaultActive).map((r) => r.id);
  });

  // Handle marketplace tab change
  const handleMarketplaceChange = (newId: MarketplaceId) => {
    setMarketplaceId(newId);
    const newConfig = getMarketplaceConfig(newId);
    setSellerTierId(getDefaultTier(newId));
    setCategoryId(getDefaultCategory(newId));
    setSelectedPrograms(
      newConfig.rules.filter((r) => r.isOptional && r.isDefaultActive).map((r) => r.id)
    );
  };

  const toggleProgram = (programId: string) => {
    setSelectedPrograms((prev) =>
      prev.includes(programId) ? prev.filter((id) => id !== programId) : [...prev, programId]
    );
  };

  const handleReset = () => {
    setSellingPrice(100000);
    setProductCost(60000);
    setAdvertisingCost(0);
    setAffiliatePercentage(0);
    setVoucherCost(0);
    setShippingSubsidy(0);
  };

  // Build input object
  const currentInput: CalculatorInput = useMemo(
    () => ({
      marketplaceId,
      sellerTierId,
      categoryId,
      sellingPrice,
      productCost,
      advertisingCost,
      affiliatePercentage,
      voucherCost,
      shippingSubsidy,
      selectedPrograms,
    }),
    [
      marketplaceId,
      sellerTierId,
      categoryId,
      sellingPrice,
      productCost,
      advertisingCost,
      affiliatePercentage,
      voucherCost,
      shippingSubsidy,
      selectedPrograms,
    ]
  );

  // Run calculation
  const result = useMemo(() => calculateProfit(currentInput, config), [currentInput, config]);

  // Run 4-way comparison for preview pills
  const comparisonResult = useMemo(() => {
    return compareMarketplaces(currentInput, getAllMarketplaceConfigs());
  }, [currentInput]);

  const previewItems = comparisonResult.items.map((item) => ({
    marketplaceId: item.marketplaceId,
    marketplaceName: item.marketplaceName,
    profit: item.result.netProfit,
    margin: item.result.netMargin,
    color: item.brandColor,
  }));

  const optionalRules = config.rules.filter((r) => r.isOptional);

  return (
    <div className="w-full">
      {/* 1. Calculator Input Card (Wise-Style Prominent Box) */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-8">
        {/* Marketplace Selector Tabs */}
        <div className="mb-6">
          <label className="mb-2 block font-display text-xs font-semibold uppercase tracking-wider text-primary-500">
            Pilih Marketplace
          </label>
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-stone-100 p-1.5 sm:grid-cols-4">
            {siteConfig.marketplaces.map((m) => {
              const isSelected = m.id === marketplaceId;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleMarketplaceChange(m.id as MarketplaceId)}
                  className={`relative flex items-center justify-center gap-2 rounded-lg py-2.5 px-3 text-xs font-semibold transition-all sm:text-sm ${
                    isSelected
                      ? 'bg-white text-primary-900 shadow-sm'
                      : 'text-primary-600 hover:text-primary-900'
                  }`}
                >
                  <span>{m.icon}</span>
                  <span>{m.name}</span>
                  {isSelected && (
                    <motion.div
                      layoutId="activeTabBadge"
                      className="absolute inset-0 rounded-lg border-2 border-primary-900/10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Core Inputs: Selling Price & Product Cost */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <CurrencyInput
            id="sellingPrice"
            label="Harga Jual Produk"
            value={sellingPrice}
            onChange={setSellingPrice}
            placeholder="100.000"
            hint="Harga yang dibayar pembeli"
            required
          />
          <CurrencyInput
            id="productCost"
            label="Modal Pokok (HPP / COGS)"
            value={productCost}
            onChange={setProductCost}
            placeholder="60.000"
            hint="Biaya kulakan / bahan baku"
            required
          />
        </div>

        {/* Secondary Inputs: Ads, Affiliate, Tier, Category */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <CurrencyInput
            id="advertisingCost"
            label="Biaya Iklan (per unit)"
            value={advertisingCost}
            onChange={setAdvertisingCost}
            placeholder="0"
            hint="Shopee Ads / CPAS / GMV Max"
          />

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="affiliatePct" className="font-display text-xs font-semibold text-primary-800 sm:text-sm">
                Komisi Affiliate
              </label>
              <span className="text-[11px] text-primary-400">Kreator video/live</span>
            </div>
            <div className="relative flex items-center rounded-xl border border-stone-300 bg-white shadow-subtle focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20">
              <input
                id="affiliatePct"
                type="number"
                min="0"
                max="100"
                step="0.5"
                value={affiliatePercentage === 0 ? '' : affiliatePercentage}
                onChange={(e) => setAffiliatePercentage(Math.max(0, Math.min(100, Number(e.target.value))))}
                placeholder="0"
                className="w-full rounded-xl bg-transparent py-2.5 pl-3.5 pr-8 font-mono text-base font-semibold tracking-tight text-primary-900 tabular-nums placeholder:text-stone-300 focus:outline-none sm:text-lg"
              />
              <span className="absolute right-3.5 font-mono text-sm font-semibold text-primary-500">%</span>
            </div>
          </div>

          {/* Seller Tier Select */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="sellerTier" className="font-display text-xs font-semibold text-primary-800 sm:text-sm">
              Status / Tier Toko
            </label>
            <select
              id="sellerTier"
              value={sellerTierId}
              onChange={(e) => setSellerTierId(e.target.value)}
              className="w-full rounded-xl border border-stone-300 bg-white py-3 px-3 text-xs font-medium text-primary-900 shadow-subtle focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 sm:text-sm"
            >
              {config.sellerTiers.map((tier) => (
                <option key={tier.id} value={tier.id}>
                  {tier.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category Select */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="categoryGroup" className="font-display text-xs font-semibold text-primary-800 sm:text-sm">
              Kategori Produk
            </label>
            <select
              id="categoryGroup"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-xl border border-stone-300 bg-white py-3 px-3 text-xs font-medium text-primary-900 shadow-subtle focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 sm:text-sm"
            >
              {config.categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Optional Extra Programs Checkboxes */}
        {optionalRules.length > 0 && (
          <div className="mt-5 border-t border-stone-100 pt-4">
            <span className="text-xs font-semibold text-primary-700">Program Layanan Tambahan (Opsional):</span>
            <div className="mt-2.5 flex flex-wrap gap-3">
              {optionalRules.map((rule) => {
                const isChecked = selectedPrograms.includes(rule.id);
                return (
                  <button
                    key={rule.id}
                    type="button"
                    onClick={() => toggleProgram(rule.id)}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
                      isChecked
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm'
                        : 'border-stone-200 bg-white text-primary-600 hover:border-stone-300'
                    }`}
                  >
                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded border ${
                        isChecked ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-stone-300'
                      }`}
                    >
                      {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                    <span>{rule.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer actions inside input box */}
        <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-4 text-xs">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 font-medium text-primary-500 transition-colors hover:text-primary-800"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Angka</span>
          </button>

          <span className="text-[11px] text-primary-400">
            Kalkulasi otomatis dieksekusi instan di peramban Anda.
          </span>
        </div>
      </div>

      {/* 2. Result Section (Prominent Signature Card) */}
      <div className="mt-6">
        <ProfitSignatureCard
          result={result}
          marketplaceName={config.name}
          previewItems={previewItems}
          onSelectPreview={(id) => handleMarketplaceChange(id as MarketplaceId)}
        />
      </div>

      {/* 3. Detailed Fee Breakdown Drawer */}
      <FeeBreakdownDrawer result={result} marketplaceName={config.name} />
    </div>
  );
}
