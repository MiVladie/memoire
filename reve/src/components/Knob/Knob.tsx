import React from 'react';

import classes from './Knob.module.scss';

interface Props {
	icon: React.ReactNode;
	active?: boolean;
	highlighted?: boolean;
	onClick?: () => void;
	className?: string;
}

const Knob = ({ icon, active, highlighted, onClick, className }: Props) => {
	return (
		<div
			className={[
				classes.Knob,
				active === undefined || active ? classes.KnobActive : '',
				highlighted ? classes.KnobHighlighted : '',
				className
			].join(' ')}
			onClick={onClick}>
			{icon}
		</div>
	);
};

export default Knob;
