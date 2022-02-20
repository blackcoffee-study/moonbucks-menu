import Component from '../core/Component.js';
import { KOREAN_MENU_NAME } from '../constants/constants.js';
import { $ } from '../utils/dom.js';

export default class MenuForm extends Component {
  template() {
    const { category } = this.props;

    return `
        <div class="d-flex w-100">
          <label for="menu-name" class="input-label" hidden>
            ${KOREAN_MENU_NAME[category]} 메뉴 이름
          </label>
          <input
            type="text"
            id="menu-name"
            name="menuName"
            class="input-field"
            placeholder="메뉴 이름"
            autocomplete="off"
          />
          <button
            type="submit"
            name="submit"
            id="menu-submit-button"
            class="input-submit bg-green-600 ml-2"
          >
            확인
          </button>
        </div>
        `;
  }

  setEvent() {
    const { addMenu } = this.props;

    this.domNode.addEventListener('submit', e => {
      e.preventDefault();
      addMenu($('#menu-name').value);
    });
  }
}
