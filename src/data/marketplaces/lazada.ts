import { MarketplaceConfig } from '@/domain/marketplace/types';

export const lazadaConfig: MarketplaceConfig = {
  id: 'lazada',
  name: 'Lazada',
  slug: 'lazada',
  tagline: 'Platform e-commerce regional dengan ekosistem LazMall kuat',
  brandColor: '#0F146D',
  version: '2025.1-prototype',
  lastVerifiedDate: '2025-01-15',
  sourceUrl: 'https://sellercenter.lazada.co.id/apps/learn/help',
  disclaimer: 'Data biaya ini merupakan simulasi model edukasi (prototype). Kebijakan resmi mengacu pada Pusat Bantuan Lazada Seller Center Indonesia.',
  isPrototypeData: true,
  sellerTiers: [
    {
      id: 'marketplace_seller',
      name: 'Marketplace Seller',
      description: 'Penjual marketplace standar terverifikasi di Lazada.',
      isDefault: true,
    },
    {
      id: 'lazmall',
      name: 'LazMall',
      description: 'Brand resmi & distributor eksklusif bersertifikasi LazMall.',
    },
  ],
  categories: [
    {
      id: 'fashion',
      name: 'Fashion & Aksesoris',
      description: 'Pakaian pria/wanita, tas, jam tangan, kacamata',
      defaultAdminFeeRate: 0.045, // 4.5%
    },
    {
      id: 'health_beauty',
      name: 'Kesehatan & Kecantikan',
      description: 'Skincare, suplemen kesehatan, kosmetik',
      defaultAdminFeeRate: 0.0425, // 4.25%
    },
    {
      id: 'fmcg_groceries',
      name: 'Kebutuhan Harian & Makanan',
      description: 'Sembako, makanan ringan, kebutuhan bayi',
      defaultAdminFeeRate: 0.035, // 3.5%
    },
    {
      id: 'electronics_mobiles',
      name: 'Elektronik & Gadget',
      description: 'Smartphone, laptop, TV, audio visual',
      defaultAdminFeeRate: 0.03, // 3.0%
    },
    {
      id: 'general_merchandise',
      name: 'Hobi, Otomotif & Olahraga',
      description: 'Alat olahraga, suku cadang motor, perlengkapan outdoor',
      defaultAdminFeeRate: 0.04, // 4.0%
    },
  ],
  rules: [
    // Base Commission Fees
    {
      id: 'admin_fee_marketplace',
      name: 'Komisi Penjualan Marketplace',
      type: 'percentage',
      category: 'admin',
      percentageRate: 0.04, // 4.0%
      fixedFee: 0,
      applicableTiers: ['marketplace_seller'],
      applicableCategories: {
        fashion: 0.045,
        health_beauty: 0.0425,
        fmcg_groceries: 0.035,
        electronics_mobiles: 0.03,
        general_merchandise: 0.04,
      },
      isDefaultActive: true,
      isOptional: false,
      conditionDescription: 'Komisi standar platform Lazada untuk marketplace seller.',
    },
    {
      id: 'admin_fee_lazmall',
      name: 'Komisi Resmi LazMall',
      type: 'percentage',
      category: 'admin',
      percentageRate: 0.06, // 6.0%
      fixedFee: 0,
      applicableTiers: ['lazmall'],
      applicableCategories: {
        fashion: 0.07,
        health_beauty: 0.065,
        fmcg_groceries: 0.05,
        electronics_mobiles: 0.04,
        general_merchandise: 0.055,
      },
      isDefaultActive: true,
      isOptional: false,
      conditionDescription: 'Komisi toko LazMall dengan garansi 100% original.',
    },
    // Optional Free Shipping Max
    {
      id: 'free_shipping_max',
      name: 'Program Free Shipping Max',
      type: 'percentage',
      category: 'service',
      percentageRate: 0.03, // 3.0%
      fixedFee: 0,
      maxFee: 10000,
      isDefaultActive: true,
      isOptional: true,
      conditionDescription: 'Partisipasi voucher gratis ongkir subsidi maksimal Rp10.000 per produk.',
    },
    // Payment Handling Fee
    {
      id: 'payment_handling_fee',
      name: 'Biaya Pembayaran (Payment Fee)',
      type: 'percentage',
      category: 'payment',
      percentageRate: 0.018, // 1.8%
      fixedFee: 0,
      isDefaultActive: true,
      isOptional: false,
      conditionDescription: 'Biaya transaksi pembayaran per pesanan berhasil.',
    },
  ],
};
