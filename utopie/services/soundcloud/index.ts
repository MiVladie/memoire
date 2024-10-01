import { GetUserParams, GetUserType } from '@/services/soundcloud/types';

import APIError, { Errors } from '@/shared/APIError';

import * as API from '@/api';

export async function findUser({ name }: GetUserParams): Promise<GetUserType> {
	const { collection } = await API.SoundCloud.search({ query: name });

	const rawUser = collection.find((item) => item.permalink === name && item.kind === 'user');

	if (!rawUser) {
		throw new APIError(Errors.NOT_FOUND, { message: 'No users found!' });
	}

	const user = await API.SoundCloud.getUser(rawUser.id);

	return { user };
}
