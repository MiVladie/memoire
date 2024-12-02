import { Reducer } from 'react';

import { State, Action } from 'context/types/queue';
import { ISong } from 'interfaces/data';

import queue from 'context/initialstates/queue';

export type TAction =
	| { type: Action.SET_QUEUE; payload: { list: ISong[]; currentId: number; playing: boolean } }
	| { type: Action.UPDATE_QUEUE; payload: { list?: ISong[]; currentId?: number; playing?: boolean } }
	| { type: Action.DELETE_QUEUE };

const reducer: Reducer<any, TAction> = (state: State, action: TAction): State => {
	switch (action.type) {
		case Action.SET_QUEUE:
			return {
				list: action.payload.list,
				currentId: action.payload.currentId,
				playing: action.payload.playing
			};

		case Action.UPDATE_QUEUE:
			return {
				...state,
				...action.payload
			};

		case Action.DELETE_QUEUE:
			return {
				...queue
			};

		default:
			throw new Error('Could not identify the action! Please, check for misspellings');
	}
};

export default reducer;
