import { $ } from '../util/selector.js';
import { currentMenuData } from '../util/store.js';

export const renderMenuTotalCount = () => {
  const menuTotalCount = currentMenuData.menuList.length;
  const main = $('main');
  const $menuTotalCount = $('span', main);
  $menuTotalCount.innerText = `총 ${menuTotalCount}개`;
};
