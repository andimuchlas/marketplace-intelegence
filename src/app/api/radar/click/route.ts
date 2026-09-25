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

const PostBeaconSchema = z.object({
  marketplace: z.string().min(1),
  productId: z.string().min(1),
  query: z.string().optional(),
});

function isBotRequest(request: NextRequest): boolean {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  return /bot|crawler|spider|slurp|facebookexternalhit|headlesschrome|python|curl|wget|scanner|semrush|ahrefs|seobility|seoptimer|screaming/i.test(
    userAgent
  );
}

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

  // Filter out automated bot crawlers to protect DB and analytics integrity
  if (!isBotRequest(request)) {
    recordAffiliateClick(marketplace, productId, q);
  }

  // Perform redirect with security and affiliate tracking attributes + noindex tag
  const response = NextResponse.redirect(targetUrl, 302);
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const validation = PostBeaconSchema.safeParse(json);

    if (validation.success && !isBotRequest(request)) {
      const { marketplace, productId, query } = validation.data;
      recordAffiliateClick(marketplace, productId, query);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
