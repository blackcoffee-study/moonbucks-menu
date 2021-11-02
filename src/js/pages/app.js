import MenuItem from './menuItem.js';
import MenuItemCounter from './menuCounter.js';
import MenuCategory from './menuCategory.js';
import Api from '../api.js';


export default class App {
    constructor({nav, input, category, count, menuList}) {
        this.$nav = nav;
        this.$input = input;
        this.$categoryHeader = category;
        this.$count = count;
        this.$menuList = menuList;
        this.state = {menuItems: [], nowCategory: {name: 'espresso', text: '☕ 에스프레소'}};
        this.init();
        this.setEventListener();
    }

    init() {
        this.menuItem = new MenuItem(this.$menuList, this.onClickMenu);
        this.menuItemCounter = new MenuItemCounter(this.$count);
        this.menuCategory = new MenuCategory(this.$categoryHeader);
        this.api = new Api();
        this.getData();
    }

    //원래는 없애야 할 부분이나 리팩터링 공부를 위해 남겨두었습니다
    // getLocalStorageData() {
    //     let localStorageData = this.localStorageMenu.getMenu(this.state.nowCategory.name);
    //     if (localStorageData === null || localStorageData === '') {
    //         this.setLocalStorageData();
    //         localStorageData = [];
    //     }
    //     this.state.menuItems = localStorageData;
    // }

    // setLocalStorageData() {
    //     this.localStorageMenu.setMenu(this.state.nowCategory.name, []);
    // }
    
    getData() {
        this.api.getMenuList(this.state.nowCategory.name)
        .then(response => {
            this.state.menuItems = response;
            this.setState();
        });
    }

    setData(value) {
        this.api.createMenu({category: this.state.nowCategory.name, data: value})
        .then(() => {
            this.getData();
        });
    }

    setState() {
        this.menuItem.setState(this.state.menuItems);
        this.menuItemCounter.setState(this.state.menuItems);
        this.menuCategory.setState(this.state.nowCategory);
        this.render();
    }

    render() {
        this.menuItem.render();
        this.menuItemCounter.render();
        this.menuCategory.render();
    }
    
    setEventListener() {
        this.$input.addEventListener('click', (e) => {
            const newMenuInput = input.value;
            this.onCreateMenu(newMenuInput);
            newMenuInput.value = '';
        });

        this.$nav.addEventListener('click', (e) => {
            this.onClickChangeCategory(e.target.dataset.categoryName, e.target.categoryName.innerText);
        });
    }

    onCreateMenu = (menuName) => {
        if(menuName) {
            this.setData(menuName);
        }
    }

    onClickChangeCategory = (categoryName, categoryText) => {
        this.state.nowCategory = {name: categoryName, text: categoryText};
            this.getData();
    }

    isExistClassName = (_className) => action.menuItemClassList.contains(_className);
    
    onClickMenu = (action) => {
        if (isExistClassName('menu-edit-button')) {
            this.onClickEditBtn(action.menuId);
        }
        else if (isExistClassName('menu-remove-button')) {
            this.onClickDeleteBtn(action.menuId);
        }
        else if (isExistClassName('menu-sold-out-button')) {
            this.onClickSoldOutBtn(action.menuId);
        }
    }

    onClickEditBtn(menuId) {
        const result = prompt('메뉴명을 수정하세요', this.state.menuItems[menuId].name);
        this.api.editMenu({
            category: this.state.nowCategory.name, 
            id: this.state.menuItems[menuId].id, 
            data: result
        }).then(() => this.getData());
    }

    onClickDeleteBtn(menuId) {
        const result = confirm('정말 삭제하시겠습니까?');
        if (result) {
            this.api.deleteMenu({
                category: this.state.nowCategory.name, 
                id: this.state.menuItems[menuId].id
            }).then(() => this.getData());
        }
    }

    onClickSoldOutBtn(menuId) {
        this.api.soldOutMenu({
            category: this.state.nowCategory.name, 
            id: this.state.menuItems[menuId].id
        }).then(() => this.getData());
        this.setState();
    }
}
