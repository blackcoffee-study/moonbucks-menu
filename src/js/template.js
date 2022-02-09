import { BUTTON_TYPE } from "./consts.js";

export const templateMenuItem = (menu) => {
  return `<li class="menu-list-item d-flex items-center py-2" data-menu-id="${menu.id}">
<span class="w-100 pl-2 menu-name">${menu.name}</span>
<button
  type="button"
  class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
  data-button-type="${BUTTON_TYPE.Update}"
>
  수정
</button>
<button
  type="button"
  class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
  data-button-type="${BUTTON_TYPE.Delete}"
>
  삭제
</button>
</li>`;
};
