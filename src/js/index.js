import { MENU } from "./consts.js";
import { store } from "./store.js";
import { isEmpty } from "./utils.js";

const menuForm = document.querySelector("#espresso-menu-form");
const menuInput = document.querySelector("#espresso-menu-name");
const menuSubmitBtn = document.querySelector("#espresso-menu-submit-button");

// 메뉴 추가 함수
const addMenu = (e) => {
  e.preventDefault();

  if (isEmpty(menuInput.value)) {
    menuInput.value = "";
    alert("값을 입력해 주세요.");
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

//메뉴 카운트 set 함수
const setMenuCount = () => {
  const menuCount = document.querySelector(".menu-count");
  menuCount.innerHTML = `총${store[MENU.EspressoMenu].length}개`;
};

//메뉴 리스트 파싱
const pasreMenu = () => {
  const menuContainer = document.querySelector("#espresso-menu-list");
  const template = store[MENU.EspressoMenu]
    .map((menu) => {
      return `<li class="menu-list-item d-flex items-center py-2" data-menu-id="${menu.id}">
    <span class="w-100 pl-2 menu-name">${menu.name}</span>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      data-button-type="update"
    >
      수정
    </button>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      data-button-type="delete"
    >
      삭제
    </button>
    </li>`;
    })
    .join("");

  menuContainer.innerHTML = template;
};

//렌더
const render = () => {
  setMenuCount();
  pasreMenu();
};

const init = () => {
  // 메뉴 추가 리스너
  menuForm.addEventListener("submit", addMenu);
  menuSubmitBtn.addEventListener("click", addMenu);
  render();
};

init();
