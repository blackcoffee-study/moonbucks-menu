import MenuItem from './menuItem.js';
import MenuItemCounter from './menuCounter.js';
import LocalStorageMenu from './localStorageMenu.js';
import MenuCategory from './menuCategory.js';


export default class App {
    constructor(nav, main, category, count, menuList) {
        this._nav = nav;
        this._main = main;
        this._categoryHeader = category;
        this._count = count;
        this._menuList = menuList;
        this._state = {menuItems: [], nowCategory: {name: 'espresso', text: '☕ 에스프레소'}};
        this.init();
        this.setState();
        this.setEventListener();
    }

    init() {
        this.menuItem = new MenuItem(this._menuList, this.onMenuClick);
        this.menuItemCounter = new MenuItemCounter(this._count);
        this.menuCategory = new MenuCategory(this._categoryHeader);
        this.localStorageMenu = new LocalStorageMenu();
        this.getLocalStorageData();
    }

    getLocalStorageData() {
        let localStorageData = this.localStorageMenu.getMenu(this._state.nowCategory.name);
        if (localStorageData === null || localStorageData === '') {
            this.setLocalStorageData();
            localStorageData = [];
        }
        this._state.menuItems = localStorageData;
    }

    setLocalStorageData() {
        this.localStorageMenu.setMenu(this._state.nowCategory.name, []);
    }
    

    setState() {
        this.menuItem.setState(this._state.menuItems);
        this.menuItemCounter.setState(this._state.menuItems);
        this.menuCategory.setState(this._state.nowCategory)
        this.localStorageMenu.setMenu(this._state.nowCategory.name, this._state.menuItems);
        this.render();
    }

    render() {
        this.menuItem.render();
        this.menuItemCounter.render();
        this.menuCategory.render();
    }
    
    setEventListener() {
        this._main.addEventListener('click', (e) => {
            const newMenuInput = e.target.closest('main').querySelector('input');
            if(newMenuInput.value !== undefined && newMenuInput.value !== '') {
                this._state.menuItems.push({name: newMenuInput.value, soldOut: false});
            }
            newMenuInput.value = '';
            this.setState();
        });

        this._nav.addEventListener('click', (e) => {
            this._state.nowCategory = {name: e.target.dataset.categoryName, text: e.target.innerText};
            this.getLocalStorageData();
            this.setState();
        });
    }

    onMenuClick = (action) => {
        const isExistClassName = (_className) => action.menuItemClassList.contains(_className);
        if (isExistClassName('menu-edit-button')) {
            this.clickEditBtn(action.menuId);
        }
        else if (isExistClassName('menu-remove-button')) {
            this.clickDeleteBtn(action.menuId);
        }
        else if (isExistClassName('menu-sold-out-button')) {
            this.clickSoldOutBtn(action.menuId);
        }
        this.setState();
    }

    clickEditBtn(menuId) {
        const result = prompt('메뉴명을 수정하세요', this._state.menuItems[menuId].name);
        this._state.menuItems[menuId].name = result;
    }

    clickDeleteBtn(menuId) {
        const result = confirm('정말 삭제하시겠습니까?');
        if (result) this._state.menuItems.splice(menuId, 1);
    }

    clickSoldOutBtn(menuId) {
        this._state.menuItems[menuId].soldOut = !this._state.menuItems[menuId].soldOut;
        this.setState();
    }
}
