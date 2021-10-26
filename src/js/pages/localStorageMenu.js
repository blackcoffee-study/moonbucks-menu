
export default class LocalStorageMenu {

    getMenu(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    setMenu(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
