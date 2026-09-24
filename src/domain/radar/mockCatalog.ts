import { MarketplaceId, MarketplaceProductOffer } from './types';

interface ProductPreset {
  basePrice: number;
  imageUrls: string[];
}

function resolveKeywordPreset(keyword: string): ProductPreset {
  const lower = keyword.toLowerCase();

  if (lower.includes('iphone') || lower.includes('samsung') || lower.includes('handphone') || lower.includes('hp')) {
    return {
      basePrice: 12500000,
      imageUrls: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&q=80',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80',
        'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&q=80',
        'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&q=80',
        'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&q=80',
      ],
    };
  }

  if (lower.includes('baju') || lower.includes('kaos') || lower.includes('tshirt') || lower.includes('kemeja') || lower.includes('distro')) {
    return {
      basePrice: 125000,
      imageUrls: [
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&q=80',
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80',
        'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=80',
        'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80',
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80',
      ],
    };
  }

  if (lower.includes('supplement') || lower.includes('protein') || lower.includes('creatine') || lower.includes('whey') || lower.includes('metafiber')) {
    return {
      basePrice: 285000,
      imageUrls: [
        'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80',
        'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400&q=80',
        'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&q=80',
        'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?w=400&q=80',
        'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&q=80',
      ],
    };
  }

  if (lower.includes('sepatu') || lower.includes('shoes') || lower.includes('sneaker') || lower.includes('ventela') || lower.includes('nike') || lower.includes('adidas')) {
    return {
      basePrice: 450000,
      imageUrls: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80',
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80',
        'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&q=80',
        'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&q=80',
      ],
    };
  }

  if (lower.includes('skintific') || lower.includes('serum') || lower.includes('sunscreen') || lower.includes('skincare') || lower.includes('moisturizer')) {
    return {
      basePrice: 119000,
      imageUrls: [
        'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80',
        'https://images.unsplash.com/photo-1608248597359-59828557376c?w=400&q=80',
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80',
        'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80',
        'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&q=80',
      ],
    };
  }

  if (lower.includes('tws') || lower.includes('headphone') || lower.includes('earphone') || lower.includes('sony') || lower.includes('anker') || lower.includes('speaker')) {
    return {
      basePrice: 389000,
      imageUrls: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80',
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80',
        'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=400&q=80',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80',
      ],
    };
  }

  // Fallback generic pricing
  const hash = keyword.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const calculatedBase = Math.max(65000, ((hash * 1337) % 750000) + 50000);
  return {
    basePrice: calculatedBase,
    imageUrls: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=400&q=80',
    ],
  };
}

interface VariantSpec {
  titleSuffix: string;
  priceMultiplier: number;
  discountPct: number;
  isOfficial: boolean;
  shopPrefix: string;
  city: string;
  rating: number;
  sold: number;
}

