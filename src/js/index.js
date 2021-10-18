'use strict';

const $ = (selector) => document.querySelector(selector);

function MenuApp() {
    this.menuItems;
    this.currentCategory = 'espresso';
    this.LOCALSTORAGE_KEY_MENU = 'menu';

    // state management functions
    this.setState = (updatedMenuItems) => {
        this.menuItems = updatedMenuItems;
        this.saveToLocalStorage();
        this.MenuList.setState(this.menuItems, this.currentCategory);
        this.Category.setState(this.currentCategory);
    };

    this.changeCurrentCategory = (updatedCategory) => {
        this.currentCategory = updatedCategory;
        this.setState(this.menuItems);
    };

    // local storage functions
    this.saveToLocalStorage = () => {
        localStorage.setItem(
            this.LOCALSTORAGE_KEY_MENU,
            JSON.stringify(this.menuItems)
        );
    };

    this.getFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem(this.LOCALSTORAGE_KEY_MENU));
    };

    // event handlers
    this.handleCategoryClick = (clickedCategory) => {
        const clickedCategoryName = clickedCategory.dataset.categoryName;
        this.changeCurrentCategory(clickedCategoryName);
    };

    this.handleMenuItemAdd = (name) => {
        const menuItemsKey = this.currentCategory;
        const newMenuItem = {
            name,
            soldOut: false,
        };
        const menuItems = { ...this.menuItems };
        menuItems[menuItemsKey].push(newMenuItem);
        this.setState(menuItems);
    };

    this.handleMenuItemNameEdit = (menuItem) => {
        const newName = window.prompt('메뉴명을 수정해주세요');
        if (newName === null || newName === '') {
            return;
        }
        const menuItemsKey = this.currentCategory;
        const index = menuItem.dataset.menuId;
        const menuItems = { ...this.menuItems };
        menuItems[menuItemsKey][index].name = newName;
        this.setState(menuItems);
    };

    this.handleMenuItemDelete = (menuItem) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) {
            return;
        }
        const menuItemsKey = this.currentCategory;
        const index = menuItem.dataset.menuId;
        const menuItems = { ...this.menuItems };
        menuItems[menuItemsKey].splice(index, 1);
        this.setState(menuItems);
    };

    this.handleMenuItemSoldOut = (menuItem) => {
        const menuItemsKey = this.currentCategory;
        const index = menuItem.dataset.menuId;
        const menuItems = { ...this.menuItems };
        if (menuItem.children[0].classList.toggle('sold-out')) {
            menuItems[menuItemsKey][index].soldOut = true;
        } else {
            menuItems[menuItemsKey][index].soldOut = false;
        }
        this.setState(menuItems);
    };

    // init <-> class constructor
    (function () {
        this.Category = new Category({
            onCategoryClick: this.handleCategoryClick,
        });

        this.MenuInput = new MenuInput({
            onMenuItemAdd: this.handleMenuItemAdd,
        });

        this.MenuList = new MenuList({
            onMenuItemNameEdit: this.handleMenuItemNameEdit,
            onMenuItemDelete: this.handleMenuItemDelete,
            onMenuItemSoldOut: this.handleMenuItemSoldOut,
        });

        const loadedMenuItems = this.getFromLocalStorage();
        if (loadedMenuItems) {
            this.setState(loadedMenuItems);
        } else {
            const menuItems = {};
            const categoryList = this.Category.getCategoryList();
            categoryList.forEach((categoryName) => {
                menuItems[categoryName] = [];
            });
            this.setState(menuItems);
        }
    }.bind(this)());
}

function Category({ onCategoryClick }) {
    this.categoryTitle = $('#category-title');
    this.categoryList = $('.cafe-category');

    this.setState = (currentCategory) => {
        this.currentCategory = currentCategory;
        this.render(this.currentCategory);
    };

    this.categoryList.addEventListener('click', (event) => {
        const targetCategory = event.target;
        if (targetCategory.tagName !== 'BUTTON') {
            return;
        }
        onCategoryClick(targetCategory);
    });

    this.getCategoryList = () => {
        return Array.from(this.categoryList.children).map(
            (category) => category.dataset.categoryName
        );
    };

    this.render = (currentCategory) => {
        let translatedCategory;
        switch (currentCategory) {
            case 'espresso':
                translatedCategory = '☕️ 에스프레소';
                break;
            case 'frappuccino':
                translatedCategory = '🥤 프라푸치노';
                break;
            case 'blended':
                translatedCategory = '🍹 블렌디드';
                break;
            case 'teavana':
                translatedCategory = '🫖 티바나';
                break;
            case 'desert':
                translatedCategory = '🍰 디저트';
                break;
        }
        this.categoryTitle.innerText = `${translatedCategory} 메뉴 관리`;
    };
}

function MenuInput({ onMenuItemAdd }) {
    this.menuForm = $('#menu-form');
    this.menuSubmitBtn = $('#menu-submit-button');
    this.menuName = $('#menu-name');

    this.menuForm.addEventListener('submit', (event) => {
        event.preventDefault();
        this.handleMenuItemAdd();
    });

    this.menuSubmitBtn.addEventListener('click', () => {
        this.handleMenuItemAdd();
    });

    this.handleMenuItemAdd = () => {
        const name = this.menuName.value;
        if (name === '') {
            alert('값을 입력해주세요.');
            return;
        }
        this.menuName.value = '';
        onMenuItemAdd(name);
    };
}

function MenuList({ onMenuItemNameEdit, onMenuItemDelete, onMenuItemSoldOut }) {
    this.menuCount = $('.menu-count');
    this.menuList = $('#menu-list');

    this.setState = (menuItems, menuItemsKey) => {
        this.menuItems = menuItems;
        this.menuItemsKey = menuItemsKey;
        this.render(this.menuItems, this.menuItemsKey);
    };

    this.menuList.addEventListener('click', (event) => {
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

    this.render = (menuItems, menuItemsKey) => {
        const template = menuItems[menuItemsKey].map(
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
        );
        this.menuList.innerHTML = template.join('');
        this.menuCount.innerText = `총 ${menuItems[menuItemsKey].length}개`;
    };
}

new MenuApp();
