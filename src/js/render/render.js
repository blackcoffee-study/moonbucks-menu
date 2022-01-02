import { $ } from '../util/dom.js';

export const renderMenuItem = (menu, category) => {
  const template = menu[category].map(item => {
    const isSoldOut = item.isSoldOut ? 'sold-out' : '';
    return `
        <li data-menu-id="${item.id}" class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name ${isSoldOut}">${item.name}</span>
            <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
            >품절</button>
            <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
            >수정</button>
            <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
            >삭제</button>
        </li>
        `;
  });
  $('#espresso-menu-list').innerHTML = template.join('');
  updateMenuCount(menu, category);
  console.log(menu);
};

const updateMenuCount = (menu, category) => {
  const menuItemCount = menu[category].length;
  $('.menu-count').innerHTML = `총 ${menuItemCount}개`;
  $('#espresso-menu-name').value = '';
};
