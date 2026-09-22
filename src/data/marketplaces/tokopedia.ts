import { MarketplaceConfig } from '@/domain/marketplace/types';

export const tokopediaConfig: MarketplaceConfig = {
  id: 'tokopedia',
  name: 'Tokopedia',
  slug: 'tokopedia',
  tagline: 'Platform e-commerce andalan untuk Gadget, Elektronik & FMCG',
  brandColor: '#03AC0E',
  version: '2025.1-prototype',
  lastVerifiedDate: '2025-01-15',
  sourceUrl: 'https://seller.tokopedia.com/edu/article/skema-biaya-layanan-tokopedia',
  disclaimer: 'Data biaya ini merupakan simulasi model edukasi (prototype). Kebijakan resmi mengacu pada Pusat Edukasi Seller Tokopedia (Shop | Tokopedia).',
  isPrototypeData: true,
  sellerTiers: [
    {
      id: 'regular_merchant',
      name: 'Regular Merchant',
      description: 'Penjual baru atau toko dengan status merchant standar.',
    },
    {
      id: 'power_merchant',
      name: 'Power Merchant',
      description: 'Penjual terverifikasi dengan akses fitur promosi dan Bebas Ongkir.',
    },
    {
      id: 'power_merchant_pro',
      name: 'Power Merchant Pro',
      description: 'Penjual pro dengan performa toko unggulan dan komisi khusus.',
      isDefault: true,
    },
    {
      id: 'official_store',
      name: 'Official Store',
      description: 'Toko resmi brand atau pemegang hak eksklusif di Tokopedia.',
    },
  ],
  categories: [
    {
      id: 'group_1',
      name: 'Grup Kategori 1 (Fashion & Beauty)',
      description: 'Pakaian, sepatu, perawatan tubuh, kosmetik',
      defaultAdminFeeRate: 0.05, // 5.0%
    },
    {
      id: 'group_2',
      name: 'Grup Kategori 2 (Home & Living, F&B)',
      description: 'Perabotan rumah, makanan & minuman, hobi',
      defaultAdminFeeRate: 0.045, // 4.5%
    },
    {
      id: 'group_3',
      name: 'Grup Kategori 3 (Gadget & Elektronik)',
      description: 'Smartphone, komputer, audio, kamera',
      defaultAdminFeeRate: 0.035, // 3.5%
    },
    {
      id: 'group_4',
      name: 'Grup Kategori 4 (Otomotif & Perkakas)',
      description: 'Aksesoris motor, mobil, peralatan industri',
      defaultAdminFeeRate: 0.04, // 4.0%
    },
    {
      id: 'group_5',
      name: 'Grup Kategori 5 (Digital & Lainnya)',
      description: 'Voucher, buku, produk digital',
      defaultAdminFeeRate: 0.025, // 2.5%
    },
  ],
  rules: [
    // Base Admin Fees by Tier
    {
      id: 'admin_fee_rm',
      name: 'Biaya Layanan Regular Merchant',
      type: 'percentage',
      category: 'admin',
      percentageRate: 0.025, // 2.5%
      fixedFee: 0,
      applicableTiers: ['regular_merchant'],
      isDefaultActive: true,
      isOptional: false,
      conditionDescription: 'Dikenakan setelah melampaui 100 pesanan terselesaikan.',
    },
    {
      id: 'admin_fee_pm',
      name: 'Biaya Layanan Power Merchant',
      type: 'percentage',
      category: 'admin',
      percentageRate: 0.045, // 4.5%
      fixedFee: 0,
      applicableTiers: ['power_merchant'],
      applicableCategories: {
        group_1: 0.05,
        group_2: 0.045,
        group_3: 0.035,
        group_4: 0.04,
        group_5: 0.025,
      },
      isDefaultActive: true,
      isOptional: false,
      conditionDescription: 'Biaya komisi dasar penjual berstatus Power Merchant.',
    },
    {
      id: 'admin_fee_pm_pro',
      name: 'Biaya Layanan Power Merchant Pro',
      type: 'percentage',
      category: 'admin',
      percentageRate: 0.05, // 5.0%
      fixedFee: 0,
      applicableTiers: ['power_merchant_pro'],
      applicableCategories: {
        group_1: 0.055,
        group_2: 0.05,
        group_3: 0.04,
        group_4: 0.045,
        group_5: 0.03,
      },
      isDefaultActive: true,
      isOptional: false,
      conditionDescription: 'Biaya komisi dasar penjual berstatus Power Merchant Pro.',
    },
    {
      id: 'admin_fee_os',
      name: 'Biaya Layanan Official Store',
      type: 'percentage',
      category: 'admin',
      percentageRate: 0.06, // 6.0%
      fixedFee: 0,
      applicableTiers: ['official_store'],
      applicableCategories: {
        group_1: 0.065,
        group_2: 0.06,
        group_3: 0.045,
        group_4: 0.05,
        group_5: 0.035,
      },
      isDefaultActive: true,
      isOptional: false,
      conditionDescription: 'Biaya layanan toko resmi Official Store Tokopedia.',
    },
    // Optional Bebas Ongkir Program
    {
      id: 'bebas_ongkir_fee',
      name: 'Layanan Bebas Ongkir',
      type: 'percentage',
      category: 'service',
      percentageRate: 0.04, // 4.0%
      fixedFee: 0,
      maxFee: 10000,
      isDefaultActive: true,
      isOptional: true,
      conditionDescription: 'Biaya partisipasi program Bebas Ongkir (maksimal Rp10.000/produk).',
    },
    // Fixed Payment/Transaction Fee
    {
      id: 'payment_handling_fee',
      name: 'Biaya Jasa Aplikasi / Transaksi',
      type: 'fixed',
      category: 'payment',
      percentageRate: 0,
      fixedFee: 1000, // Rp1.000 flat
      isDefaultActive: true,
      isOptional: false,
      conditionDescription: 'Biaya pemrosesan transaksi per pesanan berhasil.',
    },
  ],
};
