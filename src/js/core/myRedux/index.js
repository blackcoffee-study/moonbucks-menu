import { getUUID } from '../../utils';

let currentState;
let listeners = new Map();

export const applyMiddleware = (store, middlewares) => {
	const copiedMiddlewares = middlewares.slice();
	const reversedCopiedMiddlewares = copiedMiddlewares.reverse();
	let dispatch = store.dispatch;
	reversedCopiedMiddlewares.forEach(
		(middleware) => (dispatch = middleware(store)(dispatch))
	);
	return Object.assign({}, store, { dispatch });
};

export const createStore = (reducer, initState) => {
	const self = this;
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
			listeners.forEach((fn) => {
				fn();
			});
			return action;
		},

		subscribe: (key, listener) => {
			listeners.set(key, listener);
			return () => {
				listeners.delete(key);
			};
		},
	};
};
