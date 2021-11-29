export const store = {
  setData(menu) {
    localStorage.setItem('menu', JSON.stringify(menu));
  },

  getData() {
    localStorage.getItem('menu');
  },
};
