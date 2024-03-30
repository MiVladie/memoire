import React from 'react';

import { HeadFC, navigate } from 'gatsby';
import { PLATFORMS_DATA, PLAYLIST_DATA } from 'config/data';

import Layout from 'hoc/Layout/Layout';
import Platforms from 'containers/Platforms/Platforms';
import Account from 'components/Account/Account';
import Songs from 'containers/Songs/Songs';
import Seo from 'hoc/Seo/Seo';

import * as classes from './Home.module.scss';

const Home = () => {
	function accountHandler() {
		navigate('/account');
	}

	return (
		<Layout>
			<Platforms data={PLATFORMS_DATA} actions={<Account onClick={accountHandler} />}>
				<Songs data={PLAYLIST_DATA.songs} className={classes.Songs} />
			</Platforms>
		</Layout>
	);
};

export default Home;

export const Head: HeadFC = () => <Seo>Home</Seo>;
