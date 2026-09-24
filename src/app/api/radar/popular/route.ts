import { NextResponse } from 'next/server';
import { getTopTrendingSearches } from '@/db';

const CURATED_TRENDING_POOL = [
  { query: 'iPhone 15 128GB', tag: 'Populer' },
  { query: 'Skintific 5X Ceramide', tag: 'Trending' },
  { query: 'Air Fryer Gaabor 4L', tag: 'Diskon' },
  { query: 'Sony WH-1000XM5', tag: 'Elektronik' },
  { query: 'Ventela Public Low', tag: 'Sepatu' },
  { query: 'TWS Baseus Bowie WM02', tag: 'Murah' },
  { query: 'Xiaomi Smart Band 8', tag: 'Gadget' },
  { query: 'SanDisk Ultra Dual 64GB', tag: 'Aksesoris' },
  { query: 'The Originote Hyalucera', tag: 'Skincare' },
  { query: 'Logitech Pebble M350', tag: 'Komputer' },
  { query: 'Wardah Matte Lip Cream', tag: 'Kecantikan' },
  { query: 'Aerostreet Massive Low', tag: 'Fashion' },
];

export async function GET() {
  try {
    // 1. Fetch real-time queries from database
    const dbQueries = await getTopTrendingSearches(10);

    // 2. Format database results
    const dynamicList = dbQueries.map((q, idx) => ({
      query: q,
      tag: idx === 0 ? 'Top #1' : idx < 3 ? 'Trending' : 'Populer',
    }));

    // 3. Merge with curated fallback so we always have a rich pool of keywords
    const existing = new Set(dynamicList.map((item) => item.query.toLowerCase()));
    for (const curated of CURATED_TRENDING_POOL) {
      if (!existing.has(curated.query.toLowerCase())) {
        dynamicList.push(curated);
        existing.add(curated.query.toLowerCase());
      }
    }

    return NextResponse.json(
      {
        success: true,
        queries: dynamicList,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch {
    return NextResponse.json(
      {
        success: true,
        queries: CURATED_TRENDING_POOL,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  }
}
