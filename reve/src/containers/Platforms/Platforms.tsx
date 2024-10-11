import React, { useEffect, useState } from 'react';

import { Platform, Playlist } from 'interfaces/models';

import Container from 'hoc/Container/Container';
import SnapScroll from 'containers/SnapScroll/SnapScroll';
import Skeleton from 'components/Skeleton/Skeleton';
import useScreen from 'hooks/useScreen';
import useScroll from 'hooks/useScroll';

import * as classes from './Platforms.module.scss';

const SKELETON_SIZE = 3;

interface Props {
	platforms: Platform[];
	playlists: Playlist[];
	onPlatform?: (id: number) => void;
	onPlaylist?: (id: number) => void;
	onScrollEnd?: () => void;
	className?: string;
	actions?: React.ReactNode;
	children: React.ReactNode;
	loadingPlatforms?: boolean;
	loadingPlaylists?: boolean;
}

const Platforms = ({
	platforms,
	playlists,
	onPlatform,
	onPlaylist,
	onScrollEnd,
	className,
	actions,
	children,
	loadingPlatforms,
	loadingPlaylists
}: Props) => {
	const [platformIndex, setPlatformIndex] = useState<number>(0);
	const [playlistIndex, setPlaylistIndex] = useState<number>(0);

	const { isDesktop } = useScreen();

	const { element, crossed } = useScroll({ offset: 250 });

	useEffect(() => {
		if (!onScrollEnd) {
			return;
		}

		onScrollEnd();
	}, [crossed]);

	function platformHandler(index: number) {
		if (index === platformIndex) return;

		setPlatformIndex(index);
		setPlaylistIndex(0);

		onPlatform?.(platforms[index].id);

		element.current!.scrollTop = 0;
	}

	function playlistHandler(index: number) {
		if (index === playlistIndex) return;

		setPlaylistIndex(index);

		onPlaylist?.(playlists[index].id);

		element.current!.scrollTop = 0;
	}

	return (
		<div className={[classes.Container, className].join(' ')}>
			<SnapScroll active={platformIndex} onSelect={platformHandler} className={classes.Platforms}>
				{!loadingPlatforms
					? platforms.map((platform, index) => {
							const isActive = platformIndex === index;

							return (
								<li className={classes.Platform} key={platform.id}>
									<p
										className={classes.Title}
										style={isActive ? { color: platforms[platformIndex].theme } : undefined}>
										{platform.name}
									</p>
								</li>
							);
					  })
					: new Array(SKELETON_SIZE).fill(null).map((_, i) => (
							<li className={classes.Platform} key={i}>
								<p className={classes.Title}>
									<Skeleton style={{ width: 250 }} />
								</p>
							</li>
					  ))}
			</SnapScroll>

			{actions && <div className={classes.Actions}>{actions}</div>}

			<div className={classes.HorizontalShade} />

			<SnapScroll
				active={playlistIndex}
				onSelect={playlistHandler}
				className={classes.Playlists}
				vertical={isDesktop}>
				{!loadingPlaylists
					? playlists.map((playlist, index) => {
							const isActive = playlistIndex === index;

							return (
								<li
									className={[classes.Playlist, isActive && classes.PlaylistSelected].join(' ')}
									key={playlist.id}>
									<p className={classes.Name}>{playlist.name}</p>
								</li>
							);
					  })
					: new Array(SKELETON_SIZE).fill(null).map((_, i) => (
							<li className={classes.Playlist} key={i}>
								<p className={classes.Name}>
									<Skeleton style={{ width: 100 }} />
								</p>
							</li>
					  ))}
			</SnapScroll>

			<div className={classes.VerticalShade} />

			{actions && <div className={classes.ActionsShade} />}

			<div className={classes.ListShade} />

			<Container className={classes.List} ref={element}>
				<div className={classes.Contents}>{children}</div>
			</Container>
		</div>
	);
};

export default Platforms;
