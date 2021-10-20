import { $ } from './utility/DOMSelector.js';
import {
  EDIT_MESSAGE,
  CONFIRM_MESSAGE,
  ALERT_MESSAGE,
  CLASS_SOLD_OUT,
  STORAGE_KEY_MENU,
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
  dessert: []
};

let categoryKey = 'espresso';
let categoryName;

const manageCategory = function (event) {
  if (event.target.localName === 'nav') return;

  categoryKey = event.target.dataset.categoryName;
  categoryName = event.target.innerText;
  $menuName.innerText = `${categoryName} 메뉴 관리`;

  renderMenu(categoryList[categoryKey]);
};

const menuCounter = function () {
  $menuCount.innerText = `총 ${categoryList[categoryKey].length}개`;
};

const setMenu = function (menu) {
  localStorage.setItem(STORAGE_KEY_MENU, JSON.stringify(menu));
};

const editMenu = function (event) {
  const $li = event.target.parentElement;
  const menuId = parseInt($li.id);
  const menuName = $li.children[0];
  const editMenuValue = prompt(EDIT_MESSAGE, menuName.innerText);
  if (!editMenuValue) return;

  categoryList[categoryKey].forEach(menu => {
    if (menu.id === menuId) menu.name = editMenuValue;
  });
  setMenu(categoryList);
  menuName.innerText = editMenuValue;
};

const removeMenu = function (event) {
  const $li = event.target.parentElement;
  const menuId = parseInt($li.id);
  const removeConfirm = confirm(CONFIRM_MESSAGE);
  if (!removeConfirm) return;

  $li.remove();
  categoryList[categoryKey] = categoryList[categoryKey].filter(
    menu => menu.id !== menuId
  );
  menuCounter();
  setMenu(categoryList);
};

const soldOutMenu = function (event) {
  const $li = event.target.parentElement;
  const menuId = parseInt($li.id);
  const menuName = $li.children[0];

  categoryList[categoryKey].forEach(menu => {
    if (menu.id === menuId) {
      menuName.classList.toggle(CLASS_SOLD_OUT);
      [...menuName.classList].includes(CLASS_SOLD_OUT)
        ? (menu.soldOut = true)
        : (menu.soldOut = false);
    }
  });
  setMenu(categoryList);
};

const renderMenu = function (menu) {
  const templete = menu
    .map(
      item => `
      <li class="menu-list-item d-flex items-center py-2" id=${item.id}>
          <span class="w-100 pl-2 menu-name">${item.name}</span>
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
  $menuList.innerHTML = templete;
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

const createMenu = function (menu) {
  const id = Date.now();
  categoryList[categoryKey].push({ name: menu, id, soldOut: false });
  renderMenu(categoryList[categoryKey]);
  menuCounter();
  handleButtons(id);
  setMenu(categoryList);
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

const getMenu = JSON.parse(localStorage.getItem(STORAGE_KEY_MENU));
if (getMenu !== null) categoryList = getMenu;

renderMenu(categoryList[categoryKey]);
