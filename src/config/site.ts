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
    { label: 'Radar Harga', href: '/' },
    { label: 'Portal Penjual', href: '/seller' },
    { label: 'Kalkulator', href: '/seller/kalkulator' },
    { label: 'Bandingkan', href: '/seller/komparasi-fee' },
    { label: 'Biaya Shopee', href: '/seller/biaya-admin/shopee' },
    { label: 'Biaya Tokopedia', href: '/seller/biaya-admin/tokopedia' },
    { label: 'Biaya TikTok', href: '/seller/biaya-admin/tiktok-shop' },
    { label: 'Biaya Lazada', href: '/seller/biaya-admin/lazada' },
  ],
  marketplaces: [
    { id: 'shopee', name: 'Shopee', color: '#EE4D2D', icon: 'shopping_bag' },
    { id: 'tokopedia', name: 'Tokopedia', color: '#03AC0E', icon: 'store' },
    { id: 'tiktok-shop', name: 'TikTok Shop', color: '#000000', icon: 'music_note' },
    { id: 'lazada', name: 'Lazada', color: '#0F146D', icon: 'diamond' },
  ],
};
