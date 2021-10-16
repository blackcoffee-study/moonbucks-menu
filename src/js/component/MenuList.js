import { $, hasClass, isEmpty } from '../lib/utils.js';
import { ERROR_MESSAGE, ALERT_MESSAGE } from '../lib/constants.js';

export default function MenuList($target, { onEdit, onRemove }) {
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
  };

  const handleEditButtonClick = menuName => {
    const newName = prompt(ALERT_MESSAGE.EDIT, menuName);

    // NOTE: 결과로 {결과, 메세지 내보내느거 괜찮은듯. throw error하거나}
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

  const render = menuList => {
    $target.innerHTML = '';
    menuList.forEach(menu => renderMenuItem(menu, this.$menuList));
  };

  const renderMenuItem = (menu, $menuList) => {
    const $menuItem = createMenuItemTemplate(menu).content;
    $menuList.append($menuItem);
  };

  const createMenuItemTemplate = name => {
    const $template = document.createElement('template');
    $template.innerHTML = `
        <li class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${name}</span>
          <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
          <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
        </li>`;

    return $template;
  };
}
