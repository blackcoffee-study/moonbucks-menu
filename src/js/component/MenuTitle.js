import component from '../core/component.js';

export default class MenuTitle extends component {
  setup() {
    this.$state = this.$props.$state;
  }
  template() {
    return `
        <h2 class="mt-1">☕ 에스프레소 메뉴 관리</h2>
        <span class="mr-2 mt-4 menu-count">총 0개</span>
    `;
  }
}
