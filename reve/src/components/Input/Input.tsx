import React from 'react';

import * as classes from './Input.module.scss';

interface Props {
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
		<input
			autoComplete={autoComplete === false ? 'new-password' : autoComplete}
			type={!secure ? 'text' : 'password'}
			className={[
				classes.Text,
				classes.Wrapper,
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

		{error ? <p className={classes.Error}>{error}</p> : null}
	</div>
);

export default Input;
