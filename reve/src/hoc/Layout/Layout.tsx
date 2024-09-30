import React, { CSSProperties, useEffect, useState } from 'react';

import { navigate } from 'gatsby';
import { AuthStorage } from 'interfaces/storage';
import { AUTH_STORAGE_KEYS } from 'config/storage';
import { AUTH_ROUTES, HOME_ROUTES } from 'constants/route';
import { isPath } from 'utils/route';
import { delay } from 'utils/date';

import Storage from 'shared/Storage';

import * as classes from './Layout.module.scss';

import './reset.css';

interface Props {
	children: React.ReactNode;
	path: string;
	className?: string;
	style?: CSSProperties;
}

const Layout = ({ children, className, style, path }: Props) => {
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		validateRoute();
	}, []);

	async function validateRoute() {
		const { user } = Storage.get<AuthStorage>(AUTH_STORAGE_KEYS);

		if (!user && !isPath(path, AUTH_ROUTES)) {
			navigate('/signin');
		}

		if (user && !isPath(path, HOME_ROUTES)) {
			navigate('/home');
		}

		await delay(0.25);

		setLoading(false);
	}

	return (
		<main className={[classes.Layout, className].join(' ')} style={style}>
			{!loading && children}
		</main>
	);
};

export default Layout;
