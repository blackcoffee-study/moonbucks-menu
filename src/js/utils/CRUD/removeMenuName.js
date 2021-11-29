import { store } from '../common/store.js';
import updateMenuCount from './updateMenuCount.js';

const removeMenuName = (e, menu) => {
  if (confirm('정말 삭제하시겠습니까?')) {
    const menuId = e.target.closest('li').dataset.menuId;
    const newMenu = menu.filter(item => item.id !== menuId);

    e.target.closest('li').remove();
    store.setData(newMenu);

    updateMenuCount();
  }
};

export default removeMenuName;
