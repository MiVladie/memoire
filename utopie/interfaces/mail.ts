export type Type = 'recovery';

export type Payload = {
	recovery: RecoveryPayload;
};

export interface TemplateMap {
	[key: string]: {
		file: Type;
		subject: string;
	};
}

interface RecoveryPayload {
	code: string;
}
