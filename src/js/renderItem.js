import { menuList } from './app.js';
import countMenuItems from './countMenuItems.js';

const renderItem = (template) => {
  menuList.insertAdjacentHTML('afterbegin', template);
  countMenuItems();
};

export default renderItem;
