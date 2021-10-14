export default class Store {
    menuList = [];
    selectedCategory = "";
    constructor() {}

    getMenuList() {
        return this.menuList;
    }

    setMenuList(event) {
        this.menuList = event;
    }

    addMenuList(event) {
        this.menuList.push(event);
    }

    getSelectedCategory() {
        return this.selectedCategory;
    }

    setSelecedCategory(event) {
        this.selectedCategory = event;
    }
}
