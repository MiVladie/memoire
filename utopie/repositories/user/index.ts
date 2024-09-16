import { FindOneParams, CreateParams } from './types';

import db from '@/config/db';

const HIDDEN_FIELDS = {
	password: true,
	createdAt: true
};

export function findOne(data: FindOneParams, complete?: boolean) {
	return db.user.findFirst({
		omit: !complete ? HIDDEN_FIELDS : undefined,
		where: data
	});
}

export function create(data: CreateParams, complete?: boolean) {
	return db.user.create({
		omit: !complete ? HIDDEN_FIELDS : undefined,
		data: data
	});
}
