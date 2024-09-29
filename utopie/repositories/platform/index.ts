import { FindManyParams } from './types';

import db from '@/config/db';

export function findMany(where?: FindManyParams) {
	return db.platform.findMany({ where });
}
