import { MarketplaceConfig } from '@/domain/marketplace/types';

export const tiktokShopConfig: MarketplaceConfig = {
  id: 'tiktok-shop',
  name: 'TikTok Shop',
  slug: 'tiktok-shop',
  tagline: 'Platform social commerce terdepan untuk Live Shopping & Affiliate Creator',
  brandColor: '#000000',
  version: '2025.1-prototype',
  lastVerifiedDate: '2025-01-15',
  sourceUrl: 'https://seller-id.tiktok.com/university/home',
  disclaimer: 'Data biaya ini merupakan simulasi model edukasi (prototype). Kebijakan biaya komisi mengacu pada TikTok Shop Academy Indonesia.',
  isPrototypeData: true,
  sellerTiers: [
    {
      id: 'standard_seller',
      name: 'Seller Reguler',
      description: 'Penjual marketplace standar yang berjualan melalui video dan Live Shopping.',
      isDefault: true,
    },
    {
      id: 'tiktok_mall',
      name: 'TikTok Shop Mall',
      description: 'Toko resmi brand terverifikasi dengan jaminan produk original.',
    },
  ],
  categories: [
    {
      id: 'fashion_apparel',
      name: 'Fashion, Pakaian & Sepatu',
      description: 'Pakaian pria/wanita, alas kaki, tas, busana muslim',
      defaultAdminFeeRate: 0.05, // 5.0%
    },
    {
      id: 'beauty_care',
      name: 'Kecantikan & Skincare',
      description: 'Perawatan wajah, kosmetik, parfum, bodycare',
      defaultAdminFeeRate: 0.0475, // 4.75%
    },
    {
      id: 'fmcg_food',
      name: 'Makanan, Minuman & Suplemen',
      description: 'Camilan, minuman instan, suplemen kesehatan',
      defaultAdminFeeRate: 0.0425, // 4.25%
    },
    {
      id: 'gadgets_electronics',
      name: 'Elektronik & Aksesoris HP',
      description: 'TWS, powerbank, casing, kabel data, smart gadget',
      defaultAdminFeeRate: 0.035, // 3.5%
    },
    {
      id: 'home_living',
      name: 'Peralatan Rumah Tangga',
      description: 'Alat dapur, dekorasi ruangan, kebersihan',
      defaultAdminFeeRate: 0.04, // 4.0%
    },
  ],
  rules: [
    // Base Commission Fees
    {
      id: 'admin_fee_standard',
      name: 'Komisi Penjualan Reguler',
      type: 'percentage',
      category: 'admin',
      percentageRate: 0.045, // 4.5%
      fixedFee: 0,
      applicableTiers: ['standard_seller'],
      applicableCategories: {
        fashion_apparel: 0.05,
        beauty_care: 0.0475,
        fmcg_food: 0.0425,
        gadgets_electronics: 0.035,
        home_living: 0.04,
      },
      isDefaultActive: true,
      isOptional: false,
      conditionDescription: 'Biaya komisi dasar marketplace pada setiap pesanan terselesaikan.',
    },
    {
      id: 'admin_fee_mall',
      name: 'Komisi TikTok Shop Mall',
      type: 'percentage',
      category: 'admin',
      percentageRate: 0.065, // 6.5%
      fixedFee: 0,
      applicableTiers: ['tiktok_mall'],
      applicableCategories: {
        fashion_apparel: 0.075,
        beauty_care: 0.065,
        fmcg_food: 0.055,
        gadgets_electronics: 0.045,
        home_living: 0.055,
      },
      isDefaultActive: true,
      isOptional: false,
      conditionDescription: 'Biaya komisi untuk toko resmi berstatus TikTok Shop Mall.',
    },
    // Optional Live Shopping / Campaign Program
    {
      id: 'live_campaign_fee',
      name: 'Program Mega Sale / Ekstra Kupon',
      type: 'percentage',
      category: 'service',
      percentageRate: 0.02, // 2.0%
      fixedFee: 0,
      maxFee: 15000,
      isDefaultActive: false,
      isOptional: true,
      conditionDescription: 'Program partisipasi subsidi kupon ekstra live shopping (opsional).',
    },
    // Payment Handling Fee
    {
      id: 'payment_handling_fee',
      name: 'Biaya Pemrosesan Pembayaran',
      type: 'percentage',
      category: 'payment',
      percentageRate: 0.01, // 1.0%
      fixedFee: 0,
      minFee: 1000,
      isDefaultActive: true,
      isOptional: false,
      conditionDescription: 'Biaya transaksi gerbang pembayaran (1% atau minimum Rp1.000).',
    },
  ],
};
