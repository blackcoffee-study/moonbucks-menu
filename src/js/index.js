import menuList from "../fixture/menuList.js";
import App from "./App.js";

new App({
  $root: document.querySelector("body"),
  initialState: {
    menuList,
  },
});
