import { FindOneParams, CreateParams, UpdateParams } from './types';

import db from '@/config/db';

export function findOne(where: FindOneParams) {
	return db.user.findFirst({ where });
}

export function create(data: CreateParams) {
	return db.user.create({ data: data });
}

export function update(id: number, data: UpdateParams) {
	return db.user.update({ where: { id }, data });
}
