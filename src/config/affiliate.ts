import { MarketplaceId } from '@/domain/calculator/types';

export interface AffiliateProvider {
  id: string;
  name: string;
  marketplaceId?: MarketplaceId;
  targetType: 'seller-registration' | 'seller-center' | 'official-tools' | 'shipping-partner';
  baseUrl: string;
  trackingParamKey: string;
  label: string;
}

export const AFFILIATE_PROVIDERS: Record<string, AffiliateProvider> = {
  shopee_seller: {
    id: 'shopee_seller',
    name: 'Shopee Seller Center',
    marketplaceId: 'shopee',
    targetType: 'seller-registration',
    baseUrl: 'https://seller.shopee.co.id',
    trackingParamKey: 'aff_id',
    label: 'Daftar Toko Resmi Shopee',
  },
  tokopedia_seller: {
    id: 'tokopedia_seller',
    name: 'Tokopedia Seller Edu',
    marketplaceId: 'tokopedia',
    targetType: 'seller-registration',
    baseUrl: 'https://seller.tokopedia.com',
    trackingParamKey: 'ref',
    label: 'Buka Toko di Tokopedia',
  },
  tiktok_seller: {
    id: 'tiktok_seller',
    name: 'TikTok Shop Academy',
    marketplaceId: 'tiktok-shop',
    targetType: 'seller-registration',
    baseUrl: 'https://seller-id.tiktok.com',
    trackingParamKey: 'referral_code',
    label: 'Mulai Jualan di TikTok Shop',
  },
  lazada_seller: {
    id: 'lazada_seller',
    name: 'Lazada Seller Center',
    marketplaceId: 'lazada',
    targetType: 'seller-registration',
    baseUrl: 'https://sellercenter.lazada.co.id',
    trackingParamKey: 'partner_id',
    label: 'Daftar Akun Seller Lazada',
  },
};

export function resolveAffiliateUrl(providerKey: string): string {
  const provider = AFFILIATE_PROVIDERS[providerKey];
  if (!provider) return '#';

  const affiliateId = process.env.NEXT_PUBLIC_AFFILIATE_ID || 'partner_preview';
  const url = new URL(provider.baseUrl);
  url.searchParams.set(provider.trackingParamKey, affiliateId);
  url.searchParams.set('utm_source', 'marketplace_intelligence');
  url.searchParams.set('utm_medium', 'utility_calculator');

  return url.toString();
}
