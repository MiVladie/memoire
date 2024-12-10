import React, { useMemo, useState } from 'react';

import { ACTIVE_PLAYLIST, PLATFORMS, PLAYLISTS, SONGS } from 'assets/data/sample';
import { useNavigation } from 'context/useNavigation';
import { useQueue } from 'context/useQueue';

import Menu from 'containers/Menu/Menu';
import Playlist from 'containers/Playlist/Playlist';
import Equalizer from 'components/Equalizer/Equalizer';
import Seo from 'hoc/Seo/Seo';

import classes from './Home.module.scss';

const Home = () => {
	const [selectedPlatform, setSelectedPlatform] = useState<number>(1);
	const [selectedPlaylist, setSelectedPlaylist] = useState<number>(2);

	const {
		state: { menuVisible },
		toggle
	} = useNavigation();

	const { state, activate } = useQueue();

	function onPlatformHandler(id: number) {
		setSelectedPlatform(id);

		toggle();
	}

	function onPlaylistHandler(id: number) {
		setSelectedPlaylist(id);

		toggle();
	}

	function onPlayHandler() {
		activate();
	}

	const playlist = useMemo(() => PLAYLISTS.find((p) => p.id === selectedPlaylist)!, [selectedPlaylist]);

	return (
		<div
			className={[classes.Home, menuVisible ? classes.HomeMenu : '', state.active ? classes.HomeQueue : ''].join(
				' '
			)}>
			<div className={classes.Menu}>
				<Menu
					data={PLATFORMS}
					onClick={onPlatformHandler}
					highlighted={selectedPlatform}
					className={classes.Red}
				/>

				<Menu
					data={PLAYLISTS}
					onClick={onPlaylistHandler}
					highlighted={selectedPlaylist}
					active={ACTIVE_PLAYLIST}
					meta={<Equalizer />}
					className={classes.Blue}
				/>
			</div>

			<Playlist
				name={playlist.name}
				icon={playlist.icon}
				color={playlist.color || '#FEC9A7'}
				total={1284}
				removed={24}
				date={new Date()}
				onPlay={onPlayHandler}
				playing={false}
				songs={SONGS}
				className={classes.Playlist}
			/>

			<div className={classes.Queue}>Queue</div>
		</div>
	);
};

export default Home;

export const Head = () => <Seo>Home</Seo>;
