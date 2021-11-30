import $ from './utils/common/selector.js';
import { store } from './utils/common/store.js';
import { addMenuName } from './utils/menu/addMenuName.js';
import { updateMenuName } from './utils/menu/updateMenuName.js';
import { removeMenuName } from './utils/menu/removeMenuName.js';
import { render } from './utils/common/render.js';
import { soldOutMenu } from './utils/menu/soldOutMenu.js';

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  console.log('cate: ', this.currentCategory);

  this.init = () => {
    if (store.getData()) this.menu = store.getData();
    this.currentCategory = 'espresso';
    $('#category-title').innerText = `${this.currentCategory} 메뉴 관리`;
    render(this.menu, this.currentCategory);
    this.initEventListeners();
  };

  this.initEventListeners = () => {
    $('#menu-list').addEventListener('click', e => {
      if (e.target.classList.contains('menu-edit-button')) {
        updateMenuName(e, this.menu, this.currentCategory);
        return;
      }

      if (e.target.classList.contains('menu-remove-button')) {
        removeMenuName(e, this.menu, this.currentCategory);
        return;
      }

      if (e.target.classList.contains('menu-sold-out-button')) {
        soldOutMenu(e, this.menu, this.currentCategory);
        return;
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
        const categoryName = e.target.dataset.categoryName;
        this.currentCategory = categoryName;
        $('#category-title').innerText = `${e.target.innerText} 메뉴 관리`;
        render(this.menu, this.currentCategory);
      }
    });
  };
}

const app = new App();
app.init();
