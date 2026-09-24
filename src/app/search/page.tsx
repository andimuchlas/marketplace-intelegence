import type { Metadata } from 'next';
import Link from 'next/link';
import { GoogleIcon } from '@/components/ui/Icon';
import { radarAggregator } from '@/domain/radar/radarAggregator';
import { SearchCatalogContainer } from '@/components/search/SearchCatalogContainer';
import { AdSlot } from '@/components/ads/AdSlot';

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = (searchParams.q || '').trim() || 'Katalog Produk';
  return {
    title: `Cari & Bandingkan Harga "${query}" Termurah | MarketplaceIntel`,
    description: `Bandingkan harga "${query}" secara live di Shopee, Tokopedia, TikTok Shop, dan Lazada. Dapatkan penawaran terbaik dan hemat belanja online seketika.`,
    alternates: {
      canonical: `https://kalkulatormarketplace.id/search?q=${encodeURIComponent(query)}`,
    },
    openGraph: {
      title: `Harga "${query}" Termurah di Marketplace Indonesia`,
      description: `Bandingkan penawaran "${query}" di Shopee, Tokopedia, TikTok Shop, dan Lazada. Cek selisih harga dan hemat sekarang.`,
      url: `https://kalkulatormarketplace.id/search?q=${encodeURIComponent(query)}`,
      type: 'website',
    },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = (searchParams.q || '').trim() || 'iPhone 15 128GB';
  const result = await radarAggregator.search(query);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Hasil Pencarian Radar Harga untuk ${query}`,
    itemListElement: result.offers.map((offer, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: offer.title,
        image: offer.imageUrl,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'IDR',
          price: offer.currentPrice,
          seller: {
            '@type': 'Organization',
            name: offer.shopName,
          },
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-canvas min-h-screen py-5 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs Navigation */}
          <nav className="mb-4 flex items-center gap-1.5 text-xs text-stone-500">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-stone-600 transition-colors hover:text-stone-900"
            >
              <GoogleIcon name="home" size={15} />
              <span>Beranda</span>
            </Link>
            <GoogleIcon name="chevron_right" size={14} className="text-stone-400" />
            <span className="text-stone-500">Katalog Radar</span>
            <GoogleIcon name="chevron_right" size={14} className="text-stone-400" />
            <span className="font-semibold text-stone-900 truncate max-w-xs">
              &quot;{query}&quot;
            </span>
          </nav>

          {/* Ad Slot Top */}
          <div className="mb-5 flex justify-center">
            <AdSlot position="top" />
          </div>

          {/* Interactive Catalog Container */}
          <SearchCatalogContainer
            initialResult={result}
            initialQuery={query}
          />

          {/* Ad Slot Bottom */}
          <div className="mt-12 flex justify-center">
            <AdSlot position="in-content" />
          </div>
        </div>
      </div>
    </>
  );
}
