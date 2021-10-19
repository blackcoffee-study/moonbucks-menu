export class MenuAPI {
    async getCategories() {}
    async getMenu() {}
    async saveMenu() {}
}

export class LocalStorageMenuAPI extends MenuAPI {
    async getCategories() {
        return [
            {
                name: "에스프레소",
                icon: "☕",
                key: "espresso",
            },
            {
                name: "프라푸치노",
                icon: "🥤",
                key: "frappuccino",
            },
            {
                name: "블렌디드",
                icon: "🍹",
                key: "blended",
            },
            {
                name: "티바나",
                icon: "🫖",
                key: "teavana",
            },
            {
                name: "디저트",
                icon: "🍰",
                key: "dessert",
            },
        ];
    }

    async getMenu(menuKey) {
        const menuRaw = localStorage.getItem(this._createStorageKey(menuKey));
        if (menuRaw === null) {
            return [];
        }

        const menu = JSON.parse(menuRaw);

        return menu;
    }

    async saveMenu(menuKey, menuList) {
        const menuRaw = JSON.stringify(menuList);
        localStorage.setItem(this._createStorageKey(menuKey), menuRaw);
    }

    _createStorageKey(menuKey) {
        return `menu-list-${menuKey}`;
    }
}
