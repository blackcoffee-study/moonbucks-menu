import Component from '../core/Component.js';

export default class MenuHeader extends Component {
  template() {
    const { length: count } = this.props;

    return `
        <h2 class="mt-1">☕ 에스프레소 메뉴 관리</h2>
        <span class="mr-2 mt-4 menu-count">총 ${count}개</span>
        `;
  }
}
