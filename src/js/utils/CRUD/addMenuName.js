import { store } from '../common/store.js';
import render from '../common/render.js';
import $ from '../common/selector.js';

function addMenuName(menu) {
  if (!$('#espresso-menu-name').value) {
    alert('값을 입력해주세요.');
    return;
  }

  const espressoMenuName = $('#espresso-menu-name').value;
  menu.push({ id: Date.now().toString(), name: espressoMenuName });
  store.setData(menu);
  render(menu);
  $('#espresso-menu-name').value = '';
}

export default addMenuName;
