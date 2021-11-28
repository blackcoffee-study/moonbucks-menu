import { renderMenuTotalCount } from './renderMenuTotalCount.js';
import { renderMenuList } from './renderMenuList.js';
import { renderPlaceholder } from './renderPlaceholder.js';
import { renderTitle } from './renderTitle.js';
import { loadDataFromLocalStorage } from '../util/store.js';
import { currentMenuData } from '../util/store.js';
import MENU_CATEGORY_MESSAGE from '../constants/menuCategoryMessage.js';

export const renderAll = (menuCategory) => {
  currentMenuData.menuList = loadDataFromLocalStorage(menuCategory) || [];
  renderMenuList(currentMenuData.menuList);
  renderMenuTotalCount();
  renderPlaceholder(MENU_CATEGORY_MESSAGE[menuCategory].PLACEHOLDER);
  renderTitle(MENU_CATEGORY_MESSAGE[menuCategory].TITLE);
};
