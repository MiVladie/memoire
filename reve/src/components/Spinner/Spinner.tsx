import React from 'react';

import classes from './Spinner.module.scss';

interface Props {
	size?: number;
	className?: string;
}

const Spinner = ({ size = 80, className }: Props) => (
	<div className={className}>
		<div
			style={{ width: size, height: size, borderWidth: size! * 0.25 > 6 ? 6 : size! * 0.25 }}
			className={classes.Spinner}
		/>
	</div>
);

export default Spinner;
