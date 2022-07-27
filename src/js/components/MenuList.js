import {
  $,
  $all,
  createCustomElement,
  createCustomButton,
} from "../utils/dom.js";
import { MenuAPI } from "../utils/api.js";
import { MESSAGE, CATEGORY } from "../constants/index.js";

const MenuList = (menuCategory, menuData) => {
  const $menuForm = $("#espresso-menu-form");
  const $menuInput = $(".input-field");
  const $menuCount = $(".menu-count");
  const $menuList = $("#espresso-menu-list");
  const $categoryName = $(".category-name");
  const $categoryButton = $all(".cafe-category-name");

  const changeCategory = ({ target }) => {
    const categoryName = target.dataset["categoryName"];
    switch (categoryName) {
      case "espresso":
        $categoryName.innerHTML = CATEGORY.ESPRESSO;
        break;
      case "frappuccino":
        $categoryName.innerHTML = CATEGORY.FRAPPUCCINO;
        break;
      case "blended":
        $categoryName.innerHTML = CATEGORY.BLENDED;
        break;
      case "teavana":
        $categoryName.innerHTML = CATEGORY.TEAVANA;
        break;
      case "desert":
        $categoryName.innerHTML = CATEGORY.DESSERT;
        break;
    }
    menuCategory = categoryName;
    $menuForm.reset();
    loadMenu();
  };

  const countMenu = () => {
    const count = $all(".menu-list-item").length;
    $menuCount.innerHTML = `총 ${count} 개`;
  };

  const drawMenu = (data) => {
    const menuItem = createCustomElement(
      "li",
      "menu-list-item d-flex items-center py-2"
    );
    const menuItemName = createCustomElement("span", "w-100 pl-2 menu-name");
    const menuItemSoldOutButton = createCustomButton(
      ["mr-1", "menu-sold-out-button"],
      (e) => soldOutMenu(e),
      "품절"
    );
    const menuItemUpdateButton = createCustomButton(
      ["mr-1", "menu-edit-button"],
      (e) => updateMenu(e),
      "수정"
    );
    const menuItemDeleteButton = createCustomButton(
      ["menu-remove-button"],
      (e) => deleteMenu(e),
      "삭제"
    );
    menuItem.id = data.id;
    if (data.isSoldOut) menuItemName.classList.add("sold-out");
    menuItemName.appendChild(document.createTextNode(data.name));
    menuItem.appendChild(menuItemName);
    menuItem.appendChild(menuItemSoldOutButton);
    menuItem.appendChild(menuItemUpdateButton);
    menuItem.appendChild(menuItemDeleteButton);
    $menuList.appendChild(menuItem);
  };

  const saveMenu = () => {
    localStorage.setItem(menuCategory, JSON.stringify(menuData));
  };

  const loadMenu = async () => {
    $menuList.textContent = "";
    menuData = await MenuAPI.loadMenuAPI(menuCategory);
    menuData.forEach(drawMenu);
    countMenu();
  };

  const createMenu = async (e) => {
    e.preventDefault();
    if ($menuInput.value.trim() === "") return alert(MESSAGE.ALERT_CREATE);
    await MenuAPI.createMenuAPI($menuInput.value, menuCategory);
    $menuForm.reset();
    loadMenu();
  };

  const updateMenu = async ({ target }) => {
    const $currentName = target.parentElement.querySelector(".menu-name");
    const updateName = prompt(MESSAGE.PROMPT_UPDATE, $currentName.innerHTML);
    if (updateName) {
      await MenuAPI.updateMenuAPI(
        updateName,
        menuCategory,
        target.parentElement.id
      );
      loadMenu();
    }
  };

  const deleteMenu = ({ target }) => {
    if (confirm(MESSAGE.CONFIRM_DELETE)) {
      target.parentElement.remove();
      menuData = menuData.filter((data) => data.id !== target.parentElement.id);
      saveMenu();
      countMenu();
    }
  };

  const soldOutMenu = ({ target }) => {
    target.parentElement
      .querySelector(".menu-name")
      .classList.toggle("sold-out");
    const data = menuData.find((data) => data.id === target.parentElement.id);
    data.isSoldOut = !data.isSoldOut;
    saveMenu();
  };

  const init = () => {
    loadMenu();
    $menuForm.addEventListener("submit", createMenu);
    $categoryButton.forEach((e) => e.addEventListener("click", changeCategory));
  };

  init();
};

export default MenuList;
