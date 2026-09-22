import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimiter, createRateLimitResponse } from '@/lib/security/rateLimiter';
import { recordAffiliateClick } from '@/db';

const ClickQuerySchema = z.object({
  marketplace: z.string().min(1),
  productId: z.string().min(1),
  q: z.string().optional(),
  targetUrl: z.string().url('URL tujuan tidak valid'),
});

export async function GET(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

  // Rate limit: 60 clicks per minute per IP
  const rateLimit = await rateLimiter.check(clientIp, 'click');
  if (!rateLimit.allowed) {
    return createRateLimitResponse(rateLimit);
  }

  const searchParams = request.nextUrl.searchParams;
  const validation = ClickQuerySchema.safeParse({
    marketplace: searchParams.get('marketplace'),
    productId: searchParams.get('productId'),
    q: searchParams.get('q') || undefined,
    targetUrl: searchParams.get('targetUrl'),
  });

  if (!validation.success) {
    return NextResponse.json(
      { success: false, error: 'INVALID_CLICK_PARAMETERS' },
      { status: 400 }
    );
  }

  const { marketplace, productId, q, targetUrl } = validation.data;

  // Fire-and-forget logging to Neon
  recordAffiliateClick(marketplace, productId, q);

  // Perform redirect with security and affiliate tracking attributes
  return NextResponse.redirect(targetUrl, 302);
}
