import Component from '../core/Component.js';

export default class MenuHeader extends Component {
  template() {
    const { menuItems } = this.props;

    return `
        <h2 class="mt-1">☕ 에스프레소 메뉴 관리</h2>
        <span class="mr-2 mt-4 menu-count">총 ${menuItems.length}개</span>
        `;
  }
}
