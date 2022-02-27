import Component from '../core/Component.js';
import { MESSAGE } from '../constants/constants.js';

export default class MenuList extends Component {
  template() {
    const { menu } = this.props;

    return menu
      .map(
        ({ id, name, isSoldOut }) => `
      <li class="menu-list-item d-flex items-center py-2" data-id="${id}">
        <span class="w-100 pl-2 menu-name ${isSoldOut ? 'sold-out' : ''}">${name}</span>
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
      `
      )
      .join('');
  }

  setEvent() {
    const { updateMenu, deleteMenu, toggleSoldOut } = this.props;

    this.domNode.addEventListener('click', ({ target }) => {
      if (target.type !== 'button') return;

      const isClassExisted = selector => target.classList.contains(selector);

      const isUpdateButton = isClassExisted('menu-edit-button');
      const isDeleteButton = isClassExisted('menu-remove-button');
      const isSoldOutButton = isClassExisted('menu-sold-out-button');

      if (isUpdateButton) {
        const newMenuName = prompt(MESSAGE.UPDATE, target.parentNode.firstElementChild.textContent);

        updateMenu(newMenuName, target.closest('[data-id]').dataset.id);
      }

      if (isDeleteButton) {
        const isCheck = confirm(MESSAGE.DELETE);

        if (isCheck) deleteMenu(target.closest('[data-id]').dataset.id);
      }

      if (isSoldOutButton) {
        toggleSoldOut(target.closest('[data-id]').dataset.id);
      }
    });
  }
}
