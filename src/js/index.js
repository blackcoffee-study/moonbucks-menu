import { $, $all } from "./utils/DOM.js";
import {
	addMenu,
	loadMenuList,
	makeMenu,
	paintMenuList,
} from "./utils/commons.js";

const $allMenuCounts = $(".menu-count");

const addEvents = (category) => {
	const $menuName = $(`#${category}-menu-name`);
	const $menuList = $(`#${category}-menu-list`);
	const $menuForm = $(`#${category}-menu-form`);
	const $addMenuButton = $(`#${category}-menu-submit-button`);

	$menuForm.addEventListener("submit", (event) =>
		addMenu($menuName, $menuList, $allMenuCounts, category, event)
	);
	$addMenuButton.addEventListener("click", (event) =>
		addMenu($menuName, $menuList, $allMenuCounts, category, event)
	);
};

const initialize = () => {
	const $allCategoryNames = $all(".cafe-category-name");
	const firstCategory = $allCategoryNames[0].dataset.categoryName;
	[...$allCategoryNames].forEach((category) =>
		category.addEventListener("click", (event) => {
			event.preventDefault();
			paintMenuList(category.dataset.categoryName);
			addEvents(category.dataset.categoryName);
		})
	);

	paintMenuList(firstCategory);
	const loadedMenuList = loadMenuList(firstCategory);
	loadedMenuList.forEach((loadedMenu) => {
		const madeMenu = makeMenu(
			loadedMenu,
			$allMenuCounts,
			$(`#${firstCategory}-menu-list`)
		);
		$(`#${firstCategory}-menu-list`).appendChild(madeMenu);
	});
	addEvents(firstCategory);
};

window.onload = () => initialize();
