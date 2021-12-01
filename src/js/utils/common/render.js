import $ from './selector.js';
import { updateMenuCount } from '../menu/updateMenuCount.js';
import { get } from './request.js';
import { BASE_URL, getMenuAPI } from '../../constants/api.js';

export const render = async (menu, category) => {
  await get(`${BASE_URL}${getMenuAPI(category)}/`).then(data => {
    menu[category] = data;
  });

  const template = menu[category]
    .map(item => {
      return `
        <li data-menu-id=${
          item.id
        } class=" menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name ${
            item.soldOut ? 'sold-out' : ''
          }">${item.name}</span>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
          >
            품절
          </button>
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

  $('#menu-list').innerHTML = template;
  updateMenuCount(menu, category);
};
