export class MenuApp {
    constructor() {
        let menuItems = [];
        let menuList = new MenuList();

        const setState = (updatedItems) => {
            this.menuItems = updatedItems;
            menuList.setState(menuItems);
        };

        new MenuInput({
            onAdd(contents) {
                const newMenuItem = new MenuItems(contents);
                menuItems.push(newMenuItem);
                setState(menuItems);
            },
        });
    }
}

class MenuItems {    
    constructor(contents) {
        this.name = contents;
    }
    
    getName() {
        return this.name;
    }
}

// 입력 받는 컴포넌트
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
            const ENTER_CODE = 13;
            const CLICK_TYPE = 'click';

            const eventType = event.keyCode || event.type;

            if (eventType === ENTER_CODE || eventType === CLICK_TYPE) {
                event.preventDefault();

                if (value) {
                    return true;
                }
            }

            return false;
        };
    }
}

// menuList 보여주는 컴포넌트
class MenuList {
    constructor() {
        const $menuList = document.getElementById('espresso-menu-list');

        let menuItems = [];

        this.setState = (updatedMenuItems) => {
            menuItems = updatedMenuItems;
            this.render(menuItems);
        };

        this.render = (items) => {
            const template = items.map((x) => menuItemTemplate(x.getName()));
            $menuList.innerHTML = template.join('');
        };
    }
}

const menuItemTemplate = function (name) {
    return `
        <li class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${name}</span>
            <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button">품절</button>
            <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
            <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
        </li>
        `;
};

export default MenuApp;