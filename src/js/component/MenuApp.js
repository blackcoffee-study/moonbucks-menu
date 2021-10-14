import Common from "./Common.js";
import MenuForm from "./MenuForm.js";
import Menu from "./Menu.js";
import MenuCategory from "./MenuCategory.js";
import { SELECTORS } from "../Constants.js";

export default class MenuApp {
    $menuForm = document.querySelector(SELECTORS.ID.ESPRESS_MENU_FROM);
    $menuList = document.querySelector(SELECTORS.ID.ESPRESSO_MENU_LIST);
    $menuItems = document.querySelectorAll(SELECTORS.CLASS.MENU_LIST_ITEM);
    $menuCount = document.querySelector(SELECTORS.CLASS.MENU_COUNT);
    $menuCategory = document.querySelectorAll(".cafe-category-name");

    menuForm = null;
    menu = null;
    menuCategory = null;
    common = null;
    selectedCategory = "";

    constructor() {
        this.menu = new Menu({
            onSoldOutMenu: (menu => {this.onSoldOutMenu(menu)}),
            onEditMenu: (menu => {this.onEditMenu(menu)}),
            onRemoveMenu: (menu => {this.onRemoveMenu(menu)})
        });
        this.common = new Common();
        this.menuForm = new MenuForm({
            target: this.$menuForm,
            onAdd: (value => {
                var data = {
                    code: this.common.getUUID(),
                    category: this.selectedCategory,
                    isSoldOut: value.isSoldOut,
                    name: value.name,
                }

                this.onAddMenu(data);
            })
        });

        this.menuCategory = new MenuCategory({
            target: this.$menuCategory,
            onSelectCategory: (event => this.onSelectCategory(event))
        })
    }

    onAddMenu(menu) {
        this.$menuList.append(this.menu.getMenuForm(menu));
        this.setMenuCount();
    }

    onSoldOutMenu(menu) {
        if(menu.className.includes("sold-out")) {
            menu.classList.remove("sold-out");
        } else {
            menu.classList.add("sold-out");
        }
    }

    onEditMenu(menu) {
        var originMenu = menu.querySelector(".menu-name");
        var editMenuName = prompt("수정할 이름을 입력하세요", originMenu.innerHTML);

        originMenu.innerHTML = editMenuName;
    }

    onRemoveMenu(menu) {
        if(confirm("메뉴를 삭제하시겠습니까?")) {
            menu.remove();
            this.setMenuCount();
        }
    }

    onSelectCategory(event) {
        this.selectedCategory = event.target.dataset.categoryName;
    }

    setMenuCount() {
        var count = document.querySelectorAll(SELECTORS.CLASS.MENU_LIST_ITEM).length;
        console.log(document.querySelectorAll(SELECTORS.CLASS.MENU_LIST_ITEM));

        this.$menuCount.innerText = `총 ${count}개`;
    }
}
