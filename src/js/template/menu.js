export const menuItemTemplate = (menuArr) =>`
<li class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name">${menuArr.menuName}</span>
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

