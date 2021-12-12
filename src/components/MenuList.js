import Component from '../core/Component.js';

export default class MenuList extends Component {
  template() {
    const { selected } = this.$props;
    return `
    <ul id="${selected}-menu-list" class="mt-3 pl-0">
    ${this.$props[selected].items
      .map(item => {
        return `
        <li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name ${item.isSoldOut && 'sold-out'}">${
          item.name
        }</span>
            <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
              data-id=${item.id}
            >
              품절
            </button>
            <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
                data-id=${item.id}
            >
                수정
            </button>
            <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
                data-id=${item.id}
            >
                삭제
            </button>
        </li>
        `;
      })
      .join('')}
    </ul>
    `;
  }

  setEvent() {
    const { selected } = this.$props;

    const deleteHandler = e => {
      if (!e.target.className.includes('menu-remove-button')) return;
      this.$props.deleteMenuList(e.target.dataset.id);
    };

    const editHandler = e => {
      if (!e.target.className.includes('menu-edit-button')) return;
      this.$props.editMenuList(e.target.dataset.id);
    };

    const editSoldoutHandler = e => {
      if (!e.target.className.includes('menu-sold-out-button')) return;
      this.$props.editSoldout(e.target.dataset.id);
    };

    this.addEvent('click', `#${selected}-menu-list`, deleteHandler);
    this.addEvent('click', `#${selected}-menu-list`, editHandler);
    this.addEvent('click', `#${selected}-menu-list`, editSoldoutHandler);
  }
}
