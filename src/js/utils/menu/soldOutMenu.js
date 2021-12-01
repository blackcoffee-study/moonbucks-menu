import { render } from '../common/render.js';
import { toggleSoldOutMenu } from '../api/api.js';

export const soldOutMenu = async (e, menu, category) => {
  const menuId = e.target.closest('li').dataset.menuId;
  await toggleSoldOutMenu(category, menuId);
  await render(menu, category);
};
