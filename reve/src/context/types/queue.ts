import { ISong } from 'interfaces/data';

export interface State {
	list: ISong[];
	currentId: number | null;
	playing: boolean;
}

export enum Action {
	SET_QUEUE = 'SET_QUEUE',
	UPDATE_QUEUE = 'UPDATE_QUEUE',
	DELETE_QUEUE = 'DELETE_QUEUE'
}
