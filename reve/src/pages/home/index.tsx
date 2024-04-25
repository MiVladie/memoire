import React, { useEffect, useState } from 'react';

import { HeadFC, navigate } from 'gatsby';
import { PLATFORMS_DATA, PLAYLIST_DATA } from 'config/data';
import { delay } from 'utils/date';

import Platforms from 'containers/Platforms/Platforms';
import Songs from 'containers/Songs/Songs';
import Seo from 'hoc/Seo/Seo';

import Avatar from 'assets/icons/account.svg';

import * as classes from './Home.module.scss';

const Home = () => {
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		fetchData();
	}, []);

	async function fetchData() {
		await delay(2);

		setLoading(false);
	}

	function updateHandler(platformId: number, playlistId: number) {
		console.log({ platformId, playlistId });
	}

	function profileHandler() {
		navigate('/profile');
	}

	return (
		<div>
			<Platforms
				data={PLATFORMS_DATA}
				onUpdate={updateHandler}
				actions={<Avatar className={classes.Avatar} onClick={profileHandler} />}
				loading={loading}>
				<Songs data={PLAYLIST_DATA.songs} loading={loading} />
			</Platforms>
		</div>
	);
};

export default Home;

export const Head: HeadFC = () => <Seo>Home</Seo>;
