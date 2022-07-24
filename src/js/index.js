import { $, $id } from './utils/dom.js';
import LocalStorage from './utils/localStorage.js'

function App () {
  const MenuListStorage = new LocalStorage('menuList');

  // states
  // [{name: string; category: string; isSoldOut: boolean;}]
  let menuList = MenuListStorage.get() ?? [];
  let category = 'espresso';

  window.onload = () => {
    initEventListenes();
    renderAboutMenus();
  };

  // utils
  const getMenuId = (target) => {
    return Number(target.parentElement.dataset.menuId);
  };

  // events
  const addMenu = () => {
    let name = $id('menu-name').value;
    if (!name) return;

    menuList = [...menuList, {name, category}];
    MenuListStorage.set(menuList);
    renderAboutMenus();
    $id('menu-name').value = '';
  };

  const editMenu = ({target}) => {
    const name = window.prompt('메뉴명을 수정하세요');
    if (!name) return;

    const menuId = getMenuId(target);
    menuList = menuList.map((menu, index) => index === menuId ? {...menu, name} : menu);
    MenuListStorage.set(menuList);
    renderAboutMenus();
  };

  const removeMenu = ({target}) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    const menuId = getMenuId(target);
    menuList = menuList.filter((_, index) => index !== menuId);
    MenuListStorage.set(menuList);
    renderAboutMenus();
  };

  const toggleIsSoldOut = ({target}) => {
    const menuId = getMenuId(target);
    menuList = menuList.map((menu, index) => 
      index === menuId ? {...menu, isSoldOut: !menu.isSoldOut} : menu,
    );
    MenuListStorage.set(menuList);
    renderAboutMenus();
  };

  const setCategory = ({target}) => {
    const selectedCategory = target.dataset.categoryName;
    category = selectedCategory;
    $id('category-title').textContent = `${target.textContent} 메뉴 관리`;
    renderAboutMenus();
  };

  // addEventListeners
  const initEventListenes = () => {
    const $form = $id('menu-form');
    $form.addEventListener('submit', (e) => {
      e.preventDefault();
      addMenu();
    });
    
    const $menu = $id('menu-list');
    $menu.addEventListener('click', (e) => {
      switch (e.target.dataset.action) {
        case 'edit': 
          editMenu(e);
          return;
        case 'remove':
          removeMenu(e);
          return;
        case 'sold-out':
          toggleIsSoldOut(e);
          return;
      }
    });

    const $categoryList = $id('cafe-category-name-list');
    $categoryList.addEventListener('click', setCategory);
  };

  // renders
  const renderAboutMenus = () => {
    const menuListTemplate = menuList
      .filter(menu => menu.category === category)
      .map((menu, index) => {
      return `
        <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name${menu.isSoldOut ? ' sold-out' : ''}">${menu.name}</span>
          <button
            type="button"
            data-action="sold-out"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
            >
            품절
            </button>
            <button
            type="button"
            data-action="edit"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
            >
            수정
            </button>
            <button
            type="button"
            data-action="remove"
            class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
          >
            삭제
          </button>
        </li>
        `
    });
    $id('menu-list').innerHTML = menuListTemplate.join('');
    
    renderMenuCount(menuListTemplate.length);
  };

  const renderMenuCount = (count) => {
    $('.menu-count').textContent = `총 ${count}개`;
  };
}

App();
