import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

interface ConstructMetadataProps {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article';
}

export function constructMetadata({
  title,
  description,
  path,
  keywords = [],
  image = siteConfig.ogImage,
  type = 'website',
}: ConstructMetadataProps): Metadata {
  const canonicalUrl = `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
  const fullTitle = `${title} | ${siteConfig.name}`;

  const defaultKeywords = [
    'kalkulator marketplace',
    'kalkulator profit shopee',
    'biaya admin tokopedia',
    'potongan tiktok shop',
    'komisi lazada',
    'hitung keuntungan jualan online',
    'break even harga jual',
    'margin bersih marketplace',
  ];

  return {
    title: fullTitle,
    description,
    keywords: [...keywords, ...defaultKeywords],
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: 'id_ID',
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@marketintel_id',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
