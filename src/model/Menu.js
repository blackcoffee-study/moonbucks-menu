import { MenuTypeUtil } from "./MenuType.js";
import StringUtil from "../util/StringUtil.js";

export default class Menu {

	constructor(type, name, isSoldOut = false) {
		if (!Menu._isValidMenuConstructorInput(type, name, isSoldOut)) {
			return;
		}

		this.id = Menu._createId(type, name);
		this.type = type;
		this.name = name;
		this.isSoldOut = isSoldOut;
	}

	static isValidMenuId(id, calledFunc= '') {
		if (typeof id !== "string") {
			console.error(`Invalid Input! ${id} is not 'string' value! @${calledFunc}`);
			return false;
		}
		return true;
	}

	static _isValidMenuName(name, calledFunc= '') {
		if (!name) {
			console.error(`Invalid Input! 'name' parameter's value "${name}" is 'undefined' or 'null' or ""(empty string) value! @${calledFunc}`);
			return false;
		}
		if (typeof name !== "string") {
			console.error(`Invalid Input! 'name' parameter's value "${name}" is not 'string' value! @${calledFunc}`);
			return false;
		}
		return true;
	}
	
	static _isValidMenuIsSoldOut(isSoldOut, calledFunc= '') {
		if (typeof isSoldOut !== "boolean") {
			console.error(`Invalid Input! 'isSoldOut' parameter's value "${isSoldOut}" is not 'boolean' value! @${calledFunc}`);
			return false;
		}
		return true;
	}
	
	static _isValidMenuConstructorInput(type, name, isSoldOut, calledFunc= 'Menu.constructor()') {
		return MenuTypeUtil.isValidMenuType(type, calledFunc)
			&& Menu._isValidMenuName(name, calledFunc)
			&& Menu._isValidMenuIsSoldOut(isSoldOut, calledFunc);
	}
	
	static _createId(type, name) {
		const idString = `${type}-${name}-${Date.now()}`;
		return StringUtil.createHashValue(idString);
	}
	
	static isValidMenu(menu, calledFunc= '') {
		if (!menu instanceof Menu) {
			console.error(`Invalid Input! menu parameter's value "${menu}" is not instance of 'Menu' class! @${calledFunc}`);
			return false;
		}
		return true;
	}

    updateMenuName(newName) {
		if (!Menu._isValidMenuName(newName, "Menu.updateMenuName()")) {
			return;
		}
		this.name = newName;
	}
	
	updateMenuSoldOut(newIsSoldOut) {
		if (!Menu._isValidMenuIsSoldOut(newIsSoldOut, "Menu.updateMenuSoldOut()")) {
			return;
		}		
		this.isSoldOut = newIsSoldOut;
	}
}
