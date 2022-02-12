import Component from '../core/Component.js';
import { $ } from '../utils/dom.js';

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

  setEvent() {
    const { addMenu } = this.props;

    this.domNode.addEventListener('submit', e => {
      e.preventDefault();
    });

    $('#espresso-menu-name').addEventListener('keyup', ({ key, target }) => {
      if (key !== 'Enter') return;

      addMenu(target.value);
    });

    $('#espresso-menu-submit-button').addEventListener('click', ({ target }) => {
      addMenu(target.previousElementSibling.value);
    });
  }
}
