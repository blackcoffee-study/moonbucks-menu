'use strict';

const $ = (selector) => document.querySelector(selector);

function MenuApp() {
    this.LOCALSTORAGE_KEY_MENU = 'menu';

    // state management functions
    this.setState = (updatedMenuItems) => {
        this.menuItems = updatedMenuItems;
        this.saveToLocalStorage();
        this.MenuList.setState(this.currentCategory, this.menuItems);
    };

    this.changeCurrentCategory = (newCategory) => {
        this.currentCategory = newCategory;
        this.setState(this.menuItems);
    };

    this.getCategoryList = (categoryList) => {
        this.categoryList = categoryList;
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

    // event handleres
    this.handleMenuItemAdd = (name) => {
        const key = this.currentCategory;
        const newMenuItem = {
            name,
            soludOut: false,
        };
        const menuItems = { ...this.menuItems };
        menuItems[key].push(newMenuItem);
        this.setState(menuItems);
    };

    this.handleMenuItemNameEdit = (menuItem) => {
        const newName = window.prompt('메뉴명을 수정해주세요');
        if (newName === null || newName === '') {
            return;
        }
        const key = this.currentCategory;
        const index = menuItem.dataset.menuId;
        const menuItems = { ...this.menuItems };
        menuItems[key][index].name = newName;
        this.setState(menuItems);
    };

    this.handleMenuItemDelete = (menuItem) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) {
            return;
        }
        const key = this.currentCategory;
        const index = menuItem.dataset.menuId;
        const menuItems = { ...this.menuItems };
        menuItems[key].splice(index, 1);
        this.setState(menuItems);
    };

    this.handleMenuItemSoldOut = (menuItem) => {};

    this.handleCategoryClick = (clickedCategory) => {
        const clickedCategoryName = clickedCategory.dataset.categoryName;
        this.changeCurrentCategory(clickedCategoryName);
    };

    // init
    (function () {
        this.Categories = new Categories({
            getCategoryList: this.getCategoryList,
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

        this.currentCategory = 'espresso';
        const loadedMenuItems = this.getFromLocalStorage();
        if (loadedMenuItems) {
            this.setState(loadedMenuItems);
        } else {
            const menuItems = {};
            const categoryList = this.categoryList;
            categoryList.forEach((category) => {
                menuItems[category] = [];
            });
            this.setState(menuItems);
        }
    }.bind(this)());
}

function Categories({ getCategoryList, onCategoryClick }) {
    const categoryList = $('.cafe-category');

    categoryList.addEventListener('click', (event) => {
        const targetCategory = event.target;
        if (targetCategory.tagName !== 'BUTTON') {
            return;
        }
        onCategoryClick(targetCategory);
    });

    getCategoryList(
        Array.from(categoryList.children).map(
            (category) => category.dataset.categoryName
        )
    );
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
    const categoryTitle = $('#category-title');
    const menuCount = $('.menu-count');
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

    this.setState = (currentCategory, menuItems) => {
        this.menuItems = menuItems;
        this.currentCategory = currentCategory;
        this.render(this.currentCategory, this.menuItems);
    };

    this.render = (currentCategory, menuItems) => {
        const template = menuItems[currentCategory].map(
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
        this.updateMenuCount();
        this.changeCategoryTitle();
    };

    this.updateMenuCount = () => {
        menuCount.innerText = `총 ${
            this.menuItems[this.currentCategory].length
        }개`;
    };

    this.changeCategoryTitle = () => {
        let translatedCategory;
        switch (this.currentCategory) {
            case 'espresso':
                translatedCategory = '☕ 에스프레소';
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
        categoryTitle.innerText = `${translatedCategory} 메뉴 관리`;
    };
}

new MenuApp();
