import { CATEGORY, CATEGORY_NAME, BUTTON_TYPE, TEXT } from "./consts.js";
import { MENU_ITEM } from "./components/menuItem.js";
import { store } from "./store.js";
import { inputValidator, findMenu } from "./utils/utils.js";
import { getMenu, postMenu, putMenu, deleteMenuById } from "./api/index.js";

const menuContainer = document.querySelector("#espresso-menu-list");
const menuInput = document.querySelector("#espresso-menu-name");

//메뉴 카운트 set
const setMenuCount = () => {
  const menuCount = document.querySelector(".menu-count");

  menuCount.textContent = `총${store.items.length}개`;
};

//메뉴 추가
const addMenu = () => {
  if (inputValidator(store.items, menuInput.value)) {
    menuInput.value = "";
    menuInput.focus();

    return;
  }

  const menu = {
    id: Date.now(),
    name: menuInput.value,
    category: store.currentTab,
    isSoldOut: false,
  };

  postMenu(menu);
  menuInput.value = "";
  menuInput.focus();

  render();
};

//메뉴 리스트 파싱
const menuListRender = () => {
  store.items = getMenu(store.currentTab);
  const template = store.items.map(MENU_ITEM).join("");
  menuContainer.innerHTML = template;
};

//메뉴 품절
const soldOutMenu = (target) => {
  const menuItem = target.parentNode;
  const menuName = menuItem.querySelector(".menu-name");
  const { menuId } = menuItem.dataset;
  const { name, isSoldOut } = findMenu(Number(menuId));

  menuName.classList.toggle("sold-out");

  putMenu({ id: Number(menuId), name, isSoldOut: !isSoldOut });

  render();
};

//메뉴 삭제
const deleteMenu = (target) => {
  const { menuId } = target.parentNode.dataset;

  if (!confirm(TEXT.MENU_DELETE)) {
    return;
  }

  deleteMenuById(Number(menuId));

  render();
};

//메뉴 수정
const updateMenu = (target) => {
  const { menuId } = target.parentNode.dataset;
  const updatedName = prompt(TEXT.MENU_UPDATE);

  if (inputValidator(store.items, updatedName)) {
    return;
  }

  const { isSoldOut } = findMenu(Number(menuId));

  putMenu({ id: Number(menuId), name: updatedName, isSoldOut });

  render();
};

// 카테고리 이벤트 핸들러
const categoryEventHandler = (e) => {
  const menuTitle = document.querySelector("#menu-title");
  const { categoryName } = e.target.dataset;
  const categoryText = e.target.textContent;

  if (!categoryName in CATEGORY) return;

  store.currentTab = categoryName;
  menuTitle.textContent = `${categoryText} 메뉴 관리`;
  menuInput.setAttribute(
    "placeholder",
    `${CATEGORY_NAME[categoryName]} 메뉴 이름`
  );

  render();
};

// 메뉴 추가 폼 이벤트 핸들러
const formEventHandler = (e) => {
  e.preventDefault();
  addMenu();
};

//메뉴 클릭 이벤트 핸들러
const menuEventHandler = (e) => {
  const { target } = e;
  const { buttonType } = target.dataset;

  if (buttonType === BUTTON_TYPE.SoldOut) {
    soldOutMenu(target);
  } else if (buttonType === BUTTON_TYPE.Update) {
    updateMenu(target);
  } else if (buttonType === BUTTON_TYPE.Delete) {
    deleteMenu(target);
  }
};

//이벤트 핸들러
const eventHandler = () => {
  const categoryContainer = document.querySelector("#cafe-category-list");
  const menuForm = document.querySelector("#espresso-menu-form");
  const menuSubmitBtn = document.querySelector("#espresso-menu-submit-button");

  categoryContainer.addEventListener("click", categoryEventHandler);
  menuForm.addEventListener("submit", formEventHandler);
  menuSubmitBtn.addEventListener("click", addMenu);
  menuContainer.addEventListener("click", menuEventHandler);
};

//렌더 함수
const render = () => {
  menuListRender();
  setMenuCount();
};

const init = () => {
  eventHandler();
  render();
};

init();
