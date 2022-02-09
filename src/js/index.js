import { INITIAL_CATEGORY } from "./constants.js";
import {
  getMenuTemplate,
  renderMenusByFunction,
  soldOutMenuInStore,
  editMenuInStore,
  removeMenuInStore,
  setLocalStorage,
  getLocalStorage,
} from "./utils.js";
let currentCategory = INITIAL_CATEGORY;

window.onload = () => {
  setMenuUseLocalStorage();
  render();
  setEventListener();
};

const setMenuUseLocalStorage = () => {
  if (getLocalStorage("menus")) {
    menus = getLocalStorage("menus");
  }
}

const render = () => {
  const $menuCount = document.getElementsByClassName("menu-count")[0];
  const $menuList = document.getElementById("espresso-menu-list");

  $menuList.innerHTML = renderMenusByFunction(Store[currentCategory], getMenuTemplate);
  $menuCount.innerHTML = `총 ${Store[currentCategory].length}개`;
} 

const setEventListener = () => {
  const $form = document.getElementById("espresso-menu-form");
  const addNewMenu = (event) => {
    event.preventDefault();
    const $input = event.target["espressoMenuName"];
    const newMenu = $input.value;
    if (newMenu === "") {
      alert("값을 입력해주세요");
      return;
    }
    menus[currentCategory].push({ name: newMenu, status: "onSale" });
    $input.value = "";

    setLocalStorage("menus", menus);
    render();
  };
  $form.addEventListener("submit", addNewMenu, false);

  
  const $menuList = document.getElementById("espresso-menu-list");
  $menuList.addEventListener("click", (event) => {
    const { target } = event;
    const { parentNode } = target;
    const { menuName } = parentNode.dataset;
    const classList = target.classList;

    if (classList.contains("menu-sold-out-button")) {
      soldOutMenuInStore(menus, currentCategory, menuName);
      setLocalStorage("menus", menus)
      render();
      return;
    }

    if (classList.contains("menu-edit-button")) {
      editMenuInStore(menus, currentCategory, menuName);
      setLocalStorage("menus", menus);
      render();
      return;
    }

    if (classList.contains("menu-remove-button")) {
      removeMenuInStore(menus, currentCategory, menuName);
      setLocalStorage("menus", menus);
      render();
      return;
    }
  });


  const categoryHeader = document.querySelectorAll("main > .wrapper > .heading >  h2")[0];
  const navButtons = document.getElementsByClassName("cafe-category-name");
  Array.prototype.forEach.call(navButtons, (button) => {
    button.addEventListener("click", (event) => {
      const { target } = event;
      const { dataset: { categoryName }, innerText } = target;
      currentCategory = categoryName;
      categoryHeader.innerText = `${innerText} 메뉴 관리`;

      render();
    });
  });
}
