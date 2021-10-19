import { addMenu, deleteMenu, editMenu, soldoutMenu } from './pages/MenuHandle.js';
import { init, render } from './pages/MenuListUI.js';
import { getData, setData } from './pages/Storage.js';
import selectMenuType from './pages/MenuSelect.js';
import { $, $$ } from './pages/Util.js';

const $addMenuBtn = $('#menu-submit-button');
const $menuForm = $('#menu-form');
const $menuList = $('#menu-list');
const $menuTypeBtns = $$('.cafe-category-name');

console.log($menuTypeBtns);

$menuTypeBtns.forEach((e) =>
	e.addEventListener('click', function(ele) {
		const target = ele.target;
		console.log(target);
		selectMenuType(target);
	})
);

console.log($addMenuBtn);

$addMenuBtn.addEventListener('click', function(e) {
	e.preventDefault();
	addMenu();
});

$menuForm.addEventListener('submit', function(e) {
	e.preventDefault();
	addMenu();
});

$menuList.addEventListener('click', function(e) {
	const target = e.target;
	const targetMenu = target.parentNode;

	if (target.classList.contains('menu-edit-button')) {
		editMenu(targetMenu);
	} else if (target.classList.contains('menu-remove-button') && confirm('삭제하시겠습니까?')) {
		deleteMenu(targetMenu);
	} else if (target.classList.contains('menu-soldout-button')) {
		soldoutMenu(targetMenu);
	}
});
