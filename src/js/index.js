import {isBlank, isReduplicated } from "./utils/validate.js";

const $ = (selector) => document.querySelector(selector);

const $menuForm = $("#espresso-menu-form");
const $menuName = $("#espresso-menu-name");
const $menuSubmitButton = $("#espresso-menu-submit-button");
const $menuList = $("#espresso-menu-list");
const $menuCount = $(".menu-count");

const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu"));
  },
};

const EDIT_INPUT = "메뉴명을 수정하세요.";
const DELETE_CHECK = "정말 삭제하시겠습니까?";

function App() {
  this.menu = [];

  this.init = () => {
    if (store.getLocalStorage()) {
      this.menu = store.getLocalStorage();
    }
    render();
  };
  const menuItemTemplate = (item, idx) => {
    return `
        <li class="menu-list-item d-flex items-center py-2" data-menu-id=${idx}>
          <span class="w-100 pl-2 menu-name">${item.name}</span>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          >
            수정
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
          >
            삭제
          </button>
        </li>`;
  };

  const render = () => {
    const template = this.menu
      .map((item, idx) => menuItemTemplate(item, idx))
      .join("");
    $menuList.innerHTML = template;
    getMenuCount();
  };

  const getMenuCount = () => {
    const menuCount = $menuList.querySelectorAll("li").length;
    $menuCount.innerText = `총 ${menuCount} 개`;
  };

  const addMenuName = () => {
    const newMenuName = $menuName.value.trim();
    $menuName.value = "";
    if (isBlank(newMenuName)) return;
    if (isReduplicated(this.menu, newMenuName)) return;
    const newMenuObj = {
      name: newMenuName,
    };
    this.menu.push(newMenuObj);
    store.setLocalStorage(this.menu);
    render();
  };

  const editMenuName = ($li) => {
    const $span = $li.querySelector(".menu-name");
    let editedMenuName = prompt(EDIT_INPUT, $span.textContent);
    const menuId = $li.dataset.menuId;
    if (editedMenuName) {
      editedMenuName = editedMenuName.trim();
    }
    if (isBlank(editedMenuName)) return;
    if (isReduplicated(this.menu, editedMenuName, menuId)) return;
    this.menu[menuId].name = editedMenuName;
    store.setLocalStorage(this.menu);
    $span.textContent = editedMenuName;
  };

  const removeMenuName = ($li) => {
    if (confirm(DELETE_CHECK)) {
      const menuId = $li.dataset.menuId;
      this.menu.splice(menuId, 1);
      store.setLocalStorage(this.menu);
      $li.remove();
      getMenuCount();
    }
  };

  function updateMenuList({ target }) {
    const { classList } = target;
    const $li = target.parentElement;
    // if (classList.contains("menu-sold-out-button")) soldOutMenu($li);
    if (classList.contains("menu-edit-button")) editMenuName($li);
    if (classList.contains("menu-remove-button")) removeMenuName($li);
  }

  $menuList.addEventListener("click", updateMenuList);

  $menuForm.addEventListener("submit", (e) => e.preventDefault());

  $menuSubmitButton.addEventListener("click", addMenuName);

  $menuName.addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    addMenuName();
  });
}

const app = new App();
app.init();
