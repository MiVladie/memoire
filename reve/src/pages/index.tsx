import React, { useEffect } from 'react';

import { HeadFC, navigate } from 'gatsby';

import Layout from 'hoc/Layout/Layout';
import Seo from 'hoc/Seo/Seo';
import Spinner from 'components/Spinner/Spinner';

const Index: React.FC = () => {
	const isLoggedIn = false;

	useEffect(() => {
		if (!isLoggedIn) {
			navigate('/signin');

			return;
		}

		navigate('/home');
	}, []);

	return (
		<div style={style}>
			<Spinner />
		</div>
	);
};

export default Index;

export const Head: HeadFC = () => <Seo>Home</Seo>;

const style = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100vw',
	height: '100vh'
};
