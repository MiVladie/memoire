import { PatchUpdateHandler, PatchPasswordHandler } from './types';

import * as userService from '@/services/user';

export const patchUpdate: PatchUpdateHandler = async (req, res, next) => {
	const { user } = res.locals;

	await userService.update(user.id, req.body);

	res.status(200).json({
		message: 'User updated successfully!'
	});
};

export const patchPassword: PatchPasswordHandler = async (req, res, next) => {
	const { user } = res.locals;
	const { password, newPassword } = req.body;

	await userService.updatePassword(user.id, { password, newPassword });

	res.status(200).json({
		message: 'User password updated successfully!'
	});
};
