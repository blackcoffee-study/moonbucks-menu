export const store = {
  setItem: menu => {
    localStorage.setItem('menu', JSON.stringify(menu));
  },
  getItem: () => {
    if (localStorage.getItem('menu')) return JSON.parse(localStorage.getItem('menu'));
  },
};
