const store = {
  setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  },
};

export default store;
