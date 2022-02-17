import { addMenu, updateMenu, removeMenu, menuRender, updateMenuCategory, getLocalStorage, soldoutMenu } from './utils.js';
import store, { LOAD_MENU_ITEM } from './reducer.js';

const $categoryList = document.querySelectorAll('.cafe-category-name');
const $menuForm = document.querySelector('#menu-form');
const $menuList = document.querySelector('#menu-list');

(() => {
  store.subscribe(menuRender);

  $menuForm.addEventListener('submit', addMenu);

  $categoryList.forEach(($category) => $category.addEventListener('click', updateMenuCategory));
  
  $menuList.addEventListener('click', ({ target }) => {
    const { type } = target.dataset;
    if (type === 'edit') {
      updateMenu(target);
    }
    if (type === 'remove') {
      removeMenu(target);
    }
    if (type === 'soldout') {
      soldoutMenu(target);
    }
  })
  const menuList = getLocalStorage('espresso');
  store.dispatch({
    type: LOAD_MENU_ITEM,
    data: menuList,
  })
  menuRender();
})();