const MARKETPLACE_VARIANTS: Record<MarketplaceId, VariantSpec[]> = {
  shopee: [
    {
      titleSuffix: 'Original Garansi Resmi 100% Shopee Mall',
      priceMultiplier: 0.94,
      discountPct: 15,
      isOfficial: true,
      shopPrefix: 'Official Store Flagship',
      city: 'Jakarta Pusat',
      rating: 4.9,
      sold: 14200,
    },
    {
      titleSuffix: 'Termurah Promo XTRA Diskon Kilat',
      priceMultiplier: 0.88,
      discountPct: 28,
      isOfficial: false,
      shopPrefix: 'Star+ Grosir Jakarta',
      city: 'Jakarta Barat',
      rating: 4.8,
      sold: 5800,
    },
    {
      titleSuffix: 'Paket Bundling Hemat Free Gift Spesial',
      priceMultiplier: 1.05,
      discountPct: 12,
      isOfficial: true,
      shopPrefix: 'Authorized Reseller Mall',
      city: 'Kab. Tangerang',
      rating: 4.9,
      sold: 3200,
    },
    {
      titleSuffix: 'Distributor Resmi Ready Stock Siap Kirim',
      priceMultiplier: 0.91,
      discountPct: 20,
      isOfficial: false,
      shopPrefix: 'Distro Nusantara Shop',
      city: 'Bandung',
      rating: 4.7,
      sold: 1950,
    },
    {
      titleSuffix: 'Edisi Terbaru Garansi Toko Terpercaya',
      priceMultiplier: 0.96,
      discountPct: 10,
      isOfficial: true,
      shopPrefix: 'Shopee Mall Exclusive',
      city: 'Surabaya',
      rating: 4.9,
      sold: 7600,
    },
    {
      titleSuffix: 'Promo Cuci Gudang Spesial Terbatas',
      priceMultiplier: 0.86,
      discountPct: 35,
      isOfficial: false,
      shopPrefix: 'Mega Murah Store',
      city: 'Jakarta Utara',
      rating: 4.8,
      sold: 2100,
    },
  ],
  tokopedia: [
    {
      titleSuffix: 'Official Store Garansi Resmi Tokopedia',
      priceMultiplier: 0.95,
      discountPct: 14,
      isOfficial: true,
      shopPrefix: 'Official Store Tokopedia',
      city: 'Jakarta Utara',
      rating: 4.9,
      sold: 18500,
    },
    {
      titleSuffix: 'Power Merchant Pro Bebas Ongkir Extra',
      priceMultiplier: 0.89,
      discountPct: 24,
      isOfficial: false,
      shopPrefix: 'Power Merchant Pro Tech',
      city: 'Jakarta Barat',
      rating: 4.8,
      sold: 6900,
    },
    {
      titleSuffix: 'Produk Baru Original Segel Toko Terpercaya',
      priceMultiplier: 0.98,
      discountPct: 8,
      isOfficial: true,
      shopPrefix: 'Tokopedia Mall Partner',
      city: 'Jakarta Selatan',
      rating: 5.0,
      sold: 4300,
    },
    {
      titleSuffix: 'Harga Grosir Spesial Cashback Kilat',
      priceMultiplier: 0.92,
      discountPct: 18,
      isOfficial: false,
      shopPrefix: 'Grosir Jaya Abadi',
      city: 'Surabaya',
      rating: 4.8,
      sold: 2800,
    },
    {
      titleSuffix: 'Varian Pilihan Garansi Pengiriman Cepat',
      priceMultiplier: 0.94,
      discountPct: 15,
      isOfficial: true,
      shopPrefix: 'Store Resmi Indonesia',
      city: 'Bandung',
      rating: 4.9,
      sold: 8400,
    },
    {
      titleSuffix: 'Diskon Spesial Promo Hari Ini',
      priceMultiplier: 0.87,
      discountPct: 30,
      isOfficial: false,
      shopPrefix: 'Super Deals Store',
      city: 'Kab. Bekasi',
      rating: 4.7,
      sold: 1600,
    },
  ],
  'tiktok-shop': [
    {
      titleSuffix: 'Live Streaming Exclusive Special Deal',
      priceMultiplier: 0.85,
      discountPct: 32,
      isOfficial: true,
      shopPrefix: 'TikTok Mall Flagship',
      city: 'Jakarta Selatan',
      rating: 4.9,
      sold: 24000,
    },
    {
      titleSuffix: 'Flash Sale Creator Choice Termurah',
      priceMultiplier: 0.82,
      discountPct: 40,
      isOfficial: false,
      shopPrefix: 'Viral Trend Store',
      city: 'Jakarta Barat',
      rating: 4.8,
      sold: 12500,
    },
    {
      titleSuffix: 'Original Verified Merchant Terlaris',
      priceMultiplier: 0.93,
      discountPct: 16,
      isOfficial: true,
      shopPrefix: 'Official Verified Creator',
      city: 'Tangerang',
      rating: 4.9,
      sold: 8900,
    },
    {
      titleSuffix: 'Paket Hemat Promo Beli Sekarang',
      priceMultiplier: 0.90,
      discountPct: 22,
      isOfficial: false,
      shopPrefix: 'Gudang Promo TikTok',
      city: 'Bandung',
      rating: 4.7,
      sold: 3400,
    },
    {
      titleSuffix: 'Edisi Best Seller Garansi Tukar Baru',
      priceMultiplier: 0.88,
      discountPct: 26,
      isOfficial: true,
      shopPrefix: 'Top Mall Official',
      city: 'Jakarta Pusat',
      rating: 4.9,
      sold: 9500,
    },
    {
      titleSuffix: 'Hot Deals Diskon Tambahan Hari Ini',
      priceMultiplier: 0.84,
      discountPct: 36,
      isOfficial: false,
      shopPrefix: 'Katalog Murah ID',
      city: 'Surabaya',
      rating: 4.8,
      sold: 4100,
    },
  ],
  lazada: [
    {
      titleSuffix: 'LazMall 100% Authentic Brand Guarantee',
      priceMultiplier: 0.93,
      discountPct: 17,
      isOfficial: true,
      shopPrefix: 'LazMall Flagship Store',
      city: 'Jakarta Pusat',
      rating: 4.9,
      sold: 11200,
    },
    {
      titleSuffix: 'Free Shipping Max & Bonus Diskon',
      priceMultiplier: 0.89,
      discountPct: 25,
      isOfficial: false,
      shopPrefix: 'Top Seller Lazada Indo',
      city: 'Jakarta Utara',
      rating: 4.8,
      sold: 4700,
    },
    {
      titleSuffix: 'Produk Pilihan Garansi Uang Kembali',
      priceMultiplier: 0.97,
      discountPct: 11,
      isOfficial: true,
      shopPrefix: 'LazMall Certified Partner',
      city: 'Surabaya',
      rating: 4.9,
      sold: 3100,
    },
    {
      titleSuffix: 'Harga Terbaik Pengiriman Cepat 24 Jam',
      priceMultiplier: 0.91,
      discountPct: 21,
      isOfficial: false,
      shopPrefix: 'Distributor Laz Super',
      city: 'Bandung',
      rating: 4.7,
      sold: 2200,
    },
    {
      titleSuffix: 'Paket Spesial Diskon LazMall Choice',
      priceMultiplier: 0.94,
      discountPct: 15,
      isOfficial: true,
      shopPrefix: 'Lazada Authorized Store',
      city: 'Tangerang Selatan',
      rating: 4.8,
      sold: 6300,
    },
    {
      titleSuffix: 'Promo Eksklusif Tanggal Kembar',
      priceMultiplier: 0.86,
      discountPct: 34,
      isOfficial: false,
      shopPrefix: 'Bazar Online Murah',
      city: 'Jakarta Timur',
      rating: 4.8,
      sold: 1800,
    },
  ],
};

