import Component from '../core/Component.js';

export default class MenuForm extends Component {
  template() {
    const { selected } = this.$props;
    const { title } = this.$props[selected];
    return `
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

    this.addEvent('submit', `#${selected}-menu-form`, addHandler);
  }
}
