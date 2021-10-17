const INITIAL_MENUITEMS = {
  espresso: [],
  frappuccino: [],
  blended: [],
  teavana: [],
  desert: [],
};

const store = {
  menuItems: {},
  getLocalStorage() {
    this.menuItems =
      JSON.parse(localStorage.getItem('menuItems')) || INITIAL_MENUITEMS;
    return this.menuItems;
  },
  setLocalStorage(category, menuItems) {
    this.menuItems[category] = menuItems;
    localStorage.setItem('menuItems', JSON.stringify(this.menuItems));
  },
};

export default store;
