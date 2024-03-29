import React, { useState } from 'react';

import { HeadFC } from 'gatsby';
import { PLATFORMS_DATA } from 'config/data';

import Layout from 'hoc/Layout/Layout';
import Platforms from 'containers/Platforms/Platforms';
import SnapScroll from 'containers/SnapScroll/SnapScroll';
import Seo from 'hoc/Seo/Seo';

import * as classes from './Home.module.scss';

const OFFSET = 0;
const DATA = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

const VERTICAL = true;
const RTL = false;

const list = RTL ? DATA.reverse() : DATA;

const Home = () => {
	const [chosen, setChosen] = useState<number>(RTL ? list.length - 1 : 0);

	return (
		<Layout className={classes.Layout}>
			<Platforms data={PLATFORMS_DATA}>hello</Platforms>
		</Layout>
	);
};

export default Home;

export const Head: HeadFC = () => <Seo>Home</Seo>;
