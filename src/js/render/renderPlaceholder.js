import { $ } from '../util/selector.js';
import MENU_CATEGORY_MESSAGE from '../constants/menuCategoryMessage.js';
import { currentMenuData } from '../util/store.js';

export const renderPlaceholder = () => {
  const menuCategory = currentMenuData.menuCategory;
  const placeholder = MENU_CATEGORY_MESSAGE[menuCategory].PLACEHOLDER;
  const $input = $(`#${menuCategory}-menu-name`);
  $input.placeholder = placeholder;
};
