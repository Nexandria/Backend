import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { redisClient } from './redis.client';
import type Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  readonly client: Redis = redisClient;

  async onModuleInit() {
    // La conexión ya se inicia en redis.client.ts (lazyConnect: false)
    // Verificamos que esté disponible
    await this.client.ping();
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  // ── Helpers comunes ──────────────────────────────────────────────────────

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds) {
      await this.client.setex(key, ttlSeconds, value);
    } else {
      await this.client.set(key, value);
    }
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }

  async exists(key: string): Promise<boolean> {
    return (await this.client.exists(key)) === 1;
  }
}
