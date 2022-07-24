import { $ } from '../utils/index.js';
import { UPDATE_MSG, DELETE_MSG } from '../constants/index.js';
export default function MenuList({ onUpdate, onDelete }) {
  this.menuListEl = $('#espresso-menu-list');
  this.menuListEl.addEventListener('click', e => {
    if (e.target.classList.contains('menu-edit-button')) {
      this.updateMenu(e.target.parentNode);
    } else if (e.target.classList.contains('menu-remove-button')) {
      this.deleteMenu(e.target.parentNode);
    }
  });

  this.makeMenuElement = function (name, id) {
    return `<li id=${id} class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${name}</span>
            <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
            >
            수정
            </button>
            <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
            >
            삭제
            </button>
            </li>`;
  };

  this.addMenu = function (name, id) {
    const menu = this.makeMenuElement(name, id);
    this.menuListEl.insertAdjacentHTML('afterBegin', menu);
  };

  this.updateMenu = function (parentNode) {
    const ans = window.prompt(UPDATE_MSG);
    if (!ans) return;

    const valueEl = parentNode.querySelector('span');
    valueEl.innerHTML = ans;
    onUpdate(parentNode.id, ans);
  };

  this.deleteMenu = function (parentNode) {
    const result = window.confirm(DELETE_MSG);
    if (!result) return;

    this.menuListEl.removeChild(parentNode);
    onDelete(parentNode.id);
  };
}
