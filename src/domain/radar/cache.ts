import Redis from 'ioredis';

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

class RadarCacheService {
  private redisClient: Redis | null = null;
  private isRedisAvailable = false;
  private memoryCache = new Map<string, CacheEntry<unknown>>();

  constructor() {
    this.initRedis();
  }

  private initRedis() {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    try {
      this.redisClient = new Redis(redisUrl, {
        connectTimeout: 2000,
        maxRetriesPerRequest: 1,
        retryStrategy: () => null, // Don't block with endless retries
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

      this.redisClient.on('connect', () => {
        this.isRedisAvailable = true;
      });
    } catch {
      this.isRedisAvailable = false;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    // 1. Try Redis
    if (this.isRedisAvailable && this.redisClient) {
      try {
        const raw = await this.redisClient.get(key);
        if (raw) {
          return JSON.parse(raw) as T;
        }
        return null;
      } catch {
        this.isRedisAvailable = false;
      }
    }

    // 2. In-Memory Fallback
    const entry = this.memoryCache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.memoryCache.delete(key);
      return null;
    }

    return entry.value as T;
  }

  async set<T>(key: string, value: T, ttlSeconds: number = 3600): Promise<void> {
    const serialized = JSON.stringify(value);

    // 1. Try Redis
    if (this.isRedisAvailable && this.redisClient) {
      try {
        await this.redisClient.set(key, serialized, 'EX', ttlSeconds);
        return;
      } catch {
        this.isRedisAvailable = false;
      }
    }

    // 2. In-Memory Fallback
    this.memoryCache.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  async del(key: string): Promise<void> {
    if (this.isRedisAvailable && this.redisClient) {
      try {
        await this.redisClient.del(key);
      } catch {
        this.isRedisAvailable = false;
      }
    }
    this.memoryCache.delete(key);
  }

  // Clear memory cache (useful for unit tests)
  clearMemory(): void {
    this.memoryCache.clear();
  }
}

export const radarCache = new RadarCacheService();
