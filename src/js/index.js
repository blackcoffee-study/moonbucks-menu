import $ from './utils/common/selector.js';
import { store } from './utils/common/store.js';
import { addMenuName } from './utils/menu/addMenuName.js';
import { updateMenuName } from './utils/menu/updateMenuName.js';
import { removeMenuName } from './utils/menu/removeMenuName.js';
import { render } from './utils/common/render.js';
import { changeMenu } from './utils/menu/changeMenu.js';

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

  $('#menu-list').addEventListener('click', e => {
    if (e.target.classList.contains('menu-edit-button')) {
      updateMenuName(e, this.menu, this.currentCategory);
    }

    if (e.target.classList.contains('menu-remove-button')) {
      removeMenuName(e, this.menu, this.currentCategory);
    }
  });

  $('#menu-form').addEventListener('submit', e => {
    e.preventDefault();
  });

  $('#menu-submit-button').addEventListener('click', addMenuName);

  $('#menu-name').addEventListener('keypress', e => {
    if (e.key === 'Enter') addMenuName(this.menu, this.currentCategory);
    else return;
  });

  $('nav').addEventListener('click', e => {
    if (e.target.classList.contains('cafe-category-name')) {
      changeMenu(e, this.menu, this.currentCategory);
    }
  });
}

const app = new App();
app.init();
