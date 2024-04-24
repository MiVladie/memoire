import React from 'react';

import { HeadFC, navigate } from 'gatsby';
import { PLATFORMS_DATA, PLAYLIST_DATA } from 'config/data';

import Layout from 'hoc/Layout/Layout';
import Platforms from 'containers/Platforms/Platforms';
import Songs from 'containers/Songs/Songs';
import Seo from 'hoc/Seo/Seo';

import Avatar from 'assets/icons/account.svg';

import * as classes from './Home.module.scss';

const Home = () => {
	function updateHandler(platformId: number, playlistId: number) {
		console.log({ platformId, playlistId });
	}

	function profileHandler() {
		navigate('/profile');
	}

	return (
		<Layout>
			<Platforms
				data={PLATFORMS_DATA}
				onUpdate={updateHandler}
				actions={<Avatar className={classes.Avatar} onClick={profileHandler} />}>
				<Songs data={PLAYLIST_DATA.songs} />
			</Platforms>
		</Layout>
	);
};

export default Home;

export const Head: HeadFC = () => <Seo>Home</Seo>;
