import { $ } from '../util/selector.js';
import CATEGORY_MESSAGE from '../constants/menuCategoryMessage.js';
import { category } from '../util/store.js';

export const renderTitle = () => {
  const name = category.name;
  const title = CATEGORY_MESSAGE[name].TITLE;
  const $title = $('h2');
  $title.innerText = title;
};
