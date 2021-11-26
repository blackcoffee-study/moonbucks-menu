import { $ } from '../util/selector.js';

export const renderMenuCount = (menuCount) => {
  const main = $('main');
  const $menuCount = $('span', main);
  $menuCount.innerText = `총 ${menuCount}개`;
};
