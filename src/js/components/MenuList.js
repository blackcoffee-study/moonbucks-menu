import { $ } from '../utils/index.js';

export default function MenuList({ onUpdate, onDelete }) {
  this.menuListEl = $('#espresso-menu-list');
  this.menuListEl.addEventListener('click', e => {
    if (e.target.classList.contains('menu-edit-button')) {
      this.updateMenu(e.target.parentNode);
    } else if (e.target.classList.contains('menu-remove-button')) {
      this.deleteMenu(e.target.parentNode);
    }
  });
  this.makeMenuEl = (name, id) => {
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
  this.render = menuList => {};
  this.addNewMenu = (newMenu, id) => {
    const menu = this.makeMenuEl(newMenu, id);
    this.menuListEl.insertAdjacentHTML('afterBegin', menu);
  };
  this.updateMenu = parentNode => {
    let ans = window.prompt('어떤 이름으로 수정하시겠어요?');
    if (!ans) return;
    let valueEl = parentNode.querySelector('span');
    valueEl.innerHTML = ans;
    onUpdate(parentNode.id, ans);
  };
  this.deleteMenu = parentNode => {
    let result = window.confirm('정말 삭제하시겠어요?');
    if (!result) return;
    this.menuListEl.removeChild(parentNode);
    onDelete(parentNode.id);
  };
}
