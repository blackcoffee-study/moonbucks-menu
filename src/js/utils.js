export const getMenuTemplate = ({ id, name, status }) => {
  return `
    <li class="menu-list-item d-flex items-center py-2" data-menu-name="${name}" data-menu-id="${id}">
      <span class="w-100 pl-2 menu-name ${status === 'soldOut' ? 'sold-out' : ''}">${name}</span>
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
    </li>
  `;
};

export const renderMenusByFunction = (menus, generateTemplate) => {
  return menus.map((menu) => generateTemplate(menu)).join("");
};

export const soldOutMenuInStore = (Store, currentCategory, menuId) => {
  Store[currentCategory] = Store[currentCategory].map((el) => {
    if (el.id === menuId) {
      el.status = el.status === "soldOut" ? "onSale" : "soldOut";
    }
    return el;
  });
};

export const editMenuInStore = (Store, currentCategory, menuId, originName) => {
  const newName = prompt("메뉴명을 수정하세요", originName)
  Store[currentCategory] = Store[currentCategory].map((el) => {
    if (el.id === menuId) {
      el.name = newName;
    }
    return el;
  })
};

export const removeMenuInStore = (Store, currentCategory, menuId) => {
  const selectResult = confirm("정말 삭제하시겠습니까?");
  if (selectResult) {
    Store[currentCategory] = Store[currentCategory].filter((el) => el.id !== menuId);
  }
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const getLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return JSON.parse(value);
};