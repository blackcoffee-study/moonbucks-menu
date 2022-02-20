import { $ } from './common.js'

const menuListUlElement = $('#espresso-menu-list');

const menuListRender = (currentMenuType) => {
	let menuList = JSON.parse(localStorage.getItem(currentMenuType)) || [];
	let menuListTemplate = menuList.map(menu => {
		return `<li class="menu-list-item d-flex items-center py-2">
		<span class="w-100 pl-2 menu-name">${menu.name}</span>
		<button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button">품절</button>	
		<button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
		<button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
		</li>`
	}).join("");

	menuListUlElement.innerHTML = menuListTemplate;
}

export { menuListRender };
