export const siteConfig = {
  name: 'Marketplace Intelligence Indonesia',
  shortName: 'Kalkulator Margin',
  description:
    'Kalkulator profit, komisi admin, dan perbandingan margin bersih marketplace Indonesia (Shopee, Tokopedia, TikTok Shop, Lazada). Hitung keuntungan bersih dan break-even harga jual secara instan dan akurat.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://kalkulatormarketplace.id',
  ogImage: '/og-image.png',
  author: 'Marketplace Intelligence Team',
  disclaimer:
    'Situs ini merupakan alat utilitas independen untuk edukasi UMKM dan bukan bagian resmi dari Shopee, Tokopedia, TikTok, atau Lazada. Seluruh merek dagang dan hak cipta merupakan milik masing-masing perusahaan.',
  navItems: [
    { label: 'Kalkulator', href: '/marketplace-calculator' },
    { label: 'Bandingkan', href: '/compare' },
    { label: 'Biaya Shopee', href: '/shopee-fee' },
    { label: 'Biaya Tokopedia', href: '/tokopedia-fee' },
    { label: 'Biaya TikTok', href: '/tiktok-shop-fee' },
    { label: 'Biaya Lazada', href: '/lazada-fee' },
  ],
  marketplaces: [
    { id: 'shopee', name: 'Shopee', color: '#EE4D2D', icon: '🟠' },
    { id: 'tokopedia', name: 'Tokopedia', color: '#03AC0E', icon: '🟢' },
    { id: 'tiktok-shop', name: 'TikTok Shop', color: '#000000', icon: '⚫' },
    { id: 'lazada', name: 'Lazada', color: '#0F146D', icon: '🔵' },
  ],
};
