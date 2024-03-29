import React from 'react';

import * as classes from './Container.module.scss';

interface Props {
	className?: string;
	children?: React.ReactNode;
}

const Container = ({ className, children }: Props) => {
	return <div className={[classes.Container, className].join(' ')}>{children}</div>;
};

export default Container;
