import { CATEGORIES } from './constants/constants.js';
import { $, $$ } from './DOM.js';
import Model from './model.js';
import { mainMenuTemplate } from './template.js';

export default class View {
  constructor() {
    this.get = {
      app: $('#app'),
      mainContainer: $('.main-container'),
    };

    // Default page
    this.renderMenu(CATEGORIES.ESPRESSO);

    this.model = new Model();
    this.$ = {
      espressoMenu: $('.espresso-container'),
    };
    this.$$ = {
      mainContainer: $$('.main-container'),
    };
    this.initApp();
  }

  // take constants as parameter ( parameter can be destructed ???)
  renderMenu(CATEGORIES) {
    this.get.mainContainer.insertAdjacentHTML(
      'afterbegin',
      mainMenuTemplate(CATEGORIES.EMOJI, CATEGORIES.KR, CATEGORIES.EN)
    );
  }

  // Manipulate visibility
  hideMenu(target) {
    [...this.$$.mainContainer].map((container) => {
      [...container.children].map((menu) => {
        menu.hidden = true;

        if (menu.classList.contains(target)) {
          menu.hidden = false;
        }
      });
    });
  }

  // Render one menu container without while loop it renders endless menu containers
  switchMenu(CATEGORIES, target) {
    const container = document.getElementsByClassName(target);

    while (container.length < 1) {
      this.renderMenu(CATEGORIES);
    }
    this.hideMenu(target);
  }

  // Render targeted menu and manipulate vidibility
  initApp() {
    this.get.app.addEventListener('click', ({ target }) => {
      if (target.dataset.categoryName === 'espresso') {
        this.switchMenu(CATEGORIES.ESPRESSO, 'espresso-container');
      }
      if (target.dataset.categoryName === 'frappuccino') {
        this.switchMenu(CATEGORIES.FRAPPUCCINO, 'frappuccino-container');
      }
      if (target.dataset.categoryName === 'blended') {
        this.switchMenu(CATEGORIES.BLENDED, 'blended-container');
      }
      if (target.dataset.categoryName === 'teavana') {
        this.switchMenu(CATEGORIES.TEAVANA, 'teavana-container');
      }
      if (target.dataset.categoryName === 'desert') {
        this.switchMenu(CATEGORIES.DESERT, 'desert-container');
      }
    });
  }
}
