import {
    BUTTON,
    LOAD_MENUITEMS_SUCCESS,
    ADD_MENUITEM_SUCCESS,
    EDIT_MENUITEM_SUCCESS,
    DELETE_MENUITEM_SUCCESS,
    SOLDOUT_MENUITEM_SUCCESS,
} from '../constant/index.js';
import { store } from '../store/index.js';
import { $ } from '../utils/index.js';

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

        store.subscribe(LOAD_MENUITEMS_SUCCESS, this.render);
        store.subscribe(ADD_MENUITEM_SUCCESS, this.render);
        store.subscribe(DELETE_MENUITEM_SUCCESS, this.render);
        store.subscribe(EDIT_MENUITEM_SUCCESS, this.render);
        store.subscribe(SOLDOUT_MENUITEM_SUCCESS, this.render);
    }

    render = (state) => {
        const menuItems = state.menuItems;
        this.$menuList.innerHTML = menuItems
            .map(
                ({ id, name, isSoldOut }) => `
                    <li data-menu-id="${id}" class="menu-list-item d-flex items-center py-2">
                        <span class="w-100 pl-2 menu-name${
                            isSoldOut === true ? ' sold-out' : ''
                        }">${name}</span>
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
