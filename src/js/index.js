import $ from './utils/common/selector.js';
import { store } from './utils/common/store.js';
// import addMenuName from './utils/CRUD/addMenuName.js';
import addMenuName from './utils/CRUD/addMenuName.js';
import updateMenuName from './utils/CRUD/updateMenuName.js';
import removeMenuName from './utils/CRUD/removeMenuName.js';
import render from './utils/common/render.js';

function App() {
  this.menu = [];

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
    this.render();
  };

  this.init = () => {
    if (store.getData()) this.menu = store.getData();
    render(this.menu);
  };

  $('#espresso-menu-list').addEventListener('click', e => {
    if (e.target.classList.contains('menu-edit-button')) {
      updateMenuName(e, this.menu);
    }

    if (e.target.classList.contains('menu-remove-button')) {
      removeMenuName(e, this.menu);
    }
  });

  $('#espresso-menu-form').addEventListener('submit', e => {
    e.preventDefault();
  });

  $('#espresso-menu-submit-button').addEventListener(
    'click',
    addMenuName,
    this.menu,
  );

  $('#espresso-menu-name').addEventListener('keypress', e => {
    if (e.key === 'Enter') addMenuName(this.menu);
    else return;
  });
}

const app = new App();
app.init();
