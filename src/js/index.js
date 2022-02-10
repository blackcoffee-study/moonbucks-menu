import { $ } from "./utils.js";
import TEXT from "./text.js";
import MenuList from "./components/MenuList.js";
import MenuType from "./components/MenuType.js";
import MenuCount from "./components/MenuCount.js";


const moonBucks = new MoonBucks();
moonBucks.init();

function MoonBucks() {
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

    this.init = () => {
        this.setEventListener();
    }

    this.setEventListener = () => {
        menuForm.addEventListener('submit', e => e.preventDefault());
        espressoMenuSubmitButton.addEventListener('click', this.addMenuList);
        espressoMenuName.addEventListener('keypress', this.isEnter);
        espressoMenuList.addEventListener('click', this.listHandler);
        menuTypeNavElement.addEventListener('click', this.changeCurrentMenuType);
    }

    this.menuLists = {
        "espresso": [],
        "frappuccino": [],
        "blended": [],
        "teavana": [],
        "dessert": [],
    };

    this.currentMenuType = "espresso";

    this.countReRender = () => {
        MenuCount(menuCountElement, this.menuLists[this.currentMenuType].length);
    };

    this.changeCurrentMenuType = (e) => {
        if (e.target.dataset.categoryName) {
            this.currentMenuType = e.target.dataset.categoryName;
            this.menuTypeReRender();
            this.menuListReRender();
            this.countReRender();
        };
    };

    this.menuTypeReRender = () => {
        MenuType(menuTypeHeadingElement, MENUTYPE[this.currentMenuType]);
    };

    this.addMenuList = () => {
        if (espressoMenuName.value) {
            this.menuLists[this.currentMenuType].push(espressoMenuName.value);
            this.menuListReRender();
            this.countReRender();
            espressoMenuName.value = null;
        }
    }

    this.removeMenuList = (menu) => {
        this.menuLists[this.currentMenuType] = this.menuLists[this.currentMenuType].filter(e => e !== menu);
        this.menuListReRender();
        this.countReRender();
    }

    this.updateMenuList = (before, after) => {
        for (let i = 0; this.menuLists[this.currentMenuType].length; i++) {
            if (this.menuLists[this.currentMenuType][i] === before) {
                this.menuLists[this.currentMenuType][i] = after;
                break;
            }
        }
        this.menuListReRender();
    }

    this.menuListReRender = () => {
        MenuList(espressoMenuList, this.menuLists[this.currentMenuType]);
    }

    this.isEnter = (e) => {
        return e.key === 'Enter' ? this.addMenuList() : false;
    }

    this.listHandler = (e) => {
        const classList = e.target.classList;

        if (classList.contains('menu-edit-button')) {
            const newMenuName = window.prompt(TEXT.UPDATE);
            this.updateMenuList(e.target.parentNode.querySelector('.menu-name').textContent, newMenuName);
        }
    
        if (classList.contains('menu-remove-button')) {
            if (window.confirm(TEXT.REMOVE)) {
                this.removeMenuList(e.target.parentNode.querySelector('.menu-name').textContent);
            }
        }
    };
};
