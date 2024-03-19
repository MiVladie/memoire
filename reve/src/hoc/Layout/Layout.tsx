import React from 'react';

import * as classes from './Layout.module.scss';

import './reset.css';

interface Props {
	children: React.ReactNode;
	className?: string;
}

const Layout = ({ children, className }: Props) => (
	<main className={[classes.Layout, className].join(' ')}>{children}</main>
);

export default Layout;
