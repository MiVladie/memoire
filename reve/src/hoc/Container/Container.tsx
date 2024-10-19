import React, { forwardRef } from 'react';

import classes from './Container.module.scss';

interface Props {
	className?: string;
	children?: React.ReactNode;
}

const Container = forwardRef(({ className, children }: Props, ref) => {
	return (
		<div className={[classes.Container, className].join(' ')} ref={ref as any}>
			{children}
		</div>
	);
});

export default Container;
