import { $ } from "./utils/index.js";
import { menuApi } from "./api/index.js";
import { menuStore } from "./stores/index.js";
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
    initEventListeners();
    render();
  };

  const render = async () => {
    this.menu[this.category] = await menuApi.getMenu(this.category);

    const menuItemListTemplate = this.menu[this.category]
      .map((menu) => getMenuItemTemplate(menu))
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

  const addMenuItem = async () => {
    if ($("#menu-name").value === "") {
      alert("값을 입력해주세요.");
      return;
    }

    this.menu[this.category].push({
      name: $("#menu-name").value,
      soldOut: false,
    });
    await menuApi.addMenu(this.category, $("#menu-name").value);
    updateMenuStore();
    $("#menu-name").value = "";
  };

  const updateMenuSoldOut = async (e) => {
    const $menuItemList = e.target.closest("li");
    const menuId = $menuItemList.dataset.menuId;

    await menuApi.updateMenuSoldOut(this.category, menuId);
    updateMenuStore();
  };

  const updateMenuItem = async (e) => {
    const $menuItemList = e.target.closest("li");
    const menuId = $menuItemList.dataset.menuId;
    const menuName = $(".menu-name", $menuItemList).innerText;
    const updatedMenuName = prompt("메뉴명을 수정하세요", menuName);

    await menuApi.updateMenuName(this.category, menuId, updatedMenuName);
    updateMenuStore();
  };

  const removeMenuItem = async (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const $menuItemList = e.target.closest("li");
      const menuId = $menuItemList.dataset.menuId;

      await menuApi.removeMenu(this.category, menuId);
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

  const initEventListeners = () => {
    $("#menu-form").addEventListener("submit", (e) => {
      e.preventDefault();
    });

    $("#menu-name").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addMenuItem();
      }
    });

    $("#menu-submit-button").addEventListener("click", () => {
      addMenuItem();
    });

    $("#menu-list").addEventListener("click", (e) => {
      const classList = e.target.classList;

      switch (true) {
        case classList.contains("menu-sold-out-button"):
          updateMenuSoldOut(e);
          break;
        case classList.contains("menu-edit-button"):
          updateMenuItem(e);
          break;
        case classList.contains("menu-remove-button"):
          removeMenuItem(e);
          break;
      }
    });

    $("nav").addEventListener("click", (e) => {
      const classList = e.target.classList;

      if (classList.contains("cafe-category-name")) {
        updateCategory(e);
      }
    });
  };
}

document.addEventListener("DOMContentLoaded", () => new App().init());
