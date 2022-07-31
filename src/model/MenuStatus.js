import Menu from "./Menu.js";
import {MenuType, MenuTypeUtil} from "./MenuType.js";
import LocalStorageUtil from "../util/LocalStorageUtil.js"

export default class MenuStatus {

	constructor(menuList = [], selectedMenuType = MenuType.ESPRESSO) {
		if (!MenuStatus._isValidMenuStatusConstructorInput(menuList, selectedMenuType)) {
			return;
		}

		this.menuList = menuList;
		this.selectedMenuType = selectedMenuType;
	}

	static _isValidMenuList(menuList, calledFunc = "") {
		if (menuList.some((menu) => !Menu.isValidMenu(menu, calledFunc))) {
			console.error(`Invalid Input! 'menuList' parameter's value "${menuList}" array has a non Menu instance value @${calledFunc}`);
			return false;
		}
		return true;
	}

	static _isValidMenuStatusConstructorInput(menuList, selectedMenuType, calledFunc = "MenuStatus.constructor()") {
		return MenuStatus._isValidMenuList(menuList, calledFunc) 
            && MenuTypeUtil.isValidMenuType(selectedMenuType, calledFunc);
	}

	static load() {
		const storedData = LocalStorageUtil.load();
		const storedMenuStatus = Object.assign(MenuStatus, JSON.parse(storedData));

		if (!storedData) {
			return undefined;
		}
		return new MenuStatus(
			storedMenuStatus.menuList,
			storedMenuStatus.selectedMenuType
		);
	}

	static loadOrCreateNewMenuStatus() {
		return MenuStatus.load() ?? new MenuStatus();
	}

	reset() {
		this.menuList = [];
		this.store();
	}

	add(newMenu) {
		if (!Menu.isValidMenu(newMenu, "MenuStatus.add()")) {
			return;
		}

		this.menuList.push(newMenu);
		this.store();
	}

	getMenu(id) {
		if (!Menu.isValidMenuId(id, "MenuStatus.getMenu()")) {
			return;
		}

		const menu = this.menuList.find((menu) => menu.id === id);
		if (!menu) {
			console.error(`MenuStatus's menuList doesn't have Menu with Id "${id}!"`);
			return;
		}
		return menu;
	}

	getMenuList() {
		return this.menuList.filter(
			(menu) => menu.type === this.selectedMenuType
		);
	}

	getMenuCount() {
		return this.getMenuList().length;
	}

	getSelectedMenuType() {
		return this.selectedMenuType;
	}

	setSelectedMenuType(newMenuType) {
		if (!MenuTypeUtil.isValidMenuType(newMenuType, "MenuStatus.setSelectedMenuType()")) {
			return;
		}

		this.selectedMenuType = newMenuType;
		this.store();
	}

	update(updatedMenuId, newMenu) {
		if (!Menu.isValidMenuId(updatedMenuId, "MenuStatus.update()") || !Menu.isValidMenu(newMenu, "MenuStatus.update()")) {
			return;
		}

		this.menuList = this.menuList.map((menu) =>
			menu.id === updatedMenuId ? newMenu : menu
		);
		this.store();
	}

	/**
	 * @param {string} deletedMenuId 삭제할 메뉴의 고유한 id 값.
	 */
	delete(deletedMenuId) {
		if (!Menu.isValidMenuId(deletedMenuId, "MenuStatus.delete()")) {
			return;
		}

		this.menuList = this.menuList.filter(
			(menu) => menu.id !== deletedMenuId
		);
		this.store();
	}

	store() {
		const storeObj = JSON.stringify(this);
		LocalStorageUtil.store(storeObj);
	}
}
