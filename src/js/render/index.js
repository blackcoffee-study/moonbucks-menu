import { renderMenuCount } from './renderMenuCount.js';
import { renderMenuList } from './renderMenuList.js';
import { renderPlaceholder } from './renderPlaceholder.js';
import { renderTitle } from './renderTitle.js';
import { loadDataFromLocalStorage } from '../util/store.js';
import { currentData } from '../util/store.js';
import MENU_CATEGORY_MESSAGE from '../constants/menuCategoryMessage.js';

export const renderAll = (menuCategory) => {
  currentData.menuList = loadDataFromLocalStorage(menuCategory) || [];
  currentData.menuCount = currentData.menuList.length;
  renderMenuList(currentData.menuList);
  renderMenuCount(currentData.menuCount);
  renderPlaceholder(MENU_CATEGORY_MESSAGE[menuCategory].PLACEHOLDER);
  renderTitle(MENU_CATEGORY_MESSAGE[menuCategory].TITLE);
};
