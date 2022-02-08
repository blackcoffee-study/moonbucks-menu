export const getMenuTemplate = (name) => {
  return `
    <li class="menu-list-item d-flex items-center py-2" data-menu-name="${name}">
      <span class="w-100 pl-2 menu-name">${name}</span>
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
    </li>
  `;
};

export const renderMenusByFunction = (menus, generateFunction) => {
  let result = "";
  menus.forEach((el) => (result += generateFunction(el)));
  return result;
};

export const editMenuInStore = (Store, currentCategory, originName) => {
  const newName = prompt("메뉴명을 수정하세요", originName)
  const originIndex = Store[currentCategory].indexOf(originName);
  Store[currentCategory] = Store[currentCategory].map((el, index) => {
    if (index === originIndex) {
      el = newName;
    }
    return el;
  })
};

export const removeMenuInStore = (Store, currentCategory, menuName) => {
  const selectResult = confirm("정말 삭제하시겠습니까?");
  if (selectResult) {
    Store[currentCategory] = Store[currentCategory].filter((el) => el !== menuName);
  }
};