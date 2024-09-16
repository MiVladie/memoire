import { User } from '@/interfaces/models';

import db from '@/config/db';

const HIDDEN_FIELDS = {
	password: true,
	createdAt: true
};

export function findOne(data: Partial<User>, complete?: boolean) {
	return db.user.findFirst({
		omit: !complete ? HIDDEN_FIELDS : undefined,
		where: data
	});
}
