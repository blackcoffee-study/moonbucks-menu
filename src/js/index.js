import registry from "./registry.js";
import applyDiff from "./applyDiff.js";
import menuList from "./components/menuList.js";
import menuCounter from "./components/counter.js";
import menuForm from "./components/form.js";
import categories from "./components/categories.js";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage.js";
import header from "./components/header.js";

registry.add("menu-list", menuList);
// registry.add("menu-count", menuCounter);
registry.add("menu-form", menuForm);
registry.add("categories", categories);
registry.add("header", header);

addEventListener("load", setLocalStorage("selectedCategoryId", "espresso"));

const state = {
  selectedCategoryId: getLocalStorage("selectedCategoryId"),
  categories: [
    { name: "☕ 에스프레소", id: "espresso", inputText: "에스프레소 메뉴 이름" },
    { name: "🥤 프라푸치노", id: "frappuccino", inputText: "프라푸치노 메뉴 이름" },
    { name: "🍹 블렌디드", id: "blended", inputText: "블렌디드 메뉴 이름" },
    { name: "🫖 티바나", id: "teavana", inputText: "티바나 메뉴 이름" },
    { name: "🍰 디저트", id: "desert", inputText: "디저트 메뉴 이름" },
  ],
  menuList: getLocalStorage("menuList") || [],
};

const events = {
  addMenu(menu) {
    state.menuList.push(menu);
    setLocalStorage("menuList", state.menuList);
    render();
  },
  setSoldout(id) {
    const target = state.menuList.find((menu) => menu.id === id);
    target.isSoldout = !target.isSoldout;
    setLocalStorage("menuList", state.menuList);
    render();
  },
  removeMenu(id) {
    state.menuList = state.menuList.filter((menu) => menu.id !== id);
    setLocalStorage("menuList", state.menuList);
    render();
  },
  renameMenu(id, name) {
    state.menuList = state.menuList.map((menu) => {
      if (menu.id === id) menu.name = name;
      return menu;
    });
    setLocalStorage("menuList", state.menuList);
    render();
  },
  selectCategory(categoryId) {
    state.selectedCategoryId = categoryId;
    render();
  },
};

const render = () => {
  // 페인트하기 전 수행
  requestAnimationFrame(() => {
    const $main = document.querySelector("#app");
    const $newMain = registry.renderRoot($main, state, events);

    $main.replaceWith($newMain);

    // applyDiff(document.body, $main, $newMain);
  });
};

render();
