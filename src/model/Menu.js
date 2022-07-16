class Menu {
    constructor(name) {
        if (!name) {
			console.error(`Invalid Input! ${name} is 'undefined' or 'null' or ""(empty string) value! @Menu.constructor() 1st parameter`);
			return;
		}
		if (typeof name !== "string") {
			console.error(`Invalid Input! ${name} is not 'string' value! @Menu.constructor() 1st parameter`);
			return;
		}

		this.name = name;
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
}
