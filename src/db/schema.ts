import { pgTable, serial, text, integer, timestamp, varchar, boolean } from 'drizzle-orm/pg-core';

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

export const promotions = pgTable('promotions', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  subtitle: text('subtitle'),
  badge: text('badge').notNull().default('Diskon Kilat'),
  marketplace: varchar('marketplace', { length: 50 }).notNull(), // 'shopee' | 'tokopedia' | 'tiktok-shop' | 'lazada' | 'all'
  type: varchar('type', { length: 30 }).notNull().default('product_spotlight'), // 'campaign_banner' | 'product_spotlight'
  imageUrl: text('image_url').notNull(),
  originalPrice: integer('original_price'),
  dealPrice: integer('deal_price'),
  discountPercent: integer('discount_percent'),
  targetUrl: text('target_url').notNull(),
  ctaText: text('cta_text').notNull().default('Cek Promo'),
  sortOrder: integer('sort_order').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type TrendingSearch = typeof trendingSearches.$inferSelect;
export type PriceSnapshot = typeof priceSnapshots.$inferSelect;
export type AffiliateClick = typeof affiliateClicks.$inferSelect;
export type Promotion = typeof promotions.$inferSelect;
export type NewPromotion = typeof promotions.$inferInsert;
