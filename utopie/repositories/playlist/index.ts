import { FindManyParams } from './types';

import db from '@/config/db';

export function findMany(where?: FindManyParams) {
	return db.playlist.findMany({ where });
}
