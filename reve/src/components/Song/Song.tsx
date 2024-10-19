import React from 'react';

import { convertSecondsToFormat } from 'utils/date';

import { ReactComponent as Url } from 'assets/icons/url.svg';

import classes from './Song.module.scss';

interface Props {
	className?: string;
	image: string;
	name: string;
	author: string;
	url: string;
	duration: number;
	is_present: boolean;
}

const Song = ({ className, image, name, author, url, duration, is_present }: Props) => {
	function openLink() {
		if (typeof window != undefined) {
			window.open(url, '_blank')!.focus();
		}
	}

	return (
		<li className={[classes.Song, className].join(' ')}>
			<div className={classes.Wrapper}>
				<img className={classes.Image} src={image} alt={name} />

				<div className={classes.Info}>
					<h2 className={[classes.Name, !is_present && classes.NameAbsent].join(' ')}>{name}</h2>
					<h3 className={classes.Author}>{author}</h3>
				</div>
			</div>

			<div className={classes.Link}>
				<Url onClick={openLink} />
			</div>

			<p className={classes.Duration}>{convertSecondsToFormat(duration)}</p>
		</li>
	);
};

export default Song;
