import { getUUID } from '../../utils';

let currentState;
let listeners = new Map();

export const createStore = (reducer, initState) => {
	currentState = initState;
	return {
		reset: () => {
			currentState = initState;
			listeners = new Map();
		},
		getState: () => {
			return currentState;
		},
		dispatch: (action) => {
			currentState = reducer(currentState, action);
			listeners.forEach((fn) => fn());
		},

		subscribe: (listener) => {
			const id = getUUID();
			listeners.set(id, listener);
			return () => {
				listeners.delete(id);
			};
		},
	};
};
