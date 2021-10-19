
export default class LocalStorageMenu {
    constructor() {
    }

    init(initKey) {
        initKey.forEach(key => this.setMenu(key, []));
    }

    getMenu(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    setMenu(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
