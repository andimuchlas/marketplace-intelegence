import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/marketplace-calculator',
    '/shopee-profit-calculator',
    '/shopee-fee',
    '/tokopedia-profit-calculator',
    '/tokopedia-fee',
    '/tiktok-shop-profit-calculator',
    '/tiktok-shop-fee',
    '/lazada-profit-calculator',
    '/lazada-fee',
    '/compare',
    '/compare/shopee-vs-tokopedia',
    '/compare/shopee-vs-tiktok-shop',
    '/compare/tokopedia-vs-tiktok-shop',
  ];

  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: route === '' || route === '/marketplace-calculator' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.includes('calculator') ? 0.9 : 0.8,
  }));
}
