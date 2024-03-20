import React, { useMemo } from 'react';

import { useLocation } from '@reach/router';

import * as classes from './Circle.module.scss';

const Circle = () => {
	const { pathname } = useLocation();

	function getClasses(path: string) {
		if (['signin', 'signup', 'recover'].some((p) => path.includes(p))) return classes.Auth;

		return '';
	}

	const className = useMemo(() => getClasses(pathname), [pathname]);

	return <div className={[classes.Circle, className].join(' ')} />;
};

export default Circle;
