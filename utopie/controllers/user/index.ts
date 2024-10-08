import {
	GetPlaylistsHandler,
	GetPlaylistSongsHandler,
	PatchUpdateHandler,
	PutSoundCloudHandler,
	PatchPasswordHandler,
	PostImageHandler,
	DeleteImageHandler,
	DeleteSoundCloudHandler
} from './types';

import * as userService from '@/services/user';
import * as playlistService from '@/services/playlist';

export const getPlaylists: GetPlaylistsHandler = async (req, res, next) => {
	const { user } = res.locals;
	const { platformId } = req.query;

	const { playlists } = await playlistService.get({ userId: user.id, platformId: parseInt(platformId) });

	res.status(200).json({
		playlists,
		message: 'Playlists retrieved successfully!'
	});
};

export const getPlaylistSongs: GetPlaylistSongsHandler = async (req, res, next) => {
	const { playlistId } = req.params;

	const { songs } = await playlistService.getSongs({ playlistId: parseInt(playlistId) });

	res.status(200).json({
		songs,
		message: 'Songs retrieved successfully!'
	});
};

export const putSoundCloud: PutSoundCloudHandler = async (req, res, next) => {
	const {
		user: { id }
	} = res.locals;

	const { soundcloudName } = req.body;

	const { user } = await userService.linkSoundCloud(id, { soundcloudName });

	res.status(200).json({
		user,
		message: 'User SoundCloud linked successfully!'
	});
};

export const patchUpdate: PatchUpdateHandler = async (req, res, next) => {
	const {
		user: { id }
	} = res.locals;

	const { user } = await userService.update(id, req.body);

	res.status(200).json({
		user,
		message: 'User updated successfully!'
	});
};

export const patchPassword: PatchPasswordHandler = async (req, res, next) => {
	const {
		user: { id }
	} = res.locals;

	const { password, newPassword } = req.body;

	await userService.updatePassword(id, { password, newPassword });

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

export const deleteImage: DeleteImageHandler = async (req, res, next) => {
	const {
		user: { id }
	} = res.locals;

	const { user } = await userService.deleteImage(id);

	res.status(200).json({
		user,
		message: 'User image deleted successfully!'
	});
};

export const deleteSoundCloud: DeleteSoundCloudHandler = async (req, res, next) => {
	const {
		user: { id }
	} = res.locals;

	const { user } = await userService.unlinkSoundCloud(id);

	res.status(200).json({
		user,
		message: 'User SoundCloud unlinked successfully!'
	});
};
