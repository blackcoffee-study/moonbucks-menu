import {
  postMenu,
  BASE_URL,
  getMenu,
  putMenu,
  deleteMenu
} from './api/index.js';
import { $ } from './utility/DOMSelector.js';
import {
  EDIT_MESSAGE,
  CONFIRM_MESSAGE,
  ALERT_MESSAGE,
  CLASS_SOLD_OUT,
  EVENT_LISTENER_CLICK
} from './constants/constants.js';

const $btnMoonbucksMenu = $('#app nav');
const $menuName = $('main h2');
const $menuCount = $('.menu-count');
const $menuForm = $('#menu-form');
const $menuInput = $('#menu-form input');
const $btnSubmitMenu = $('#menu-form button');
const $menuList = $('#menu-list');

let categoryList = {
  espresso: [],
  frappuccino: [],
  blended: [],
  teavana: [],
  desert: []
};

let categoryKey = 'espresso';
let categoryName;

const getMenuItem = async function () {
  const data = await getMenu(`${BASE_URL}/api/category/${categoryKey}/menu`);
  if (!data) return;

  categoryList[categoryKey] = data;
  renderMenu(categoryList[categoryKey]);
};
getMenuItem();

const manageCategory = function (event) {
  if (event.target.localName === 'nav') return;

  categoryKey = event.target.dataset.categoryName;
  categoryName = event.target.innerText;
  $menuName.innerText = `${categoryName} 메뉴 관리`;

  getMenuItem();
};

const menuCounter = function () {
  $menuCount.innerText = `총 ${categoryList[categoryKey].length}개`;
};

const editMenu = async function (event) {
  const $li = event.target.parentElement;
  const menuId = $li.id;
  const menuName = $li.children[0];
  const editMenuValue = prompt(EDIT_MESSAGE, menuName.innerText);
  if (!editMenuValue) return;

  categoryList[categoryKey].forEach(menu => {
    if (menu.id === menuId) menu.name = editMenuValue;
  });

  await putMenu(`${BASE_URL}/api/category/${categoryKey}/menu/${menuId}`, {
    name: editMenuValue
  });
  menuName.innerText = editMenuValue;
};

const removeMenu = async function (event) {
  const $li = event.target.parentElement;
  const menuId = $li.id;
  const removeConfirm = confirm(CONFIRM_MESSAGE);
  if (!removeConfirm) return;

  $li.remove();
  categoryList[categoryKey] = categoryList[categoryKey].filter(
    menu => menu.id !== menuId
  );
  menuCounter();
  await deleteMenu(`${BASE_URL}/api/category/${categoryKey}/menu/${menuId}`);
};

const soldOutMenu = async function (event) {
  const $li = event.target.parentElement;
  const menuId = $li.id;
  const menuName = $li.children[0];
  let soldOut;

  categoryList[categoryKey].forEach(menu => {
    if (menu.id === menuId) {
      menuName.classList.toggle(CLASS_SOLD_OUT);
      [...menuName.classList].includes(CLASS_SOLD_OUT)
        ? (menu.isSoldOut = true)
        : (menu.isSoldOut = false);
    }
    soldOut = menu.isSoldOut;
  });

  await putMenu(
    `${BASE_URL}/api/category/${categoryKey}/menu/${menuId}/soldout`,
    { isSoldOut: soldOut }
  );
};

const renderMenu = function (menu) {
  const $templete = menu
    .map(
      item => `
      <li class="menu-list-item d-flex items-center py-2" id=${item.id}>
          <span class="w-100 pl-2 menu-name ${
            item.isSoldOut ? CLASS_SOLD_OUT : ''
          }">${item.name}</span>
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
    `
    )
    .join('');

  $menuList.innerHTML = $templete;
  menu.forEach(item => handleButtons(item.id));
  menuCounter();
};

const handleButtons = function (id) {
  const $menuItem = document.getElementById(`${id}`);
  const $btnEdit = $('.menu-edit-button', $menuItem);
  const $btnRemove = $('.menu-remove-button', $menuItem);
  const $btnSoldout = $('.menu-sold-out-button', $menuItem);

  $btnEdit.addEventListener(EVENT_LISTENER_CLICK, editMenu);
  $btnRemove.addEventListener(EVENT_LISTENER_CLICK, removeMenu);
  $btnSoldout.addEventListener(EVENT_LISTENER_CLICK, soldOutMenu);
};

const createMenu = async function (menu) {
  const data = await postMenu(`${BASE_URL}/api/category/${categoryKey}/menu`, {
    name: menu
  });
  if (!data) return;

  categoryList[categoryKey].push({ id: data.id, name: menu, isSoldOut: false });

  renderMenu(categoryList[categoryKey]);
  handleButtons(data.id);
  menuCounter();
};

const submitMenu = function (event) {
  event.preventDefault();

  const menuValue = $menuInput.value;
  if (!menuValue) {
    alert(ALERT_MESSAGE);
    return;
  }

  createMenu(menuValue);
  $menuInput.value = '';
};

$menuForm.addEventListener('submit', submitMenu);
$btnSubmitMenu.addEventListener(EVENT_LISTENER_CLICK, submitMenu);
$btnMoonbucksMenu.addEventListener(EVENT_LISTENER_CLICK, manageCategory);
