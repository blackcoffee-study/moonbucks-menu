import { SELECTOR, MESSAGE } from '../const/index.js';
import * as Action from '../action/index.js';
import * as Api from '../api/query/index.js';
import { currentStore } from '../store/index.js';
import { $, targetElementWrapper, innerText } from '../utils/dom.js';

const menuItemHtml = ({ id, name, status }) => `
  <li id=${id} class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name ${status && 'sold-out'}">${name}</span>
    <button
    data-mode="soldOut"
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
    >
      품절
    </button>
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

const MenuList = () => {
  const handleClick = (event, trigger) => {
    event.stopPropagation();

    const target = targetElementWrapper(event.target);
    const mode = target.dataset('mode');
    mode && trigger[mode](target.closest(SELECTOR.MENU_ITEM));
  };

  const soldOut = ($menu) => {
    const {
      categoryName,
      menuStore: { state, dispatch },
    } = currentStore();

    const id = $menu.id;
    const oldPayload = state.get(id);
    const newPayload = { ...oldPayload, status: !oldPayload.status };

    dispatch(Action.editMenu(newPayload));
    Api.putMenu({
      pathParams: { categoryName },
      data: newPayload,
    });
  };

  const editMenu = ($menu) => {
    const {
      categoryName,
      menuStore: { dispatch },
    } = currentStore();

    const id = $menu.id;
    const oldName = innerText(SELECTOR.MENU_NAME, $menu);
    const newName = prompt(MESSAGE.PLZ_INSERT_MENU, oldName);
    const payload = { id, name: newName };

    dispatch(Action.editMenu(payload));
    Api.putMenu({
      pathParams: {
        categoryName,
      },
      data: payload,
    });
  };

  const removeMenu = ($menu) => {
    const {
      categoryName,
      menuStore: { state, dispatch },
    } = currentStore();

    const id = $menu.id;
    const payload = { id };

    if (!state.has(id)) return;

    const { name } = state.get(id);
    if (!confirm(`${name}${MESSAGE.CONFIRM_REMOVE_MENU}`)) return;

    dispatch(Action.removeMenu(payload));
    Api.deleteMenuById({
      pathParams: {
        categoryName,
      },
      queryString: { id },
    });
  };

  const $menuList = $(`#menu-list`);

  const trigger = {
    edit: editMenu,
    remove: removeMenu,
    soldOut,
  };

  $menuList.addEventListener('click', (event) => handleClick(event, trigger));

  const renderer = () => {
    const {
      menuStore: { state },
    } = currentStore();
    $menuList.innerHTML = [...state.values()].map(menuItemHtml).join('');
  };

  return {
    renderer,
  };
};

export default MenuList;
