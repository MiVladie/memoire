import React from 'react';

import Layout from 'hoc/Layout/Layout';

import * as classes from './Authentication.module.scss';

interface Props {
	name: string;
	description: string;
	children: React.ReactNode;
}

const Authentication = ({ name, description, children }: Props) => (
	<div className={classes.Authentication}>
		<div className={classes.Heading}>
			<h1 className={classes.Name}>{name}</h1>
			<h2 className={classes.Description}>{description}</h2>
		</div>

		{children}

		{React.Children.toArray(children).length === 1 && <div />}
	</div>
);

export default Authentication;
