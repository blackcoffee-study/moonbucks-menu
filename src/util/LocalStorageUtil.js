class LocalStorageUtil {
    static KEY = 'MOONBUCKS_MENU';

    static store(value) {
        window.localStorage.setItem(LocalStorageUtil.KEY, value);
    }

    static load() {
        return window.localStorage.getItem(LocalStorageUtil.KEY);
    }
}