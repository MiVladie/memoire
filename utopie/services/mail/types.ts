export interface SendParams {
	recipient: string;
	subject: string;
	content: string;
}

export type SendType = void;

export interface SendRecoveryParams {
	recipient: string;
	code: string;
}

export type SendRecoveryType = void;
