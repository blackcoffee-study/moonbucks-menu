import $ from './utils/selector.js';
import storage from './storage/index.js';
import isEmptyString from './utils/helper.js';

function App() {
  this.currentCategory = 'espresso';

  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    dessert: [],
  };

  this.init = () => {
    initEventListener();
    if (storage.getLocalStorage()) {
      this.menu = storage.getLocalStorage();
      render();
      updateMenuCount();
    }
  };

  const $menuForm = $('#menu-form');
  const $menuList = $('#menu-list');
  const $menuName = $('#menu-name');
  const $nav = $('nav');

  const render = () => {
    const menuListTemplate = this.menu[this.currentCategory]
      .map(
        (menuItem, index) =>
          `<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name ${
          menuItem.soldOut ? 'sold-out' : ''
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

    $menuList.innerHTML = menuListTemplate;
  };

  const updateMenuCount = () => {
    const $menuCount = $('.menu-count');
    const menuCount = this.menu[this.currentCategory].length;

    $menuCount.innerText = `총 ${menuCount}개`;
  };

  const addMenu = () => {
    const menuName = $menuName.value;

    if (isEmptyString(menuName)) {
      alert('값을 입력해주세요.');
      return;
    }
    this.menu[this.currentCategory].push({ name: menuName, soldOut: false });
    storage.setLocalStorage(this.menu);
    render();

    updateMenuCount();
    $menuName.value = '';
  };

  const updateMenu = (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    const updatedMenuName = prompt(
      '메뉴명을 수정하세요.',
      this.menu[this.currentCategory][menuId].name
    );

    if (!isEmptyString(updatedMenuName)) {
      this.menu[this.currentCategory][menuId].name = updatedMenuName;
      storage.setLocalStorage(this.menu);
      render();
    }
  };

  const removeMenu = (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    const menuName = $menuList.querySelector('.menu-name').innerText;
    if (confirm(`${menuName} 메뉴를 정말 삭제하시겠습니까?`)) {
      this.menu[this.currentCategory].splice(menuId, 1);
      storage.setLocalStorage(this.menu);
      render();
      updateMenuCount();
    }
  };

  const soldOutMenu = (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    this.menu[this.currentCategory][menuId].soldOut =
      !this.menu[this.currentCategory][menuId].soldOut;
    storage.setLocalStorage(this.menu);
    render();
  };

  $menuForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addMenu();
  });

  const initEventListener = () => {
    $menuList.addEventListener('click', (e) => {
      const isTargetHasClass = (className) =>
        e.target.classList.contains(className);
      if (isTargetHasClass('menu-edit-button')) {
        updateMenu(e);
        return;
      }

      if (isTargetHasClass('menu-remove-button')) {
        removeMenu(e);
        return;
      }

      if (isTargetHasClass('menu-sold-out-button')) {
        soldOutMenu(e);
        return;
      }
    });

    $nav.addEventListener('click', (e) => {
      const categoryName = e.target.dataset.categoryName;

      if (categoryName != null) {
        this.currentCategory = categoryName;
        $('#category-title').innerText = `${e.target.innerText} 메뉴 관리`;
        render();
        updateMenuCount();
      }
    });
  };
}

const app = new App();
app.init();
