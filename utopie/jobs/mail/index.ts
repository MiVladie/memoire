import { Job } from 'bullmq';
import { QUEUE_NAME, JOBS, Jobs, Payload, SendPayload } from '@/jobs/mail/types';

import AbstractJob from '@/shared/Job';

import * as mailService from '@/services/mail';

export class Mail extends AbstractJob<Payload, Jobs> {
	constructor() {
		super(QUEUE_NAME);
	}

	public async send(payload: SendPayload): Promise<void> {
		await this.queue.add(JOBS.SEND, payload);
	}

	protected async processJob(job: Job<Payload, unknown, Jobs>) {
		switch (job.name) {
			case JOBS.SEND:
				await mailService.send(job.data as SendPayload);

				break;

			default:
				throw new Error('Unknown job name!');
		}
	}
}
