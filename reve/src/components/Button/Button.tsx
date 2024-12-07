import React from 'react';

import Spinner from 'components/Spinner/Spinner';

import classes from './Button.module.scss';

interface Props {
	children: React.ReactNode;
	onClick?: () => void;
	loading?: boolean;
	disabled?: boolean;
	transparent?: boolean;
	className?: string;
}

const Button = ({ children, className, onClick, loading, disabled, transparent }: Props) => (
	<button
		className={[classes.Button, transparent && classes.ButtonTransparent, className].join(' ')}
		onClick={onClick}
		disabled={disabled || loading}>
		{!loading ? children : <Spinner size={14} className={classes.Spinner} />}
	</button>
);

export default Button;
