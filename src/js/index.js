import $ from './utils/selector.js';
import storage from './utils/storage.js';

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    dessert: [],
  };

  this.currentCategory = 'espresso';

  this.init = () => {
    if (storage.getLocalStorage()) {
      this.menu = storage.getLocalStorage();
      renderMenuList();
      updateMenuCount();
    }
  };

  const isEmptyString = (string) => {
    if (string === null) {
      return true;
    }
    if (string.trim() === '') {
      return true;
    }
    return false;
  };

  const renderMenuList = () => {
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

  const $menuForm = $('#menu-form');
  const $menuList = $('#menu-list');
  const $menuName = $('#menu-name');
  const $nav = $('nav');

  const updateMenuCount = () => {
    const $menuCount = $('.menu-count');
    const menuCount = this.menu[this.currentCategory].length;

    $menuCount.innerText = `총 ${menuCount}개`;
    $menuName.value = '';
  };

  const addMenuName = () => {
    const menuName = $menuName.value;

    if (isEmptyString(menuName)) {
      alert('값을 입력해주세요.');
      return;
    }
    this.menu[this.currentCategory].push({ name: menuName, soldOut: false });
    storage.setLocalStorage(this.menu);
    renderMenuList();

    updateMenuCount();
  };

  const updatedMenuName = (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    const updatedMenuName = prompt(
      '메뉴명을 수정하세요.',
      this.menu[this.currentCategory][menuId].name
    );

    if (!isEmptyString(updatedMenuName)) {
      this.menu[this.currentCategory][menuId].name = updatedMenuName;
      storage.setLocalStorage(this.menu);
      renderMenuList();
    }
  };

  const removeMenuName = (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    const menuName = $menuList.querySelector('.menu-name').innerText;
    if (confirm(`${menuName} 메뉴를 정말 삭제하시겠습니까?`)) {
      this.menu[this.currentCategory].splice(menuId, 1);
      storage.setLocalStorage(this.menu);
      renderMenuList();
      updateMenuCount();
    }
  };

  const soldOutMenu = (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    this.menu[this.currentCategory][menuId].soldOut =
      !this.menu[this.currentCategory][menuId].soldOut;
    storage.setLocalStorage(this.menu);
    renderMenuList();
  };

  $menuForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addMenuName();
  });

  $menuList.addEventListener('click', (e) => {
    const isTargetHasClass = (className) =>
      e.target.classList.contains(className);
    if (isTargetHasClass('menu-edit-button')) {
      updatedMenuName(e);
      return;
    }

    if (isTargetHasClass('menu-remove-button')) {
      removeMenuName(e);
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
      renderMenuList();
      updateMenuCount();
    }
  });
}

const app = new App();
app.init();
