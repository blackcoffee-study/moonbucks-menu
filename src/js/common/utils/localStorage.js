import store from "../../reducer.js";
import { setStorage } from "../../store/localStorage.config.js";

export const updateLocalStorage = () => {
  const { category, menuList  } = store.getState('');
  setStorage(category, menuList);
};
