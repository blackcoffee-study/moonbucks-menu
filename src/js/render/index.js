import { renderMenuTotalCount } from './renderMenuTotalCount.js';
import { renderMenuList } from './renderMenuList.js';
import { renderPlaceholder } from './renderPlaceholder.js';
import { renderTitle } from './renderTitle.js';
import { loadDataFromLocalStorage } from '../util/store.js';
import { currentMenuData } from '../util/store.js';

export const renderAll = () => {
  const menuCategory = currentMenuData.menuCategory;
  currentMenuData.menuList = loadDataFromLocalStorage(menuCategory) || [];
  renderMenuList();
  renderMenuTotalCount();
  renderPlaceholder();
  renderTitle();
};
