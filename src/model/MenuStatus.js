import Menu from './Menu';

export default class MenuStatus {
    constructor(menuList = []) {
        if (menuList.some(menu => !menu instanceof Menu)) {
            console.error(`Invalid Input! ${menuList} array has a non Menu instance value @MenuStatus.constructor() 1st parameter`);
            return;
        }
        this.menuList = menuList
    }

    reset() {
        this.menuList = [];
    }

    add(newMenu) {
        if (!newMenu instanceof Menu) {
			console.error(`Invalid Input! ${newMenu} is not instance of 'Menu' class! @MenuStatus.add() 1st parameter`);
			return;
		}
        this.menuList.push(newMenu);
    }

    getMenuList() {
        return this.menuList;
    }

    getMenuCount() {
        return this.menuList.length;
    }

    update(index, newMenu) {
        if (typeof(index) !== 'number') {
            console.error(`Invalid Input! ${index} is not 'number' value! @MenuStatus.update() 1st parameter`);
            return;
        }

        if (!newMenu instanceof Menu) {
            console.error(`Invalid Input! ${newMenu} is not instance of 'Menu' class! @MenuStatus.update() 2nd parameter`);
			return;
        }

        this.menuList = this.menuList.map(
            (menu, i) => (i === index) ? newMenu : menu
        );
    }

    /**
     * @param {number} index 메뉴판에 보이는 메뉴들의 index 값. 첫번째 메뉴의 경우 0 값이 전달되어야 함.
     */
    delete(index) {
        if (typeof index !== "number") {
			console.error(`Invalid Input! ${index} is not 'number' value! @MenuStatus.delete() 1st parameter`);
			return;
		}
        this.menuList = this.menuList.filter(
            (menu, i) => i !== index
        );
    }
}