import { HOST, PORT } from '@/constants/redis';

import IORedis from 'ioredis';

export const connection = new IORedis(PORT, HOST, { maxRetriesPerRequest: null });
