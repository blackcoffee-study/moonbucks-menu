import $ from '../common/selector.js';

const updateMenuCount = () => {
  const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
  $('.menu-count').innerText = `총 ${menuCount}개`;
};

export default updateMenuCount;
