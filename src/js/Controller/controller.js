import { PROMPT, ALERT, CONFIRM, KEY } from '../constants/constants.js';
import { $ } from '../common/DOM.js';
import { getLocalStorage, setLocalStroage } from '../common/localStorage.js';

export default class Controller {
  constructor(model, view) {
    this.Model = model;
    this.View = view;

    this.$ = {
      nav: $('nav'),
      menuForm: $('#menu-form'),
      submitBtn: $('#menu-submit-button'),
      menuManange: $('ul'),
      menuTitle: $('#category-title'),
      menuList: $('#menu-list'),
      menuCount: $('.menu-count'),
      menuInput: $('#menu-name'),
    };

    this.currentCategory = 'espresso';
  }

  isValidInput(category, value) {
    const storage = getLocalStorage('menu');
    this.Model.menu = storage;

    if (value.length === 0) {
      window.alert(ALERT.EMPTY);
      return;
    }
    if (value.trim().length === 0) {
      window.alert(ALERT.BLANK);
      return;
    }
    if (this.Model.menu[category].includes(value)) {
      window.alert(ALERT.DUPLICATED);
      return;
    }

    return true;
  }

  deleteListItem(target, count, category) {
    const storage = getLocalStorage('menu');
    const name = target.parentNode.children[0].textContent;
    const index = storage[category].indexOf(name);

    this.Model.menu = storage;

    if (window.confirm(CONFIRM.DELETE)) {
      this.Model.menu[category].splice(index, 1);
      setLocalStroage('menu', this.Model.menu);
      this.$.menuManange.removeChild(target.parentNode);
    }

    this.Model.updateMenuCount(count, category);
  }

  editMenuList(target, category) {
    this.Model.menu = getLocalStorage('menu');

    const menuItem = target.closest('li').children[0];
    const name = menuItem.textContent;
    const index = this.Model.menu[category].indexOf(name);
    let editedItemName = window.prompt(PROMPT.RENAME);

    if (editedItemName) {
      menuItem.textContent = editedItemName;
      this.Model.menu[category].splice(index, 1, editedItemName);
      setLocalStroage('menu', this.Model.menu);
    }

    if (!editedItemName) {
      alert(ALERT.RENAME);
    }
  }

  updateStorage(category) {
    this.storeMenusItems(category, this.Model.getInputValue(this.$.menuInput));
  }

  storeMenusItems(category, inputValue) {
    if (this.isValidInput(category, inputValue)) {
      this.Model.menu[category].push(inputValue);

      const exisiingEntries = getLocalStorage('menu');

      if (exisiingEntries !== null) {
        exisiingEntries[category].push(inputValue);
        setLocalStroage('menu', exisiingEntries);
      }

      if (exisiingEntries === null) {
        setLocalStroage('menu', this.Model.menu);
      }
    }
  }

  bindEvent() {
    this.$.menuForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    this.$.menuInput.addEventListener('keyup', ({ key }) => {
      if (key === KEY.ENTER) {
        this.updateStorage(this.currentCategory);

        if (this.$.menuList.dataset.categoryName === this.currentCategory) {
          this.View.render(this.currentCategory);
        }
      }
    });

    this.$.nav.addEventListener('click', ({ target }) => {
      if (target.classList.contains('cafe-category-name')) {
        this.currentCategory = target.dataset.categoryName;

        this.$.menuTitle.textContent = `${target.textContent} 메뉴 관리`;

        this.$.menuList.dataset.categoryName = this.currentCategory;

        this.View.render(this.currentCategory);
      }
    });

    this.$.submitBtn.addEventListener('click', () => {
      this.updateStorage(this.currentCategory);

      if (this.$.menuList.dataset.categoryName === this.currentCategory) {
        this.View.render(this.currentCategory);
      }
    });

    this.$.menuManange.addEventListener('click', ({ target }) => {
      if (target.classList.contains('menu-edit-button')) {
        this.editMenuList(target, this.currentCategory);
      }
      if (target.classList.contains('menu-sold-out-button')) {
        this.Model.itemSoldOut(target);
      }
      if (target.classList.contains('menu-remove-button')) {
        this.deleteListItem(target, this.$.menuCount, this.currentCategory);
      }
    });
  }
}
