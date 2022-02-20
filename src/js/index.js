import * as menuHandler from './utils/handleMenu.js';
import {menuListRender} from './utils/elements.js'
import { $, $All } from './utils/common.js';

const menuInputElement = $('#espresso-menu-form');
const menuListElement = $('#espresso-menu-list');
const cafeCategoryButtonElements = $All('.cafe-category-name');

localStorage.setItem('currentMenuType', 'espresso');

menuInputElement.addEventListener('submit', e => {
  e.preventDefault();
  const currentMenuType = localStorage.getItem('currentMenuType');
  menuHandler.addMenu(currentMenuType);
});

menuListElement.addEventListener('click', e => {
  const closestliElement = e.target.closest('li');
  const currentMenuType = localStorage.getItem('currentMenuType');

  if(e.target.classList.contains('menu-edit-button')) {
    menuHandler.editMenu(currentMenuType, closestliElement);
  } else if (e.target.classList.contains('menu-remove-button')) {
    menuHandler.removeMenu(currentMenuType,closestliElement);
  } else if (e.target.classList.contains('menu-sold-out-button')) {
    menuHandler.setSoldOutMenu(currentMenuType, closestliElement);
  }
});

cafeCategoryButtonElements.forEach(cafeCategoryButtonElement => {
  cafeCategoryButtonElement.addEventListener('click', e => {
    const menuCategoryName = e.target.dataset.categoryName;

    localStorage.setItem('currentMenuType', menuCategoryName);
    menuListRender(menuCategoryName);
    menuHandler.changeMenuListHeader(menuCategoryName);
    menuHandler.changeCountMenu();
  })
});
