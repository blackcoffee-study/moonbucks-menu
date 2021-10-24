import { $ } from '../lib/utils.js';
import { MENU_TITLE } from '../lib/constants.js';

export default function MenuHeader($target) {
  const $menuCount = $($target)('.menu-count');
  const $menuTitle = $($target)('h2');

  this.setState = ({ categoryName, menuItems }) => {
    this.categoryName = categoryName;
    this.count = menuItems.length;
    render(this.categoryName, this.count);
  };

  const render = (categoryName, count) => {
    $menuCount.textContent = `총 ${count}개`;
    $menuTitle.textContent = `${MENU_TITLE[categoryName]} 메뉴 관리`;
  };
}
