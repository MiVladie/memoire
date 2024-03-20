import React from 'react';

import Spinner from '../Spinner/Spinner';

import * as classes from './Button.module.scss';

interface Props {
	children: string;
	className?: string;
	onClick?: () => void;
	loading?: boolean;
	disabled?: boolean;
}

const Button = ({ children, className, onClick, loading, disabled }: Props) => (
	<button
		className={[classes.Button, loading && classes.Loading, className].join(' ')}
		onClick={onClick}
		disabled={disabled || loading}>
		{children}
		{loading && (
			<div className={classes.Spinner}>
				<Spinner size={14} />
			</div>
		)}
	</button>
);

export default Button;
