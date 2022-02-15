import { PROMPT, ALERT, CONFIRM, KEY } from './constants/constants.js';
import { $ } from './DOM.js';
import { menuListTemplate } from './template.js';

class CafeApp {
  constructor() {
    this.$ = {
      menuForm: $('#espresso-menu-form'),
      submitBtn: $('#espresso-menu-submit-button'),
      menuInput: $('#espresso-menu-name'),
      menuListUlElement: $('#espresso-menu-list'),
      menuCount: $('.menu-count'),
      menuListItem: document.getElementsByClassName('menu-list-item'),
    };

    this.bindEventListeners();
  }

  getInputValue(input) {
    const { value } = input;

    return value;
  }

  clearInputValue(input) {
    input.value = '';
  }

  isValidInput(input) {
    if (!input.value) {
      window.alert(ALERT.EMPTY);
      return;
    }

    return true;
  }

  addNewListToUlElement() {
    if (this.isValidInput(this.$.menuInput)) {
      this.$.menuListUlElement.insertAdjacentHTML(
        'beforeend',
        menuListTemplate(
          this.getInputValue(this.$.menuInput),
          this.updateMenuCount(this.$.menuCount, this.$.menuListItem)
        )
      );
    }

    this.clearInputValue(this.$.menuInput);
    this.updateMenuCount(this.$.menuCount, this.$.menuListItem);
  }

  updateMenuCount(count, menuListItem) {
    count.innerText = `총 ${menuListItem.length}개`;

    return menuListItem.length;
  }

  editMenuList(target) {
    const menuItem = target.closest('li').children[0];
    let editedItemName = window.prompt(PROMPT.RENAME);

    if (editedItemName) {
      menuItem.textContent = editedItemName;
    }

    if (!editedItemName) {
      alert(ALERT.RENAME);
    }
  }

  itemSoldOut(target) {
    const menuItem = target.closest('li').children[0];

    if (menuItem.classList.contains('sold-out')) {
      menuItem.classList.remove('sold-out');
    } else {
      menuItem.classList.add('sold-out');
    }
  }

  deleteListItem(target) {
    const result = window.confirm(CONFIRM.DELETE);

    if (result) {
      this.$.menuListUlElement.removeChild(target.parentNode);
    }

    this.updateMenuCount(this.$.menuCount, this.$.menuListItem);
  }

  bindEventListeners() {
    this.$.menuForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    this.$.submitBtn.addEventListener(
      'click',
      this.addNewListToUlElement.bind(this)
    );

    this.$.menuInput.addEventListener('keyup', ({ key }) => {
      if (key === KEY.ENTER) {
        this.addNewListToUlElement();
      }
    });

    this.$.menuListUlElement.addEventListener('click', ({ target }) => {
      if (target.classList.contains('menu-edit-button')) {
        this.editMenuList(target);
      }
      if (target.classList.contains('menu-sold-out-button')) {
        this.itemSoldOut(target);
      }
      if (target.classList.contains('menu-remove-button')) {
        this.deleteListItem(target);
      }
    });
  }
}

new CafeApp();
