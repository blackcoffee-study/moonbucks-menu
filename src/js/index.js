import MENU_CATEGORY from "../constant/menuCatogory.js";
import App from "./App.js";

new App({
  $root: document.querySelector("body"),
  initialState: {
    menuList: [],
    currentCategory: MENU_CATEGORY.espresso,
  },
});
