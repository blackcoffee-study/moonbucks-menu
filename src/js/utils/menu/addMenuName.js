import $ from '../common/selector.js';
import { render } from '../common/render.js';
import { addMenu } from '../api/api.js';

export const addMenuName = async (menu, category) => {
  const menuName = $('#menu-name').value.trim();

  if (!menuName) {
    alert('값을 입력해주세요.');
    $('#menu-name').value = '';
    return;
  }

  const isDuplicate = menu[category].find(
    item => item.name === $('#menu-name').value,
  );

  if (isDuplicate) {
    alert('이미 중복된 메뉴입니다. 다른 이름을 입력해주세요.');
    $('#menu-name').value = '';
    return;
  }

  await addMenu(category, menuName);
  await render(menu, category);
  $('#menu-name').value = '';
};
