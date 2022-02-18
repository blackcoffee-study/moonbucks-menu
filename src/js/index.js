import { addMenu,
  updateMenu,
  removeMenu,
  updateSoldout,
  init } from './common/utils/menu.js';
import { updateCategory } from './common/utils/category.js';

const $categoryList = document.querySelectorAll('.cafe-category-name');
const $menuForm = document.querySelector('#menu-form');
const $menuList = document.querySelector('#menu-list');

(() => {
  $menuForm.addEventListener('submit', addMenu);

  $categoryList.forEach(($category) => $category.addEventListener('click', updateCategory));
  
  $menuList.addEventListener('click', ({ target }) => {
    const { type } = target.dataset;
    if (type === 'edit') {
      updateMenu(target);
    }
    if (type === 'remove') {
      removeMenu(target);
    }
    if (type === 'soldout') {
      updateSoldout(target);
    }
  })
  init('espresso');
})();

