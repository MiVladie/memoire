import React, { CSSProperties, useEffect, useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { AuthStorage } from 'interfaces/storage';
import { AUTH_STORAGE_KEYS } from 'config/storage';
import { AUTH_ROUTES, HOME_ROUTES } from 'constants/route';
import { isPath } from 'utils/route';
import { delay } from 'utils/date';

import Storage from 'shared/Storage';

import classes from './Layout.module.scss';

import './reset.css';
import Circle from 'components/Circle/Circle';

interface Props {
	children: React.ReactNode;
	className?: string;
	style?: CSSProperties;
}

const Layout = ({ children, className, style }: Props) => {
	const [loading, setLoading] = useState<boolean>(true);

	const { pathname } = useLocation();

	const navigate = useNavigate();

	useEffect(() => {
		validateRoute();
	}, []);

	async function validateRoute() {
		const { user } = Storage.get<AuthStorage>(AUTH_STORAGE_KEYS);

		if (!user && !isPath(pathname, AUTH_ROUTES)) {
			navigate('/signin');
		}

		if (user && !isPath(pathname, HOME_ROUTES)) {
			navigate('/signin');
		}

		if (user && isPath(pathname, AUTH_ROUTES)) {
			navigate('/');
		}

		await delay(0.25);

		setLoading(false);
	}

	return (
		<main className={[classes.Layout, className].join(' ')} style={style}>
			<Circle pathname={pathname} />

			{!loading && children}
		</main>
	);
};

export default Layout;
