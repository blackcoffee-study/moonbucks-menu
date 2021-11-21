import Component from '../core/Component.js';
import AddMenu from './AddMenu.js';

export default class Main extends Component {
  template() {
    return `
    <div class="wrapper bg-white p-10">
      <div class="heading d-flex justify-between">
        <h2 class="mt-1">☕ 에스프레소 메뉴 관리</h2>
        <span class="mr-2 mt-4 menu-count">총 0개</span>
      </div>
      <form id="espresso-menu-form">
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
      </form>
      <ul id="espresso-menu-list" class="mt-3 pl-0" data-component="menu-list"></ul>
  </div>
  `;
  }

  mounted() {
    const $addMenu = this.$target.querySelector('[data-component="menu-list"]');

    new AddMenu($addMenu);
  }
}
