import MenuList from "./components/MenuList.js";

const state = { menuCategory: "espresso", menuData: [] };

document.addEventListener("DOMContentLoaded", () => {
  MenuList(state.menuCategory, state.menuData);
});
