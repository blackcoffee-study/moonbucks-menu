import { $ } from './utils/dom.js';
import { REQUIRED_TEXT, UPDATE_NAME_INPUT_TEXT, DELETE_TEXT, CATEGORIES, DUPLICATED_ITEM_TEXT } from './constants/index.js';
import { MenuApi } from './api/index.js';

function App() {
  this.menu = {};
  for (const key in CATEGORIES) {
    this.menu[CATEGORIES[key]] = [];
  }
  this.currentCategory = CATEGORIES.ESPRESSO;
  this.init = async () => {
    render();
    initEventListeners();
  };

  const render = async () => {
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(this.currentCategory);
    if (!this.menu[this.currentCategory]) return;
    const template = this.menu[this.currentCategory]
      .map((menuItem) => {
        return `<li data-menu-id="${menuItem.id}" class="menu-list-item d-flex items-center py-2">
        <span class="${menuItem.isSoldOut ? 'sold-out' : ''} w-100 pl-2 menu-name">${menuItem.name}</span>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button">
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
      </li>`;
      })
      .join('');
    $('#menu-list').innerHTML = template;
    updateCount();
  };

  const addMenuItem = async () => {
    const menuName = $('#menu-name').value;
    const duplicatedItem = this.menu[this.currentCategory].find((menuItem) => menuItem.name === menuName);
    if (!menuName) {
      alert(REQUIRED_TEXT);
      return;
    }
    if (duplicatedItem) {
      alert(DUPLICATED_ITEM_TEXT);
      $('#menu-name').value = '';
      return;
    }
    await MenuApi.createMenu(this.currentCategory, menuName);
    render();
    $('#menu-name').value = '';
  };

  const updateCount = () => {
    const menuCount = this.menu[this.currentCategory].length;
    $('.menu-count').textContent = `총 ${menuCount}개`;
  };

  const soldOutMenu = async ($menuItem) => {
    const menuId = $menuItem.dataset.menuId;
    await MenuApi.toggleSoldOutMenu(this.currentCategory, menuId);
    render();
  };

  const updateMenuName = async ($menuItem) => {
    const menuId = $menuItem.dataset.menuId;
    const $menuName = $menuItem.querySelector('.menu-name');
    const updatedMenuName = window.prompt(UPDATE_NAME_INPUT_TEXT, $menuName.innerText);

    if (updatedMenuName === '') {
      alert(REQUIRED_TEXT);
      updateMenuName($menuItem);
      return;
    }

    if (!updatedMenuName) return;
    await MenuApi.updateMenu(this.currentCategory, menuId, updatedMenuName);
    render();
  };

  const removeMenuItem = async ($menuItem) => {
    if (window.confirm(DELETE_TEXT)) {
      const menuId = $menuItem.dataset.menuId;
      await MenuApi.removeMenu(this.currentCategory, menuId);
      render();
    }
  };

  const changeCategory = (e) => {
    const isCategoryButton = e.target.classList.contains('cafe-category-name');
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName;
      this.currentCategory = categoryName;
      $('#category-title').textContent = `${e.target.textContent} 메뉴 관리`;
      render();
    }
  };

  const onClickMenuButton = (e) => {
    const $menuItem = e.target.closest('li');
    if (e.target.classList.contains('menu-edit-button')) {
      updateMenuName($menuItem);
      return;
    }
    if (e.target.classList.contains('menu-remove-button')) {
      removeMenuItem($menuItem);
      return;
    }
    if (e.target.classList.contains('menu-sold-out-button')) {
      soldOutMenu($menuItem);
      return;
    }
  };

  const onKeypressMenuNameInput = (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    addMenuItem();
  };

  const initEventListeners = () => {
    $('#menu-form').addEventListener('submit', (e) => {
      e.preventDefault();
    });
    $('#menu-submit-button').addEventListener('click', addMenuItem);
    $('#menu-name').addEventListener('keypress', onKeypressMenuNameInput);
    $('#menu-list').addEventListener('click', onClickMenuButton);
    $('nav').addEventListener('click', changeCategory);
  };
}

const app = new App();
app.init();
