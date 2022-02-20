import { CATEGORIES, LOCALSTORAGE } from '../constants/constants.js';
import { $ } from '../common/DOM.js';
import { getLocalStorage, setLocalStroage } from '../common/localStorage.js';
import Model from '../Model/model.js';
import { menuListTemplate } from '../common/template.js';

export default class View {
  constructor() {
    this.Model = new Model();

    this.$ = {
      menuInput: $('#menu-name'),
      menuList: $('#menu-list'),
      menuCount: $('.menu-count'),
    };
  }

  initApp() {
    const storage = getLocalStorage(LOCALSTORAGE.ITEM);

    if (storage === null) {
      setLocalStroage(LOCALSTORAGE.ITEM, this.Model.menu);
    }
    this.render(CATEGORIES.ESPRESSO.EN);
  }

  render(category) {
    const storage = getLocalStorage(LOCALSTORAGE.ITEM);

    if (storage === null) {
      return;
    }

    this.$.menuList.innerHTML = '';
    storage[category].map((item, count) => {
      this.$.menuList.insertAdjacentHTML(
        'beforeend',
        menuListTemplate(item, count)
      );
    });

    this.Model.clearInputValue(this.$.menuInput);
    this.Model.updateMenuCount(this.$.menuCount, category);
  }
}
