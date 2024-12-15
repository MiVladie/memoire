import React from 'react';

import classes from './Skeleton.module.scss';

interface Props {
	width?: number;
	height?: number;
	light?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const Skeleton: React.FC<Props> = ({ width, height, light, className, style }) => (
	<div
		className={[classes.Skeleton, light ? classes.SkeletonLight : '', className].join(' ')}
		style={{ width, height, ...style }}>
		<div className={classes.Indicator} style={style}>
			&zwnj;
		</div>
	</div>
);

export default Skeleton;
