import { CATEGORY } from "./const/index.js";
import { isEmpty } from "./utils/validate.js";

const $ = (elementId) => document.getElementById(elementId);

const $menuForm = $("espresso-menu-form");
const $menuName = $("espresso-menu-name");
const $menuSubmitButton = $("espresso-menu-submit-button");
const $menuList = $("espresso-menu-list");
const $menuCount = $("menu-count");
const $categoryManagement = $("category-management");

$menuList.addEventListener("click", updateMenuItem);

let menuList = {
  espresso: [],
  frappuccino: [],
  blended: [],
  teavana: [],
  desert: [],
};

const title = "menu";
const category = "espresso";
const EDIT_INPUT = "메뉴명을 수정하세요.";
const DELETE_CHECK = "정말 삭제하시겠습니까?";

const menuTemplate = (id, name) => `
    <li class="menu-list-item d-flex items-center py-2" id=${id}>
    <span class="w-100 pl-2 menu-name">${name}</span>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
    >
      품절
    </button>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
    >
      수정
    </button>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
    >
      삭제
    </button>
  </li>
  `;

function addMenuInList({ id, name }) {
  const menuItem = menuTemplate(id, name);
  $menuList.innerHTML += menuItem;
  getMenuCount();
}

function handleToSubmitMenu() {
  const newMenu = $menuName.value.trim();
  $menuName.value = "";
  if (isEmpty(newMenu)) {
    const newMenuObj = {
      name: newMenu,
      id: Date.now(),
      soldOut: false,
    };
    menuList[category].push(newMenuObj);
    addMenuInList(newMenuObj);
    saveMenuLust();
  }
}

function handleToSubmitWithEnter(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    handleToSubmitMenu();
  }
}

$menuForm.addEventListener("submit", (event) => event.preventDefault());
$menuName.addEventListener("keyup", handleToSubmitWithEnter);
$menuSubmitButton.addEventListener("click", handleToSubmitMenu);

function updateMenuItem({ target }) {
  const { classList } = target;
  const $li = target.parentElement;
  if (classList.contains("menu-sold-out-button")) soldOutMenu($li);
  if (classList.contains("menu-edit-button")) editMenuName($li);
  if (classList.contains("menu-remove-button")) deleteMenu($li);
}

function soldOutMenu($li) {
  const $state = $li.querySelector(".menu-name");
  menuList[category].forEach((menu) => {
    if (menu.id == parseInt($li.id)) {
      menu.soldOut = !menu.soldOut;
      if (menu.soldOut) {
        $state.classList.add("sold-out");
      } else {
        $state.classList.remove("sold-out");
      }
    }
  });
  saveMenuLust();
}

function editMenuName($li) {
  const $span = $li.querySelector(".menu-name");
  let modifiedMenu = prompt(EDIT_INPUT, $span.textContent);
  if (modifiedMenu) {
    modifiedMenu = modifiedMenu.trim();
  }
  isEmpty(modifiedMenu) &&
    menuList[category].forEach((menu) => {
      if (menu.id == parseInt($li.id)) {
        menu.name = modifiedMenu;
        $span.textContent = modifiedMenu;
      }
    });
  saveMenuLust();
}

function deleteMenu($li) {
  const answer = confirm(DELETE_CHECK);
  if (answer) {
    menuList = menuList[category].filter(
      (menu) => menu.id !== parseInt($li.id)
    );
    $li.remove();
    getMenuCount();
    saveMenuLust();
  }
}

function saveMenuLust() {
  localStorage.setItem(title, JSON.stringify(menuList));
}

function getMenuCount() {
  $menuCount.textContent = `총 ${menuList[category].length}개`;
}

// trim polyfill
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  };
}
