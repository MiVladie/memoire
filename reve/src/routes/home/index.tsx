import React, { useEffect, useMemo, useState } from 'react';

import { ACTIVE_PLAYLIST, PLATFORMS, PLAYLISTS, SONGS } from 'assets/data/sample';
import { useNavigation } from 'context/useNavigation';
import { useQueue } from 'context/useQueue';
import { IPlatform, IPlaylist, ISong } from 'interfaces/data';
import { themePlatform, themePlaylist } from 'util/visuals';
import { delay } from 'util/date';
import { clsx } from 'util/style';

import Menu from 'containers/Menu/Menu';
import Playlist from 'containers/Playlist/Playlist';
import Queue from 'containers/Queue/Queue';

import Equalizer from 'components/Equalizer/Equalizer';
import Seo from 'hoc/Seo/Seo';

import classes from './Home.module.scss';

const Home = () => {
	const [platforms, setPlatforms] = useState<IPlatform[]>();
	const [playlists, setPlaylists] = useState<IPlaylist[]>();

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

	const menuPlatforms = useMemo(() => {
		return platforms?.map((platform) => ({ ...platform, ...themePlatform(platform.id) })) || [];
	}, [platforms]);

	const menuPlaylists = useMemo(() => {
		return playlists?.map((playlist) => ({ ...playlist, ...themePlaylist(playlist.type) })) || [];
	}, [platforms]);

	const playlist = useMemo(() => {
		return playlists?.find((p) => p.id === selectedPlaylist);
	}, [playlists, selectedPlaylist]);

	useEffect(() => {
		fetchData();
	}, []);

	async function fetchData() {
		try {
			await delay(2);

			setPlatforms(PLATFORMS.map((platform) => ({ ...platform, ...themePlatform(platform.id) })));
			setPlaylists(PLAYLISTS.map((playlist) => ({ ...playlist, ...themePlaylist(playlist.type) })));

			setSelectedPlatform(1);
			setSelectedPlaylist(2);

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
		play({ playlistId: selectedPlaylist });

		activateQueue(true);
	}

	function onStopHandler() {
		stop();

		activateQueue(false);
	}

	return (
		<div className={clsx(classes.Home, { [classes.HomeMenu]: menuVisible, [classes.HomeQueue]: queueActive })}>
			<div className={classes.Menu}>
				<Menu
					data={menuPlatforms}
					onClick={onPlatformHandler}
					highlighted={selectedPlatform}
					loading={loading}
				/>

				<Menu
					data={menuPlaylists}
					onClick={onPlaylistHandler}
					highlighted={selectedPlaylist}
					active={state.playlistId!}
					meta={<Equalizer />}
					loading={loading}
				/>
			</div>

			<Playlist
				data={playlist}
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
