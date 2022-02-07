import { $ } from './util/dom.js';
import store from './store/index.js';

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.currentCategory = 'espresso';

  this.init = () => {
    if (store.getLocalStorage('menu')) {
      this.menu = store.getLocalStorage('menu');
    }
    render();
    initEventListeners();
  };

  const render = () => {
    const template = this.menu[this.currentCategory]
      .map((item, idx) => {
        return `
        <li data-menu-id="${idx}" class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name ${
            item.soldOut ? 'sold-out' : ''
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
        </li>`;
      })
      .join('');

    $('#menu-list').innerHTML = template;
    updateMenuCount();
  };

  const updateMenuCount = () => {
    const menuCount = $('#menu-list').querySelectorAll('li').length;

    $('.menu-count').innerText = `총 ${menuCount} 개`;
  };

  const addMenuName = () => {
    if ($('#menu-name').value.trim() === '') {
      alert('값을 입력해 주세요.');
      return;
    }

    const newMenu = { name: $('#menu-name').value, soldOut: false };
    this.menu[this.currentCategory].push(newMenu);
    store.setLocalStorage(this.menu);
    $('#menu-name').value = '';

    render();
  };

  const updateMenuName = e => {
    const menuId = e.target.closest('li').dataset['menuId'];
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const updatedMenuName = window.prompt(
      '메뉴명을 수정하세요.',
      $menuName.innerText,
    );
    if (!updatedMenuName) return;

    this.menu[this.currentCategory][menuId].name = updatedMenuName;
    store.setLocalStorage(this.menu);

    render();
  };

  const removeMenuName = e => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    const menuId = e.target.closest('li').dataset['menuId'];
    this.menu[this.currentCategory].splice(menuId, 1);
    store.setLocalStorage(this.menu);
    render();
  };

  const toggleSoldOutMenu = e => {
    const menuId = e.target.closest('li').dataset['menuId'];
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const isSoldOut = $menuName.classList.contains('sold-out');

    isSoldOut
      ? $menuName.classList.remove('sold-out')
      : $menuName.classList.add('sold-out');
    this.menu[this.currentCategory][menuId]['soldOut'] = !isSoldOut;
    store.setLocalStorage(this.menu);
  };

  const initEventListeners = () => {
    $('#menu-form').addEventListener('submit', e => {
      e.preventDefault();
    });

    $('#menu-list').addEventListener('click', e => {
      if (e.target.classList.contains('menu-sold-out-button')) {
        toggleSoldOutMenu(e);
      }

      if (e.target.classList.contains('menu-edit-button')) {
        updateMenuName(e);
      }

      if (e.target.classList.contains('menu-remove-button')) {
        removeMenuName(e);
      }
    });

    $('#menu-submit-button').addEventListener('click', addMenuName);

    $('#menu-name').addEventListener('keydown', e => {
      if (e.key !== 'Enter') return;

      addMenuName();
    });

    $('nav').addEventListener('click', e => {
      if (!e.target.classList.contains('cafe-category-name')) return;

      this.currentCategory = e.target.dataset['categoryName'];
      $('.menu-title').innerText = `${e.target.innerText} 메뉴 관리`;
      render();
    });
  };
}

const app = new App();
app.init();
