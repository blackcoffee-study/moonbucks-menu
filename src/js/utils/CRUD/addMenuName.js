import $ from '../common/selector.js';
import updateMenuCount from './updateMenuCount.js';

const addMenuName = () => {
  if (!$('#espresso-menu-name').value) {
    alert('값을 입력해주세요.');
    return;
  }

  const espressoMenuName = $('#espresso-menu-name').value;
  const menuItemTemplate = espressoMenuName => {
    return `
        <li class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
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
  };
  $('#espresso-menu-list').insertAdjacentHTML(
    'beforeend',
    menuItemTemplate(espressoMenuName),
  );

  updateMenuCount();
  $('#espresso-menu-name').value = '';
};

export default addMenuName;
