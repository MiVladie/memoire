import { Job } from 'bullmq';
import { QUEUE_NAME, JOBS, Jobs, Payload, AddSoundCloudPlaylistPayload } from '@/jobs/playlist/types';

import AbstractJob from '@/shared/Job';

import * as playlistService from '@/services/playlist';

export default class Playlist extends AbstractJob<Payload, Jobs> {
	constructor() {
		super(QUEUE_NAME);
	}

	public async addSoundCloudPlaylist(payload: AddSoundCloudPlaylistPayload): Promise<void> {
		await this.queue.add(JOBS.ADD_SOUNDCLOUD_PLAYLIST, payload);
	}

	protected async processJob(job: Job<Payload, unknown, Jobs>) {
		switch (job.name) {
			case JOBS.ADD_SOUNDCLOUD_PLAYLIST:
				await playlistService.addSoundCloudPlaylist(job.data as AddSoundCloudPlaylistPayload);

				break;

			default:
				throw new Error('Unknown job name!');
		}
	}
}
