import { $, $$ } from './Util.js';
import { getData, setData } from './Storage.js';
export { init, render };

const init = () => {
	render('espresso');
};

const render = (e) => {
	const type = e.dataset.categoryName;
	const data = getData(type);
	if (data != null) {
		$('.wrapper').innerHTML = data;
	}
	console.log(type);
	$('.heading').innerHTML = Drink(type);
	document.getElementsByTagName('placeholder').innerHTML = DrinkLabel(type);
};

const Drink = (type) => {
	switch (type) {
		case 'espresso':
			return '☕ 에스프레소 메뉴 관리';
		case 'frappuccino':
			return '🥤 프라푸치노 메뉴 관리';
		case 'blended':
			return '🍹 블렌디드 메뉴 관리';
		case 'teavana':
			return '🫖 티바나 메뉴 관리';
		case 'desert':
			return '🍰 디저트 메뉴 관리';
	}
};

const DrinkLabel = (type) => {
	switch (type) {
		case 'espresso':
			return '에스프레소 메뉴 이름';
		case 'frappuccino':
			return '프라푸치노 메뉴 이름';
		case 'blended':
			return '블렌디드 메뉴 이름';
		case 'teavana':
			return '티바나 메뉴 이름';
		case 'desert':
			return '디저트 메뉴 이름';
	}
};
