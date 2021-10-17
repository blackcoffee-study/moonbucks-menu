export const addLocalStorage = (store) => (next) => (action) => {
	next(action);
	localStorage.setItem('storeState', JSON.stringify(store.getState()));
};
