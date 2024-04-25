import React, { useMemo } from 'react';

import * as classes from './Circle.module.scss';

interface Props {
	pathname: string;
}

const Circle = ({ pathname }: Props) => {
	function includes(routes: string | string[], path: string) {
		return (typeof routes === 'string' ? [routes] : routes).some((p) => path.includes(p));
	}

	function getClasses(path: string) {
		if (includes(['signin', 'signup'], path)) return classes.Auth;
		if (includes('recover', path)) return classes.Recover;
		if (includes(['home', 'profile'], path)) return classes.Home;

		return '';
	}

	const className = useMemo(() => getClasses(pathname), [pathname]);

	return <div className={[classes.Circle, className].join(' ')} />;
};

export default Circle;
