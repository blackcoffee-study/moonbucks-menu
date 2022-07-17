import { menuListStore } from "../store/store/index.js";

export const Menu = (id, name) => {
  const [menuList, setMenuList] = menuListStore();

  const onClickEdit = () => {
    const newName = window.prompt("수정할 이름을 입력하세요.", name);
    if (newName === null) return;
    const newMenuList = menuList.map((menu) => {
      if (menu.id === id) {
        return {
          ...menu,
          name: newName,
        };
      }
      return menu;
    });

    setMenuList(newMenuList);
  };

  const onClickDelete = () => {
    const isDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!isDelete) return;
    const newMenuList = menuList.filter((menu) => menu.id !== id);

    setMenuList(newMenuList);
  };

  setTimeout(() => {
    const edit = document.querySelector(`#edit-item-${id}`);
    const remove = document.querySelector(`#remove-item-${id}`);
    edit.addEventListener("click", onClickEdit);
    remove.addEventListener("click", onClickDelete);
  }, 10);

  return `
      <li class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${name}</span>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
            id="edit-item-${id}"
          >
          수정
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
            id="remove-item-${id}"
            >
            삭제
          </button>
      </li>
    `;
};
