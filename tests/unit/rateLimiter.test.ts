import { describe, it, expect, beforeEach } from 'vitest';
import { rateLimiter, createRateLimitResponse } from '@/lib/security/rateLimiter';

describe('RateLimiterService', () => {
  beforeEach(() => {
    rateLimiter.clearMemory();
  });

  it('allows requests within the configured quota limit', async () => {
    const ip = '192.168.1.1';
    const result1 = await rateLimiter.check(ip, 'search', { limit: 3, windowSeconds: 60 });

    expect(result1.allowed).toBe(true);
    expect(result1.limit).toBe(3);
    expect(result1.remaining).toBe(2);

    const result2 = await rateLimiter.check(ip, 'search', { limit: 3, windowSeconds: 60 });
    expect(result2.allowed).toBe(true);
    expect(result2.remaining).toBe(1);

    const result3 = await rateLimiter.check(ip, 'search', { limit: 3, windowSeconds: 60 });
    expect(result3.allowed).toBe(true);
    expect(result3.remaining).toBe(0);
  });

  it('blocks requests exceeding the quota limit with allowed = false', async () => {
    const ip = '192.168.1.2';
    // Consume 2 requests
    await rateLimiter.check(ip, 'search', { limit: 2, windowSeconds: 60 });
    await rateLimiter.check(ip, 'search', { limit: 2, windowSeconds: 60 });

    // 3rd request exceeds limit of 2
    const blocked = await rateLimiter.check(ip, 'search', { limit: 2, windowSeconds: 60 });

    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.resetSeconds).toBeGreaterThan(0);
  });

  it('isolates different client IPs and actions', async () => {
    const ipA = '10.0.0.1';
    const ipB = '10.0.0.2';

    // Consume all quota for ipA
    await rateLimiter.check(ipA, 'search', { limit: 1, windowSeconds: 60 });
    const blockedA = await rateLimiter.check(ipA, 'search', { limit: 1, windowSeconds: 60 });
    expect(blockedA.allowed).toBe(false);

    // ipB should still be allowed
    const allowedB = await rateLimiter.check(ipB, 'search', { limit: 1, windowSeconds: 60 });
    expect(allowedB.allowed).toBe(true);

    // ipA for 'click' action should still be allowed (different bucket)
    const allowedClick = await rateLimiter.check(ipA, 'click', { limit: 5, windowSeconds: 60 });
    expect(allowedClick.allowed).toBe(true);
  });

  it('generates a standard RFC 6585 HTTP 429 response', async () => {
    const rateLimitResult = {
      allowed: false,
      limit: 20,
      remaining: 0,
      resetSeconds: 42,
    };

    const res = createRateLimitResponse(rateLimitResult);
    expect(res.status).toBe(429);
    expect(res.headers.get('X-RateLimit-Limit')).toBe('20');
    expect(res.headers.get('X-RateLimit-Remaining')).toBe('0');
    expect(res.headers.get('X-RateLimit-Reset')).toBe('42');
    expect(res.headers.get('Retry-After')).toBe('42');

    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.error).toBe('TOO_MANY_REQUESTS');
    expect(body.retryAfter).toBe(42);
  });
});
