import {
    addMenuItem,
    deleteMenuItem,
    editMenuItem,
    fetchMenuItems,
    soldOutMenuItem,
} from '../store/actionCreator.js';
import { store } from '../store/index.js';
import { Category } from './Category.js';
import { MenuInput } from './MenuInput.js';
import { MenuList } from './MenuList.js';

export class MenuApp {
    constructor() {
        store.dispatch(fetchMenuItems());

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
        store.dispatch(fetchMenuItems(clickedCategory.dataset.categoryName));
    };

    handleMenuItemAdd = (name) => {
        store.dispatch(addMenuItem(name));
    };

    handleMenuItemNameEdit = (menuItem) => {
        const newName = window.prompt('메뉴명을 수정해주세요');
        if (!newName) {
            return;
        }
        store.dispatch(editMenuItem(menuItem.dataset.menuId, newName));
    };

    handleMenuItemDelete = (menuItem) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) {
            return;
        }
        store.dispatch(deleteMenuItem(menuItem.dataset.menuId));
    };

    handleMenuItemSoldOut = (menuItem) => {
        store.dispatch(soldOutMenuItem(menuItem.dataset.menuId));
    };
}
