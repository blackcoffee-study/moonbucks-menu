import $ from './utils/selector.js';
import isEmptyString from './utils/helper.js';
import {Api} from './api';

function App() {
  this.currentCategory = 'espresso';

  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    dessert: [],
  };

  this.init = async () => {
    initEventListener();
    this.menu[this.currentCategory] = await Api.getAllMenuByCategory(this.currentCategory);
    render();
    updateMenuCount();
  };

  const $menuForm = $('#menu-form');
  const $menuList = $('#menu-list');
  const $menuName = $('#menu-name');
  const $nav = $('nav');

  const render = async () => {
    this.menu[this.currentCategory] = await Api.getAllMenuByCategory(this.currentCategory);
    $menuList.innerHTML = this.menu[this.currentCategory]
        .map(
            (menuItem) =>
                `<li data-menu-id="${menuItem.id}" class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name ${menuItem.isSoldOut ? 'sold-out' : ''
                }">${menuItem.name}</span>
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
        </li>`
        )
        .join('');
    updateMenuCount();
  };

  const updateMenuCount = () => {
    const $menuCount = $('.menu-count');
    const menuCount = this.menu[this.currentCategory].length;

    $menuCount.innerText = `총 ${menuCount}개`;
  };

  const addMenu = async () => {
    const menuName = $menuName.value;

    if (isEmptyString(menuName)) {
      alert('값을 입력해주세요.');
      return;
    }

    if(existDuplicateMenuName(menuName)){
      alert('이미 존재하는 메뉴 명입니다.');
      return;
    }

    await Api.createMenu(this.currentCategory, menuName);
    $menuName.value = '';
    render();
  };

  const updateMenu = async (menuId) => {
    const menuName = $menuList.querySelector('.menu-name').innerText;
    const updatedMenuName = prompt(
        '메뉴명을 수정하세요.',
        menuName
    );
    if(existDuplicateMenuName(updatedMenuName)){
      alert('이미 존재하는 메뉴 명입니다.');
      return;
    }

    if (!isEmptyString(updatedMenuName)) {
      await Api.updateMenu(this.currentCategory, updatedMenuName, menuId);
      render();
    }
  };

  const removeMenu = async (menuId) => {
    const menuName = $menuList.querySelector('.menu-name').innerText;
    if (confirm(`${menuName} 메뉴를 정말 삭제하시겠습니까?`)) {
      await Api.deleteMenu(this.currentCategory, menuId);
      render();
    }
  };

  const soldOutMenu = async (menuId) => {
    await Api.toggleSoldOutMenu(this.currentCategory, menuId);
    render();
  };

  const changeCategory = (e)=>{
    const categoryName = e.target.dataset.categoryName;

    if (categoryName != null) {
      this.currentCategory = categoryName;
      $('#category-title').innerText = `${e.target.innerText} 메뉴 관리`;
      render();
    }
  }

  const existDuplicateMenuName = (menuName) => this.menu[this.currentCategory].find((menu)=> menu.name === menuName);

  const initEventListener = () => {
    $menuForm.addEventListener('submit', (e) => {
      e.preventDefault();
      addMenu();
    });

    $menuList.addEventListener('click', (e) => {
      const isTargetHasClass = (className) =>
        e.target.classList.contains(className);
      const menuId = e.target.closest('li').dataset.menuId;
      if (isTargetHasClass('menu-edit-button')) {
        updateMenu(menuId);
        return;
      }

      if (isTargetHasClass('menu-remove-button')) {
        removeMenu(menuId);
        return;
      }

      if (isTargetHasClass('menu-sold-out-button')) {
        soldOutMenu(menuId);
        return;
      }
    });

    $nav.addEventListener('click', changeCategory);
  };
}

const app = new App();
app.init();
