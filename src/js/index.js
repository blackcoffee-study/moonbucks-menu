import { $ } from './utils/dom.js';
import { store } from './store/index.js';
import { REQUIRED_TEXT, UPDATE_NAME_INPUT_TEXT, DELETE_TEXT, CATEGORIES } from './constants/index.js';

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.currentCategory = CATEGORIES.ESPRESSO;
  this.init = () => {
    $('#category-title').textContent = `${$('nav button').textContent} 메뉴 관리`;
    if (store.getLocalStorage()) {
      this.menu = store.getLocalStorage();
    }
    render();
    initEventListeners();
  };

  const render = () => {
    const template = this.menu[this.currentCategory]
      .map((menuItem, index) => {
        return `<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
        <span class="${menuItem.soldOut ? 'sold-out' : ''} w-100 pl-2 menu-name">${menuItem.name}</span>
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

  const addMenuItem = () => {
    const menuName = $('#menu-name').value;
    if (!menuName) {
      alert(REQUIRED_TEXT);
      return;
    }
    this.menu[this.currentCategory].push({ name: menuName });
    store.setLocalStorage(this.menu);
    render();
    $('#menu-name').value = '';
  };

  const updateCount = () => {
    const menuCount = this.menu[this.currentCategory].length;
    $('.menu-count').textContent = `총 ${menuCount}개`;
  };

  const soldOutMenu = ($menuItem) => {
    const menuId = $menuItem.dataset.menuId;
    this.menu[this.currentCategory][menuId].soldOut = !this.menu[this.currentCategory][menuId].soldOut;
    store.setLocalStorage(this.menu);
    render();
  };

  const setMenuName = ($menuItem) => {
    const menuId = $menuItem.dataset.menuId;
    const $menuName = $menuItem.querySelector('.menu-name');
    const updatedMenuName = window.prompt(UPDATE_NAME_INPUT_TEXT, $menuName.innerText);

    if (updatedMenuName === '') {
      alert(REQUIRED_TEXT);
      setMenuName($menuItem);
      return;
    }

    if (!updatedMenuName) return;

    this.menu[this.currentCategory][menuId].name = updatedMenuName;
    store.setLocalStorage(this.menu);
    render();
  };

  const removeMenuItem = ($menuItem) => {
    if (window.confirm(DELETE_TEXT)) {
      const menuId = $menuItem.dataset.menuId;
      this.menu[this.currentCategory].splice(menuId, 1);
      store.setLocalStorage(this.menu);
      render();
    }
  };

  const initEventListeners = () => {
    $('#menu-form').addEventListener('submit', (e) => {
      e.preventDefault();
    });

    $('#menu-submit-button').addEventListener('click', addMenuItem);

    $('#menu-name').addEventListener('keypress', (e) => {
      if (e.key !== 'Enter') {
        return;
      }
      addMenuItem();
    });

    $('#menu-list').addEventListener('click', (e) => {
      const $menuItem = e.target.closest('li');
      if (e.target.classList.contains('menu-edit-button')) {
        setMenuName($menuItem);
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
    });

    $('nav').addEventListener('click', (e) => {
      const isCategoryButton = e.target.classList.contains('cafe-category-name');
      if (isCategoryButton) {
        const categoryName = e.target.dataset.categoryName;
        this.currentCategory = categoryName;
        $('#category-title').textContent = `${e.target.textContent} 메뉴 관리`;
        render();
      }
    });
  };
}

const app = new App();
app.init();
