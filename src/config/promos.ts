export interface TrustBadgeItem {
  icon: string;
  label: string;
  sublabel: string;
}

export interface PromoSlide {
  id: number | string;
  title: string;
  subtitle?: string | null;
  badge: string;
  marketplace: 'shopee' | 'tokopedia' | 'tiktok-shop' | 'lazada' | 'all';
  type: 'campaign_banner' | 'product_spotlight';
  imageUrl: string;
  originalPrice?: number | null;
  dealPrice?: number | null;
  discountPercent?: number | null;
  highlights?: string[];
  trustBadges?: TrustBadgeItem[];
  targetUrl: string;
  ctaText: string;
  sortOrder?: number;
  isActive?: boolean;
}

export const DEFAULT_PROMOTIONS: PromoSlide[] = [
  {
    id: 'promo-1',
    title: 'Air Fryer Gaabor 4L Low Watt Digital Touchscreen',
    subtitle: 'Goreng Sehat Tanpa Minyak, Kapasitas Jumbo & Hemat Listrik 800W',
    badge: 'Banting Harga 52%',
    marketplace: 'tiktok-shop',
    type: 'product_spotlight',
    imageUrl: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    originalPrice: 650000,
    dealPrice: 312000,
    discountPercent: 52,
    highlights: ['Goreng Sehat Tanpa Minyak', 'Kapasitas Jumbo 4L', 'Hemat Listrik 800W'],
    trustBadges: [
      { icon: 'verified', label: 'Garansi Resmi', sublabel: 'Toko Official' },
      { icon: 'local_shipping', label: 'Pengiriman Cepat', sublabel: 'Dari Jakarta' },
      { icon: 'star', label: '4.8 (12rb+ ulasan)', sublabel: 'Produk Terlaris' },
      { icon: 'sync', label: '7 Hari', sublabel: 'Mudah Return' },
    ],
    targetUrl: 'https://tiktok.com',
    ctaText: 'Cek di TikTok Shop',
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 'promo-2',
    title: 'TWS Baseus Bowie WM01 Bluetooth 5.3 Wireless Earbuds',
    subtitle: 'Baterai 25 Jam, Audio Jernih & Latensi Rendah untuk Gaming',
    badge: 'Hemat 45%',
    marketplace: 'shopee',
    type: 'product_spotlight',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
    originalPrice: 249000,
    dealPrice: 136000,
    discountPercent: 45,
    highlights: ['Baterai Tahan 25 Jam', 'Bluetooth 5.3 Low Latency', 'Audio Bass Jernih'],
    trustBadges: [
      { icon: 'verified', label: 'Garansi Resmi', sublabel: 'Shopee Mall' },
      { icon: 'local_shipping', label: 'Bebas Ongkir', sublabel: 'Instant & Reguler' },
      { icon: 'star', label: '4.9 (45rb+ ulasan)', sublabel: 'Pilihan Editor' },
      { icon: 'sync', label: '100% Original', sublabel: 'Jaminan Uang Kembali' },
    ],
    targetUrl: 'https://shopee.co.id',
    ctaText: 'Cek di Shopee',
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 'promo-3',
    title: 'Xiaomi Smart Band 8 Active Layar 1.47 Inci AMOLED',
    subtitle: '50+ Mode Olahraga, Pelacak Detak Jantung & Baterai 14 Hari',
    badge: 'Harga Terendah',
    marketplace: 'tokopedia',
    type: 'product_spotlight',
    imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=600&q=80',
    originalPrice: 399000,
    dealPrice: 289000,
    discountPercent: 28,
    highlights: ['Layar AMOLED 1.47 Inci', '50+ Mode Olahraga', 'Baterai 14 Hari'],
    trustBadges: [
      { icon: 'verified', label: 'Official Store', sublabel: 'Garansi TAM 1 Thn' },
      { icon: 'local_shipping', label: 'Pengiriman Cepat', sublabel: 'Kurir Rekomendasi' },
      { icon: 'star', label: '4.9 (8rb+ ulasan)', sublabel: 'Top Penjualan' },
      { icon: 'sync', label: 'Tukar Baru', sublabel: 'Klaim Mudah' },
    ],
    targetUrl: 'https://tokopedia.com',
    ctaText: 'Cek di Tokopedia',
    sortOrder: 3,
    isActive: true,
  },
  {
    id: 'promo-4',
    title: 'Skintific 5X Ceramide Barrier Moisture Gel 30g',
    subtitle: 'Memperbaiki Skin Barrier, Menenangkan Kemerahan & Kunci Hidrasi',
    badge: 'Flash Deal 38%',
    marketplace: 'lazada',
    type: 'product_spotlight',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    originalPrice: 189000,
    dealPrice: 117000,
    discountPercent: 38,
    highlights: ['5X Ceramide Alami', 'Menenangkan Kemerahan', 'Kunci Hidrasi 24 Jam'],
    trustBadges: [
      { icon: 'verified', label: 'LazMall Flagship', sublabel: '100% Produk Asli' },
      { icon: 'local_shipping', label: 'Gratis Ongkir', sublabel: 'Tanpa Minimum' },
      { icon: 'star', label: '4.9 (30rb+ ulasan)', sublabel: 'Skincare Terlaris' },
      { icon: 'sync', label: '15 Hari Retur', sublabel: 'Garansi LazMall' },
    ],
    targetUrl: 'https://lazada.co.id',
    ctaText: 'Cek di Lazada',
    sortOrder: 4,
    isActive: true,
  },
  {
    id: 'promo-5',
    title: 'Apple iPhone 15 128GB Garansi Resmi iBox Indonesia',
    subtitle: 'Dynamic Island, Kamera Utama 48MP, USB-C & Chip A16 Bionic Cepat',
    badge: 'Diskon Spesial 14%',
    marketplace: 'shopee',
    type: 'product_spotlight',
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80',
    originalPrice: 16499000,
    dealPrice: 14199000,
    discountPercent: 14,
    highlights: ['Layar Dynamic Island', 'Kamera Canggih 48MP', 'Port Universal USB-C'],
    trustBadges: [
      { icon: 'verified', label: 'Garansi Resmi', sublabel: 'iBox Indonesia' },
      { icon: 'local_shipping', label: 'Asuransi Pengiriman', sublabel: 'Aman 100%' },
      { icon: 'star', label: '5.0 (5rb+ ulasan)', sublabel: 'Flagship Terverifikasi' },
      { icon: 'sync', label: 'IMEI Terdaftar', sublabel: 'Kemenperin Legal' },
    ],
    targetUrl: 'https://shopee.co.id',
    ctaText: 'Cek di Shopee',
    sortOrder: 5,
    isActive: true,
  },
];
