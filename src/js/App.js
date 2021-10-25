import { $ } from './utils/dom.js';
import MenuInput from './ui/MenuInput.js';
import MenuList from './ui/MenuList.js';
import MenuItem from './ui/MenuItem.js';
import MenuCount from './ui/MenuCount.js';
import MenuCategory from './ui/MenuCategory.js';

function App() {
    this.menuItems = {
        espresso: [],
        frappuccino: [],
        blended: [],
        teavana: [],
        desert: [],
    };
    this.currentCategoryName = 'espresso';

    this.init = () => {
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
    };

    this.setState = updatedItems => {
        this.menuItems = updatedItems;
        this.menuList.setState(this.menuItems[this.currentCategoryName]);
        this.menuCount.setState(
            this.menuItems[this.currentCategoryName].length,
        );
    };

    this.onAdd = menuName => {
        const newMenuItem = new MenuItem(menuName);
        this.menuItems[this.currentCategoryName].push(newMenuItem);
        this.setState(this.menuItems);
    };

    this.onAction = (actionType, target, newMenuName) => {
        const idx = target.closest('.menu-list-item').dataset.menuIdx;
        this.action(actionType, idx, newMenuName);
        this.setState(this.menuItems);
    };

    this.onCategoryChange = target => {
        if (target.classList.contains('cafe-category-name')) {
            $('#category-title').innerText = `${target.innerText} 메뉴 관리`;
            this.currentCategoryName = target.dataset.categoryName;
            this.setState(this.menuItems);
        }
    };

    this.action = (actionType, idx, newMenuName) => {
        switch (actionType) {
            case 'update': {
                this.menuItems[this.currentCategoryName][idx].name =
                    newMenuName;
                break;
            }
            case 'delete': {
                this.menuItems[this.currentCategoryName].splice(idx, 1);
                break;
            }
            case 'soldout': {
                this.menuItems[this.currentCategoryName][idx].isSoldOut =
                    !this.menuItems[this.currentCategoryName][idx].isSoldOut;
                break;
            }
        }
    };
}

const app = new App();
app.init();
