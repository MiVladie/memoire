import { PatchUpdateHandler } from './types';

import * as userService from '@/services/user';

export const patchUpdate: PatchUpdateHandler = async (req, res, next) => {
	const { user } = res.locals;

	await userService.update(user.id, req.body);

	res.status(200).json({
		message: 'User updated successfully!'
	});
};
