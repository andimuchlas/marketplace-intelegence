import { NextResponse } from 'next/server';
import { db } from '@/db';
import { promotions } from '@/db/schema';
import { eq, asc, desc } from 'drizzle-orm';
import { DEFAULT_PROMOTIONS, PromoSlide } from '@/config/promos';

export const revalidate = 60; // Cache revalidation in seconds

export async function GET() {
  try {
    if (db) {
      const activePromos = await db
        .select()
        .from(promotions)
        .where(eq(promotions.isActive, true))
        .orderBy(asc(promotions.sortOrder), desc(promotions.createdAt));

      if (activePromos.length > 0) {
        const formatted: PromoSlide[] = activePromos.map((p) => ({
          id: p.id,
          title: p.title,
          subtitle: p.subtitle,
          badge: p.badge,
          marketplace: p.marketplace as PromoSlide['marketplace'],
          type: p.type as PromoSlide['type'],
          imageUrl: p.imageUrl,
          originalPrice: p.originalPrice,
          dealPrice: p.dealPrice,
          discountPercent: p.discountPercent,
          targetUrl: p.targetUrl,
          ctaText: p.ctaText,
          sortOrder: p.sortOrder,
          isActive: p.isActive,
        }));

        return NextResponse.json({
          success: true,
          source: 'database',
          promotions: formatted,
        });
      }
    }

    // Fallback to static config if database is empty or uninitialized
    return NextResponse.json({
      success: true,
      source: 'static_fallback',
      promotions: DEFAULT_PROMOTIONS,
    });
  } catch (error) {
    console.error('Error fetching promotions from DB, using fallback:', error);
    return NextResponse.json({
      success: true,
      source: 'static_fallback_on_error',
      promotions: DEFAULT_PROMOTIONS,
    });
  }
}
