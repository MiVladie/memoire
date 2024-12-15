import React from 'react';

import classes from './Input.module.scss';

interface Props {
	icon?: React.ReactNode;
	name: string;
	placeholder?: string;
	value: string;
	onChange?: (value: string, name: any) => void;
	onBlur?: (name: any) => void;
	onFocus?: (name: any) => void;
	disabled?: boolean;
	autoComplete?: string | false;
	secure?: boolean;
	error?: string;
	dark?: boolean;
	className?: string;
}

const Input = ({
	icon,
	name,
	placeholder,
	value,
	onChange,
	onBlur,
	onFocus,
	disabled,
	autoComplete,
	secure,
	error,
	dark,
	className
}: Props) => (
	<div className={[classes.Input, className].join(' ')}>
		<div
			className={[
				classes.Wrapper,
				dark && classes.WrapperDark,
				disabled && classes.WrapperDisabled,
				error && classes.WrapperError
			].join(' ')}>
			{icon && <i className={classes.Icon}>{icon}</i>}

			<input
				name={name}
				placeholder={placeholder || 'Type something..'}
				type={!secure ? 'text' : 'password'}
				value={value}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value, name)}
				onBlur={() => onBlur?.(name)}
				onFocus={() => onFocus?.(name)}
				disabled={disabled}
				autoComplete={autoComplete === false ? 'new-password' : autoComplete}
			/>
		</div>

		{error && <p className={classes.Error}>{error}</p>}
	</div>
);

export default Input;
