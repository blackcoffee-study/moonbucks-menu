import $ from '../common/selector.js';
import { store } from '../common/store.js';
import updateMenuCount from './updateMenuCount.js';

const addMenuName = menu => {
  if (!$('#espresso-menu-name').value) {
    alert('값을 입력해주세요.');
    return;
  }

  const espressoMenuName = $('#espresso-menu-name').value;
  menu.push({ name: espressoMenuName });
  store.setData(menu);
  const template = menu
    .map(item => {
      return `
        <li class="menu-list-item d-flex items-center py-2">
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
  $('#espresso-menu-name').value = '';
};

export default addMenuName;
