import React from 'react';

import classes from './Checkbox.module.scss';

interface Props {
	className?: string;
	name: string;
	value: boolean;
	onChange?: (value: boolean, name: any) => void;
	onBlur?: (name: any) => void;
	onFocus?: (name: any) => void;
	children?: string | React.ReactNode;
	disabled?: boolean;
	error?: string;
}

const Checkbox = ({ className, name, value, onChange, onBlur, onFocus, children, disabled, error }: Props) => (
	<>
		<div className={[classes.Wrapper, className].join(' ')}>
			<input
				id={name}
				className={classes.Checkbox}
				type='checkbox'
				value={+value}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.checked, name)}
				onBlur={() => onBlur?.(name)}
				onFocus={() => onFocus?.(name)}
				disabled={disabled}
			/>

			<label htmlFor={name}>{children}</label>
		</div>

		{error ? <p className={classes.Error}>{error}</p> : null}
	</>
);

export default Checkbox;
