const menuListHTML = ({ id, name }) => `
  <li id=${id} class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name">${name}</span>
    <button
      data-mode="edit"
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
    >
      수정
    </button>
    <button
      data-mode="remove"
      type="button"
      class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
    >
      삭제
    </button>
  </li>
`;

const MenuRenderer =
  ($menuList, $count) =>
  ({ menus, size }) => {
    $menuList.innerHTML = menus.map(menuListHTML).join('');
    $count.innerText = `총 ${size}개`;
  };

export default MenuRenderer;
