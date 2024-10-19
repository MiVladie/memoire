import React from 'react';

import Seo from 'hoc/Seo/Seo';

import classes from './Styles.module.scss';

const NotFound = () => (
	<div className={classes.Wrapper}>
		<h1 className={classes.Title}>404</h1>
		<h2 className={classes.Description}>Page Not Found</h2>
	</div>
);

export default NotFound;

export const Head = () => <Seo>404</Seo>;
