import { PROMPT, ALERT, CONFIRM } from './constants/constants.js';
import { newList } from './template.js';

class EspressoMenu {
  constructor() {
    this.$ = {
      menuForm: document.querySelector('#espresso-menu-form'),
      submitBtn: document.querySelector('#espresso-menu-submit-button'),
      menuInput: document.querySelector('#espresso-menu-name'),
      ulElement: document.querySelector('#espresso-menu-list'),
      menuListItem: document.getElementsByClassName('menu-list-item'),
      spanElement: document.getElementsByClassName('menu-name'),
      menuEditBtn: document.getElementsByClassName('.menu-edit-Button'),
      menuCount: document.querySelector('.menu-count'),
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
    let isEmpty = false;

    if (input.value === '') {
      window.alert(ALERT.EMPTY);
      return isEmpty;
    } else {
      isEmpty = true;
    }

    return isEmpty;
  }

  addNewListToUlElement() {
    if (this.isValidInput(this.$.menuInput)) {
      console.log(this.$.ulElement);
      this.$.ulElement.insertAdjacentHTML(
        'beforeend',
        newList(
          this.getInputValue(this.$.menuInput),
          this.updateMenuCount(this.$.menuCount, this.$.menuListItem)
        )
      );
    } else {
      return;
    }

    this.clearInputValue(this.$.menuInput);
    this.updateMenuCount(this.$.menuCount, this.$.menuListItem);
  }

  updateMenuCount(count, menuListItem) {
    count.innerText = `총 ${menuListItem.length}개`;

    return menuListItem.length;
  }

  editMenuList(target) {
    const span = target.closest('li').children[0];
    let editedItemName = window.prompt(PROMPT.RENAME);

    if (!editedItemName) {
      alert(ALERT.RENAME);
      editedItemName = window.prompt(PROMPT.RENAME);
    } else {
      span.innerText = editedItemName;
    }
  }

  itemSoldOut(target) {
    const span = target.closest('li').children[0];

    if (span.classList.contains('sold-out')) {
      span.classList.remove('sold-out');
    } else {
      span.classList.add('sold-out');
    }
  }

  deleteListItem(target) {
    const result = window.confirm(CONFIRM.DELETE);

    if (result) {
      this.$.ulElement.removeChild(target.parentNode);
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
      if (key === 'Enter') {
        this.addNewListToUlElement();
      }
    });

    this.$.ulElement.addEventListener('click', ({ target }) => {
      if (target.classList.contains('menu-edit-button')) {
        this.editMenuList(target);
      } else if (target.classList.contains('menu-sold-out-button')) {
        this.itemSoldOut(target);
      } else if (target.classList.contains('menu-remove-button')) {
        this.deleteListItem(target);
      } else {
        return;
      }
    });
  }
}

new EspressoMenu();
