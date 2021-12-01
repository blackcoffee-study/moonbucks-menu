import $ from '../common/selector.js';
import { render } from '../common/render.js';
import { addMenuAPI, BASE_URL } from '../../constants/api.js';
import { post } from '../common/request.js';

export const addMenuName = async (menu, category) => {
  if (!$('#menu-name').value) {
    alert('값을 입력해주세요.');
    return;
  }

  const menuName = $('#menu-name').value;
  const body = {
    name: menuName,
  };

  await post(`${BASE_URL}${addMenuAPI(category)}/`, body).then(data =>
    console.log('addMenu: ', data),
  );
  render(menu, category);
  $('#menu-name').value = '';
};
