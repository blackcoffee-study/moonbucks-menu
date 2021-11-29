import $ from './utils/common/selector.js';
import { store } from './utils/common/store.js';
// import addMenuName from './utils/CRUD/addMenuName.js';
import addMenuName from './utils/CRUD/addMenuName.js';
import updateMenuName from './utils/CRUD/updateMenuName.js';
import removeMenuName from './utils/CRUD/removeMenuName.js';

function App() {
  // 상태(=변할 수 있는 데이터) - 갯수, 메뉴명
  this.menu = [];

  $('#espresso-menu-list').addEventListener('click', e => {
    if (e.target.classList.contains('menu-edit-button')) {
      updateMenuName(e, this.menu);
    }

    if (e.target.classList.contains('menu-remove-button')) {
      removeMenuName(e);
    }
  });

  $('#espresso-menu-form').addEventListener('submit', e => {
    e.preventDefault();
  });

  $('#espresso-menu-submit-button').addEventListener('click', addMenuName);

  $('#espresso-menu-name').addEventListener('keypress', e => {
    if (e.key === 'Enter') addMenuName(this.menu);
    else return;
  });
}

const app = new App();
