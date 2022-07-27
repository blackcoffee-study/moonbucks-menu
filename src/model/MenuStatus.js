class MenuStatus {
    constructor(menuList = [], selectedMenuType = MenuType.ESPRESSO) {
        if (menuList.some(menu => !menu instanceof Menu)) {
            console.error(`Invalid Input! ${menuList} array has a non Menu instance value @MenuStatus.constructor() 1st parameter`);
            return;
        }
        if (!MenuTypeUtil.isMenuType(selectedMenuType)) {
			console.error(`Invalid Input! ${selectedMenuType} is not value declared at "MenuType.js" file! @MenuStatus.constructor() 2nd parameter`);
            return;
		}

        this.menuList = menuList
        this.selectedMenuType = selectedMenuType;
    }

    reset() {
        this.menuList = [];
        this.store();
    }

    add(newMenu) {
        if (!newMenu instanceof Menu) {
			console.error(`Invalid Input! ${newMenu} is not instance of 'Menu' class! @MenuStatus.add() 1st parameter`);
			return;
		}
        this.menuList.push(newMenu);
        this.store();
    }

    getMenu(id) {
        if (typeof id !== "string") {
			console.error(`Invalid Input! ${id} is not 'string' value! @MenuStatus.update() 1st parameter`);
			return;
		}
        const menu = this.menuList.find(menu => menu.id === id);
        if (!menu) {
            console.error(`MenuStatus's menuList doesn't have Menu with Id "${id}!"`);
            return;
        }
        return menu;
    }

    getMenuList() {
        return this.menuList.filter(
            menu => menu.type === this.selectedMenuType
        );

    }

    getMenuCount() {
        return this.getMenuList().length;
    }

    getSelectedMenuType() {
        return this.selectedMenuType;
    }

    setSelectedMenuType(newMenuType) {
        if (!newMenuType) {
			console.error(`Invalid Input! ${newMenuType} is 'undefined' or 'null' or ""(empty string) value! @MenuStatus.setSelectedMenuType() 1st parameter`);
            return;
		}
		if (!MenuTypeUtil.isMenuType(newMenuType)) {
			console.error(`Invalid Input! ${newMenuType} is not value declared at "MenuType.js" file! @MenuStatus.setSelectedMenuType() 1st parameter`);
            return;
		}

        this.selectedMenuType = newMenuType;
        this.store();
    }

    update(updatedMenuId, newMenu) {
        if (typeof(updatedMenuId) !== 'string') {
            console.error(`Invalid Input! ${updatedMenuId} is not 'string' value! @MenuStatus.update() 1st parameter`);
            return;
        }

        if (!newMenu instanceof Menu) {
            console.error(`Invalid Input! ${newMenu} is not instance of 'Menu' class! @MenuStatus.update() 2nd parameter`);
			return;
        }

        this.menuList = this.menuList.map(
            menu => menu.id === updatedMenuId ? newMenu : menu
        );
        this.store();
    }

    /**
     * @param {string} deletedMenuId 삭제할 메뉴의 고유한 id 값.
     */
    delete(deletedMenuId) {
        if (typeof deletedMenuId !== "string") {
			console.error(`Invalid Input! ${deletedMenuId} is not 'string' value! @MenuStatus.delete() 1st parameter`);
			return;
		}
        this.menuList = this.menuList.filter(
            menu => menu.id !== deletedMenuId
        );
        this.store();
    }

    store() {
        const storeObj = JSON.stringify(this);
        LocalStorageUtil.store(storeObj);
    }

    static load() {
        const storedData = LocalStorageUtil.load();
        const storedMenuStatus = Object.assign(MenuStatus, JSON.parse(storedData));

        if (!storedData) {
            return undefined;
        }    
        return new MenuStatus(storedMenuStatus.menuList, storedMenuStatus.selectedMenuType);
    }

    static loadOrCeateNewMenuStatus() {
        return MenuStatus.load() ?? new MenuStatus();
    }
}
