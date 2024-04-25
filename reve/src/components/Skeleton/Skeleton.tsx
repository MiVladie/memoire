import React from 'react';

import * as classes from './Skeleton.module.scss';

interface Props {
	className?: string;
	style?: React.CSSProperties;
	dark?: boolean;
}

const Skeleton: React.FC<Props> = ({ className, style }) => {
	return (
		<span className={classes.Skeleton}>
			<span className={[classes.Indicator, className].join(' ')} style={style}>
				&zwnj;
			</span>
		</span>
	);
};

export default Skeleton;
