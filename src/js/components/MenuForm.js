import Component from '../core/Component.js';

export default class MenuForm extends Component {
  template() {
    return `
        <div class="d-flex w-100">
        <label for="espresso-menu-name" class="input-label" hidden>
          에스프레소 메뉴 이름
        </label>
        <input
          type="text"
          id="espresso-menu-name"
          name="espressoMenuName"
          class="input-field"
          placeholder="에스프레소 메뉴 이름"
          autocomplete="off"
        />
        <button
          type="button"
          name="submit"
          id="espresso-menu-submit-button"
          class="input-submit bg-green-600 ml-2"
        >
          확인
        </button>
      </div>
        `;
  }

  setEvent() {}
}
