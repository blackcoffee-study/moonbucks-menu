import {MenuItem} from "./model/menuItem.js";

export function saveMenu(menuItem) {
	console.log(JSON.stringify(menuItem));
	localStorage.setItem(menuItem.getKoreanName(),JSON.stringify(menuItem));
}

export function deleteMenu(menuItem) {
	localStorage.removeItem(menuItem.getKoreanName());
}

export function findAllMenuByCategory(category) {
	const menuItems = [];
	const keys = Object.keys(localStorage);

	for(let i=0 ; i<keys.length ; i++) {
		const menuItem = JSON.parse(localStorage.getItem(keys[i]));
		if(menuItem["category"]["englishName"] === category.getEnglishName()) {
			menuItems.push(
				new MenuItem(menuItem['koreanName'], menuItem["category"], menuItem["isSoldOut"]));
		}
	};
	return menuItems;
}

