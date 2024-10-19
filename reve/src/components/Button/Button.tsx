import React from 'react';

import Spinner from '../Spinner/Spinner';

import classes from './Button.module.scss';

interface Props {
	children: React.ReactNode;
	icon?: React.ReactNode;
	className?: string;
	iconClassName?: string;
	onClick?: () => void;
	loading?: boolean;
	disabled?: boolean;
	ghost?: boolean;
}

const Button = ({ children, icon, className, iconClassName, onClick, loading, disabled, ghost }: Props) => (
	<button
		className={[classes.Button, ghost && classes.Ghost, loading && classes.Loading, className].join(' ')}
		onClick={onClick}
		disabled={disabled || loading}>
		{icon && <i className={[classes.Icon, iconClassName].join(' ')}>{icon}</i>}
		{children}
		{loading && (
			<div className={classes.Spinner}>
				<Spinner size={14} />
			</div>
		)}
	</button>
);

export default Button;
