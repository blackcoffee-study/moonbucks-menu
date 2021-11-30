import $ from '../common/selector.js';

export const updateMenuCount = () => {
  const menuCount = $('#menu-list').querySelectorAll('li').length;
  $('.menu-count').innerText = `총 ${menuCount}개`;
};
