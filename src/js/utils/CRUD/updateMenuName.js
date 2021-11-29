import { store } from '../common/store.js';

const updateMenuName = (e, menu) => {
  const menuId = e.target.closest('li').dataset.menuId;
  const menuName = e.target.closest('li').querySelector('.menu-name');
  const updatedMenuName = prompt('메뉴명을 수정하세요', menuName.innerText);

  const newMenu = menu.map(item => {
    if (item.id == menuId) {
      item.name = updatedMenuName;
      item.id = item.id;
    }
    return item;
  });

  store.setData(newMenu);
  menuName.innerText = updatedMenuName;
};

export default updateMenuName;
