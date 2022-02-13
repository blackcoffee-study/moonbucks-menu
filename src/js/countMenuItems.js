import { menuList, itemCount } from './app.js';

const countMenuItems = () => {
  let countedNum = menuList.querySelectorAll('li').length;
  itemCount.innerText = `총 ${countedNum}개`;
};
export default countMenuItems;
