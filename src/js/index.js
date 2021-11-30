import $ from './utils/common/selector.js';
import { store } from './utils/common/store.js';
// import addMenuName from './utils/CRUD/addMenuName.js';
import addMenuName from './utils/CRUD/addMenuName.js';
import updateMenuName from './utils/CRUD/updateMenuName.js';
import removeMenuName from './utils/CRUD/removeMenuName.js';
import render from './utils/common/render.js';

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  this.currentCategory = 'espresso';

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
    render(this.menu, this.currentCategory);
  };

  this.init = () => {
    if (store.getData()) this.menu = store.getData();
    render(this.menu, this.currentCategory);
  };

  $('#espresso-menu-list').addEventListener('click', e => {
    if (e.target.classList.contains('menu-edit-button')) {
      updateMenuName(e, this.menu, this.currentCategory);
    }

    if (e.target.classList.contains('menu-remove-button')) {
      removeMenuName(e, this.menu, this.currentCategory);
    }
  });

  $('#espresso-menu-form').addEventListener('submit', e => {
    e.preventDefault();
  });

  $('#espresso-menu-submit-button').addEventListener('click', addMenuName);

  $('#espresso-menu-name').addEventListener('keypress', e => {
    if (e.key === 'Enter') addMenuName(this.menu, this.currentCategory);
    else return;
  });

  $('nav').addEventListener('click', e => {
    const isCategoryButton = e.target.classList.contains('cafe-category-name');
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName;
    }
  });
}

const app = new App();
app.init();
