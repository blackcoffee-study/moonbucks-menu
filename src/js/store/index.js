import { LOCAL_STORAGE_KEY_MENU } from '../constants/index.js';

export const store = {
  setLocalStorage(menu) {
    localStorage.setItem(LOCAL_STORAGE_KEY_MENU, JSON.stringify(menu));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_MENU));
  },
};
