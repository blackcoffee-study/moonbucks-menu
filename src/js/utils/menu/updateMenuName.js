import { render } from '../common/render.js';
import { store } from '../common/store.js';

export const updateMenuName = (e, menu, category) => {
  const menuId = e.target.closest('li').dataset.menuId;
  const menuName = e.target.closest('li').querySelector('.menu-name');
  const updatedMenuName = prompt('메뉴명을 수정하세요', menuName.innerText);

  if (updatedMenuName) {
    menu[category] = [...menu[category]].map(item => {
      if (item.id == menuId) {
        item.name = updatedMenuName;
        item.id = item.id;
      }
      return item;
    });

    store.setData(menu);
    render(menu, category);
  }
};
