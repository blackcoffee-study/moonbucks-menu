import { render } from '../common/render.js';
import { deleteMenu } from '../api/api.js';

export const removeMenuName = async (e, menu, category) => {
  if (confirm('정말 삭제하시겠습니까?')) {
    const menuId = e.target.closest('li').dataset.menuId;
    await deleteMenu(category, menuId);

    console.log('menu: ', menu);
    await render(menu, category);
  }
};
