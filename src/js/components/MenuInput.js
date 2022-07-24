import { $ } from '../utils/index.js';

export default function MenuInput({ onAdd }) {
  this.menuInputEl = $('#espresso-menu-name');
  this.submitBtnEl = $('#espresso-menu-submit-button');
  this.submitForm = $('#espresso-menu-form');

  this.submitBtnEl.addEventListener('click', () => this.addMenu());

  this.submitForm.addEventListener('submit', e => {
    this.addMenu();
    e.preventDefault();
  });

  this.addMenu = function () {
    if (this.menuInputEl.value === '') return;
    onAdd(this.menuInputEl.value);
    this.cleanInput();
  };

  this.cleanInput = function () {
    this.menuInputEl.value = '';
  };
}
