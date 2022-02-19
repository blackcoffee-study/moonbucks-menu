import { CATEGORY, CATEGORY_NAME, MENU, BUTTON_TYPE, TEXT } from "./consts.js";
import { MENU_ITEM } from "./components/menuItem.js";
import { store } from "./store.js";
import { inputValidator } from "./utils/utils.js";

const menuContainer = document.querySelector("#espresso-menu-list");
const menuTitle = document.querySelector("#menu-title");
const menuInput = document.querySelector("#espresso-menu-name");

//메뉴 카운트 set
const setMenuCount = () => {
  const menuCount = document.querySelector(".menu-count");

  menuCount.textContent = `총${store[MENU[CATEGORY.espresso]].length}개`;
};

//메뉴 추가
const addMenu = () => {
  if (inputValidator(store[MENU[CATEGORY.espresso]], menuInput.value)) {
    menuInput.value = "";
    menuInput.focus();

    return;
  }

  const menu = {
    id: store[MENU[CATEGORY.espresso]].length + 1,
    name: menuInput.value,
  };

  store[MENU[CATEGORY.espresso]] = [...store[MENU[CATEGORY.espresso]], menu];
  menuInput.value = "";
  menuInput.focus();

  render();
};

//메뉴 리스트 파싱
const menuListRender = () => {
  const template = store[MENU[CATEGORY.espresso]].map(MENU_ITEM).join("");

  menuContainer.innerHTML = template;
};

//메뉴 품절
const soldOutMenu = (target) => {
  const menu = target.parentNode;
  menu.classList.toggle("sold-out");
};

//메뉴 삭제
const deleteMenu = (target) => {
  const { menuId } = target.parentNode.dataset;

  if (!confirm(TEXT.MENU_DELETE)) {
    return;
  }

  const deletedMenu = store[MENU[CATEGORY.espresso]].filter(
    (menu) => menu.id !== parseInt(menuId)
  );

  store[MENU[CATEGORY.espresso]] = deletedMenu;

  render();
};

//메뉴 수정
const updateMenu = (target) => {
  const { menuId } = target.parentNode.dataset;
  const updatedText = prompt(TEXT.MENU_UPDATE);

  if (inputValidator(store[MENU[CATEGORY.espresso]], updatedText)) {
    return;
  }

  const updatedMenu = store[MENU[CATEGORY.espresso]].map((menu) => {
    const { id } = menu;
    if (id === parseInt(menuId)) return { ...menu, name: updatedText };
    return menu;
  });

  store[MENU[CATEGORY.espresso]] = updatedMenu;

  render();
};

// 카테고리 이벤트 핸들러
const categoryEventHandler = (e) => {
  const { categoryName } = e.target.dataset;
  const categoryText = e.target.textContent;

  if (categoryName in CATEGORY) {
    menuTitle.textContent = `${categoryText} 메뉴 관리`;
    menuInput.setAttribute(
      "placeholder",
      `${CATEGORY_NAME[categoryName]} 메뉴 이름`
    );

    render();
  }
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
  setMenuCount();
  menuListRender();
};

const init = () => {
  eventHandler();
  render();
};

init();
