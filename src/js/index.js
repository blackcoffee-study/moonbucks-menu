import { isEmpty } from "./utils/validate.js";

const $ = (elementId) => document.getElementById(elementId);

const $menuForm = $("espresso-menu-form");
const $menuName = $("espresso-menu-name");
const $MenuSubmitButton = $("espresso-menu-submit-button");
const $menuList = $("espresso-menu-list");
const $menuCount = $("menu-count");

$menuList.addEventListener("click", updateMenuItem);

let menuLists = [];

const EDIT_INPUT = "메뉴명을 수정하세요.";
const DELETE_CHECK = "정말 삭제하시겠습니까?";

function addEspressoMenu(menuName) {
  const menuTemplate = `
    <li class="menu-list-item d-flex items-center py-2" id=${menuName.id}>
    <span class="w-100 pl-2 menu-name">${menuName.menu}</span>
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

  $menuList.innerHTML += menuTemplate;
  getMenuCount();
}

function handleToSubmitMenu() {
  const newMenu = $menuName.value.trim();
  $menuName.value = "";
  if (isEmpty(newMenu)) {
    const newMenuObj = {
      menu: newMenu,
      id: Date.now(),
    };
    menuLists.push(newMenuObj);
    addEspressoMenu(newMenuObj);
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
$MenuSubmitButton.addEventListener("click", handleToSubmitMenu);

function updateMenuItem({ target }) {
  const { classList } = target;
  if (classList.contains("menu-edit-button")) editMenuName(target);
  if (classList.contains("menu-remove-button")) deleteMenu(target);
}

function editMenuName(target) {
  const $li = target.parentElement;
  const $span = $li.getElementsByClassName("menu-name")[0];
  let modifiedMenu = prompt(EDIT_INPUT, $span.textContent);
  if (modifiedMenu) {
    modifiedMenu = modifiedMenu.trim();
  }
  isEmpty(modifiedMenu) &&
    menuLists.forEach((menu) => {
      if (menu.id == parseInt($li.id)) {
        menu.menu = modifiedMenu;
        $span.textContent = modifiedMenu;
      }
    });
}

function deleteMenu(target) {
  const answer = confirm(DELETE_CHECK);
  if (answer) {
    const $li = target.parentElement;
    menuLists = menuLists.filter((menu) => menu.id !== parseInt(li.id));
    $li.remove();
    getMenuCount();
  }
}

function getMenuCount() {
  $menuCount.textContent = `총 ${menuLists.length}개`;
}

// trim polyfill
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  };
}
