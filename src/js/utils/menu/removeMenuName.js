import { store } from '../common/store.js';
import { render } from '../common/render.js';

export const removeMenuName = (e, menu, category) => {
  if (confirm('정말 삭제하시겠습니까?')) {
    const menuId = e.target.closest('li').dataset.menuId;
    menu[category] = [...menu[category]].filter(item => item.id !== menuId);
    // e.target.closest('li').remove();
    store.setData(menu);
    render(menu, category);
  }
};
