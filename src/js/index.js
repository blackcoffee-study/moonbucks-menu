import { $, menuStore } from "./utils/index.js";
import { getMenuItemTemplate } from "./utils/Template.js";

function App() {
  this.category = "espresso";
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  this.init = () => {
    if (menuStore.getLocalStorage()) {
      this.menu = menuStore.getLocalStorage();
      render();
      return;
    }
    menuStore.setLocalStorage(this.menu);
  };

  const render = () => {
    const menuItemListTemplate = this.menu[this.category]
      .map((menu, index) => getMenuItemTemplate(menu, index))
      .join("");

    $("#menu-list").innerHTML = menuItemListTemplate;
    updateMenuCount();
  };

  const updateMenuCount = () => {
    const menuCount = this.menu[this.category].length;
    $("#menu-count").innerText = `총 ${menuCount}개`;
  };

  const updateMenuStore = () => {
    menuStore.setLocalStorage(this.menu);
    render();
  };

  const addMenuItem = () => {
    const menuName = $("#menu-name").value;
    if (menuName === "") {
      alert("값을 입력해주세요.");
      return;
    }

    this.menu[this.category].push({ name: menuName, soldOut: false });
    updateMenuStore();
    $("#menu-name").value = "";
  };

  const updateMenuSoldOut = (e) => {
    const $menuItemList = e.target.closest("li");
    const menuId = $menuItemList.dataset.menuId;

    this.menu[this.category][menuId].soldOut =
      !this.menu[this.category][menuId].soldOut;
    updateMenuStore();
  };

  const updateMenuItem = (e) => {
    const $menuItemList = e.target.closest("li");
    const menuId = $menuItemList.dataset.menuId;
    const menuName = $(".menu-name", $menuItemList).innerText;
    const updatedMenuName = prompt("메뉴명을 수정하세요", menuName);

    this.menu[this.category][menuId].name = updatedMenuName;
    updateMenuStore();
  };

  const removeMenuItem = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const $menuItemList = e.target.closest("li");
      const menuId = $menuItemList.dataset.menuId;

      this.menu[this.category].splice(menuId, 1);
      updateMenuStore();
    }
  };

  const updateCategory = (e) => {
    const $category = e.target;
    const categoryName = $category.dataset.categoryName;
    const categoryTitle = $category.innerText;

    this.category = categoryName;
    $("#category-title").innerText = `${categoryTitle} 메뉴 관리`;
    render();
  };

  $("#menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    addMenuItem();
  });

  $("#menu-submit-button").addEventListener("click", addMenuItem);

  $("#menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-sold-out-button")) {
      updateMenuSoldOut(e);
    }
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuItem(e);
    }
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuItem(e);
    }
  });

  $("nav").addEventListener("click", (e) => {
    if (e.target.classList.contains("cafe-category-name")) {
      updateCategory(e);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => new App().init());
