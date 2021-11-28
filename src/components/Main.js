import Component from '../core/Component.js';
import Menu from './Menu.js';

export default class Main extends Component {
  template() {
    const { selected } = this.$props;
    const { title } = this.$props[selected];
    return `
    <div class="wrapper bg-white p-10">
      <div class="heading d-flex justify-between">
        <h2 class="mt-1">${title} 메뉴 관리</h2>
        <span class="mr-2 mt-4 menu-count">총 ${
          this.$props[selected].items.length
        }개</span>
      </div>
      <form id="${selected}-menu-form">
        <div class="d-flex w-100">
          <label for="${selected}-menu-name" class="input-label" hidden>
            ${title.substring(2).trim()} 메뉴 이름
          </label>
          <input
            type="text"
            id="${selected}-menu-name"
            class="input-field"
            placeholder="${title.substring(2).trim()} 메뉴 이름"
            autocomplete="off"
          />
          <button
            type="submit"
            name="submit"
            id="${selected}-menu-submit-button"
            class="input-submit bg-green-600 ml-2"
          >
            확인
          </button>
        </div>
      </form>
      <ul id="${selected}-menu-list" class="mt-3 pl-0">
        ${this.$props[selected].items
          .map(item => {
            return `
            <li class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name ${
                  item.soldout && 'sold-out'
                }">${item.name}</span>
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
  </div>
  `;
  }

  setEvent() {
    const { selected } = this.$props;

    const addHandler = e => {
      e.preventDefault();
      const input = this.$target.querySelector(`#${selected}-menu-name`);
      if (input.value === '') {
        alert('값을 입력해주세요');
        return;
      }
      this.$props.addMenu(input.value);
    };

    const deleteHandler = e => {
      if (!e.target.className.includes('menu-remove-button')) return;
      this.$props.deleteMenu(e.target.dataset.id);
    };

    const editHandler = e => {
      if (!e.target.className.includes('menu-edit-button')) return;
      this.$props.editMenu(e.target.dataset.id);
    };

    const editSoldoutHandler = e => {
      if (!e.target.className.includes('menu-sold-out-button')) return;
      this.$props.editSoldout(e.target.dataset.id);
    };

    this.addEvent('submit', `#${selected}-menu-form`, addHandler);
    this.addEvent('click', `#${selected}-menu-list`, deleteHandler);
    this.addEvent('click', `#${selected}-menu-list`, editHandler);
    this.addEvent('click', `#${selected}-menu-list`, editSoldoutHandler);
  }
}
