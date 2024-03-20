import React from 'react';

import * as classes from './Spinner.module.scss';

interface Props {
	size?: number;
}

const Spinner = ({ size }: Props) => (
	<div
		style={{ width: size, height: size, borderWidth: size! * 0.25 > 6 ? 6 : size! * 0.25 }}
		className={classes.Spinner}
	/>
);

Spinner.defaultProps = {
	size: 80
};

export default Spinner;
