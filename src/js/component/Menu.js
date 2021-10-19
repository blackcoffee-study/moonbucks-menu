import { SELECTORS } from "../Constants.js";

export default class Menu {
    onSoldOutMenu = null
    onEditMenu = null;
    onRemoveMenu = null;
    
    constructor({onSoldOutMenu, onEditMenu, onRemoveMenu}) {
        this.onSoldOutMenu = onSoldOutMenu;
        this.onEditMenu = onEditMenu;
        this.onRemoveMenu = onRemoveMenu;
    }

    getMenuForm(menu) {
        var menuElement = document.createElement("template");

        menuElement.innerHTML = `
        <li class="menu-list-item d-flex items-center py-2" id="${menu.code}" data-cateogry="${menu.category}">
            <span class="w-100 pl-2 menu-name ${menu.isSoldOut ? 'sold-out' : ''}">${menu.name}</span>
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
        </li>`;

        return menuElement.content;
    }
}
