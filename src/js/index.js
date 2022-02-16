import { isEmpty } from "./utils/validate.js";

const $ = (elementId) => document.getElementById(elementId);

const $menuForm = $("espresso-menu-form");
const $menuName = $("espresso-menu-name");
const $MenuSubmitButton = $("espresso-menu-submit-button");
const $menuList = $("espresso-menu-list");
const $menuCount = $("menu-count");

$menuList.addEventListener("click", updateMenuItem);

let menuList = [];

const EDIT_INPUT = "메뉴명을 수정하세요.";
const DELETE_CHECK = "정말 삭제하시겠습니까?";

function addEspressoMenu({ id, menu }) {
  const menuTemplate = `
    <li class="menu-list-item d-flex items-center py-2" id=${id}>
    <span class="w-100 pl-2 menu-name">${menu}</span>
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
    menuList.push(newMenuObj);
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
  const $li = target.parentElement;
  if (classList.contains("menu-sold-out-button")) soldOutMenu($li);
  if (classList.contains("menu-edit-button")) editMenuName($li);
  if (classList.contains("menu-remove-button")) deleteMenu($li);
}

function soldOutMenu($li) {
  $li.classList.toggle("sold-out");
}

function editMenuName($li) {
  const $span = $li.getElementsByClassName("menu-name")[0];
  let modifiedMenu = prompt(EDIT_INPUT, $span.textContent);
  if (modifiedMenu) {
    modifiedMenu = modifiedMenu.trim();
  }
  isEmpty(modifiedMenu) &&
    menuList.forEach((menu) => {
      if (menu.id == parseInt($li.id)) {
        menu.menu = modifiedMenu;
        $span.textContent = modifiedMenu;
      }
    });
}

function deleteMenu($li) {
  const answer = confirm(DELETE_CHECK);
  if (answer) {
    menuList = menuList.filter((menu) => menu.id !== parseInt($li.id));
    $li.remove();
    getMenuCount();
  }
}

function getMenuCount() {
  $menuCount.textContent = `총 ${menuList.length}개`;
}

// trim polyfill
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  };
}
