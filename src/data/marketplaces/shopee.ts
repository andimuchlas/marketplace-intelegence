import { MarketplaceConfig } from '@/domain/marketplace/types';

export const shopeeConfig: MarketplaceConfig = {
  id: 'shopee',
  name: 'Shopee',
  slug: 'shopee',
  tagline: 'Platform e-commerce terbesar untuk Fashion, FMCG & Beauty',
  brandColor: '#EE4D2D',
  version: '2025.1-prototype',
  lastVerifiedDate: '2025-01-15',
  sourceUrl: 'https://seller.shopee.co.id/edu/article/18579',
  disclaimer: 'Data biaya ini merupakan simulasi model edukasi (prototype). Kebijakan biaya resmi dapat berubah sewaktu-waktu sesuai ketentuan Pusat Edukasi Penjual Shopee.',
  isPrototypeData: true,
  sellerTiers: [
    {
      id: 'non_star',
      name: 'Non-Star Seller',
      description: 'Penjual reguler tanpa lencana Star Seller (transaksi < 100 order).',
    },
    {
      id: 'star_seller',
      name: 'Star Seller',
      description: 'Penjual terpilih dengan performa operasional dan rating tinggi.',
      isDefault: true,
    },
    {
      id: 'star_plus',
      name: 'Star+ Seller',
      description: 'Penjual Star unggulan dengan volume penjualan konsisten.',
    },
    {
      id: 'shopee_mall',
      name: 'Shopee Mall',
      description: 'Official store & brand terdaftar resmi di Shopee.',
    },
  ],
  categories: [
    {
      id: 'fashion',
      name: 'Fashion & Aksesoris (Grup A)',
      description: 'Pakaian, sepatu, tas, aksesoris fashion',
      defaultAdminFeeRate: 0.0475, // 4.75%
    },
    {
      id: 'fmcg',
      name: 'Kecantikan, FMCG & Makanan (Grup B)',
      description: 'Perawatan, kosmetik, makanan dan minuman',
      defaultAdminFeeRate: 0.045, // 4.50%
    },
    {
      id: 'electronics',
      name: 'Elektronik & Gadget (Grup C)',
      description: 'Ponsel, komputer, kamera, aksesoris elektronik',
      defaultAdminFeeRate: 0.035, // 3.50%
    },
    {
      id: 'home_living',
      name: 'Rumah Tangga & Hobi (Grup D)',
      description: 'Perlengkapan rumah, perkakas, otomotif',
      defaultAdminFeeRate: 0.0425, // 4.25%
    },
    {
      id: 'digital',
      name: 'Produk Digital & Lainnya (Grup E)',
      description: 'Voucher, buku, perlengkapan kantor',
      defaultAdminFeeRate: 0.03, // 3.00%
    },
  ],
  rules: [
    // Base Admin Fees by Tier
    {
      id: 'admin_fee_non_star',
      name: 'Biaya Administrasi Non-Star',
      type: 'percentage',
      category: 'admin',
      percentageRate: 0.04, // 4.0%
      fixedFee: 0,
      applicableTiers: ['non_star'],
      isDefaultActive: true,
      isOptional: false,
      conditionDescription: 'Dikenakan pada penjual Non-Star setelah melampaui batas transaksi awal.',
    },
    {
      id: 'admin_fee_star',
      name: 'Biaya Administrasi Star Seller',
      type: 'percentage',
      category: 'admin',
      percentageRate: 0.0475, // 4.75%
      fixedFee: 0,
      applicableTiers: ['star_seller'],
      applicableCategories: {
        fashion: 0.05,
        fmcg: 0.0475,
        electronics: 0.0375,
        home_living: 0.045,
        digital: 0.0325,
      },
      isDefaultActive: true,
      isOptional: false,
      conditionDescription: 'Dikenakan pada setiap produk terjual oleh penjual Star Seller.',
    },
    {
      id: 'admin_fee_star_plus',
      name: 'Biaya Administrasi Star+ Seller',
      type: 'percentage',
      category: 'admin',
      percentageRate: 0.0525, // 5.25%
      fixedFee: 0,
      applicableTiers: ['star_plus'],
      applicableCategories: {
        fashion: 0.055,
        fmcg: 0.0525,
        electronics: 0.0425,
        home_living: 0.05,
        digital: 0.0375,
      },
      isDefaultActive: true,
      isOptional: false,
      conditionDescription: 'Dikenakan pada penjual Star+.',
    },
    {
      id: 'admin_fee_mall',
      name: 'Biaya Administrasi Shopee Mall',
      type: 'percentage',
      category: 'admin',
      percentageRate: 0.065, // 6.5%
      fixedFee: 0,
      applicableTiers: ['shopee_mall'],
      applicableCategories: {
        fashion: 0.085,
        fmcg: 0.065,
        electronics: 0.045,
        home_living: 0.065,
        digital: 0.045,
      },
      isDefaultActive: true,
      isOptional: false,
      conditionDescription: 'Dikenakan pada toko resmi Shopee Mall sesuai kelompok kategori brand.',
    },
    // Optional Programs
    {
      id: 'gratis_ongkir_xtra',
      name: 'Program Gratis Ongkir XTRA',
      type: 'percentage',
      category: 'service',
      percentageRate: 0.04, // 4.0%
      fixedFee: 0,
      maxFee: 10000, // Max Rp10.000 per kuantiti
      isDefaultActive: true,
      isOptional: true,
      conditionDescription: 'Biaya layanan program Gratis Ongkir XTRA maksimum Rp10.000 per produk.',
    },
    {
      id: 'cashback_xtra',
      name: 'Program Cashback XTRA',
      type: 'percentage',
      category: 'service',
      percentageRate: 0.014, // 1.4%
      fixedFee: 0,
      maxFee: 10000,
      isDefaultActive: false,
      isOptional: true,
      conditionDescription: 'Biaya layanan program Cashback XTRA maksimum Rp10.000 per produk.',
    },
    // Payment Fee
    {
      id: 'payment_handling_fee',
      name: 'Biaya Penanganan Transaksi',
      type: 'percentage',
      category: 'payment',
      percentageRate: 0.01, // 1.0%
      fixedFee: 0,
      minFee: 1000,
      isDefaultActive: true,
      isOptional: false,
      conditionDescription: 'Biaya proses pembayaran gateway (1% atau minimum Rp1.000).',
    },
  ],
};
