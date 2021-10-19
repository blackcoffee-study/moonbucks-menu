import { $, createElement } from './DOM.js';
import { menuTemplate } from '../templates.js';
import { getAllMenus, getMenus, setAllMenus } from './storage.js';

export const makeMenu = (menu, menuCounts, menuList) => {
	const menuContainer = createElement('li');
	const menuName = createElement('span');
	const editButton = createElement('button');
	const removeButton = createElement('button');

	menuContainer.className = 'menu-list-item d-flex items-center py-2';
	menuName.className = 'w-100 pl-2 menu-name';
	editButton.className =
		'bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button';
	removeButton.className =
		'bg-gray-50 text-gray-500 text-sm menu-remove-button';

	menuName.innerText = menu;
	removeButton.innerText = '삭제';
	editButton.innerText = '수정';

	removeButton.addEventListener('click', (event) =>
		removeMenu(event, menuCounts, menuList)
	);
	editButton.addEventListener('click', editMenu);

	menuContainer.appendChild(menuName);
	menuContainer.appendChild(editButton);
	menuContainer.appendChild(removeButton);

	return menuContainer;
};

export const addMenu = (
	menuName,
	menuList,
	menuCounts,
	category,
	event = null
) => {
	event.preventDefault();
	if (!menuName.value) return;

	saveMenuList(menuName.value, category);

	const newMenu = makeMenu(menuName.value, menuCounts, menuList);
	menuList.appendChild(newMenu);

	menuCounts.innerText = `총 ${countMenu(menuList)}개`;
	menuName.value = '';
};

export const removeMenu = (event, menuCounts, menuList) => {
	event.preventDefault();
	if (confirm('메뉴를 삭제할까요?')) {
		event.target.parentNode.remove();
		menuCounts.innerText = `총 ${countMenu(menuList)}개`;
	}
};

export const editMenu = (event) => {
	event.preventDefault();
	const newMenu = prompt('수정할 메뉴를 작성해주세요.');
	if (newMenu) {
		const $menu = $('.menu-name', event.target.parentNode);
		$menu.innerText = newMenu;
	}
};

export const countMenu = (menuList) => menuList.children.length;

export const paintMenuList = (category) => {
	$('main').innerHTML = menuTemplate(category);
};

export const loadMenuList = (category) => {
	const loadedMenuList = getMenus(category);
	return loadedMenuList.menus;
};

export const saveMenuList = (menuName, category) => {
	const prevMenuList = getMenus(category);
	const newMenuList = {
		...prevMenuList,
		menus: [...prevMenuList.menus, menuName],
	};
	const prevAllMenus = getAllMenus();
	const newAllMenus = prevAllMenus.map((menuList) =>
		menuList.category === category ? newMenuList : menuList
	);

	setAllMenus(newAllMenus);
};
