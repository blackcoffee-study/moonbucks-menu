import Component from '../core/Component.js';
import { MESSAGE } from '../constants/Message.js';

export default class MenuList extends Component {
  template() {
    const { menuItems } = this.props;
    return menuItems
      .map(
        ({ id, menuName }) => `
      <li class="menu-list-item d-flex items-center py-2" data-id="${id}">
        <span class="w-100 pl-2 menu-name">${menuName}</span>
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
      </li>`
      )
      .join('');
  }

  setEvent() {
    const { updateMenu, deleteMenu } = this.props;

    this.domNode.addEventListener('click', ({ target }) => {
      const isUpdateButton = target.classList.contains('menu-edit-button');
      const isDeleteButton = target.classList.contains('menu-remove-button');

      if (!isUpdateButton && !isDeleteButton) return;

      if (isUpdateButton) {
        const newMenuName = prompt(MESSAGE.UPDATE, target.previousElementSibling.textContent);

        updateMenu(newMenuName, Number(target.closest('[data-id]').dataset.id));
      } else {
        const isCheck = confirm(MESSAGE.DELETE);

        if (isCheck) deleteMenu(Number(target.closest('[data-id]').dataset.id));
      }
    });
  }
}
