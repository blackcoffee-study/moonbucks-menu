import { $ } from '../util/selector.js';

export const renderMenuCount = (menuTotalCount) => {
  const main = $('main');
  const $menuTotalCount = $('span', main);
  $menuTotalCount.innerText = `총 ${menuTotalCount}개`;
};
