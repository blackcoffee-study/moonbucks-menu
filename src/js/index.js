import { $, stopInitEvents, getIsTargetContainsClass } from "./utils/index.js";
import { menuApi } from "./api/index.js";
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
    render();
    initEventListeners();
  };

  const render = async () => {
    this.menu[this.category] = await menuApi.getMenu(this.category);

    const menuItemListTemplate = this.menu[this.category]
      .map((menu) => getMenuItemTemplate(menu))
      .join("");

    $("#menu-list").innerHTML = menuItemListTemplate;
    changeMenuCount();
  };

  const changeMenuCount = () => {
    const menuCount = this.menu[this.category].length;
    $("#menu-count").innerText = `총 ${menuCount}개`;
  };

  const changeCategory = (e) => {
    if (!getIsTargetContainsClass(e, "cafe-category-name")) {
      return;
    }
    const $category = e.target;
    const categoryName = $category.dataset.categoryName;
    const categoryTitle = $category.innerText;

    this.category = categoryName;
    $("#category-title").innerText = `${categoryTitle} 메뉴 관리`;
    render();
  };

  const addMenuItem = async () => {
    const menuName = $("#menu-name").value;
    if (menuName === "") {
      alert("값을 입력해주세요.");
      return;
    }
    await menuApi.addMenu(this.category, { name: menuName });
    $("#menu-name").value = "";
    render();
  };

  const addMenuItemWithKeypress = (e) => {
    if (e.key === "Enter") {
      addMenuItem();
    }
  };

  const updateMenuSoldOut = async (e) => {
    const $menuItemList = e.target.closest("li");
    const menuId = $menuItemList.dataset.menuId;

    await menuApi.updateMenuSoldOut(this.category, menuId);
    render();
  };

  const updateMenuName = async (e) => {
    const $menuItemList = e.target.closest("li");
    const menuId = $menuItemList.dataset.menuId;
    const menuName = $(".menu-name", $menuItemList).innerText;
    const updatedMenuName = prompt("메뉴명을 수정하세요", menuName);

    await menuApi.updateMenuName(this.category, menuId, {
      name: updatedMenuName,
    });
    render();
  };

  const removeMenuItem = async (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const $menuItemList = e.target.closest("li");
      const menuId = $menuItemList.dataset.menuId;

      await menuApi.removeMenu(this.category, menuId);
      render();
    }
  };

  const initEventListeners = () => {
    $("nav").addEventListener("click", changeCategory);
    $("#menu-form").addEventListener("submit", stopInitEvents);
    $("#menu-submit-button").addEventListener("click", addMenuItem);
    $("#menu-name").addEventListener("keypress", addMenuItemWithKeypress);
    $("#menu-list").addEventListener("click", (e) => {
      switch (true) {
        case getIsTargetContainsClass(e, "menu-sold-out-button"):
          updateMenuSoldOut(e);
          break;
        case getIsTargetContainsClass(e, "menu-edit-button"):
          updateMenuName(e);
          break;
        case getIsTargetContainsClass(e, "menu-remove-button"):
          removeMenuItem(e);
          break;
      }
    });
  };
}

document.addEventListener("DOMContentLoaded", () => new App().init());
