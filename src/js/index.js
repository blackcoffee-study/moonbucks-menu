import { $ } from "./utils/dom.js";
import ApiMethod from "./api/index.js";
import menuCountTemplate from "./template/menuCountTemplate.js";
import categoryNameTemplate from "./template/categoryNameTemplate.js";
import menuItemsTemplate from "./template/menuItemsTemplate.js";

let categoryName = "espresso";
const menuNameInput = $("#espresso-menu-name");
const menuList = $("#espresso-menu-list");

const addMenuName = async () => {
  if (menuNameInput.value === "") {
    return;
  }
  await ApiMethod.postMenuItemToServer(categoryName, menuNameInput.value);
  render();
};

const editEventHandler = async (e) => {
  if (e.target.classList.contains("menu-edit-button")) {
    const menuItem = e.target.closest("li");
    const menuName = menuItem.querySelector(".menu-name");
    const inputMenuItemName = prompt("메뉴명을 입력하세요", menuName.innerText);
    await ApiMethod.putMenuItemNameToServer(
      categoryName,
      menuItem.dataset.id,
      inputMenuItemName
    );
    render();
  }
};

const removeEventHandler = async (e) => {
  if (
    e.target.classList.contains("menu-remove-button") &&
    confirm("정말로 삭제하시겠습니까?")
  ) {
    const menuItem = e.target.closest("li");
    await ApiMethod.deleteMenuItemToServer(categoryName, menuItem.dataset.id);
    render();
  }
};

const changeMenuName = async (e) => {
  if (e.target.classList.contains("cafe-category-name")) {
    categoryName = e.target.dataset.categoryName;
    $("#category-name-display").innerText = categoryNameTemplate(
      e.target.innerText
    );
    render();
  }
};

const toggleSoldOutEventHandler = async (e) => {
  if (e.target.classList.contains("menu-sold-out-button")) {
    const menuItem = e.target.closest("li");
    await ApiMethod.putMenuItemSoldoutToServer(
      categoryName,
      menuItem.dataset.id
    );
    render();
  }
};

const render = async () => {
  menuNameInput.value = "";
  const menuItems = await ApiMethod.getAllMenuItemsFromServer(categoryName);
  if (menuItems) {
    menuList.innerHTML = menuItemsTemplate(menuItems);
    $(".menu-count").innerText = menuCountTemplate(menuItems.length);
  }
};

const initEventListeners = () => {
  $("#espresso-menu-submit-button").addEventListener("click", function () {
    addMenuName();
  });

  $("#espresso-menu-form").addEventListener("submit", function (e) {
    e.preventDefault();
    addMenuName();
  });

  $("#cafe-category").addEventListener("click", changeMenuName);

  menuList.addEventListener("click", editEventHandler);
  menuList.addEventListener("click", removeEventHandler);
  menuList.addEventListener("click", toggleSoldOutEventHandler);
};

const startApp = () => {
  initEventListeners();
  render();
};

startApp();
