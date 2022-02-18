const store = {
    setStorage(menu) {
        localStorage.setItem('menu', JSON.stringify(menu));
    },
    getStorage() {
        const menu = localStorage.getItem('menu');

        if(menu) {
            return JSON.parse(menu);
        }
    }
}

export default store;
