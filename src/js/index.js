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

  espressoMenuEdit(target) {
    const editedItemName = window.prompt('메뉴명을 수정하세요.');
    const span = target.closest('li').children[0];

    if (!editedItemName) {
      alert('수정하실 메뉴명을 입력해 주세요.');
    } else {
      span.innerText = editedItemName;
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
      } else {
        return;
      }
    });
  }
}

new EspressoMenu();
