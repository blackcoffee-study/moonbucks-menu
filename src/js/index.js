import { isBlank, isReduplicated } from "./utils/validate.js";

const $ = (selector) => document.querySelector(selector);

const $menuForm = $("#menu-form");
const $menuName = $("#menu-name");
const $menuSubmitButton = $("#menu-submit-button");
const $menuList = $("#menu-list");
const $menuCount = $(".menu-count");
const $categoryTitle = $("#category-title");

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
  this.currentCategory = "espresso";
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  this.init = () => {
    if (store.getLocalStorage()) {
      this.menu = store.getLocalStorage();
    }
    render();
  };
  const menuItemTemplate = (item, idx) => {
    return `
        <li class="menu-list-item d-flex items-center py-2" data-menu-id=${item.id}>
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
    const template = this.menu[this.currentCategory]
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
    if (isReduplicated(this.menu[this.currentCategory], newMenuName)) return;
    const newMenuObj = {
      name: newMenuName,
      id: Date.now(),
    };
    this.menu[this.currentCategory].push(newMenuObj);
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
    if (isReduplicated(this.menu[this.currentCategory], editedMenuName, menuId))
      return;
    this.menu[this.currentCategory].forEach((item) => {
      if (item.id === parseInt(menuId)) {
        item.name = editedMenuName;
      }
    });
    store.setLocalStorage(this.menu);
    $span.textContent = editedMenuName;
  };

  const removeMenuName = ($li) => {
    if (confirm(DELETE_CHECK)) {
      const menuId = $li.dataset.menuId;
      this.menu[this.currentCategory] = this.menu[this.currentCategory].filter(
        (item) => item.id !== parseInt(menuId)
      );
      store.setLocalStorage(this.menu);
      $li.remove();
      getMenuCount();
    }
  };

  const updateMenuList = ({ target }) => {
    const { classList } = target;
    const $li = target.parentElement;
    // if (classList.contains("menu-sold-out-button")) soldOutMenu($li);
    if (classList.contains("menu-edit-button")) editMenuName($li);
    if (classList.contains("menu-remove-button")) removeMenuName($li);
  };

  $menuList.addEventListener("click", updateMenuList);

  $menuForm.addEventListener("submit", (e) => e.preventDefault());

  $menuSubmitButton.addEventListener("click", addMenuName);

  $menuName.addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    addMenuName();
  });

  $("nav").addEventListener("click", (e) => {
    const isCategoryButton = e.target.classList.contains("cafe-category-name");
    if (!isCategoryButton) return;
    isCategoryButton;
    this.currentCategory = e.target.dataset.categoryName;
    $categoryTitle.textContent = `${e.target.textContent} 메뉴 관리 `;
    $menuName.placeholder = `${e.target.textContent.trim().slice(3)} 메뉴 이름`;
    render();
  });
}

const app = new App();
app.init();
