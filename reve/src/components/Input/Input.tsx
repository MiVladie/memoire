import React from 'react';

import classes from './Input.module.scss';

interface Props {
	icon?: React.ReactNode;
	className?: string;
	inputClassName?: string;
	name?: string;
	placeholder?: string;
	value: string;
	onChange?: (value: string, name: any) => void;
	onBlur?: (name: any) => void;
	onFocus?: (name: any) => void;
	secure?: boolean;
	autoComplete?: string | false;
	disabled?: boolean;
	error?: string;
}

const Input = ({
	icon,
	className,
	inputClassName,
	name,
	placeholder,
	value,
	onChange,
	onBlur,
	onFocus,
	secure,
	autoComplete,
	disabled,
	error
}: Props) => (
	<div className={[classes.Input, className].join(' ')}>
		<div className={classes.Holder}>
			{icon && <i className={classes.Icon}>{icon}</i>}

			<input
				autoComplete={autoComplete === false ? 'new-password' : autoComplete}
				type={!secure ? 'text' : 'password'}
				className={[
					classes.Text,
					classes.Wrapper,
					icon && classes.IconWrapper,
					disabled && classes.DisabledWrapper,
					!!error && classes.ErrorWrapper,
					inputClassName
				].join(' ')}
				placeholder={placeholder || 'Type something..'}
				value={value}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value, name)}
				onBlur={() => onBlur?.(name)}
				onFocus={() => onFocus?.(name)}
				disabled={disabled}
			/>
		</div>

		{error ? <p className={classes.Error}>{error}</p> : null}
	</div>
);

export default Input;
