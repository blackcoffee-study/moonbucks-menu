import * as menuHandler from './utils/handleMenu.js'

const menuInputTag = document.querySelector('#espresso-menu-form');
const menuListTag = document.querySelector('#espresso-menu-list');

menuInputTag.addEventListener('submit', e => {
  e.preventDefault();
  menuHandler.addMenu();
});

menuListTag.addEventListener('click', e => {
  const closestliTag = e.target.closest('li')
  if(e.target.classList.contains('menu-edit-button')) {
    menuHandler.editMenu(closestliTag);
  } else if (e.target.classList.contains('menu-remove-button')) {
    menuHandler.removeMenu(closestliTag)
  }
});