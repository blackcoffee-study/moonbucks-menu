
import { $ } from '../utils/dom.js';

export default function MenuInput({ onAdd }) {
  this.menuInputEl = $('#menu-name');
  this.submitBtnEl = $('#menu-submit-button');
  this.submitForm = $('#menu-form');

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
