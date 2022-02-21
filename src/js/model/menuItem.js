export class MenuItem {
	constructor(koreanName, category, isSoldOut) {
		this.koreanName = koreanName;
		this.category = category;
		this.isSoldOut = isSoldOut;
	}
	getKoreanName() {
		return this.koreanName;
	}
	getCategory() {
		return this.category;
	}
	getSoldOut() {
		return this.isSoldOut;
	}
}
export const menuItemHTMLToClass = ($menuItem, category) => {
	const koreanName = $menuItem.querySelector(".menu-name").textContent;
	const isSoldOut = $menuItem.querySelector(".menu-name").classList.contains('sold-out');
	return new MenuItem(koreanName, category, isSoldOut);
};