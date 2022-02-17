import store from './store/store.js'

export class MenuApp {
    #MIN_SPLICE = 1;
    #menu = {
        espresso: [],
        frappuccino: [],
        blended: [],
        teavana: [],
        desert: []
    };

    #categoryTitle = '';
    #currentMenu = '';
    
    #menuTitle;
    #menuList;

    constructor() {
        this.#init();
    }

    #init() {
        const menu = store.getStorage();

        if(menu) {
            this.#menu = menu;
        }

        this.#menuTitle = new MenuTitle();

        this.#menuList = new MenuList({
            onSoldOut: (index) => {
                let currentItem = this.#menu[this.#currentMenu][index];

                currentItem.salesStatus = !currentItem.salesStatus;
                this.emit();
            },
            onUpdate: (index, itemName) => {
                this.#menu[this.#currentMenu][index].name = itemName;
                this.emit();
            },
            onDelete: (index) => {
                this.#menu[this.#currentMenu].splice(index, this.#MIN_SPLICE);
                this.emit();
            }
        });

        new MenuInput({
            onAdd: (itemName, status = true) => {
                let currentMenu = this.#menu[this.#currentMenu];
                const newMenuItem = {
                    name: itemName,
                    salesStatus: status
                };

                currentMenu.push(newMenuItem);
                this.emit();
            }
        });

        const $menuNav = document.querySelector('nav');       
        $menuNav.addEventListener('click', e => {
            const target = e.target;

            if(target.tagName === 'BUTTON' && target.dataset) {
                this.#categoryTitle = target.innerText;
                this.#currentMenu = target.dataset.categoryName;
                this.emit();
            }
        });

        const $menuBtn = $menuNav.children[0];
        this.#currentMenu = $menuBtn.dataset.categoryName;
        this.#categoryTitle = $menuBtn.innerText;

        this.emit();
    }

    emit() {
        const currentMenu = this.#menu[this.#currentMenu];

        this.#menuTitle.updateStatus(this.#categoryTitle, currentMenu.length);
        this.#menuList.updateItems(currentMenu);

        store.setStorage(this.#menu);
    };
}

class MenuTitle {
    #title;
    #itemCount = 0;

    constructor() {
    }

    updateStatus(title, itemCount) {
        this.#title = title;
        this.#itemCount = itemCount;
        this.#render();
    };

    #render() {
        document.getElementById('menu-title').innerText = `${ this.#title } 메뉴 관리`;
        document.getElementById('menu-count').innerText = `총 ${ this.#itemCount }개`;
    }
}

class MenuInput {
    #ENTER_KEY = 'Enter';
    #CLICK_TYPE = 'click';
    
    constructor({ onAdd }) {
        const $menuInput = document.getElementById('menu-name');
        const $menuAddButton = document.getElementById('menu-submit-button');

        $menuInput.addEventListener('keypress', (event) => this.#addMenuItem(event, onAdd));
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

        if(target.tagName === 'BUTTON' && target.dataset) {
            this[target.dataset.action](target);
        }
    }
}

const menuItemTemplate = function (index, item) {
    return `
        <li data-menu-id=${ index } class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name ${ item.salesStatus ? '' : 'sold-out'}">${ item.name }</span>
            <button type="button" data-action="soldOut" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button">품절</button>
            <button type="button" data-action="update" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
            <button type="button" data-action="delete" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
        </li>
        `;
};

export default MenuApp;
