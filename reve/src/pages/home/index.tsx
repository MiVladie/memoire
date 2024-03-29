import React from 'react';

import { HeadFC } from 'gatsby';
import { PLATFORMS_DATA, PLAYLIST_DATA } from 'config/data';

import Layout from 'hoc/Layout/Layout';
import Platforms from 'containers/Platforms/Platforms';
import Songs from 'containers/Songs/Songs';
import Seo from 'hoc/Seo/Seo';

const Home = () => {
	return (
		<Layout>
			<Platforms data={PLATFORMS_DATA}>
				<Songs data={PLAYLIST_DATA.songs} />
			</Platforms>
		</Layout>
	);
};

export default Home;

export const Head: HeadFC = () => <Seo>Home</Seo>;
