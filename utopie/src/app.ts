import axios from 'axios';

import * as CONSTANTS from './config/constants';
import * as KEYS from './config/keys';

import * as fs from 'fs';

const writeJSONToFile = (path: string, data: object) => {
	fs.writeFile(path, JSON.stringify(data, null, 4), (error: any) => {
		if (error) {
			console.error(error);
		}
	});
};

async function init() {
	try {
		const { data } = await axios.get(
			CONSTANTS.SOUNDCLOUD_API +
				`/stream/users/175014000
					?client_id=${KEYS.SOUNDCLOUD_CLIENT_ID}
					&limit=20
					&offset=20`
		);

		const reposts = data.collection.map((repost: any) => ({
			id: repost?.track?.id || 'Unknown',
			uuid: repost?.uuid || 'Unknown',
			title: repost?.track?.title || 'Unknown',
			author: repost?.track?.user?.username || 'Unknown',
			url: repost?.track?.permalink_url || 'Unknown',
			created_at: repost?.created_at || 'Unknown'
		}));

		console.log({ reposts: reposts.length });

		writeJSONToFile('original.json', data.collection);
		writeJSONToFile('reposts.json', reposts);
	} catch (error: any) {
		console.log(error.response?.data || error);
	}
}

init();
