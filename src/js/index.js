import { PROMPT, ALERT, CONFIRM } from './constants/constants.js';
import { newList } from './template.js';

class EspressoMenu {
  constructor() {
    this.$ = {
      menuForm: document.querySelector('#espresso-menu-form'),
      submitBtn: document.querySelector('#espresso-menu-submit-button'),
      menuInput: document.querySelector('#espresso-menu-name'),
      ulElement: document.querySelector('#espresso-menu-list'),
      listElement: document.getElementsByClassName('menu-list-item'),
      spanElement: document.getElementsByClassName('menu-name'),
      menuEditBtn: document.getElementsByClassName('.menu-edit-Button'),
      menuCount: document.querySelector('.menu-count'),
    };

    this.bindEventListeners();
  }

  getEspressoInputValue() {
    const { value } = this.$.menuInput;

    return value;
  }

  clearEspressoInputValue() {
    let input = this.$.menuInput;

    input.value = '';
  }

  isValidInput() {
    let isEmpty = false;

    if (this.$.menuInput.value === '') {
      window.alert(ALERT.EMPTY);
      return isEmpty;
    } else {
      isEmpty = true;
    }

    return isEmpty;
  }

  addNewListToUlElement() {
    if (this.isValidInput()) {
      this.$.ulElement.insertAdjacentHTML(
        'beforeend',
        newList(this.getEspressoInputValue(), this.updateEspressoMenuCount())
      );
    } else {
      return;
    }

    this.clearEspressoInputValue();
    this.updateEspressoMenuCount();
  }

  updateEspressoMenuCount() {
    this.$.menuCount.innerText = `총 ${this.$.listElement.length}개`;

    return this.$.listElement.length;
  }

  // Button Events

  espressoMenuEdit(target) {
    const editedItemName = window.prompt(PROMPT.RENAME);
    const span = target.closest('li').children[0];

    if (!editedItemName) {
      alert(ALERT.RENAME);
    } else {
      span.innerText = editedItemName;
    }
  }

  espressoSoldOut(target) {
    const span = target.closest('li').children[0];

    if (span.classList.contains('sold-out')) {
      span.classList.remove('sold-out');
    } else {
      span.classList.add('sold-out');
    }
  }

  deleteEspressoListItem(target) {
    const result = window.confirm(CONFIRM.DELETE);

    if (result) {
      this.$.ulElement.removeChild(target.parentNode);
    }
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
        this.espressoMenuEdit(target);
      } else if (target.classList.contains('menu-sold-out-button')) {
        this.espressoSoldOut(target);
      } else if (target.classList.contains('menu-remove-button')) {
        this.deleteEspressoListItem(target);
      } else {
        return;
      }
    });
  }
}

new EspressoMenu();
