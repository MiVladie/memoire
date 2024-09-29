import React, { useEffect, useState } from 'react';

import { HeadFC, navigate } from 'gatsby';
import { Platform, Playlist, Song } from 'interfaces/models';
import { PlatformStorage } from 'interfaces/storage';
import { PLATFORM_STORAGE_KEYS } from 'config/storage';

import Platforms from 'containers/Platforms/Platforms';
import Songs from 'containers/Songs/Songs';
import Storage from 'shared/Storage';
import Seo from 'hoc/Seo/Seo';

import Avatar from 'assets/icons/account.svg';

import * as API from 'api';

import * as classes from './Home.module.scss';
import { delay } from 'utils/date';

const Home = () => {
	const [platforms, setPlatforms] = useState<Platform[]>([]);
	const [playlists, setPlaylists] = useState<Playlist[]>([]);
	const [songs, setSongs] = useState<Song[]>([]);

	const [loadingPlatforms, setLoadingPlatforms] = useState<boolean>(true);
	const [loadingPlaylists, setLoadingPlaylists] = useState<boolean>(true);
	const [loadingSongs, setLoadingSongs] = useState<boolean>(true);

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
		try {
			const platforms = await fetchPlatforms();

			const { playlists } = await API.User.getPlaylists({ platformId: platforms[0].id });
			const { songs } = await API.User.getPlaylistSongs(playlists[0].id);

			await delay(2);

			setPlatforms(platforms);
			setPlaylists(playlists);
			setSongs(songs);
		} catch (error: any) {
			//
		} finally {
			setLoadingPlatforms(false);
			setLoadingPlaylists(false);
			setLoadingSongs(false);
		}
	}

	async function platformHandler(id: number) {
		setLoadingPlaylists(true);
		setLoadingSongs(true);

		setPlaylists([]);
		setSongs([]);

		try {
			const { playlists } = await API.User.getPlaylists({ platformId: id });

			setPlaylists(playlists);

			if (playlists.length > 0) {
				const { songs } = await API.User.getPlaylistSongs(playlists[0].id);
				setSongs(songs);
			}

			await delay(2);
		} catch (error: any) {
			console.log(error);
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

			await delay(2);

			setSongs(songs);
		} catch (error: any) {
			//
		} finally {
			setLoadingSongs(false);
		}
	}

	function profileHandler() {
		navigate('/profile');
	}

	return (
		<div>
			<Platforms
				platforms={platforms}
				playlists={playlists}
				onPlatform={platformHandler}
				onPlaylist={playlistHandler}
				actions={<Avatar className={classes.Avatar} onClick={profileHandler} />}
				loadingPlatforms={loadingPlatforms}
				loadingPlaylists={loadingPlaylists}>
				<Songs data={songs} loading={loadingSongs} />
			</Platforms>
		</div>
	);
};

export default Home;

export const Head: HeadFC = () => <Seo>Home</Seo>;
