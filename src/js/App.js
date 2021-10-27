import { $ } from './utils/dom.js';
import MenuInput from './ui/MenuInput.js';
import MenuList from './ui/MenuList.js';
import MenuCount from './ui/MenuCount.js';
import MenuCategory from './ui/MenuCategory.js';
import Api from './utils/api.js';

function App() {
    this.currentCategoryName = 'espresso';

    this.init = async () => {
        this.menuInput = new MenuInput({
            onAdd: this.onAdd,
            $menuSubmitButton: $('#menu-submit-button'),
            $menuName: $('#menu-name'),
        });

        this.menuList = new MenuList({
            onAction: this.onAction,
            $menuList: $('#menu-list'),
        });

        this.menuCount = new MenuCount({ $menuCount: $('.menu-count') });

        this.menuCategory = new MenuCategory({
            onCategoryChange: this.onCategoryChange,
            $nav: $('nav'),
        });
        this.setState();
    };

    this.setState = async () => {
        const menuList = await Api.getMenuList(this.currentCategoryName);
        this.menuList.setState(menuList);
        this.menuCount.setState(menuList.length);
    };

    this.onAdd = async menuName => {
        await Api.postMenu(this.currentCategoryName, menuName);
        this.setState();
    };

    this.onAction = (actionType, target, newMenuName) => {
        const id = target.closest('.menu-list-item').dataset.menuId;
        this.action(actionType, id, newMenuName);
        this.setState();
    };

    this.onCategoryChange = async target => {
        if (target.classList.contains('cafe-category-name')) {
            $('#category-title').innerText = `${target.innerText} 메뉴 관리`;
            this.currentCategoryName = target.dataset.categoryName;
            this.setState();
        }
    };

    this.action = async (actionType, id, newMenuName) => {
        if ('update' == actionType) {
            await Api.updateMenu(this.currentCategoryName, id, newMenuName);
        } else if ('delete' == actionType) {
            await Api.deleteMenu(this.currentCategoryName, id);
        } else if ('soldout' == actionType) {
            await Api.updateSoldout(this.currentCategoryName, id);
        }
    };
}

const app = new App();
app.init();
