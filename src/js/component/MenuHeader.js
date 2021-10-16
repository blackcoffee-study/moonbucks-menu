import { $ } from '../lib/utils.js';
import { COFFEE_TITLE } from '../lib/constants.js';

export default function MenuHeader($target) {
  const $menuCount = $($target)('.menu-count');
  const $menuTitle = $($target)('h2');

  this.setState = ({ categoryName, menuList }) => {
    this.categoryName = categoryName;
    this.count = menuList.length;
    render(this.categoryName, this.count);
  };

  const render = (categoryName, count) => {
    $menuCount.textContent = `총 ${count}개`;
    $menuTitle.textContent = `${COFFEE_TITLE[categoryName]} 메뉴 관리`;
  };
}
