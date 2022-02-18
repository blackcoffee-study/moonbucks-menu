import { addMenu, updateMenu, removeMenu, render } from './utils.js';
import store from './reducer.js';

const $menuForm = document.querySelector('#espresso-menu-form');
const $menuList = document.querySelector('#espresso-menu-list');

(() => {
  store.subscribe(render);

  $menuForm.addEventListener('submit', addMenu);
  $menuList.addEventListener('click', ({ target }) => {
    const { type } = target.dataset;
    if (type === 'edit') {
      updateMenu(target);
    }
    if (type === 'remove') {
      removeMenu(target);
    }
  })
  render();
})();

