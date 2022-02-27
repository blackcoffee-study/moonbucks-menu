import { LOCALSTORAGE } from '../constants/constants.js';
import { $ } from '../common/DOM.js';
import { getLocalStorage } from '../common/localStorage.js';
import { menuListTemplate } from '../common/template.js';

export default class View {
  constructor() {
    this.$ = {
      menuList: $('#menu-list'),
    };
  }

  clearInputValue(input) {
    input.value = '';
  }

  updateMenuCount(target, category) {
    const storage = getLocalStorage(LOCALSTORAGE.ITEM);

    target.textContent = `총 ${storage[category].length}개`;
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
  }
}
