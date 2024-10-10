export const QUEUE_NAME = 'MAIL';

export const JOBS = {
	SEND: 'SEND'
};

export interface SendPayload {
	recipient: string;
	subject: string;
	content: string;
}

export type Payload = SendPayload;

export type Jobs = (typeof JOBS)[keyof typeof JOBS];
