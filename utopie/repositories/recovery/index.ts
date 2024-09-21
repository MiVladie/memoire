import { FindOneParams, CreateParams, RemoveParams } from './types';

import db from '@/config/db';

export function findOne(where: FindOneParams) {
	return db.recovery.findFirst({ where });
}

export function create(data: CreateParams) {
	return db.recovery.create({ data });
}

export function remove(where: RemoveParams) {
	return db.recovery.delete({ where });
}
