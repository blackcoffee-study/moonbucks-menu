import Component from '../core/Component.js';
import { KOREAN_MENU_NAME } from '../constants/constants.js';

export default class MenuHeader extends Component {
  template() {
    const { category, menuItems } = this.props;

    return `
        <h2 class="mt-1">${KOREAN_MENU_NAME[category]} 메뉴 관리</h2>
        <span class="mr-2 mt-4 menu-count">총 ${menuItems.length}개</span>
        `;
  }
}
