import React, { useState } from 'react';

import { IPlatform } from 'interfaces/data';

import Container from 'hoc/Container/Container';
import SnapScroll from 'containers/SnapScroll/SnapScroll';
import useScreen from 'hooks/useScreen';

import * as classes from './Platforms.module.scss';

interface Props {
	data: IPlatform[];
	onUpdate?: (platformId: number, playlistId: number) => void;
	className?: string;
	actions?: React.ReactNode;
	children: React.ReactNode;
}

const Platforms = ({ data, onUpdate, className, actions, children }: Props) => {
	const [platform, setPlatform] = useState<number>(0);
	const [playlist, setPlaylist] = useState<number>(0);

	const { isDesktop } = useScreen();

	function platformHandler(index: number) {
		if (platform === index) return;

		setPlatform(index);
		setPlaylist(0);

		onUpdate?.(data[index].id, data[index].playlists[0].id);
	}

	function playlistHandler(index: number) {
		if (playlist === index) return;

		setPlaylist(index);

		onUpdate?.(data[platform].id, data[platform].playlists[index].id);
	}

	return (
		<div className={[classes.Container, className].join(' ')}>
			<SnapScroll active={platform} onSelect={platformHandler} className={classes.Platforms}>
				{data.map((p, index) => {
					const isActive = platform === index;

					return (
						<li className={classes.Platform} key={p.id}>
							<p className={classes.Title} style={isActive ? { color: p.theme_color } : undefined}>
								{p.name}
							</p>
						</li>
					);
				})}
			</SnapScroll>

			{actions && <div className={classes.Actions}>{actions}</div>}

			<div className={classes.HorizontalShade} />

			<SnapScroll active={playlist} onSelect={playlistHandler} className={classes.Playlists} vertical={isDesktop}>
				{data[platform].playlists.map((p, index) => {
					const isActive = playlist === index;

					return (
						<li className={[classes.Playlist, isActive && classes.PlaylistSelected].join(' ')} key={p.id}>
							<p className={classes.Name}>{p.name}</p>
						</li>
					);
				})}
			</SnapScroll>

			<div className={classes.VerticalShade} />

			{actions && <div className={classes.ActionsShade} />}

			<div className={classes.ListShade} />

			<Container className={classes.List}>
				<div className={classes.Contents}>{children}</div>
			</Container>
		</div>
	);
};

export default Platforms;
