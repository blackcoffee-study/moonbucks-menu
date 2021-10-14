const $ = (selector) => document.querySelector(selector);

function MenuApp() {
    this.menuItems = [];
    this.menuCount = $('.menu-count');

    this.setState = (updatedMenuItems) => {
        this.menuItems = updatedMenuItems;
        this.MenuList.setState(this.menuItems);
        this.displayMenuCount();
    };

    this.displayMenuCount = () => {
        this.menuCount.innerText = `총 ${this.menuItems.length}개`;
    };

    this.handleMenuItemAdd = (name) => {
        const newMenuItem = new MenuItem(name);
        const menuItems = [...this.menuItems, newMenuItem];
        this.setState(menuItems);
    };

    this.handleMenuItemNameEdit = (menuItem) => {
        const newName = window.prompt('메뉴명을 수정해주세요');
        if (newName === null || newName === '') {
            return;
        }
        const index = menuItem.dataset.menuId;
        const menuItems = [...this.menuItems];
        menuItems[index].name = newName;
        this.setState(menuItems);
    };

    this.handleMenuItemDelete = (menuItem) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) {
            return;
        }
        const index = menuItem.dataset.menuId;
        const menuItems = [...this.menuItems];
        menuItems.splice(index, 1);
        this.setState(menuItems);
    };

    this.handleMenuItemSoldOut = (menuItem) => {};

    this.MenuInput = new MenuInput({
        onMenuItemAdd: this.handleMenuItemAdd,
    });

    this.MenuList = new MenuList({
        onMenuItemNameEdit: this.handleMenuItemNameEdit,
        onMenuItemDelete: this.handleMenuItemDelete,
        onMenuItemSoldOut: this.handleMenuItemSoldOut,
    });
}

function MenuInput({ onMenuItemAdd }) {
    const menuForm = $('#menu-form');
    const menuSubmitBtn = $('#menu-submit-button');
    const menuName = $('#menu-name');

    menuForm.addEventListener('submit', (event) => {
        event.preventDefault();
        this.handleMenuItemAdd();
    });

    menuSubmitBtn.addEventListener('click', () => {
        this.handleMenuItemAdd();
    });

    this.handleMenuItemAdd = () => {
        const name = menuName.value;
        if (name === '') {
            return;
        }
        menuName.value = '';
        onMenuItemAdd(name);
    };
}

function MenuList({ onMenuItemNameEdit, onMenuItemDelete, onMenuItemSoldOut }) {
    const menuList = $('#menu-list');

    menuList.addEventListener('click', (event) => {
        const targetBtn = event.target;
        if (targetBtn.tagName !== 'BUTTON') {
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

    this.setState = (menuItems) => {
        this.menuItems = menuItems;
        this.render(this.menuItems);
    };

    this.render = (menuItems) => {
        const template = menuItems.map(
            (menuItem, idx) => `
            <li data-menu-id="${idx}" class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
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
        );
        menuList.innerHTML = template.join('');
    };
}

function MenuItem(name) {
    return {
        name,
        soludOut: false,
    };
}

new MenuApp();
