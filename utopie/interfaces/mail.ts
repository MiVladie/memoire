export type Type = 'recovery';

export type Payload = {
	recovery: RecoveryPayload;
};

export interface Template {
	file: Type;
	subject: string;
}

interface RecoveryPayload {
	code: string;
}
