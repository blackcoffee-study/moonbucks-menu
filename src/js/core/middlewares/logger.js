export const logger = (store) => (next) => (action) => {
	console.log('dipatching: ', action);
	next(action);
	console.log('next State: ', store.getState());
};
