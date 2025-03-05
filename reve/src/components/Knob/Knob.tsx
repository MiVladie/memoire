import React from 'react';

import classes from './Knob.module.scss';

interface Props {
	icon: React.ReactNode;
	fill?: boolean;
	active?: boolean;
	size?: number;
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
}

const DEFAULT_SIZE = 36;

const Knob = ({ icon, fill, active, size = DEFAULT_SIZE, onClick, disabled, className }: Props) => (
	<div
		className={[
			classes.Knob,
			fill && classes.KnobFill,
			active === undefined || active ? classes.KnobActive : '',
			className
		].join(' ')}
		style={{ minWidth: size, minHeight: size, maxWidth: size, maxHeight: size }}
		onClick={() => (!disabled ? onClick?.() : null)}>
		{icon}
	</div>
);

export default Knob;
