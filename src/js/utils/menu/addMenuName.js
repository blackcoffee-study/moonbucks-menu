import $ from '../common/selector.js';
import { store } from '../common/store.js';
import { render } from '../common/render.js';

export const addMenuName = (menu, category) => {
  if (!$('#menu-name').value) {
    alert('값을 입력해주세요.');
    return;
  }

  const menuName = $('#menu-name').value;
  menu[category].push({
    id: Date.now().toString(),
    name: menuName,
  });
  $('#menu-name').value = '';

  store.setData(menu);
  render(menu, category);
};
