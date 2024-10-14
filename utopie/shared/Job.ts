import { Queue, Worker, Job as BullJob } from 'bullmq';
import { connection } from '@/config/redis';
import { writeToFile } from '@/util/file';

export default abstract class Job<Payload, Jobs extends string> {
	protected queue: Queue<Payload, unknown, Jobs>;
	protected worker: Worker<Payload, unknown, Jobs>;

	constructor(queueName: string) {
		this.queue = new Queue<Payload, unknown, Jobs>(queueName, { connection });
		this.worker = new Worker<Payload, unknown, Jobs>(queueName, this.processJob, { connection });

		this.worker.on('completed', this.onCompleted);
		this.worker.on('failed', this.onFailed);

		this.handleShutdown();

		this.viewJobs(queueName);
	}

	protected abstract processJob(job: BullJob<Payload>): Promise<void>;

	private async viewJobs(queueName: string) {
		await this.queue.removeJobScheduler('POPULATE_PLAYLIST-8');
		await this.queue.removeJobScheduler('POPULATE_PLAYLIST-9');
		await this.queue.removeJobScheduler('POPULATE_PLAYLIST-10');
		await this.queue.removeJobScheduler('POPULATE_PLAYLIST-11');
		await this.queue.removeJobScheduler('POPULATE_PLAYLIST-12');
		await this.queue.removeJobScheduler('POPULATE_PLAYLIST-13');
		await this.queue.removeJobScheduler('POPULATE_PLAYLIST-14');
		await this.queue.removeJobScheduler('POPULATE_PLAYLIST-15');

		const jobs = await this.queue.getJobSchedulers();

		writeToFile(queueName, jobs);
	}

	private async onCompleted(job: BullJob<Payload, unknown, Jobs>) {
		await job.remove();
	}

	private onFailed(job: BullJob<Payload, unknown, Jobs> | undefined, error: Error) {
		writeToFile(`JOBS [FAILED]`, { jobId: job?.id, error });
	}

	private handleShutdown() {
		process.on('SIGTERM', async () => {
			await this.worker.close();

			process.exit(0);
		});
	}
}
