import { newList } from './template.js';

class EspressoMenu {
  constructor() {
    this.$ = {
      menuForm: document.querySelector('#espresso-menu-form'),
      submitBtn: document.querySelector('#espresso-menu-submit-button'),
      menuInput: document.querySelector('#espresso-menu-name'),
      ulElement: document.querySelector('#espresso-menu-list'),
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
      window.alert('값을 입력해주세요.');
      return isEmpty;
    } else {
      isEmpty = true;
    }

    return isEmpty;
  }

  addNewListToUlElement() {
    if (this.isValidInput()) {
      this.$.ulElement.insertAdjacentHTML(
        'afterbegin',
        newList(this.getEspressoInputValue())
      );
    } else {
      return;
    }

    this.clearEspressoInputValue();
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
  }
}

new EspressoMenu();
