export class MenuApp {
    #MIN_SPLICE = 1;
    #menuItems = [];

    constructor() {
        let menuTitle = new MenuTitle();

        let menuList = new MenuList({
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
            menuTitle.updateCount(this.#menuItems);
            menuList.updateItems(this.#menuItems);
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
    #itemCount = 0;

    constructor() {
    }

    updateCount(updatedItems) {
        this.#itemCount = updatedItems.length;
        this.#render(this.#itemCount);
    };

    #render(itemCount) {
        const $menuCountSpan = document.getElementById('menu-count');
        $menuCountSpan.innerHTML = `총 ${ itemCount }개`;
    }
}

class MenuInput {
    #ENTER_KEY = 'Enter';
    #CLICK_TYPE = 'click';
    
    constructor({ onAdd }) {
        const $menuInput = document.getElementById('menu-name');
        const $menuAddButton = document.getElementById('menu-submit-button');

        $menuInput.addEventListener('keydown', (event) => this.#addMenuItem(event, onAdd));
        $menuAddButton.addEventListener('click', (event) => this.#addMenuItem(event, onAdd));
    }

    #addMenuItem(event, onAdd) {
        const $menuInput = document.getElementById('menu-name');
        
        if (this.#isValid(event, $menuInput.value)) {
            onAdd($menuInput.value);
            $menuInput.value = '';
        }
    };

    #isValid(event, value) {
        const eventType = event.key || event.type;

        if (eventType === this.#ENTER_KEY || eventType === this.#CLICK_TYPE) {
            event.preventDefault();

            if (value) {
                return true;
            }
        }

        return false;
    }
}

class MenuList {
    #menuItems = [];
    #$menuList = document.getElementById('menu-list');

    constructor({ onSoldOut, onUpdate, onDelete }) {        
        this.#$menuList.addEventListener('click', e => this.#delegateEvent(e));

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

    updateItems(updatedMenuItems) {
        this.#menuItems = updatedMenuItems;
        this.#render(this.#menuItems);
    };

    #render(items) {
        const template = items.map((x, index) => menuItemTemplate(index, x)).join('');
        this.#$menuList.innerHTML = template;
    };

    #delegateEvent(event) {
        const target = event.target;

        if(target && target.dataset.action) {
            this[target.dataset.action](target);
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
