import { api } from '../api/index.js';
import { store } from '../store/index.js';
import { Category } from './Category.js';
import { MenuInput } from './MenuInput.js';
import { MenuList } from './MenuList.js';

export class MenuApp {
    constructor() {
        api.loadMenuItems();

        this.Category = new Category({
            onCategoryClick: this.handleCategoryClick,
        });

        this.MenuInput = new MenuInput({
            onMenuItemAdd: this.handleMenuItemAdd,
        });

        this.MenuList = new MenuList({
            onMenuItemNameEdit: this.handleMenuItemNameEdit,
            onMenuItemDelete: this.handleMenuItemDelete,
            onMenuItemSoldOut: this.handleMenuItemSoldOut,
        });
    }

    handleCategoryClick = (clickedCategory) => {
        api.loadMenuItems(clickedCategory.dataset.categoryName);
    };

    handleMenuItemAdd = (name) => {
        api.addMenuItem(store.getState().currentCategory, name);
    };

    handleMenuItemNameEdit = (menuItem) => {
        const newName = window.prompt('메뉴명을 수정해주세요');
        if (!newName) {
            return;
        }
        const targetId = menuItem.dataset.menuId;
        api.editMenuItem(store.getState().currentCategory, targetId, newName);
    };

    handleMenuItemDelete = (menuItem) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) {
            return;
        }
        const targetId = menuItem.dataset.menuId;
        api.deleteMenuItem(store.getState().currentCategory, targetId);
    };

    handleMenuItemSoldOut = (menuItem) => {
        const targetId = menuItem.dataset.menuId;
        api.soldOutMenuItem(store.getState().currentCategory, targetId);
    };
}
