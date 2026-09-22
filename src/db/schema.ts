import { pgTable, serial, text, integer, timestamp, varchar } from 'drizzle-orm/pg-core';

export const trendingSearches = pgTable('trending_searches', {
  id: serial('id').primaryKey(),
  query: text('query').notNull().unique(),
  searchCount: integer('search_count').notNull().default(1),
  lastSearchedAt: timestamp('last_searched_at').defaultNow().notNull(),
});

export const priceSnapshots = pgTable('price_snapshots', {
  id: serial('id').primaryKey(),
  query: text('query').notNull(),
  marketplace: varchar('marketplace', { length: 50 }).notNull(),
  productId: text('product_id').notNull(),
  productTitle: text('product_title').notNull(),
  price: integer('price').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const affiliateClicks = pgTable('affiliate_clicks', {
  id: serial('id').primaryKey(),
  marketplace: varchar('marketplace', { length: 50 }).notNull(),
  productId: text('product_id').notNull(),
  query: text('query'),
  clientIpHash: text('client_ip_hash'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type TrendingSearch = typeof trendingSearches.$inferSelect;
export type PriceSnapshot = typeof priceSnapshots.$inferSelect;
export type AffiliateClick = typeof affiliateClicks.$inferSelect;
