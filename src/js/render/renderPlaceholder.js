import { $ } from '../util/selector.js';
import CATEGORY_MESSAGE from '../constants/menuCategoryMessage.js';
import { category } from '../util/store.js';

export const renderPlaceholder = () => {
  const name = category.name;
  const placeholder = CATEGORY_MESSAGE[name].PLACEHOLDER;
  const $input = $(`#${name}-menu-name`);
  $input.placeholder = placeholder;
};
