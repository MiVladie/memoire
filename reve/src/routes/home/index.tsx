import React, { useEffect, useState } from 'react';

import { Platform, Playlist, Song } from 'interfaces/models';
import { AuthStorage, PlatformStorage } from 'interfaces/storage';
import { AUTH_STORAGE_KEYS, PLATFORM_STORAGE_KEYS } from 'config/storage';
import { useNavigate } from 'react-router-dom';
import { isLinked } from 'utils/settings';
import { delay } from 'utils/date';

import Platforms from 'containers/Platforms/Platforms';
import Button from 'components/Button/Button';
import Songs from 'containers/Songs/Songs';
import Storage from 'shared/Storage';
import Seo from 'hoc/Seo/Seo';

import { ReactComponent as Avatar } from 'assets/icons/account.svg';

import * as API from 'apis';

import classes from './Home.module.scss';

const Home = () => {
	const [platforms, setPlatforms] = useState<Platform[]>([]);
	const [playlists, setPlaylists] = useState<Playlist[]>([]);
	const [songs, setSongs] = useState<Song[]>([]);

	const [playlist, setPlaylist] = useState<number>();
	const [hasMoreSongs, setHasMoreSongs] = useState<boolean>(false);

	const [loadingPlatforms, setLoadingPlatforms] = useState<boolean>(true);
	const [loadingPlaylists, setLoadingPlaylists] = useState<boolean>(true);
	const [loadingSongs, setLoadingSongs] = useState<boolean>(true);

	const [linked, setLinked] = useState<boolean>(true);

	const [error, setError] = useState<string>();

	const navigate = useNavigate();

	useEffect(() => {
		fetchData();
	}, []);

	async function fetchPlatforms() {
		const storage = Storage.get<PlatformStorage>(PLATFORM_STORAGE_KEYS);

		if (!storage.platforms) {
			const response = await API.Platform.retrieve();

			Storage.set<PlatformStorage>({ platforms: response.platforms });

			return response.platforms;
		}

		return storage.platforms;
	}

	async function fetchData() {
		const { user } = Storage.get<AuthStorage>(AUTH_STORAGE_KEYS);

		try {
			// @ts-ignore
			const platforms = await fetchPlatforms();

			if (!platforms || !platforms.length) {
				throw new Error('No platforms found!');
			}

			const { playlists } = await API.User.getPlaylists({ platformId: platforms[0].id });

			let songs: Song[] = [];

			if (playlists && playlists.length) {
				const result = await API.User.getPlaylistSongs(playlists[0].id);

				songs = result.songs;

				setPlaylist(playlists[0].id);
				setHasMoreSongs(songs.length > 0);
			}

			await delay(0.5);

			setLinked(isLinked(platforms[0].id, user!));

			setSongs(songs);
			setPlatforms(platforms);
			setPlaylists(playlists);
		} catch (error: any) {
			Storage.remove<AuthStorage>(AUTH_STORAGE_KEYS);
			Storage.remove<PlatformStorage>(PLATFORM_STORAGE_KEYS);

			navigate('/signin');
		} finally {
			setLoadingPlatforms(false);
			setLoadingPlaylists(false);
			setLoadingSongs(false);
		}
	}

	async function fetchSongs() {
		if (loadingSongs || !hasMoreSongs || playlist == undefined) {
			return;
		}

		setLoadingSongs(true);

		try {
			const data = await API.User.getPlaylistSongs(playlist, {
				cursor: songs[songs.length - 1].id
			});

			if (data.songs.length === 0) {
				setHasMoreSongs(false);
			}

			await delay(0.5);

			setSongs((prevState) => [...prevState, ...data.songs]);
		} catch (error: any) {
			console.error(error);
			setError('oh, something is off.. 🙁');
		} finally {
			setLoadingSongs(false);
		}
	}

	async function platformHandler(id: number) {
		setPlaylist(undefined);
		setPlaylists([]);
		setSongs([]);

		const { user } = Storage.get<AuthStorage>(AUTH_STORAGE_KEYS);

		if (!isLinked(id, user!)) {
			setLinked(false);

			return;
		}

		setLinked(true);

		setLoadingPlaylists(true);
		setLoadingSongs(true);

		try {
			const { playlists } = await API.User.getPlaylists({ platformId: id });

			setPlaylists(playlists);

			let songs: Song[] = [];

			if (playlists.length > 0) {
				const result = await API.User.getPlaylistSongs(playlists[0].id);

				songs = result.songs;

				setPlaylist(playlists[0].id);
				setHasMoreSongs(songs.length > 0);
			}

			await delay(0.5);

			setSongs(songs);
		} catch (error: any) {
			console.error(error);
			setError('oh, something is off.. 🙁');
		} finally {
			setLoadingPlaylists(false);
			setLoadingSongs(false);
		}
	}

	async function playlistHandler(id: number) {
		setLoadingSongs(true);

		setSongs([]);

		try {
			const { songs } = await API.User.getPlaylistSongs(id);

			await delay(0.5);

			setPlaylist(id);
			setSongs(songs);
			setHasMoreSongs(songs.length > 0);
		} catch (error: any) {
			console.error(error);
			setError('oh, something is off.. 🙁');
		} finally {
			setLoadingSongs(false);
		}
	}

	function profileHandler() {
		navigate('/profile');
	}

	return (
		<Platforms
			platforms={platforms}
			playlists={playlists}
			onPlatform={platformHandler}
			onPlaylist={playlistHandler}
			onScrollEnd={fetchSongs}
			actions={<Avatar className={classes.Avatar} onClick={profileHandler} />}
			loadingPlatforms={loadingPlatforms}
			loadingPlaylists={loadingPlaylists}>
			{!error ? (
				linked ? (
					<Songs data={songs} loading={loadingSongs} />
				) : (
					<div className={classes.Linking}>
						<p className={classes.Info}>seems like you haven't linked account yet..</p>

						<Button onClick={profileHandler} className={classes.Settings}>
							link now
						</Button>
					</div>
				)
			) : (
				<p className={classes.Error}>{error}</p>
			)}
		</Platforms>
	);
};

export default Home;

export const Head = () => <Seo>Home</Seo>;
