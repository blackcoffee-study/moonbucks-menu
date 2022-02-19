import * as menuHandler from './utils/handleMenu.js';
import {menuListRender} from './utils/elements.js'
import { $, $All } from './utils/common.js';

const menuInputTag = $('#espresso-menu-form');
const menuListTag = $('#espresso-menu-list');
const cafeCategoryButtonTags = $All('.cafe-category-name');

localStorage.setItem('currentMenuType', 'espresso');

menuInputTag.addEventListener('submit', e => {
  e.preventDefault();
  const currentMenuType = localStorage.getItem('currentMenuType');
  menuHandler.addMenu(currentMenuType);
});

menuListTag.addEventListener('click', e => {
  const closestliTag = e.target.closest('li');
  const currentMenuType = localStorage.getItem('currentMenuType');

  if(e.target.classList.contains('menu-edit-button')) {
    menuHandler.editMenu(currentMenuType, closestliTag);
  } else if (e.target.classList.contains('menu-remove-button')) {
    menuHandler.removeMenu(currentMenuType,closestliTag);
  } else if (e.target.classList.contains('menu-sold-out-button')) {
    menuHandler.setSoldOutMenu(currentMenuType, closestliTag);
  }
});

cafeCategoryButtonTags.forEach(cafeCategoryButtonTag => {
  cafeCategoryButtonTag.addEventListener('click', e => {
    const menuCategoryName = e.target.dataset.categoryName;

    localStorage.setItem('currentMenuType', menuCategoryName);
    menuListRender(menuCategoryName);
    menuHandler.changeMenuListHeader(menuCategoryName);
  })
});
