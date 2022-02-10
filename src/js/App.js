import { $, TEXT } from "./utils.js";
import MenuList from "./components/MenuList.js";
import MenuType from "./components/MenuType.js";
import MenuCount from "./components/MenuCount.js";

export default function MoonBucks() {
    const espressoMenuList = $('#espresso-menu-list');
    const espressoMenuName = $('#espresso-menu-name');
    const espressoMenuSubmitButton = $('#espresso-menu-submit-button');
    const menuForm = $("#espresso-menu-form");
    const menuTypeHeadingElement = $("#menu-type-heading");
    const menuTypeNavElement = $("#menu-type-nav");
    const menuCountElement = $(".menu-count");

    const MENUTYPE = {
        "espresso": "☕ 에스프레소",
        "frappuccino": "🥤 프라푸치노",
        "blended": "🍹 블렌디드",
        "teavana": "🫖 티바나",
        "dessert": "🍰 디저트",
    };

    this.menuLists = {
        "espresso": [],
        "frappuccino": [],
        "blended": [],
        "teavana": [],
        "dessert": [],
    };

    this.currentMenuType = "espresso";

    this.init = () => {
        setEventListener();
    }

    const setEventListener = () => {
        menuForm.addEventListener('submit', e => e.preventDefault());
        espressoMenuSubmitButton.addEventListener('click', addMenuList);
        espressoMenuName.addEventListener('keypress', isEnter);
        espressoMenuList.addEventListener('click', listHandler);
        menuTypeNavElement.addEventListener('click', changeCurrentMenuType);
    }

    const changeCurrentMenuType = (e) => {
        if (e.target.dataset.categoryName) {
            this.currentMenuType = e.target.dataset.categoryName;
            menuTypeReRender();
            menuListReRender();
            countReRender();
        };
    };

    const addMenuList = () => {
        if (espressoMenuName.value) {
            this.menuLists[this.currentMenuType].push(espressoMenuName.value);
            menuListReRender();
            countReRender();
            espressoMenuName.value = null;
        }
    }

    const removeMenuList = (menu) => {
        this.menuLists[this.currentMenuType] = this.menuLists[this.currentMenuType].filter(e => e !== menu);
        menuListReRender();
        countReRender();
    }

    const updateMenuList = (before, after) => {
        for (let i = 0; this.menuLists[this.currentMenuType].length; i++) {
            if (this.menuLists[this.currentMenuType][i] === before) {
                this.menuLists[this.currentMenuType][i] = after;
                break;
            }
        }
        menuListReRender();
    }

    const menuListReRender = () => {
        MenuList(espressoMenuList, this.menuLists[this.currentMenuType]);
    }

    const countReRender = () => {
        MenuCount(menuCountElement, this.menuLists[this.currentMenuType].length);
    };

    const menuTypeReRender = () => {
        MenuType(menuTypeHeadingElement, MENUTYPE[this.currentMenuType]);
    };

    const isEnter = (e) => {
        return e.key === 'Enter' ? addMenuList() : false;
    }

    const listHandler = (e) => {
        const classList = e.target.classList;

        if (classList.contains('menu-edit-button')) {
            const newMenuName = window.prompt(TEXT.UPDATE);
            updateMenuList(e.target.parentNode.querySelector('.menu-name').textContent, newMenuName);
        }

        if (classList.contains('menu-remove-button')) {
            if (window.confirm(TEXT.REMOVE)) {
                removeMenuList(e.target.parentNode.querySelector('.menu-name').textContent);
            }
        }
    };
};
