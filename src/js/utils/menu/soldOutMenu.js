import { store } from '../common/store.js';
import { render } from '../common/render.js';

export function soldOutMenu(e, menu, category) {
  const menuId = e.target.closest('li').dataset.menuId;

  menu[category] = [...menu[category]].map(item => {
    if (item.id == menuId) {
      item.soldOut = !item.soldOut;
      item.id = item.id;
      item.name = item.name;
    }
    return item;
  });
  store.setData(menu);
  render(menu, category);
}
