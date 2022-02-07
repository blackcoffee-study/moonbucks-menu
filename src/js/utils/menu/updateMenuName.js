import { render } from '../common/render.js';
import { updateMenu } from '../api/api.js';

export const updateMenuName = async (e, menu, category) => {
  const menuId = e.target.closest('li').dataset.menuId;
  const menuName = e.target.closest('li').querySelector('.menu-name');
  const updatedMenuName = prompt('메뉴명을 수정하세요', menuName.innerText);

  if (updatedMenuName) {
    await updateMenu(category, menuId, updatedMenuName);
    await render(menu, category);
  }
};
