import api from '../lib/api.js';

const INITIAL_MENUITEMS = {
  espresso: [],
  frappuccino: [],
  blended: [],
  teavana: [],
  desert: [],
};

const store = {
  menuItems: {},

  async fetchMenuItems(category) {
    this.menuItems = await api.GET_MENULIST(category);
    return this.menuItems;
  },
};

export default store;
