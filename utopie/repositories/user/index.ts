import { FindOneParams, CreateParams } from './types';

import db from '@/config/db';

export function findOne(data: FindOneParams) {
	return db.user.findFirst({
		where: data
	});
}

export function create(data: CreateParams) {
	return db.user.create({
		data: data
	});
}
