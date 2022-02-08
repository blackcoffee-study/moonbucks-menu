import { Store } from "./store.js";
import {
  getMenuTemplate,
  renderMenusByFunction,
  editMenuInStore,
  removeMenuInStore,
} from "./utils.js";
let currentCategory = "espresso"
const $menuList = document.getElementById("espresso-menu-list");

window.onload = () => {
  render();
  setEventListener();
};

const render = () => {
  const $menuCount = document.getElementsByClassName("menu-count")[0];
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
    Store[currentCategory].push(newMenu);
    $input.value = "";

    render();
  };
  $form.addEventListener("submit", addNewMenu, false);


  $menuList.addEventListener("click", (event) => {
    const { target } = event;
    const { parentNode } = target;
    const { menuName } = parentNode.dataset;
    const classList = target.classList;

    if (classList.contains("menu-edit-button")) {
      editMenuInStore(Store, currentCategory, menuName);
      render();
      return;
    }

    if (classList.contains("menu-remove-button")) {
      removeMenuInStore(Store, currentCategory, menuName);
      render();
      return;
    }
  });
}
