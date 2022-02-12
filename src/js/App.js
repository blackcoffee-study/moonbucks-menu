<<<<<<< HEAD
import { $, TEXT } from "./utils/utils.js";
import CustomSet from "./utils/Set.js";

=======
import { $, TEXT } from "./utils.js";
>>>>>>> ca008262eb8324f79b6a71e7c013de75f4baf3f2
import MenuList from "./components/MenuList.js";
import MenuType from "./components/MenuType.js";
import MenuCount from "./components/MenuCount.js";

export default function MoonBucks() {
    const $espressoMenuList = $('#espresso-menu-list');
    const $espressoMenuName = $('#espresso-menu-name');
<<<<<<< HEAD
=======
    const $espressoMenuSubmitButton = $('#espresso-menu-submit-button');
>>>>>>> ca008262eb8324f79b6a71e7c013de75f4baf3f2
    const $menuForm = $("#espresso-menu-form");
    const $menuTypeHeading = $("#menu-type-heading");
    const $menuTypeNav = $("#menu-type-nav");
    const $menuCount = $(".menu-count");

    const MENUTYPE = {
        "espresso": "☕ 에스프레소",
        "frappuccino": "🥤 프라푸치노",
        "blended": "🍹 블렌디드",
        "teavana": "🫖 티바나",
        "dessert": "🍰 디저트",
    };

    this.menuLists = {
<<<<<<< HEAD
        "espresso": new CustomSet(),
        "frappuccino": new CustomSet(),
        "blended": new CustomSet(),
        "teavana": new CustomSet(),
        "dessert": new CustomSet(),
=======
        "espresso": [],
        "frappuccino": [],
        "blended": [],
        "teavana": [],
        "dessert": [],
>>>>>>> ca008262eb8324f79b6a71e7c013de75f4baf3f2
    };

    this.currentMenuType = "espresso";

    this.init = () => {
        setEventListener();
    }

    const setEventListener = () => {
<<<<<<< HEAD
        $menuForm.addEventListener('submit', e => {
            e.preventDefault();
            addMenuList();
        });
=======
        $menuForm.addEventListener('submit', e => e.preventDefault());
        $espressoMenuSubmitButton.addEventListener('click', addMenuList);
        $espressoMenuName.addEventListener('keypress', isEnter);
>>>>>>> ca008262eb8324f79b6a71e7c013de75f4baf3f2
        $espressoMenuList.addEventListener('click', listHandler);
        $menuTypeNav.addEventListener('click', changeCurrentMenuType);
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
        if ($espressoMenuName.value) {
<<<<<<< HEAD
            this.menuLists[this.currentMenuType].add($espressoMenuName.value);
=======
            this.menuLists[this.currentMenuType].push($espressoMenuName.value);
>>>>>>> ca008262eb8324f79b6a71e7c013de75f4baf3f2
            menuListReRender();
            countReRender();
            $espressoMenuName.value = null;
        }
    }

    const removeMenuList = (menu) => {
<<<<<<< HEAD
        this.menuLists[this.currentMenuType].delete(menu);
=======
        this.menuLists[this.currentMenuType] = this.menuLists[this.currentMenuType].filter(e => e !== menu);
>>>>>>> ca008262eb8324f79b6a71e7c013de75f4baf3f2
        menuListReRender();
        countReRender();
    }

    const updateMenuList = (before, after) => {
<<<<<<< HEAD
        this.menuLists[this.currentMenuType].delete(before);
        this.menuLists[this.currentMenuType].add(after);
=======
        for (let i = 0; this.menuLists[this.currentMenuType].length; i++) {
            if (this.menuLists[this.currentMenuType][i] === before) {
                this.menuLists[this.currentMenuType][i] = after;
                break;
            }
        }
>>>>>>> ca008262eb8324f79b6a71e7c013de75f4baf3f2
        menuListReRender();
    }

    const menuListReRender = () => {
<<<<<<< HEAD
        MenuList($espressoMenuList, this.menuLists[this.currentMenuType].getData());
    }

    const countReRender = () => {
        MenuCount($menuCount, this.menuLists[this.currentMenuType].size());
=======
        MenuList($espressoMenuList, this.menuLists[this.currentMenuType]);
    }

    const countReRender = () => {
        MenuCount($menuCount, this.menuLists[this.currentMenuType].length);
>>>>>>> ca008262eb8324f79b6a71e7c013de75f4baf3f2
    };

    const menuTypeReRender = () => {
        MenuType($menuTypeHeading, MENUTYPE[this.currentMenuType]);
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
