import store from "../../reducer.js";
import { getStorage } from "../../store/localStorage.config.js";
import { UPDATE_CATEGORY } from "../constants.js";
import { categoryRender } from "./render.js";

export const updateCategory = ({ target }) => {
  const { dataset: { categoryName }, innerText } = target;

  const title = `${innerText} 메뉴 관리`;
  const menuList = getStorage(categoryName);

  store.dispatch({
    type: UPDATE_CATEGORY,
    data: { categoryName, menuList },
  });
  categoryRender(title, categoryName);
};
