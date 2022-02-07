import $ from '../common/selector.js';

export const updateMenuCount = (menu, category) => {
  const menuCount = menu[category].length;
  $('.menu-count').innerText = `총 ${menuCount}개`;
};