const MARKETPLACE_NAMES: Record<MarketplaceId, string> = {
  shopee: 'Shopee',
  tokopedia: 'Tokopedia',
  'tiktok-shop': 'TikTok Shop',
  lazada: 'Lazada',
};

const MARKETPLACE_BASE_URLS: Record<MarketplaceId, (keyword: string) => string> = {
  shopee: (q) => `https://shopee.co.id/search?keyword=${encodeURIComponent(q)}&utm_source=radar_affiliate`,
  tokopedia: (q) => `https://www.tokopedia.com/search?st=product&q=${encodeURIComponent(q)}&utm_source=radar_affiliate`,
  'tiktok-shop': (q) => `https://www.tiktok.com/search?q=${encodeURIComponent(q)}&utm_source=radar_affiliate`,
  lazada: (q) => `https://www.lazada.co.id/catalog/?q=${encodeURIComponent(q)}&utm_source=radar_affiliate`,
};

export function generateMarketplaceMockCatalog(
  marketplaceId: MarketplaceId,
  keyword: string
): MarketplaceProductOffer[] {
  const preset = resolveKeywordPreset(keyword);
  const variants = MARKETPLACE_VARIANTS[marketplaceId] || [];
  const marketplaceName = MARKETPLACE_NAMES[marketplaceId] || marketplaceId;
  const urlBuilder = MARKETPLACE_BASE_URLS[marketplaceId] || ((q) => `https://google.com/search?q=${encodeURIComponent(q)}`);

  return variants.map((variant, index) => {
    const rawCurrentPrice = Math.round(preset.basePrice * variant.priceMultiplier);
    // Round to nearest hundred Rupiah
    const currentPrice = Math.round(rawCurrentPrice / 100) * 100;
    const originalPrice = Math.round((currentPrice / (1 - variant.discountPct / 100)) / 100) * 100;
    const imageUrl = preset.imageUrls[index % preset.imageUrls.length];

    return {
      marketplaceId,
      marketplaceName,
      productId: `${marketplaceId}-${keyword.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${index + 1}`,
      title: `${keyword.trim()} ${variant.titleSuffix}`,
      originalPrice,
      currentPrice,
      discountPercentage: variant.discountPct,
      rating: variant.rating,
      totalSold: variant.sold,
      shopName: `${variant.shopPrefix} (${marketplaceName})`,
      shopCity: variant.city,
      isOfficialStore: variant.isOfficial,
      imageUrl,
      affiliateUrl: urlBuilder(keyword),
      isLowestPrice: false,
    };
  });
}
