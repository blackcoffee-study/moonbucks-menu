import {App} from "./app.js";
import {Category} from "./model/category.js";
import {$menuListTemplate} from "./template/menuListTemplate.js";
export const $ = (selector) => document.querySelector(selector);

const categoryDB = {
	'espresso': new Category('에스프레소', 'espresso', "☕"),
	'frappuccino': new Category('프라푸치노', 'frappuccino', "🥤"),
	'blended': new Category('블렌디드', 'blended', "🍹"),
	'teavana': new Category('티바나', 'teavana', "🫖"),
	'desert': new Category('디저트', 'desert', "🍰")
};

document.addEventListener("DOMContentLoaded", function () {
	$("nav").addEventListener("click", e => {
		const $target = e.target;
		if($target.classList.contains('cafe-category-name')) {
			const category = categoryDB[$target.dataset.categoryName];
			$('main').innerHTML=$menuListTemplate(category);
			new App(categoryDB[e.target.dataset.categoryName]);
		}
	});
	new App(categoryDB['espresso']);
});