import MenuList from "./components/MenuList.js";

const menuState = { menuCategory: "espresso", menuData: [] };

document.addEventListener("DOMContentLoaded", () => {
  MenuList(menuState.menuCategory, menuState.menuData);
});
