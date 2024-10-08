import { Queue, Worker, Job as BullJob } from 'bullmq';
import { connection } from '@/config/redis';

export default abstract class Job<Payload, Jobs extends string> {
	protected queue: Queue<Payload, unknown, Jobs>;
	protected worker: Worker<Payload, unknown, Jobs>;

	constructor(queueName: string) {
		this.queue = new Queue<Payload, unknown, Jobs>(queueName, { connection });
		this.worker = new Worker<Payload, unknown, Jobs>(queueName, this.processJob, { connection });

		this.worker.on('completed', this.onCompleted);
		this.worker.on('failed', this.onFailed);

		this.handleShutdown();
	}

	protected abstract processJob(job: BullJob<Payload>): Promise<void>;

	private async onCompleted(job: BullJob<Payload, unknown, Jobs>) {
		await job.remove();
	}

	private onFailed(job: BullJob<Payload, unknown, Jobs> | undefined, error: Error) {
		console.log('job failed: ' + job?.id);
		console.log(error);
	}

	private handleShutdown() {
		process.on('SIGTERM', async () => {
			await this.worker.close();

			process.exit(0);
		});
	}
}
