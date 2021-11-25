import $ from './getDom';
const setMenuCount = menuList => ($('.menu-count').innerText = `총 ${menuList.length}개`);

export default setMenuCount;
