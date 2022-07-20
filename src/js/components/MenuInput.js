import { $ } from '../utils/index.js';

export default function MenuInput({ onAdd }) {
  this.menuInputEl = $('#espresso-menu-name');
  this.submitBtnEl = $('#espresso-menu-submit-button');
  this.submitForm = $('#espresso-menu-form');

  this.submitBtnEl.addEventListener('click', () => this.addMenu());
  this.menuInputEl.addEventListener('keypress', e => {
    if (e.key !== 'Enter') return;
    this.addMenu();
  });
  this.submitForm.addEventListener('submit', e => {
    e.preventDefault();
  });

  this.addMenu = () => {
    if (this.menuInputEl.value === '') return;
    onAdd(this.menuInputEl.value);
    this.cleanInput();
  };

  this.cleanInput = () => {
    this.menuInputEl.value = '';
  };
}
