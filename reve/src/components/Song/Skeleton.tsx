import React from 'react';

import Skeleton from 'components/Skeleton/Skeleton';

import Url from 'assets/icons/url.svg';

import * as classes from './Song.module.scss';

interface Props {
	className?: string;
}

const SongSkeleton = ({ className }: Props) => (
	<li className={[classes.Song, className].join(' ')}>
		<div className={classes.Wrapper}>
			<Skeleton className={classes.Image} />

			<div className={classes.Info}>
				<h2 className={classes.Name}>
					<Skeleton style={{ width: '65%' }} />
				</h2>

				<h3 className={classes.Author}>
					<Skeleton style={{ width: '35%' }} />
				</h3>
			</div>
		</div>

		<div className={[classes.Link, classes.LinkDisabled].join(' ')}>
			<Url />
		</div>

		<p className={classes.Duration}>
			<Skeleton style={{ width: 65 }} />
		</p>
	</li>
);

export default SongSkeleton;
