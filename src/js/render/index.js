import { renderMenuTotalCount } from './renderMenuTotalCount.js';
import { renderMenuList } from './renderMenuList.js';
import { renderPlaceholder } from './renderPlaceholder.js';
import { renderTitle } from './renderTitle.js';

export const renderAll = () => {
  renderMenuList();
  renderMenuTotalCount();
  renderPlaceholder();
  renderTitle();
};
