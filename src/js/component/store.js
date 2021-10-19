export default class Store {
    
    constructor(category) {
        this.setSelecedCategory(category);
        this.menuList = localStorage.getItem("menus") ? JSON.parse(localStorage.getItem("menus")) : [];
    }

    getMenuList() {
        return this.menuList;
    }

    getShowMenuList() {
        return this.menuList.filter(menu => {return menu.category === this.selectedCategory});   
    }

    getMenu(event) {
        return this.menuList.filter(menu => {return menu.code === event});   
    }

    setMenuList(event) {
        this.menuList = event;
    }

    addMenu(event) {
        this.menuList.push(event);
        localStorage.setItem("menus", JSON.stringify(this.menuList));
    }

    removeMenu(event) {
        var menuList = this.menuList.filter(menu => {return menu.code !== event.getAttribute("id")});

        this.menuList = menuList;
        localStorage.setItem("menus", JSON.stringify(this.menuList));
    }

    onEditMenuName(code, name) {
        var menuIdx = this.menuList.findIndex(menuItem => {return menuItem.code === code});

        this.menuList[menuIdx].name = name;
        localStorage.setItem("menus", JSON.stringify(this.menuList));
    }

    setMenuSoldOutState(menu) {
        var menuIdx = this.menuList.findIndex(menuItem => {return menuItem.code === menu.getAttribute("id")});

        menuIdx > -1 ? this.menuList[menuIdx].isSoldOut = !this.menuList[menuIdx].isSoldOut : alert("Not found menu!!!");
        localStorage.setItem("menus", JSON.stringify(this.menuList));
    }

    getSelectedCategory() {
        return this.selectedCategory;
    }

    setSelecedCategory(event) {
        this.selectedCategory = event;
    }
}
