import {
    BUTTON,
    ADD_MENUITEM,
    DELETE_MENUITEM,
    EDIT_MENUITEM,
    SOLDOUT_MENUITEM,
    UPDATE_CATEGORY,
} from '../Constants.js';
import { store } from '../Store.js';
import { $ } from '../Utils.js';

export class MenuList {
    constructor({ onMenuItemNameEdit, onMenuItemDelete, onMenuItemSoldOut }) {
        this.$menuCount = $('.menu-count');
        this.$menuList = $('#menu-list');

        this.$menuList.addEventListener('click', (event) => {
            const targetBtn = event.target;
            if (targetBtn.tagName !== BUTTON) {
                return;
            }
            const targetMenuItem = targetBtn.closest('li');
            if (targetBtn.classList.contains('menu-edit-button')) {
                onMenuItemNameEdit(targetMenuItem);
            }
            if (targetBtn.classList.contains('menu-remove-button')) {
                onMenuItemDelete(targetMenuItem);
            }
            if (targetBtn.classList.contains('menu-sold-out-button')) {
                onMenuItemSoldOut(targetMenuItem);
            }
        });

        store.subscribe(ADD_MENUITEM, this.render);
        store.subscribe(DELETE_MENUITEM, this.render);
        store.subscribe(EDIT_MENUITEM, this.render);
        store.subscribe(SOLDOUT_MENUITEM, this.render);
        store.subscribe(UPDATE_CATEGORY, this.render);
    }

    render = (state) => {
        const menuItemsKey = state.currentCategory;
        const menuItems = state[menuItemsKey];
        this.$menuList.innerHTML = menuItems
            .map(
                (menuItem, idx) => `
            <li data-menu-id="${idx}" class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name${
                    menuItem.soldOut === true ? ' sold-out' : ''
                }">${menuItem.name}</span>
                <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
                >
                품절
                </button>
                <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
                >
                수정
                </button>
                <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
                >
                삭제
                </button>
            </li>
        `
            )
            .join('');
        this.$menuCount.innerText = `총 ${menuItems.length}개`;
    };
}
