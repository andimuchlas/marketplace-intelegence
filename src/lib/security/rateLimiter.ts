import { NextResponse } from 'next/server';
import Redis from 'ioredis';

interface RateLimitConfig {
  limit: number;
  windowSeconds: number;
}

interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

interface MemoryBucket {
  count: number;
  resetAt: number;
}

class RateLimiterService {
  private redisClient: Redis | null = null;
  private isRedisAvailable = false;
  private memoryBuckets = new Map<string, MemoryBucket>();

  constructor() {
    this.initRedis();
  }

  private initRedis() {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    try {
      this.redisClient = new Redis(redisUrl, {
        connectTimeout: 2000,
        maxRetriesPerRequest: 1,
        retryStrategy: () => null,
        lazyConnect: true,
      });

      this.redisClient
        .connect()
        .then(() => {
          this.isRedisAvailable = true;
        })
        .catch(() => {
          this.isRedisAvailable = false;
        });

      this.redisClient.on('error', () => {
        this.isRedisAvailable = false;
      });
    } catch {
      this.isRedisAvailable = false;
    }
  }

  async check(
    identifier: string,
    action: 'search' | 'click' = 'search',
    customConfig?: Partial<RateLimitConfig>
  ): Promise<RateLimitResult> {
    const limit =
      customConfig?.limit ??
      (action === 'search'
        ? Number(process.env.RADAR_SEARCH_RATE_LIMIT_PER_MINUTE) || 20
        : Number(process.env.RADAR_CLICK_RATE_LIMIT_PER_MINUTE) || 60);

    const windowSeconds = customConfig?.windowSeconds ?? 60;
    const key = `ratelimit:${action}:${identifier}`;

    // 1. Try Redis Atomic Rate Limiting
    if (this.isRedisAvailable && this.redisClient) {
      try {
        const count = await this.redisClient.incr(key);
        if (count === 1) {
          await this.redisClient.expire(key, windowSeconds);
        }
        const ttl = await this.redisClient.ttl(key);
        const resetSeconds = ttl > 0 ? ttl : windowSeconds;
        const remaining = Math.max(0, limit - count);

        return {
          allowed: count <= limit,
          limit,
          remaining,
          resetSeconds,
        };
      } catch {
        this.isRedisAvailable = false;
      }
    }

    // 2. In-Memory Fallback
    const now = Date.now();
    const bucket = this.memoryBuckets.get(key);

    if (!bucket || now >= bucket.resetAt) {
      this.memoryBuckets.set(key, {
        count: 1,
        resetAt: now + windowSeconds * 1000,
      });
      return {
        allowed: true,
        limit,
        remaining: limit - 1,
        resetSeconds: windowSeconds,
      };
    }

    bucket.count += 1;
    const remaining = Math.max(0, limit - bucket.count);
    const resetSeconds = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));

    return {
      allowed: bucket.count <= limit,
      limit,
      remaining,
      resetSeconds,
    };
  }

  // Clear memory state (useful for tests)
  clearMemory(): void {
    this.memoryBuckets.clear();
  }
}

export const rateLimiter = new RateLimiterService();

/**
 * Creates a standard HTTP 429 Too Many Requests response with RFC 6585 headers
 */
export function createRateLimitResponse(rateLimit: RateLimitResult): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: 'TOO_MANY_REQUESTS',
      message:
        'Terlalu banyak permintaan pencarian dalam waktu singkat. Silakan tunggu beberapa detik sebelum mencoba kembali.',
      retryAfter: rateLimit.resetSeconds,
    },
    {
      status: 429,
      headers: {
        'X-RateLimit-Limit': rateLimit.limit.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': rateLimit.resetSeconds.toString(),
        'Retry-After': rateLimit.resetSeconds.toString(),
      },
    }
  );
}

/**
 * Applies rate limit headers to a successful response
 */
export function applyRateLimitHeaders(headers: Headers, rateLimit: RateLimitResult): void {
  headers.set('X-RateLimit-Limit', rateLimit.limit.toString());
  headers.set('X-RateLimit-Remaining', rateLimit.remaining.toString());
  headers.set('X-RateLimit-Reset', rateLimit.resetSeconds.toString());
}
