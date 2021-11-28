import { $ } from '/src/js/util/selector.js';
import { currentMenuData } from '../util/store.js';

const menuHtml = (
  name,
  isSoldout
) => `<li class="menu-list-item d-flex items-center py-2">
  <span class="w-100 pl-2 menu-name ${
    isSoldout ? 'sold-out' : ''
  }">${name}</span>
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
    class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
  >
    삭제
  </button>
</li>`;

export const renderMenuList = () => {
  const menuCategory = currentMenuData.menuCategory;
  const menuList = currentMenuData.menuList;
  const $ul = $(`#${menuCategory}-menu-list`);
  $ul.innerHTML = menuList.reduce((acc, cur) => {
    return acc + menuHtml(cur.name, cur.isSoldout);
  }, '');
};
