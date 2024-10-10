import IORedis from 'ioredis';

const HOST = process.env.REDIS_HOST!;
const PORT = parseInt(process.env.REDIS_PORT!);

export const connection = new IORedis(PORT, HOST, { maxRetriesPerRequest: null });
