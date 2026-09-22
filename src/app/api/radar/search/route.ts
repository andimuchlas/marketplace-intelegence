import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { radarAggregator } from '@/domain/radar/radarAggregator';
import { rateLimiter, createRateLimitResponse, applyRateLimitHeaders } from '@/lib/security/rateLimiter';
import { recordSearchQuery, recordPriceSnapshots } from '@/db';

const SearchQuerySchema = z.object({
  q: z
    .string({ required_error: 'Query pencarian diperlukan' })
    .trim()
    .min(2, 'Kata kunci minimal 2 karakter')
    .max(100, 'Kata kunci maksimal 100 karakter'),
  skipCache: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
  // 1. Resolve client IP for Rate Limiting
  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

  // 2. Enforce Rate Limit (Max 20 requests per minute per IP)
  const rateLimit = await rateLimiter.check(clientIp, 'search');
  if (!rateLimit.allowed) {
    return createRateLimitResponse(rateLimit);
  }

  // 3. Validate query parameter
  const url = new URL(request.url);
  const rawQ = url.searchParams.get('q') || request.nextUrl?.searchParams?.get('q') || '';
  const rawSkipCache = url.searchParams.get('skipCache') === 'true';

  const validation = SearchQuerySchema.safeParse({
    q: rawQ,
    skipCache: rawSkipCache,
  });

  if (!validation.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'INVALID_QUERY',
        message: validation.error.errors[0]?.message || 'Query tidak valid',
      },
      { status: 400 }
    );
  }

  const { q, skipCache } = validation.data;

  try {
    // 4. Execute Radar aggregation (Checks Redis -> Adapters -> Normalizer)
    const result = await radarAggregator.search(q, skipCache);

    // 5. Fire-and-forget logging to Neon Database (non-blocking)
    recordSearchQuery(q);
    if (result.offers.length > 0) {
      recordPriceSnapshots(q, result.offers);
    }

    // 6. Build response with rate limit and cache headers
    const response = NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200 }
    );

    applyRateLimitHeaders(response.headers, rateLimit);
    // Cache control: CDN and browser can cache for 1 hour, stale-while-revalidate for 10 min
    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=600');

    return response;
  } catch (error) {
    console.error('[API /api/radar/search] Unhandled error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'SERVER_ERROR',
        message: 'Gagal memproses perbandingan harga. Silakan coba lagi.',
      },
      { status: 500 }
    );
  }
}
