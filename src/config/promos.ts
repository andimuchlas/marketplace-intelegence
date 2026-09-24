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
  targetUrl: string;
  ctaText: string;
  sortOrder?: number;
  isActive?: boolean;
}

export const DEFAULT_PROMOTIONS: PromoSlide[] = [
  {
    id: 'promo-1',
    title: 'Shopee 10.10 Brand Festival: Ekstra Voucher 50%',
    subtitle: 'Gratis Ongkir Rp 0 & Diskon Kilat Tiap Jam di Shopee Mall',
    badge: 'Event Akbar 10.10',
    marketplace: 'shopee',
    type: 'campaign_banner',
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80',
    targetUrl: 'https://shopee.co.id',
    ctaText: 'Klaim Voucher di Shopee',
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 'promo-2',
    title: 'TWS Baseus Bowie WM01 Bluetooth 5.3',
    subtitle: 'Baterai 25 Jam, Audio Jernih & Latensi Rendah untuk Gaming',
    badge: 'Hemat 45%',
    marketplace: 'shopee',
    type: 'product_spotlight',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
    originalPrice: 249000,
    dealPrice: 136000,
    discountPercent: 45,
    targetUrl: 'https://shopee.co.id',
    ctaText: 'Ambil di Shopee',
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 'promo-3',
    title: 'Tokopedia WIB: Kejar Diskon s/d 90% & Cashback',
    subtitle: 'Bebas Ongkir ke Seluruh Indonesia Tanpa Minimum Belanja',
    badge: 'Spesial WIB',
    marketplace: 'tokopedia',
    type: 'campaign_banner',
    imageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
    targetUrl: 'https://tokopedia.com',
    ctaText: 'Serbu Promo di Tokopedia',
    sortOrder: 3,
    isActive: true,
  },
  {
    id: 'promo-4',
    title: 'Xiaomi Smart Band 8 Active Layar 1.47 Inci',
    subtitle: '50+ Mode Olahraga, Pelacak Detak Jantung & Baterai 14 Hari',
    badge: 'Harga Terendah',
    marketplace: 'tokopedia',
    type: 'product_spotlight',
    imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=600&q=80',
    originalPrice: 399000,
    dealPrice: 289000,
    discountPercent: 28,
    targetUrl: 'https://tokopedia.com',
    ctaText: 'Lihat di Tokopedia',
    sortOrder: 4,
    isActive: true,
  },
  {
    id: 'promo-5',
    title: 'Air Fryer Gaabor 4L Low Watt Digital Touchscreen',
    subtitle: 'Goreng Sehat Tanpa Minyak, Kapasitas Jumbo & Hemat Listrik 800W',
    badge: 'Banting Harga 52%',
    marketplace: 'tiktok-shop',
    type: 'product_spotlight',
    imageUrl: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    originalPrice: 650000,
    dealPrice: 312000,
    discountPercent: 52,
    targetUrl: 'https://tiktok.com',
    ctaText: 'Cek di TikTok Shop',
    sortOrder: 5,
    isActive: true,
  },
];
