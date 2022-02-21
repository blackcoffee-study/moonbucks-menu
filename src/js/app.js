import {$menuItemTemplate} from "./template/menuItemTemplate.js";
import {deleteMenu, findAllMenuByCategory, saveMenu} from "./storage.js";
import {MenuItem, menuItemHTMLToClass} from "./model/menuItem.js";
import {$} from "./index.js";

export class App {
	constructor(category) {
		this.category = category;
		this.$ = {
			main: $('main'),
			menuForm: $(`#${category.getEnglishName()}-menu-form`),
			submitBtn: $(`#${category.getEnglishName()}-menu-submit-button`),
			menuInput: $(`#${category.getEnglishName()}-menu-name`),
			menuList: $(`#${category.getEnglishName()}-menu-list`),
			menuCount: $('.menu-count'),
			menuListItem: document.getElementsByClassName('menu-list-item'),
		}
		this.loadMenuItemList();
		this.bindEvent();
	};

	loadMenuItemList() {
		findAllMenuByCategory(this.category).forEach(menuItem => {
			this.$.menuList.insertAdjacentHTML(
				'beforeend',
				$menuItemTemplate(menuItem.getKoreanName(), menuItem.getSoldOut())
			);
		});
		this.updateMenuCount();
	}

	addNewMenuItem() {
		const $menuItemName = this.$.menuInput.value;
		if(this.isValidInput($menuItemName)) {
			this.$.menuList.insertAdjacentHTML(
				'beforeend',
				$menuItemTemplate($menuItemName, false)
			);
			saveMenu(new MenuItem($menuItemName, this.category));
		}
		this.updateMenuCount();
		this.clearInputValue(this.$.menuInput);
	};

	updateMenuItemName($menuItem) {
		const $menuItemName = $menuItem.querySelector('.menu-name');
		let updatedMenuItemName = window.prompt('메뉴명을 수정하세요', $menuItemName.textContent);
		deleteMenu(menuItemHTMLToClass($menuItem, this.category));

		$menuItemName.innerText = updatedMenuItemName;
		saveMenu(menuItemHTMLToClass($menuItem, this.category));
	}

	removeMenuItem($menuItem) {
		if(confirm('정말 삭제하시겠습니까?')){
			$menuItem.remove();
			deleteMenu(menuItemHTMLToClass($menuItem, this.category));
		}
		this.updateMenuCount();
	}

	toggleSoldOut($menuItem) {
		$menuItem.querySelector('.menu-name').classList.toggle('sold-out');
		saveMenu(menuItemHTMLToClass($menuItem, this.category));
	}

	updateMenuCount() {
		this.$.menuCount.textContent = `총 ${this.$.menuListItem.length}개`;
	};

	clearInputValue(input) {
		input.value = '';
	}

	isValidInput(input) {
		if (!input) {
			alert("값을 입력해 주세요.");
			return;
		}
		return true;
	}

	bindEvent() {
		this.$.menuInput.addEventListener('keypress', e => {
			if(e.key === 'Enter')
			this.addNewMenuItem();
			e.preventDefault();
		});

		this.$.menuList.addEventListener('click', e => {
			const $target = e.target;
			const $menuItem = e.target.closest("li");

			if($target.className.includes('menu-edit-button')) {
				this.updateMenuItemName($menuItem);
			}
			if($target.className.includes('menu-remove-button')) {
				this.removeMenuItem($menuItem);
			}
			if($target.className.includes('menu-sold-out-button')) {
				this.toggleSoldOut($menuItem);
			}
		});

		this.$.submitBtn.addEventListener('click', e => {
			this.addNewMenuItem();
		})

		this.$.menuForm.addEventListener("submit", e => {
			e.preventDefault();
		});
	};
}