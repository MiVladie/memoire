import React from 'react';

import { HeadFC } from 'gatsby';

import Layout from 'hoc/Layout/Layout';
import Seo from 'hoc/Seo/Seo';

import * as classes from './Styles.module.scss';

const NotFound = () => (
	<Layout className={classes.Wrapper}>
		<h1 className={classes.Title}>404</h1>
		<h2 className={classes.Description}>Page Not Found</h2>
	</Layout>
);

export default NotFound;

export const Head: HeadFC = () => <Seo>404</Seo>;
