import React, { useEffect, useMemo, useState } from 'react';

import { useNavigation } from 'context/useNavigation';
import { useQueue } from 'context/useQueue';
import { Platform, Playlist as IPlaylist, Song } from 'interfaces/models';
import { themePlatform, themePlaylist } from 'util/visuals';
import { clsx } from 'util/style';

import Menu from 'containers/Menu/Menu';
import Playlist from 'containers/Playlist/Playlist';
import Queue from 'containers/Queue/Queue';
import useScreen from 'hooks/useScreen';

import Equalizer from 'components/Equalizer/Equalizer';
import Seo from 'hoc/Seo/Seo';

import * as API from 'api';

import classes from './Home.module.scss';

const Home = () => {
	const [platforms, setPlatforms] = useState<Platform[]>();
	const [playlists, setPlaylists] = useState<IPlaylist[]>();
	const [songs, setSongs] = useState<Song[]>([]);

	const [selectedPlatform, setSelectedPlatform] = useState<number>(1);
	const [selectedPlaylist, setSelectedPlaylist] = useState<number>(2);

	const [endReached, setEndReached] = useState<boolean>(false);

	const [loadingPlatforms, setLoadingPlatforms] = useState<boolean>(true);
	const [loadingPlaylists, setLoadingPlaylists] = useState<boolean>(true);
	const [fetching, setFetching] = useState<boolean>(true);

	const {
		state: { menuVisible, queueActive },
		toggleMenu
	} = useNavigation();

	const { state } = useQueue();

	const { isDesktop } = useScreen();

	const menuPlatforms = useMemo(() => {
		return platforms?.map((platform) => ({ ...platform, ...themePlatform(platform.id) })) || [];
	}, [platforms]);

	const menuPlaylists = useMemo(() => {
		return playlists?.map((playlist) => ({ ...playlist, ...themePlaylist(playlist.type) })) || [];
	}, [playlists]);

	const playlist = useMemo(() => {
		return playlists?.find((p) => p.id === selectedPlaylist);
	}, [playlists, selectedPlaylist]);

	useEffect(() => {
		fetchData();
	}, []);

	async function fetchData() {
		try {
			const { platforms } = await API.Platform.retrieve();
			const { playlists } = await API.User.getPlaylists({ platformId: platforms[0].id });
			const { songs } = await API.User.getPlaylistSongs(playlists[0].id);

			setPlatforms(platforms.map((platform) => ({ ...platform, ...themePlatform(platform.id) })));
			setPlaylists(playlists.map((playlist) => ({ ...playlist, ...themePlaylist(playlist.type) })));
			setSongs(songs);

			setSelectedPlatform(platforms[0].id);
			setSelectedPlaylist(playlists[0].id);
		} catch (error: any) {
			console.log(error);
		} finally {
			setLoadingPlatforms(false);
			setLoadingPlaylists(false);
			setFetching(false);
		}
	}

	async function onFetchHandler() {
		setFetching(true);

		try {
			const { songs: newSongs } = await API.User.getPlaylistSongs(selectedPlaylist, {
				cursor: songs[songs.length - 1]?.id
			});

			if (newSongs.length === 0) {
				setEndReached(true);
			}

			setSongs((prevState) => [...prevState, ...newSongs]);
		} catch (error: any) {
			console.log(error);
		} finally {
			setFetching(false);
		}
	}

	async function onPlatformHandler(id: number) {
		setSelectedPlatform(id);
		setPlaylists([]);
		setSongs([]);

		setEndReached(false);

		setLoadingPlaylists(true);
		setFetching(true);

		toggleMenu();

		try {
			const { playlists } = await API.User.getPlaylists({ platformId: id });

			setPlaylists(playlists.map((playlist) => ({ ...playlist, ...themePlaylist(playlist.type) })));

			if (playlists.length) {
				const { songs } = await API.User.getPlaylistSongs(playlists[0].id);

				setSongs(songs);
			}
		} catch (error: any) {
			console.log(error);
		} finally {
			setLoadingPlaylists(false);
			setFetching(false);
		}
	}

	async function onPlaylistHandler(id: number) {
		setSelectedPlaylist(id);
		setSongs([]);

		setEndReached(false);

		setFetching(true);

		toggleMenu();

		try {
			const { songs } = await API.User.getPlaylistSongs(id);

			setSongs(songs);
		} catch (error: any) {
			console.log(error);
		} finally {
			setFetching(false);
		}
	}

	return (
		<div className={clsx(classes.Home, { [classes.HomeMenu]: menuVisible, [classes.HomeQueue]: queueActive })}>
			<div className={classes.Menu}>
				<Menu
					data={menuPlatforms}
					onClick={onPlatformHandler}
					highlighted={selectedPlatform}
					loading={loadingPlatforms}
				/>

				<Menu
					data={menuPlaylists}
					onClick={onPlaylistHandler}
					highlighted={selectedPlaylist}
					active={state.playlistId!}
					meta={<Equalizer />}
					loading={loadingPlaylists}
				/>
			</div>

			<Playlist
				data={playlist}
				onScrollEnd={onFetchHandler}
				songs={songs}
				endReached={endReached}
				loading={loadingPlaylists}
				fetching={fetching}
				className={classes.Playlist}
			/>

			{isDesktop && (
				<div className={classes.Queue}>
					<Queue loading={loadingPlaylists} />
				</div>
			)}
		</div>
	);
};

export default Home;

export const Head = () => <Seo>Home</Seo>;
