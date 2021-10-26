export default class Store {
    constructor() {
        this.menuList = [];
        this.selectedCategory = "";
        this.setSelecedCategory("espresso");
    }

    getMenuList() {
        return this.menuList;
    }

    getMenu(event) {
        return this.menuList.filter(menu => {return menu.code === event});   
    }

    setMenuList(event) {
        this.menuList = event;
    }

    addMenu(event) {
        this.menuList.push(event);
    }

    removeMenu(event) {
        var menuList = this.menuList.filter(menu => {return menu.id !== event.getAttribute("id")});

        this.menuList = menuList;
    }

    onEditMenuName(code, name) {
        var menuIdx = this.menuList.findIndex(menuItem => {return menuItem.id === code});

        this.menuList[menuIdx].name = name;
    }

    setMenuSoldOutState(menu) {
        var menuIdx = this.menuList.findIndex(menuItem => {return menuItem.id === menu.getAttribute("id")});

        menuIdx > -1 ? this.menuList[menuIdx].isSoldOut = !this.menuList[menuIdx].isSoldOut : alert("Not found menu!!!");
    }

    getSelectedCategory() {
        return this.selectedCategory;
    }

    setSelecedCategory(event) {
        this.selectedCategory = event;
    }
}
