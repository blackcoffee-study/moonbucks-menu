export class MenuApp {
    constructor() {
        const MIN_SPLICE = 1;
        let menuItems = [];

        let menuTitle = new MenuTitle();

        let menuList = new MenuList(document.getElementById('espresso-menu-list'), {
            onUpdate(index, menuName) {
                const newMenuItem = new MenuItems(menuName);
                menuItems[index] = newMenuItem;
                setState(menuItems);
            },
            onDelete(index) {
                menuItems.splice(index, MIN_SPLICE);
                setState(menuItems);
            }
        });

        new MenuInput({
            onAdd(menuName) {
                const newMenuItem = new MenuItems(menuName);
                menuItems.push(newMenuItem);
                setState(menuItems);
            },
        });

        const setState = (updatedItems) => {
            this.menuItems = updatedItems;
            menuTitle.setState(menuItems);
            menuList.setState(menuItems);
        };
    }
}

class MenuItems {    
    constructor(menuName) {
        this.name = menuName;
    }

    getName() {
        return this.name;
    }
}

class MenuTitle {
    constructor() {
        const $menuCountSpan = document.getElementById('menu-count');
        let itemCount = 0;

        this.setState = (updatedItems) => {
            itemCount = updatedItems.length;
            this.render(itemCount);
        };

        this.render = (itemCount) => {
            $menuCountSpan.innerHTML = `총 ${ itemCount }개`;
        };
    }
}

class MenuInput {
    constructor({ onAdd }) {
        const $menuInput = document.getElementById('espresso-menu-name');
        const $menuAddButton = document.getElementById('espresso-menu-submit-button');

        $menuInput.addEventListener('keydown', (event) => this.addMenuItem(event));
        $menuAddButton.addEventListener('click', (event) => this.addMenuItem(event));

        this.addMenuItem = (event) => {
            if (isValid(event, $menuInput.value)) {
                onAdd($menuInput.value);
                $menuInput.value = '';
            }
        };

        const isValid = (event, value) => {
            const ENTER_KEY = 'Enter';
            const CLICK_TYPE = 'click';

            const eventType = event.key || event.type;

            if (eventType === ENTER_KEY || eventType === CLICK_TYPE) {
                event.preventDefault();

                if (value) {
                    return true;
                }
            }

            return false;
        };
    }
}

class MenuList {
    constructor(elem, { onUpdate, onDelete }) {
        let menuItems = [];
        this._elem = elem;

        this.setState = (updatedMenuItems) => {
            menuItems = updatedMenuItems;
            this.render(menuItems);
        };

        this.render = (items) => {
            const template = items.map((x, index) => menuItemTemplate(index, x.getName()));
            this._elem.innerHTML = template.join('');
        };

        this._elem.addEventListener('click', e => {
            const target = e.target;

            if(target && target.dataset.action) {
                this[target.dataset.action](target);
            }
        });

        this.update = ($el) => {
            const $menuListItem = $el.closest('.menu-list-item');
            const $menuItemSpan = $menuListItem.querySelector('.menu-name');
    
            let itemName = prompt('메뉴명을 수정하세요', $menuItemSpan.innerHTML);
    
            if(itemName) {
                onUpdate($menuListItem.dataset.menuId, itemName);
            }
        }

        this.delete = ($el) => {
            const $menuListItem = $el.closest('.menu-list-item');
            let isConfirm = confirm('정말 삭제하시겠습니까?');
    
            if(isConfirm) {
                onDelete($menuListItem.dataset.menuId);
            }
        }
    }
}

const menuItemTemplate = function (index, name) {
    return `
        <li data-menu-id=${ index } class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${ name }</span>
            <button type="button" data-action="soldOut" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button">품절</button>
            <button type="button" data-action="update" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
            <button type="button" data-action="delete" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
        </li>
        `;
};

export default MenuApp;
