import { MenuTypeUtil } from "./MenuType.js";
import StringUtil from "../util/StringUtil.js";

export default class Menu {
	constructor(type, name, isSoldOut = false) {
		if (!type) {
			console.error(`Invalid Input! ${type} is 'undefined' or 'null' or ""(empty string) value! @Menu.constructor() 1st parameter`);
			return;
		}
		if (!MenuTypeUtil.isMenuType(type)) {
			console.error(`Invalid Input! ${type} is not value declared at "MenuType.js" file! @Menu.constructor() 1st parameter`);
			return;
		}

		if (!name) {
			console.error(`Invalid Input! ${name} is 'undefined' or 'null' or ""(empty string) value! @Menu.constructor() 2nd parameter`);
			return;
		}
		if (typeof name !== "string") {
			console.error(`Invalid Input! ${name} is not 'string' value! @Menu.constructor() 2nd parameter`);
			return;
		}
		if (typeof isSoldOut !== "boolean") {
			console.error(`Invalid Input! ${isSoldOut} is not 'boolean' value! @Menu.constructor() 3rd parameter`);
			return;
		}

		this.id = Menu.createId(type, name);
		this.type = type;
		this.name = name;
		this.isSoldOut = isSoldOut;
	}

	static createId(type, name) {
		const idString = `${type}-${name}-${Date.now()}`;
		return StringUtil.createHashValue(idString);
	}

    updateMenuName(newName) {
        if (!newName) {
            console.error(`Invalid Input! ${newName} is 'undefined' or 'null' or ""(empty string) value! @Menu.updateMenuName() 1st parameter`);
			return;
		}
		if (typeof newName !== "string") {
			console.error(`Invalid Input! ${newName} is not 'string' value! @Menu.updateMenuName() 1st parameter`);
			return;
		}

		this.name = newName;
	}

	updateMenuSoldOut(newIsSoldOut) {
		if (!newIsSoldOut) {
			console.error(`Invalid Input! ${newIsSoldOut} is 'undefined' or 'null' or ""(empty string) value! @Menu.updateMenuPurchasable() 1st parameter`);
			return;
		}
		if (typeof newIsSoldOut !== "boolean") {
			console.error(`Invalid Input! ${newIsSoldOut} is not 'boolean' value! @Menu.updateMenuPurchasable() 1st parameter`);
			return;
		}

		this.isSoldOut = newIsSoldOut;
	}
}
