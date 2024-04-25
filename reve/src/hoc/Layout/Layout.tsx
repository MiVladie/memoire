import React, { CSSProperties } from 'react';

import * as classes from './Layout.module.scss';

import './reset.css';

interface Props {
	children: React.ReactNode;
	className?: string;
	style?: CSSProperties;
}

const Layout = ({ children, className, style }: Props) => {
	return (
		<main className={[classes.Layout, className].join(' ')} style={style}>
			{children}
		</main>
	);
};

export default Layout;
