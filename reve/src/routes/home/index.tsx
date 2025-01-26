import React, { useEffect, useMemo, useState } from 'react';

import { ACTIVE_PLAYLIST, PLATFORMS, PLAYLISTS, SONGS } from 'assets/data/sample';
import { useNavigation } from 'context/useNavigation';
import { useQueue } from 'context/useQueue';
import { ISong } from 'interfaces/data';
import { delay } from 'util/date';

import Menu from 'containers/Menu/Menu';
import Playlist from 'containers/Playlist/Playlist';
import Queue from 'containers/Queue/Queue';

import Equalizer from 'components/Equalizer/Equalizer';
import Seo from 'hoc/Seo/Seo';

import classes from './Home.module.scss';

const Home = () => {
	const [selectedPlatform, setSelectedPlatform] = useState<number>(1);
	const [selectedPlaylist, setSelectedPlaylist] = useState<number>(2);

	const [songs, setSongs] = useState<ISong[]>([]);

	const [loading, setLoading] = useState<boolean>(true);
	const [fetching, setFetching] = useState<boolean>(false);

	const {
		state: { menuVisible, queueVisible, queueActive },
		toggleMenu,
		activateQueue
	} = useNavigation();

	const { state, play, stop } = useQueue();

	const playlist = useMemo(() => {
		return PLAYLISTS.find((p) => p.id === selectedPlaylist)!;
	}, [selectedPlaylist]);

	useEffect(() => {
		fetchData();
	}, []);

	async function fetchData() {
		try {
			await delay(2);

			setSongs(SONGS);
		} catch (error: any) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	async function onFetchHandler() {
		setFetching(true);

		try {
			await delay(2);

			setSongs((prevState) => [...prevState, ...SONGS.map((s) => ({ ...s, id: Math.random() }))]);
		} catch (error: any) {
			console.log(error);
		} finally {
			setFetching(false);
		}
	}

	function onPlatformHandler(id: number) {
		setSelectedPlatform(id);

		toggleMenu();
	}

	function onPlaylistHandler(id: number) {
		setSelectedPlaylist(id);

		toggleMenu();
	}

	function onPlayHandler() {
		play({ playlistId: ACTIVE_PLAYLIST }); // TODO: playlistId

		activateQueue();
	}

	function onStopHandler() {
		stop();

		activateQueue(false);
	}

	return (
		<div
			className={[classes.Home, menuVisible ? classes.HomeMenu : '', queueActive ? classes.HomeQueue : ''].join(
				' '
			)}>
			<div className={classes.Menu}>
				<Menu data={PLATFORMS} onClick={onPlatformHandler} highlighted={selectedPlatform} loading={loading} />

				<Menu
					data={PLAYLISTS}
					onClick={onPlaylistHandler}
					highlighted={selectedPlaylist}
					active={ACTIVE_PLAYLIST}
					meta={<Equalizer />}
					loading={loading}
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
				onStop={onStopHandler}
				onScrollEnd={onFetchHandler}
				playing={selectedPlaylist === state.playlistId}
				songs={songs}
				className={classes.Playlist}
				loading={loading}
				fetching={fetching}
			/>

			<div className={classes.Queue}>
				<Queue visible={queueVisible} loading={loading} />
			</div>
		</div>
	);
};

export default Home;

export const Head = () => <Seo>Home</Seo>;
