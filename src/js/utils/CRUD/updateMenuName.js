import { store } from '../common/store.js';

const updateMenuName = (e, menu, category) => {
  const menuId = e.target.closest('li').dataset.menuId;
  const menuName = e.target.closest('li').querySelector('.menu-name');
  const updatedMenuName = prompt('메뉴명을 수정하세요', menuName.innerText);

  menu[category] = [...menu[category]].map(item => {
    if (item.id == menuId) {
      item.name = updatedMenuName;
      item.id = item.id;
    }
    return item;
  });

  if (updatedMenuName) {
    menuName.innerText = updatedMenuName;
    store.setData(menu);
  }

  // console.log('newMenu: ', newMenu);
};

export default updateMenuName;
