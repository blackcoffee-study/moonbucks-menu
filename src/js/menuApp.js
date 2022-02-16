export class MenuApp {
    #MIN_SPLICE = 1;
    #menuItems = [];

    constructor() {
        let menuTitle = new MenuTitle();

        let menuList = new MenuList(document.getElementById('menu-list'), {
            onSoldOut: (index) => {
                this.#menuItems[index].changeStatus();
                setState(this.#menuItems);
            },
            onUpdate: (index, menuName) => {
                this.#menuItems[index].setName(menuName);
                setState(this.#menuItems);
            },
            onDelete: (index) => {
                this.#menuItems.splice(index, this.#MIN_SPLICE);
                setState(this.#menuItems);
            }
        });

        new MenuInput({
            onAdd: (menuName) => {
                const newMenuItem = new MenuItems(menuName);
                this.#menuItems.push(newMenuItem);
                setState(this.#menuItems);
            }
        });

        const setState = (updatedItems) => {
            this.#menuItems = updatedItems;
            menuTitle.setState(this.#menuItems);
            menuList.setState(this.#menuItems);
        };
    }
}

class MenuItems {
    #name;
    #sellStatus;

    constructor(name, status = true) {
        this.#name = name;
        this.#sellStatus = status;
    }

    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }

    changeStatus() {
        this.#sellStatus = !this.#sellStatus;
    }

    getStatus() {
        return this.#sellStatus;
    }
}

class MenuTitle {
    #itemCount;

    constructor() {
        this.#itemCount = 0;

        this.setState = (updatedItems) => {
            this.#itemCount = updatedItems.length;
            this.render(this.#itemCount);
        };

        this.render = (itemCount) => {
            const $menuCountSpan = document.getElementById('menu-count');
            $menuCountSpan.innerHTML = `총 ${ itemCount }개`;
        };
    }
}

class MenuInput {
    constructor({ onAdd }) {
        const $menuInput = document.getElementById('menu-name');
        const $menuAddButton = document.getElementById('menu-submit-button');

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
    #menuItems;
    #_elem;

    constructor(elem, { onSoldOut, onUpdate, onDelete }) {
        this.#menuItems = [];
        this.#_elem = elem;

        this.setState = (updatedMenuItems) => {
            this.#menuItems = updatedMenuItems;
            this.render(this.#menuItems);
        };

        this.render = (items) => {
            const template = items.map((x, index) => menuItemTemplate(index, x)).join('');
            this.#_elem.innerHTML = template;
        };

        this.#_elem.addEventListener('click', e => {
            const target = e.target;

            if(target && target.dataset.action) {
                this[target.dataset.action](target);
            }
        });

        this.soldOut = ($el) => {
            const $menuListItem = $el.closest('.menu-list-item');
            onSoldOut($menuListItem.dataset.menuId);
        }

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

const menuItemTemplate = function (index, items) {
    return `
        <li data-menu-id=${ index } class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name ${ items.getStatus() ? '' : 'sold-out'}">${ items.getName() }</span>
            <button type="button" data-action="soldOut" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button">품절</button>
            <button type="button" data-action="update" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
            <button type="button" data-action="delete" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
        </li>
        `;
};

export default MenuApp;
