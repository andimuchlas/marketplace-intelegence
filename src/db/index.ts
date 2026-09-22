import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { sql, desc } from 'drizzle-orm';
import * as schema from './schema';
import { MarketplaceProductOffer } from '@/domain/radar/types';

const databaseUrl = process.env.DATABASE_URL;

// Initialize Drizzle client if DATABASE_URL is present
export const db = databaseUrl ? drizzle(neon(databaseUrl), { schema }) : null;

/**
 * Record a search query asynchronously (fire-and-forget)
 */
export async function recordSearchQuery(query: string): Promise<void> {
  if (!db) return;
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return;

  try {
    await db
      .insert(schema.trendingSearches)
      .values({
        query: cleanQuery,
        searchCount: 1,
        lastSearchedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: schema.trendingSearches.query,
        set: {
          searchCount: sql`${schema.trendingSearches.searchCount} + 1`,
          lastSearchedAt: new Date(),
        },
      });
  } catch (err) {
    console.warn('[DB] Failed to record search query to Neon:', err);
  }
}

/**
 * Record historical price snapshots for price change intelligence
 */
export async function recordPriceSnapshots(
  query: string,
  offers: MarketplaceProductOffer[]
): Promise<void> {
  if (!db || offers.length === 0) return;

  try {
    const rows = offers.map((offer) => ({
      query: query.trim().toLowerCase(),
      marketplace: offer.marketplaceId,
      productId: offer.productId,
      productTitle: offer.title,
      price: offer.currentPrice,
      createdAt: new Date(),
    }));

    await db.insert(schema.priceSnapshots).values(rows);
  } catch (err) {
    console.warn('[DB] Failed to record price snapshots to Neon:', err);
  }
}

/**
 * Record an outbound affiliate click
 */
export async function recordAffiliateClick(
  marketplace: string,
  productId: string,
  query?: string,
  clientIpHash?: string
): Promise<void> {
  if (!db) return;

  try {
    await db.insert(schema.affiliateClicks).values({
      marketplace,
      productId,
      query: query?.trim().toLowerCase() || null,
      clientIpHash: clientIpHash || null,
      createdAt: new Date(),
    });
  } catch (err) {
    console.warn('[DB] Failed to record affiliate click to Neon:', err);
  }
}

/**
 * Get top trending searches for the consumer discovery pill
 */
export async function getTopTrendingSearches(limit = 8): Promise<string[]> {
  if (!db) return [];

  try {
    const rows = await db
      .select({ query: schema.trendingSearches.query })
      .from(schema.trendingSearches)
      .orderBy(desc(schema.trendingSearches.searchCount))
      .limit(limit);

    return rows.map((r) => r.query);
  } catch {
    return [];
  }
}
