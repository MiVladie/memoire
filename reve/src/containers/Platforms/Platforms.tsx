import React, { useState } from 'react';

import { IPlatform } from 'interfaces/data';

import Container from 'hoc/Container/Container';
import SnapScroll from 'containers/SnapScroll/SnapScroll';
import useScreen from 'hooks/useScreen';

import * as classes from './Platforms.module.scss';

interface Props {
	data: IPlatform[];
	onPlatform?: (id: number) => void;
	onPlaylist?: (id: number) => void;
	className?: string;
	children: React.ReactNode;
}

const Platforms = ({ data, onPlatform, onPlaylist, className, children }: Props) => {
	const [platform, setPlatform] = useState<number>(0);
	const [playlist, setPlaylist] = useState<number>(0);

	const { isDesktop } = useScreen();

	function platformHandler(index: number) {
		if (platform === index) return;

		setPlatform(index);
		setPlaylist(0);

		onPlatform?.(data[index].id);
	}

	function playlistHandler(index: number) {
		if (playlist === index) return;

		setPlaylist(index);

		onPlaylist?.(data[platform].playlists[index].id);
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

			<Container className={classes.List}>{children}</Container>
		</div>
	);
};

export default Platforms;
