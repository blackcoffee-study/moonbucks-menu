const storage = {
  storageCategory: 'menu',
  setLocalStorage(menu) {
    localStorage.setItem(this.storageCategory, JSON.stringify(menu));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem(this.storageCategory));
  },
};

export default storage;
