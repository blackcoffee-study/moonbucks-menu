import { $ } from "./utils.js";
import MenuList from "./components/MenuList.js";
import MenuType from "./components/MenuType.js";

const espressoMenuList = $('#espresso-menu-list');
const espressoMenuName = $('#espresso-menu-name');
const espressoMenuSubmitButton = $('#espresso-menu-submit-button');
const menuListsState = new MenuListsState();

espressoMenuSubmitButton.addEventListener('click', () => {
    if (espressoMenuName.value) {
        menuListsState.addMenuList(espressoMenuName.value);
        espressoMenuName.value = null;
    }
});


espressoMenuName.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (espressoMenuName.value) {
            menuListsState.addMenuList(espressoMenuName.value);
            espressoMenuName.value = null;
        }

        e.preventDefault();
    }
});

espressoMenuList.addEventListener('click', (e) => {
    const classList = e.target.classList;

    if (classList.contains('menu-edit-button')) {
        const newMenuName = window.prompt('바꿀 메뉴이름은?');
        menuListsState.updateMenuList(e.target.parentNode.querySelector('.menu-name').textContent, newMenuName);
    }

    if (classList.contains('menu-remove-button')) {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            menuListsState.removeMenuList(e.target.parentNode.querySelector('.menu-name').textContent);
        }
    }
});


function MenuListsState() {
    this.menuLists = {
        "espresso": [],
        "frappuccino": [],
        "blended": [],
        "teavana": [],
        "dessert": [],
    };

    this.menuEnum = {
        "espresso": "☕ 에스프레소",
        "frappuccino": "🥤 프라푸치노",
        "blended": "🍹 블렌디드",
        "teavana": "🫖 티바나",
        "dessert": "🍰 디저트",
    };

    this.currentMenuType = "espresso";
    this.menuCountElement = $(".menu-count");
    this.menuTypeElement = $(".mt-1");

    this.countReRender = () => {
        this.menuCountElement.innerHTML = `총 ${this.menuLists[this.currentMenuType].length}개`;
    }

    this.changeCurrentMenuType = (menu) => {
        this.currentMenuType = menu;
        this.menuTypeReRender();
    }

    this.menuTypeReRender = () => {
        MenuType(this.menuTypeElement, this.menuEnum[this.currentMenuType]);
    };

    this.addMenuList = (menu) => {
        this.menuLists[this.currentMenuType].push(menu);
        this.menuListReRender();
        this.countReRender();
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
};