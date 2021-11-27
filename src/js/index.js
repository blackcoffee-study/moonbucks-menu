import { $, menuStore } from "./utils/index.js";
import { getMenuItemTemplate } from "./utils/Template.js";

function App() {
  this.currentMenu = "espresso";
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
    const menuListTemplate = this.menu[this.currentMenu]
      .map((menu, index) => getMenuItemTemplate(menu.name, index))
      .join("");

    $("#menu-list").innerHTML = menuListTemplate;
    updateMenuCount();
  };

  const addMenuItem = () => {
    const menuName = $("#menu-name").value;
    if (menuName === "") {
      alert("값을 입력해주세요.");
      return;
    }

    this.menu[this.currentMenu].push({ name: menuName, soldOut: false });
    menuStore.setLocalStorage(this.menu);
    $("#menu-name").value = "";
    render();
  };

  const updateMenuItem = (e) => {
    const $menuItemList = e.target.closest("li");
    const menuId = $menuItemList.dataset.menuId;
    const menuName = $(".menu-name", $menuItemList).innerText;
    const updatedMenuName = prompt("메뉴명을 수정하세요", menuName);

    this.menu[this.currentMenu][menuId].name = updatedMenuName;
    menuStore.setLocalStorage(this.menu);
    render();
  };

  const removeMenuItem = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;

      this.menu[this.currentMenu].splice(menuId, 1);
      menuStore.setLocalStorage(this.menu);
      render();
    }
  };

  const updateMenuCount = () => {
    const menuCount = this.menu[this.currentMenu].length;
    $("#menu-count").innerText = `총 ${menuCount}개`;
  };

  const updateCurrentMenu = (e) => {
    this.currentMenu = e.target.dataset.categoryName;
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
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuItem(e);
    }
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuItem(e);
    }
  });

  $("nav").addEventListener("click", (e) => {
    if (e.target.classList.contains("cafe-category-name")) {
      updateCurrentMenu(e);
    }
  });

  this.init();
}

document.addEventListener("DOMContentLoaded", new App());
