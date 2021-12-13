export const getMenuItemTemplate = (menuItem) => {
  return `<li data-menu-id="${
    menuItem.id
  }" class="menu-list-item d-flex items-center py-2">
      <span class="${
        menuItem.soldOut ? "sold-out " : ""
      }w-100 pl-2 menu-name">${menuItem.name}</span>
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
};
