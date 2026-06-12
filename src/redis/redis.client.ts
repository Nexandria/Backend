import Redis from 'ioredis';

export const redisClient = new Redis(
  process.env.REDIS_URL ?? 'redis://localhost:6379',
  {
    lazyConnect: false,
    enableReadyCheck: true,
    maxRetriesPerRequest: 3,
  },
);

redisClient.on('connect', () => {
  console.log('[Redis] Conectado');
});

redisClient.on('ready', () => {
  console.log('[Redis] Listo');
});

redisClient.on('error', (err) => {
  console.error('[Redis] Error:', err.message);
});