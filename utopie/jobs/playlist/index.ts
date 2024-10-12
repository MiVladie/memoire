import { Job } from 'bullmq';
import { QUEUE_NAME, JOBS, Jobs, Payload, PopulatePlaylistPayload, SCHEDULERS } from '@/jobs/playlist/types';
import { Jobs as JobsConfig } from '@/config/app';

import AbstractJob from '@/shared/Job';

import * as playlistService from '@/services/playlist';

export default class Playlist extends AbstractJob<Payload, Jobs> {
	constructor() {
		super(QUEUE_NAME);
	}

	public async populatePlaylist(payload: PopulatePlaylistPayload, once?: boolean): Promise<void> {
		if (once) {
			await this.queue.add(JOBS.POPULATE_PLAYLIST, payload);

			return;
		}

		await this.queue.upsertJobScheduler(
			`${SCHEDULERS.POPULATE_PLAYLIST}-${payload.playlistId}`,
			{ pattern: JobsConfig.POPULATE_PLAYLIST_REPETITION },
			{
				name: JOBS.POPULATE_PLAYLIST,
				data: payload
			}
		);
	}

	public async removePlaylist(payload: PopulatePlaylistPayload): Promise<void> {
		await this.queue.removeJobScheduler(`${SCHEDULERS.POPULATE_PLAYLIST}-${payload.playlistId}`);
	}

	protected async processJob(job: Job<Payload, unknown, Jobs>) {
		switch (job.name) {
			case JOBS.POPULATE_PLAYLIST:
				await playlistService.populatePlaylist(job.data as PopulatePlaylistPayload);

				break;

			default:
				throw new Error('Unknown job name!');
		}
	}
}
