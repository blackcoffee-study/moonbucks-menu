import registry from "./registry.js";
import applyDiff from "./applyDiff.js";
import menuList from "./components/menuList.js";
import menuCounter from "./components/counter.js";
import menuForm from "./components/form.js";

registry.add("menu-list", menuList);
registry.add("menu-count", menuCounter);
registry.add("menu-form", menuForm);

const state = {
  menuList: [
    { id: 0, category: "coffee", name: "아메리카노" },
    { id: 1, category: "coffee", name: "콜드브루" },
  ],
};

const events = {
  addMenu(menu) {
    state.menuList.push(menu);
    render();
  },
  removeMenu(id) {
    state.menuList = state.menuList.filter((_, index) => String(index) !== id);
    render();
  },
  renameMenu(id, name) {
    state.menuList = state.menuList.map((menu, index) => {
      if (String(index) === id) menu.name = name;
      return menu;
    });
    render();
  },
};

const render = () => {
  // 페인트하기 전 수행
  requestAnimationFrame(() => {
    const $main = document.querySelector("#app");
    const $newMain = registry.renderRoot($main, state, events);

    applyDiff(document.body, $main, $newMain);
  });
};

render();
