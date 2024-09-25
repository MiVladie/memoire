import { PatchUpdateHandler, PatchPasswordHandler, PostImageHandler } from './types';

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

export const postImage: PostImageHandler = async (req, res, next) => {
	const {
		user: { id },
		file
	} = res.locals;

	const { user } = await userService.update(id, { image: file.filename });

	res.status(200).json({
		user,
		message: 'User image uploaded successfully!'
	});
};
