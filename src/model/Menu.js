class Menu {
	constructor(name, isSoldOut = false) {
		if (!name) {
			console.error(`Invalid Input! ${name} is 'undefined' or 'null' or ""(empty string) value! @Menu.constructor() 1st parameter`);
			return;
		}
		if (typeof name !== "string") {
			console.error(`Invalid Input! ${name} is not 'string' value! @Menu.constructor() 1st parameter`);
			return;
		}
		if (typeof isSoldOut !== "boolean") {
			console.error(`Invalid Input! ${isSoldOut} is not 'boolean' value! @Menu.constructor() 2nd parameter`);
		}

		this.name = name;
		this.isSoldOut = isSoldOut;
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
<<<<<<< HEAD
=======

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
>>>>>>> fe6131e (refactor: "품절" 관련 네이밍 "purchasble" -> "soldout" 으로 변경)
}
