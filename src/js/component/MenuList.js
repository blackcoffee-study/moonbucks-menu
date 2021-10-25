import { $, hasClass, isEmpty } from '../lib/utils.js';
import { ERROR_MESSAGE, ALERT_MESSAGE } from '../lib/constants.js';

export default function MenuList($target, { onEdit, onRemove, onSoldOut }) {
  this.$menuList = $target;
  this.$menuList.addEventListener('click', e => handleMenuListClick(e));

  this.setState = ({ menuItems }) => {
    this.menuList = menuItems;
    render(this.menuList);
  };

  const handleMenuListClick = e => {
    const $target = e.target;
    const $menuItem = $target.closest('li');
    const menuName = $($menuItem)('.menu-name').textContent;

    if (hasClass($target, 'menu-edit-button')) {
      handleEditButtonClick(menuName);
    }

    if (hasClass($target, 'menu-remove-button')) {
      handleRemoveButtonClick(menuName);
    }

    if (hasClass($target, 'menu-sold-out-button')) {
      handleSoldOutButtonClick(menuName);
    }
  };

  const handleEditButtonClick = menuName => {
    const newName = prompt(ALERT_MESSAGE.EDIT, menuName);

    if (newName === null) return; //취소한 경우

    if (isEmpty(newName)) {
      alert(ERROR_MESSAGE.EMPTY);
      return;
    }

    onEdit(menuName, newName);
  };

  const handleRemoveButtonClick = menuName => {
    if (confirm(ALERT_MESSAGE.REMOVE)) {
      onRemove(menuName);
    }
  };

  const handleSoldOutButtonClick = menuName => {
    onSoldOut(menuName);
  };

  const render = menuList => {
    $target.innerHTML = '';
    menuList.forEach(menu => renderMenuItem(menu, this.$menuList));
  };

  const renderMenuItem = (menu, $menuList) => {
    const $menuItem = createMenuItemTemplate(menu).content;
    $menuList.append($menuItem);
  };

  const createMenuItemTemplate = ({ name, isSoldOut }) => {
    const $template = document.createElement('template');
    $template.innerHTML = `
        <li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name ${
          isSoldOut ? 'sold-out' : ''
        } ">${name}</span>
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

    return $template;
  };
}
