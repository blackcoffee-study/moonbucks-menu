import { SELECTORS } from "../constant/element.js";

export default class Menu {    
    constructor({onSoldOutMenu, onEditMenu, onRemoveMenu}) {
        this.onSoldOutMenu = onSoldOutMenu;
        this.onEditMenu = onEditMenu;
        this.onRemoveMenu = onRemoveMenu;
    }

    getMenuForm(menu) {
        let returnForm = document.createElement("template");
        
        returnForm.innerHTML = `
        <li id="${menu.id}" class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name ${menu.isSoldOut ? 'sold-out' : ''}">${menu.name}</span>
            <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button">
                품절
            </button>
            <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">
                수정
            </button>
            <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">
                삭제
            </button></li>
        `

        return returnForm;

        // let liElement = document.createElement("li");
        
        // liElement.setAttribute("id", menu.id);
        // liElement.setAttribute("data-cateogry", menu.category);
        // liElement.setAttribute("class", "menu-list-item d-flex items-center py-2");

        // liElement.addEventListener("click", ({target}) => {
        //     if(target.classList.contains(SELECTORS.CLASS.MENU_SOLD_OUT_BUTTON.slice(1, SELECTORS.CLASS.MENU_SOLD_OUT_BUTTON.length))) {
        //         this.onSoldOutMenu(liElement);
        //     }

        //     if(target.classList.contains(SELECTORS.CLASS.MENU_EDIT_BUTTON.slice(1, SELECTORS.CLASS.MENU_EDIT_BUTTON.length))) {
        //         this.onEditMenu(liElement);
        //     }

        //     if(target.classList.contains(SELECTORS.CLASS.MENU_REMOVE_BUTTON.slice(1, SELECTORS.CLASS.MENU_REMOVE_BUTTON.length))) {
        //         this.onRemoveMenu(liElement);
        //     }
        // });

        // liElement.innerHTML = `
        //     <span class="w-100 pl-2 menu-name ${menu.isSoldOut ? 'sold-out' : ''}">${menu.name}</span>
        //     <button
        //         type="button"
        //         class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
        //     >
        //         품절
        //     </button>
        //     <button
        //         type="button"
        //         class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
        //     >
        //         수정
        //     </button>
        //     <button
        //         type="button"
        //         class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
        //     >
        //         삭제
        //     </button>`;

        // return liElement;
    }
}
