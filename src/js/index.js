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

  addNewListToUlElement() {
    this.$.ulElement.insertAdjacentHTML(
      'afterbegin',
      newList(this.getEspressoInputValue())
    );
  }

  bindEventListeners() {
    this.$.menuForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    this.$.submitBtn.addEventListener(
      'click',
      this.addNewListToUlElement.bind(this)
    );
  }
}

new EspressoMenu();
