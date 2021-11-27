import { $ } from '../util/selector.js';

export const renderMenuTotalCount = (menuTotalCount) => {
  const main = $('main');
  const $menuTotalCount = $('span', main);
  $menuTotalCount.innerText = `총 ${menuTotalCount}개`;
};
