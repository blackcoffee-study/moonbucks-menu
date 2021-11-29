import updateMenuCount from '../CRUD/updateMenuCount.js';
import $ from './selector.js';

const render = menu => {
  const template = menu
    .map(item => {
      return `
        <li data-menu-id=${item.id} class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${item.name}</span>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          >
            수정
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-remove-button"
          >
            삭제
          </button>
        </li>`;
    })
    .join('');

  $('#espresso-menu-list').innerHTML = template;
  updateMenuCount();
};

export default render;
