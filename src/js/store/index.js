export const store = {
	setLocalStorage(menu) {
		localStorage.setItem("menu", JSON.stringify(menu));
	},
	getLocalStorage() {
		return JSON.parse(localStorage.getItem("menu"));
	}
}