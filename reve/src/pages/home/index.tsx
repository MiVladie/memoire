import React from 'react';

import { HeadFC } from 'gatsby';
import { PLATFORMS_DATA } from 'config/data';

import Layout from 'hoc/Layout/Layout';
import Platforms from 'containers/Platforms/Platforms';
import Seo from 'hoc/Seo/Seo';

import * as classes from './Home.module.scss';

const Home = () => {
	return (
		<Layout className={classes.Layout}>
			<Platforms data={PLATFORMS_DATA}>hello</Platforms>
		</Layout>
	);
};

export default Home;

export const Head: HeadFC = () => <Seo>Home</Seo>;
