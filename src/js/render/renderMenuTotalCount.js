import { $ } from '../util/selector.js';
import { category } from '../util/store.js';

export const renderMenuTotalCount = () => {
  const menuTotalCount = category.menus.length;
  const main = $('main');
  const $menuTotalCount = $('span', main);
  $menuTotalCount.innerText = `총 ${menuTotalCount}개`;
};
