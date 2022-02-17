import { INITIAL_CATEGORY } from "./constants/index.js";
import { Store } from './store/index.js';
import { $ } from './utils/dom.js';
import {
  isEmpty,
  getMenuTemplate,
  renderMenusByFunction,
  soldOutMenuInStore,
  editMenuInStore,
  removeMenuInStore,
  setLocalStorage,
  getLocalStorage,
} from "./utils/index.js";
let currentCategory = INITIAL_CATEGORY;
let menus;

window.onload = () => {
  setMenuUseLocalStorage();
  menuRender();
  preventSubmitInForm();
  setDocumentHandlers();
};

const setMenuUseLocalStorage = () => {
  if (!getLocalStorage("menus")) {
    setLocalStorage("menus", Store);
  }

  menus = getLocalStorage("menus");
}

const menuRender = () => {
  const $menuCount = $(".menu-count");
  const $menuList = $("#espresso-menu-list");

  $menuList.innerHTML = renderMenusByFunction(menus[currentCategory], getMenuTemplate);
  $menuCount.textContent = `총 ${menus[currentCategory].length}개`;
}

const preventSubmitInForm = () => {
  const $form = $("#espresso-menu-form");
  $form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
};

const setDocumentHandlers = () => { 
  formHandler();
  menuListHandler();
  categoryHeaderHandler();
}

const formHandler = () => {
  const $form = $("#espresso-menu-form");
  const addNewMenu = (event) => {
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
    menuRender();
  };
  $form.addEventListener("submit", addNewMenu, false);
};

const menuListHandler = () => {
  const $menuList = $("#espresso-menu-list");
  $menuList.addEventListener("click", (event) => {
    const { target } = event;
    const { parentNode } = target;
    const { menuId, menuName } = parentNode.dataset;
    const classList = target.classList;

    if (classList.contains("menu-sold-out-button")) {
      soldOutMenuInStore(menus, currentCategory, menuId);
      setLocalStorage("menus", menus);
      menuRender();
      return;
    }

    if (classList.contains("menu-edit-button")) {
      editMenuInStore(menus, currentCategory, menuId, menuName);
      setLocalStorage("menus", menus);
      menuRender();
      return;
    }

    if (classList.contains("menu-remove-button")) {
      removeMenuInStore(menus, currentCategory, menuId);
      setLocalStorage("menus", menus);
      menuRender();
      return;
    }

    return;
  });
}

const categoryHeaderHandler = () => {
  const categoryHeader = $("main > .wrapper > .heading >  h2");
  const navigationContainer = $("#espresso-menu-nav")
  navigationContainer.addEventListener("click", (event) => {
    const { target } = event;
    const { tagName } = target;
    if (tagName === "BUTTON") {
      const {
        dataset: { categoryName },
        innerText,
      } = target;
      currentCategory = categoryName;
      categoryHeader.textContent = `${innerText} 메뉴 관리`;

      menuRender();
    } 
  })
}