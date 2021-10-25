import { $ } from './utility/DOMSelector.js';
import { httpMethod } from './api/index.js';
import * as CONSTANT from './constants/index.js';

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

let categoryMenu = 'espresso';
let category;

const getMenuItem = async function () {
  const data = await httpMethod.getMenu(categoryMenu);
  if (!data) return;

  categoryList[categoryMenu] = data;
  renderMenu(categoryList[categoryMenu]);
};
getMenuItem();

const manageCategory = function (event) {
  if (event.target.localName === 'nav') return;

  categoryMenu = event.target.dataset.category;
  category = event.target.innerText;
  $menuName.innerText = `${category} 메뉴 관리`;

  getMenuItem();
};

const menuCounter = function () {
  $menuCount.innerText = `총 ${categoryList[categoryMenu].length}개`;
};

const editMenu = async function (event) {
  const $li = event.target.parentElement;
  const menuId = $li.id;
  const menuName = $li.children[0];
  const editMenuValue = prompt(CONSTANT.EDIT_MESSAGE, menuName.innerText);
  if (!editMenuValue) return;

  categoryList[categoryMenu].forEach(menu => {
    if (menu.id === menuId) menu.name = editMenuValue;
  });

  await httpMethod.editMenu(editMenuValue, categoryMenu, menuId);
  menuName.innerText = editMenuValue;
};

const removeMenu = async function (event) {
  const $li = event.target.parentElement;
  const menuId = $li.id;
  const removeConfirm = confirm(CONSTANT.CONFIRM_MESSAGE);
  if (!removeConfirm) return;

  $li.remove();
  categoryList[categoryMenu] = categoryList[categoryMenu].filter(
    menu => menu.id !== menuId
  );
  menuCounter();
  await httpMethod.removeMenu(categoryMenu, menuId);
};

const soldOutMenu = async function (event) {
  const $li = event.target.parentElement;
  const menuId = $li.id;
  const menuName = $li.children[0];
  let soldOut;

  categoryList[categoryMenu].forEach(menu => {
    if (menu.id === menuId) {
      menuName.classList.toggle(CONSTANT.CLASS_SOLD_OUT);
      [...menuName.classList].includes(CONSTANT.CLASS_SOLD_OUT)
        ? (menu.isSoldOut = true)
        : (menu.isSoldOut = false);
    }
    soldOut = menu.isSoldOut;
  });

  await httpMethod.soldOutMenu(categoryMenu, soldOut, menuId);
};

const renderMenu = function (menu) {
  const $templete = menu
    .map(
      item => `
      <li class="menu-list-item d-flex items-center py-2" id=${item.id}>
          <span class="w-100 pl-2 menu-name ${
            item.isSoldOut ? CONSTANT.CLASS_SOLD_OUT : ''
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

  $btnEdit.addEventListener(CONSTANT.EVENT_CLICK, editMenu);
  $btnRemove.addEventListener(CONSTANT.EVENT_CLICK, removeMenu);
  $btnSoldout.addEventListener(CONSTANT.EVENT_CLICK, soldOutMenu);
};

const createMenu = async function (menu) {
  const data = await httpMethod.createMenu(menu, categoryMenu);
  if (!data) return;

  categoryList[categoryMenu].push({
    id: data.id,
    name: menu,
    isSoldOut: false
  });

  renderMenu(categoryList[categoryMenu]);
  handleButtons(data.id);
  menuCounter();
};

const submitMenu = function (event) {
  event.preventDefault();

  const menuValue = $menuInput.value;
  if (!menuValue) {
    alert(CONSTANT.ALERT_MESSAGE);
    return;
  }

  createMenu(menuValue);
  $menuInput.value = '';
};

$menuForm.addEventListener('submit', submitMenu);
$btnSubmitMenu.addEventListener(CONSTANT.EVENT_CLICK, submitMenu);
$btnMoonbucksMenu.addEventListener(CONSTANT.EVENT_CLICK, manageCategory);
