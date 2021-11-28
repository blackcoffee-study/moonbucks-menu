import { $ } from '../util/selector.js';
import MENU_CATEGORY_MESSAGE from '../constants/menuCategoryMessage.js';
import { currentMenuData } from '../util/store.js';

export const renderTitle = () => {
  const menuCategory = currentMenuData.menuCategory;
  const title = MENU_CATEGORY_MESSAGE[menuCategory].TITLE;
  const $title = $('h2');
  $title.innerText = title;
};
