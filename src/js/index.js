import { MENU, BUTTON_TYPE, TEXT } from "./consts.js";
import { store } from "./store.js";
import { isEmpty } from "./utils.js";

const menuInput = document.querySelector("#espresso-menu-name");
const menuContainer = document.querySelector("#espresso-menu-list");

//메뉴 카운트 set
const setMenuCount = () => {
  const menuCount = document.querySelector(".menu-count");

  menuCount.innerHTML = `총${store[MENU.EspressoMenu].length}개`;
};

//메뉴 추가
const addMenu = () => {
  if (isEmpty(menuInput.value)) {
    menuInput.value = "";
    alert(TEXT.MENU_INPUT_EMPTY);

    return;
  }

  const menu = {
    id: store[MENU.EspressoMenu].length + 1,
    name: menuInput.value,
  };

  store[MENU.EspressoMenu] = [...store[MENU.EspressoMenu], menu];
  menuInput.value = "";

  render();
};

//메뉴 추가 엔터키 사용 처리
const onKeyPress = (e) => {
  if (e.key !== "Enter") {
    return;
  }

  addMenu();
};

//메뉴 리스트 파싱
const pasreMenu = () => {
  const template = store[MENU.EspressoMenu]
    .map((menu) => {
      return `<li class="menu-list-item d-flex items-center py-2" data-menu-id="${menu.id}">
    <span class="w-100 pl-2 menu-name">${menu.name}</span>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      data-button-type="${BUTTON_TYPE.Update}"
    >
      수정
    </button>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      data-button-type="${BUTTON_TYPE.Delete}"
    >
      삭제
    </button>
    </li>`;
    })
    .join("");

  menuContainer.innerHTML = template;
};

//메뉴 삭제
const deleteMenu = (target) => {
  const menuId = target.parentNode.dataset.menuId;

  if (!confirm(TEXT.MENU_DELETE)) {
    return;
  }

  const deletedMenu = store[MENU.EspressoMenu].filter(
    (menu) => menu.id !== parseInt(menuId)
  );

  store[MENU.EspressoMenu] = deletedMenu;

  render();
};

//메뉴 수정
const updateMenu = (target) => {
  const menuId = target.parentNode.dataset.menuId;
  const updatedText = prompt(TEXT.MENU_UPDATE);

  if (isEmpty(updatedText)) {
    return;
  }

  const updatedMenu = store[MENU.EspressoMenu].map((menu) => {
    const { id } = menu;
    if (id === parseInt(menuId)) return { ...menu, name: updatedText };
    return menu;
  });

  store[MENU.EspressoMenu] = updatedMenu;

  render();
};

//메뉴 클릭 이벤트 핸들러
const menuEventHandler = (e) => {
  const target = e.target;
  const buttonType = target.dataset.buttonType;

  if (buttonType === BUTTON_TYPE.Update) {
    updateMenu(target);
  } else if (buttonType === BUTTON_TYPE.Delete) {
    deleteMenu(target);
  }
};

//렌더
const render = () => {
  setMenuCount();
  pasreMenu();
};

const init = () => {
  const menuForm = document.querySelector("#espresso-menu-form");
  const menuSubmitBtn = document.querySelector("#espresso-menu-submit-button");

  menuForm.addEventListener("submit", (e) => e.preventDefault());
  menuInput.addEventListener("keypress", onKeyPress);
  menuSubmitBtn.addEventListener("click", addMenu);
  menuContainer.addEventListener("click", menuEventHandler);

  render();
};

init();
