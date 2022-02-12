import { INITIAL_CATEGORY } from "./constants.js";
import { Store } from './store.js';
import {
  isEmpty,
  getMenuTemplate,
  renderMenusByFunction,
  soldOutMenuInStore,
  editMenuInStore,
  removeMenuInStore,
  setLocalStorage,
  getLocalStorage,
} from "./utils.js";
let currentCategory = INITIAL_CATEGORY;
let menus;

window.onload = () => {
  setMenuUseLocalStorage();
  render();
  setEventListener();
};

const setMenuUseLocalStorage = () => {
  if (!getLocalStorage("menus")) {
    setLocalStorage("menus", Store);
  }

  menus = getLocalStorage("menus");
}

const render = () => {
  const $menuCount = document.querySelector(".menu-count");
  const $menuList = document.querySelector("#espresso-menu-list");

  $menuList.innerHTML = renderMenusByFunction(menus[currentCategory], getMenuTemplate);
  $menuCount.textContent = `총 ${menus[currentCategory].length}개`;
}

const setEventListener = () => {
  formHandler();
  menuListHandler();
  categoryHeaderHandler();
}


const formHandler = () => {
  const $form = document.querySelector("#espresso-menu-form");
  const addNewMenu = (event) => {
    event.preventDefault();
    const $input = event.target["espressoMenuName"];
    const { value: newMenu } = $input;
    const id = new Date().toISOString();

    if (isEmpty(newMenu)) {
      alert("값을 입력해주세요");
      return;
    }

    menus[currentCategory].push({ id, name: newMenu, status: "onSale" });
    $input.value = "";

    setLocalStorage("menus", menus);
    render();
  };
  $form.addEventListener("submit", addNewMenu, false);
};

const menuListHandler = () => {
  const $menuList = document.querySelector("#espresso-menu-list");
  $menuList.addEventListener("click", (event) => {
    const { target } = event;
    const { parentNode } = target;
    const { menuId, menuName } = parentNode.dataset;
    const classList = target.classList;

    if (classList.contains("menu-sold-out-button")) {
      soldOutMenuInStore(menus, currentCategory, menuId);
      setLocalStorage("menus", menus);
      render();
      return;
    }

    if (classList.contains("menu-edit-button")) {
      editMenuInStore(menus, currentCategory, menuId, menuName);
      setLocalStorage("menus", menus);
      render();
      return;
    }

    if (classList.contains("menu-remove-button")) {
      removeMenuInStore(menus, currentCategory, menuId);
      setLocalStorage("menus", menus);
      render();
      return;
    }

    return;
  });
}

const categoryHeaderHandler = () => {
  const categoryHeader = document.querySelector(
    "main > .wrapper > .heading >  h2"
  );
  const navButtons = document.querySelectorAll(".cafe-category-name");
  Array.prototype.forEach.call(navButtons, (button) => {
    button.addEventListener("click", (event) => {
      const { target } = event;
      const {
        dataset: { categoryName },
        innerText,
      } = target;
      currentCategory = categoryName;
      categoryHeader.textContent = `${innerText} 메뉴 관리`;

      render();
    });
  });
}