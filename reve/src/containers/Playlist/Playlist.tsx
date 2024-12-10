import React from 'react';

import { ISong } from 'interfaces/data';
import { hexToRGBA } from 'util/style';
import { convertSecondsToFormat } from 'util/date';

import { ReactComponent as Play } from 'assets/icons/play.svg';
import { ReactComponent as Pause } from 'assets/icons/pause.svg';
import { ReactComponent as Note } from 'assets/icons/note.svg';
import { ReactComponent as Hide } from 'assets/icons/hide.svg';
import { ReactComponent as Clock } from 'assets/icons/clock.svg';
import { ReactComponent as Queue } from 'assets/icons/queue.svg';
import { ReactComponent as Url } from 'assets/icons/url.svg';

import Knob from 'components/Knob/Knob';

import classes from './Playlist.module.scss';

interface Props {
	name: string;
	icon: React.ReactNode;
	color: string;
	total: number;
	removed: number;
	date: Date;
	onPlay?: () => void;
	onQueue?: (id: number) => void;
	playing: boolean;
	songs: ISong[];
	className?: string;
}

const Playlist = ({ name, icon, color, total, removed, date, onPlay, onQueue, playing, songs, className }: Props) => {
	function linkHandler(url: string) {
		window.open(url, '_blank')!.focus();
	}

	return (
		<div className={[classes.Playlist, className].join(' ')}>
			<div
				className={classes.Header}
				style={{
					backgroundImage: `linear-gradient(
                    rgba(${hexToRGBA(color, 0.4).join(', ')}),
                    rgba(${hexToRGBA(color, 0.15).join(', ')}),
                    #121212
                )`
				}}>
				<h1 className={classes.Name}>{name}</h1>

				<div className={classes.Meta}>
					<Knob
						icon={!playing ? <Play /> : <Pause />}
						onClick={onPlay}
						size={48}
						className={classes.Play}
						fill
					/>

					<ul className={classes.Stats}>
						<li className={classes.Stat}>
							<Note className={classes.Icon} />

							<p className={classes.Value}>{total}</p>
							<p className={classes.Label}>songs</p>
						</li>

						<li className={classes.Stat}>
							<Hide className={classes.Icon} />

							<p className={classes.Value}>{removed}</p>
							<p className={classes.Label}>removed</p>
						</li>

						<li className={classes.Stat}>
							<Clock className={classes.Icon} />

							<p className={classes.Value}>
								{new Date(date).toLocaleTimeString('default', { timeStyle: 'short' })}
							</p>
						</li>
					</ul>
				</div>

				<i className={classes.Symbol}>{icon}</i>
			</div>

			<ul className={classes.Songs}>
				{songs.map((song) => (
					<li className={classes.Song} key={song.id}>
						<div className={classes.Wrapper}>
							<img src={song.image!} alt={song.name} className={classes.Image} />

							<div className={classes.Info}>
								<p className={[classes.Title, !song.is_present && classes.TitleMissing].join(' ')}>
									{song.name}
								</p>

								<p className={classes.Author}>{song.author}</p>
							</div>
						</div>

						<div className={classes.Extra}>
							<div className={classes.Actions}>
								<Knob
									icon={<Queue />}
									onClick={() => onQueue?.(song.id)}
									className={!song.is_present ? classes.QueueHidden : ''}
								/>

								<Knob icon={<Url />} onClick={() => linkHandler(song.url)} className={classes.Url} />
							</div>

							<p className={classes.Duration}>{convertSecondsToFormat(song.duration)}</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Playlist;
