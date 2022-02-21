import { store } from "../store/store.js";

const storage = {
	setLocalStorage(menu) {
		localStorage.setItem(menu, JSON.stringify(store[menu]))	;
	},
	getLocalStorage(menu) {
		return JSON.parse(localStorage.getItem(menu));
	},
};

export default storage;
