const store = {
  setLocalStorage(menu) {
    localStorage.setItem('menu', JSON.stringify(menu));
  },
  getLocalStorage(menu) {
    return JSON.parse(localStorage.getItem(menu));
  },
};

export default store;
