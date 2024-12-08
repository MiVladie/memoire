import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { AUTH_ROUTES, HOME_ROUTES } from 'constants/route';
import { useAuth } from 'context/useAuth';
import { isPath } from 'util/route';
import { delay } from 'util/date';

import Circle from 'components/Circle/Circle';
import Navbar from 'hoc/Navbar/Navbar';
import Playbar from 'hoc/Playbar/Playbar';

import classes from './Layout.module.scss';

import './reset.css';

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	const [loading, setLoading] = useState<boolean>(true);

	const { pathname } = useLocation();

	const navigate = useNavigate();

	const { state } = useAuth();

	useEffect(() => {
		validateRoute();
	}, []);

	async function validateRoute() {
		if (!state.user && !isPath(pathname, AUTH_ROUTES)) {
			navigate('/signin');
		}

		if (state.user && !isPath(pathname, HOME_ROUTES)) {
			navigate('/signin');
		}

		if (state.user && isPath(pathname, AUTH_ROUTES)) {
			navigate('/');
		}

		await delay(0.25);

		setLoading(false);
	}

	return (
		<div className={classes.Layout}>
			<Circle pathname={pathname} />

			<Navbar className={classes.Navbar} />

			<main className={classes.Main}>{!loading && children}</main>

			<Playbar />
		</div>
	);
};

export default Layout;
