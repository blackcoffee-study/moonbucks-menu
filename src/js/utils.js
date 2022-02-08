export const getMenuTemplate = ({ name, status }) => {
  return `
    <li class="menu-list-item d-flex items-center py-2" data-menu-name="${name}">
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

export const renderMenusByFunction = (menus, generateFunction) => {
  let result = "";
  menus.forEach((el) => (result += generateFunction(el)));
  return result;
};

export const soldOutMenuInStore = (Store, currentCategory, menuName) => {
  const originIndex = Store[currentCategory].findIndex(
    (el) => el.name === menuName
  );
  Store[currentCategory] = Store[currentCategory].map((el, index) => {
    if (index === originIndex) {
      el.status = el.status === "soldOut" ? "onSale" : "soldOut";
    }
    return el;
  });
};

export const editMenuInStore = (Store, currentCategory, originName) => {
  const newName = prompt("메뉴명을 수정하세요", originName)
  const originIndex = Store[currentCategory].findIndex(el => el.name === originName);
  Store[currentCategory] = Store[currentCategory].map((el, index) => {
    if (index === originIndex) {
      el.name = newName;
    }
    return el;
  })
};

export const removeMenuInStore = (Store, currentCategory, menuName) => {
  const selectResult = confirm("정말 삭제하시겠습니까?");
  if (selectResult) {
    Store[currentCategory] = Store[currentCategory].filter((el) => el.name !== menuName);
  }
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const getLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return JSON.parse(value);
};