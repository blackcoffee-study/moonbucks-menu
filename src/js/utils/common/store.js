export const store = {
  setData(menu) {
    localStorage.setItem('menu', JSON.stringify(menu));
  },

  getData() {
    return JSON.parse(localStorage.getItem('menu'));
  },
};
