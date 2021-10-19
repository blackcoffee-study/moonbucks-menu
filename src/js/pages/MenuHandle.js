export { addMenu, deleteMenu, editMenu, soldoutMenu };
import { $ } from './Util.js';

const addMenu = () => {
	let menuName = document.getElementById('menu-name').value;
	if (menuName === '') {
		return;
	}

	let ul = $('#menu-list');
	let menu = getMenuTemplate(menuName);
	ul.append(menu);

	$('#menu-name').value = '';
};

const getMenuTemplate = (value) => {
	const $menu = document.createElement('li');
	$menu.setAttribute('class', 'menu-list-item d-flex items-center py-2');
	$menu.innerHTML = `<span class="w-100 pl-2 menu-name">${value}</span>
              <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
              >
                수정
              </button>
              <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
              >
                삭제
              </button>
              <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm menu-soldout-button"
              >
                품절
              </button>
              `;
	return $menu;
};

const deleteMenu = (menu) => {
	menu.remove();
};

const editMenu = (menu) => {
	if (confirm('수정하시겠습니까?')) {
		var change = prompt('메뉴 명을 수정해주세요.', '');
		$(menu).find('span').eq(0).text(change);
	}
};

const soldoutMenu = (menu) => {
	menu.style.setProperty('text-decoration', 'line-through');
};
