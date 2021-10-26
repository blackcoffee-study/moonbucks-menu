import {
    ADD_MENUITEM,
    DELETE_MENUITEM,
    EDIT_MENUITEM,
    SOLDOUT_MENUITEM,
    UPDATE_CATEGORY,
} from '../src/Constants.js';
import { store } from './Store.js';
import { Category } from './components/Category.js';
import { MenuInput } from './components/MenuInput.js';
import { MenuList } from './components/MenuList.js';

export class App {
    constructor() {
        this.menuItems = store.getState();

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
        store.dispatch({
            type: UPDATE_CATEGORY,
            payload: {
                newCategory: clickedCategory.dataset.categoryName,
            },
        });
    };

    handleMenuItemAdd = (name) => {
        store.dispatch({
            type: ADD_MENUITEM,
            payload: {
                name,
                soldOut: false,
            },
        });
    };

    handleMenuItemNameEdit = (menuItem) => {
        const newName = window.prompt('메뉴명을 수정해주세요');
        if (!newName) {
            return;
        }
        const targetIdx = menuItem.dataset.menuId;
        store.dispatch({
            type: EDIT_MENUITEM,
            payload: {
                targetIdx,
                newName,
            },
        });
    };

    handleMenuItemDelete = (menuItem) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) {
            return;
        }
        const targetIdx = menuItem.dataset.menuId;
        store.dispatch({ type: DELETE_MENUITEM, payload: { targetIdx } });
    };

    handleMenuItemSoldOut = (menuItem) => {
        const targetIdx = menuItem.dataset.menuId;
        store.dispatch({ type: SOLDOUT_MENUITEM, payload: { targetIdx } });
    };
}
