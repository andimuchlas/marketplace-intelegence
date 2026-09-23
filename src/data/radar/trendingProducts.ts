export interface TrendingProductItem {
  slug: string;
  name: string;
  category: 'Gadget' | 'Skincare' | 'Fashion' | 'Elektronik';
  estimatedBasePrice: number;
  badge: string;
  badgeIcon: string;
}

export const TRENDING_PRODUCTS: TrendingProductItem[] = [
  {
    slug: 'iphone-15-128gb',
    name: 'iPhone 15 128GB Garansi Resmi iBox',
    category: 'Gadget',
    estimatedBasePrice: 13999000,
    badge: 'Paling Dicari',
    badgeIcon: 'local_fire_department',
  },
  {
    slug: 'skintific-5x-ceramide',
    name: 'Skintific 5X Ceramide Barrier Moisture Gel 30g',
    category: 'Skincare',
    estimatedBasePrice: 129000,
    badge: 'Top Seller',
    badgeIcon: 'grade',
  },
  {
    slug: 'sony-wh-1000xm5',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphone',
    category: 'Elektronik',
    estimatedBasePrice: 5199000,
    badge: 'Audio Pilihan',
    badgeIcon: 'headphones',
  },
  {
    slug: 'ventela-public-low',
    name: 'Sepatu Ventela Public Low Black Natural Original',
    category: 'Fashion',
    estimatedBasePrice: 229000,
    badge: 'Brand Lokal',
    badgeIcon: 'verified',
  },
  {
    slug: 'tws-baseus-bowie-wm02',
    name: 'Baseus Bowie WM02 TWS True Wireless Earphone Bluetooth',
    category: 'Gadget',
    estimatedBasePrice: 189000,
    badge: 'Flash Deal',
    badgeIcon: 'bolt',
  },
  {
    slug: 'xiaomi-smart-band-8',
    name: 'Xiaomi Smart Band 8 AMOLED Display Resmi',
    category: 'Gadget',
    estimatedBasePrice: 489000,
    badge: 'Smartwatch',
    badgeIcon: 'watch',
  },
  {
    slug: 'glad2glow-centella-gel',
    name: 'Glad2Glow Centella Allantoin Soothing Gel Moisturizer',
    category: 'Skincare',
    estimatedBasePrice: 42000,
    badge: 'Viral TikTok',
    badgeIcon: 'trending_up',
  },
  {
    slug: 'logitech-pebble-m350',
    name: 'Logitech Pebble M350 Wireless Silent Mouse Bluetooth',
    category: 'Elektronik',
    estimatedBasePrice: 249000,
    badge: 'Aksesoris',
    badgeIcon: 'mouse',
  },
];
