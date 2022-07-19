import { $ } from '../utils/index.js';

export default function MenuList() {
  this.menuListEl = $('#espresso-menu-list');
  this.makeMenuEl = name => {
    return `<li class="menu-list-item d-flex items-center py-2">
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
  this.render = menuList => {};
  this.addNewMenu = newMenu => {
    const menu = this.makeMenuEl(newMenu);
    this.menuListEl.insertAdjacentHTML('afterBegin', menu);
  };
}
