import Common from "./Common.js";
import MenuForm from "./MenuForm.js";
import Menu from "./Menu.js";
import MenuCategory from "./MenuCategory.js";
import { SELECTORS } from "../Constants.js";
import Store from "./store.js";
import { $ } from "../DOM.js"

export default class MenuApp {
    $menuForm = null;
    $menuList = null;
    $menuCount = null;
    $menuCategory = null;
    $menuTitle = null;

    menuForm = null;
    menu = null;
    menuCategory = null;
    common = null;
    selectedCategory = "";
    store = null;

    constructor() {
        this.$menuForm = $(SELECTORS.ID.ESPRESS_MENU_FROM);
        this.$menuList = $(SELECTORS.ID.ESPRESSO_MENU_LIST);
        this.$menuCount = $(SELECTORS.CLASS.MENU_COUNT);
        this.$menuCategory = $(SELECTORS.CLASS.CAFE_CATEGORY_LIST);
        this.$menuTitle = $(SELECTORS.CLASS.MENU_TITLE);

        this.common = new Common();
        this.menu = new Menu({
            onSoldOutMenu: (menu => {this.onSoldOutMenu(menu)}),
            onEditMenu: (menu => {this.onEditMenu(menu)}),
            onRemoveMenu: (menu => {this.onRemoveMenu(menu)})
        });

        this.$menuList.addEventListener("click", (event) => {
            let menuItemElement = event.target.closest("li");

            if(event.target.classList.contains(SELECTORS.CLASS.MENU_SOLD_OUT_BUTTON.replace(".", ""))) {
                this.onSoldOutMenu(menuItemElement);
            }

            if(event.target.classList.contains(SELECTORS.CLASS.MENU_EDIT_BUTTON.replace(".", ""))) {
                this.onEditMenu(menuItemElement);
            }

            if(event.target.classList.contains(SELECTORS.CLASS.MENU_REMOVE_BUTTON.replace(".", ""))) {
                this.onRemoveMenu(menuItemElement);
            }
        });

        this.store = new Store("espresso");  
        this.store.getShowMenuList(this.store.getSelectedCategory()).forEach(menu => {
            this.$menuList.append(this.menu.getMenuForm(menu));
        });

        this.menuForm = new MenuForm({
            target: this.$menuForm,
            onAdd: (value => {
                var data = {
                    code: this.common.getUUID(),
                    category: this.store.getSelectedCategory(),
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

        this.setMenuCount();
    }

    onAddMenu(menu) {
        this.$menuList.append(this.menu.getMenuForm(menu));
        this.store.addMenu(menu);
        this.setMenuCount();
    }

    onSoldOutMenu(menu) {
        this.store.setMenuSoldOutState(menu);
        this.$menuList.innerHTML = "";
        this.store.getShowMenuList().forEach(menu => {
            this.$menuList.append(this.menu.getMenuForm(menu));
        });
    }

    onEditMenu(menu) {
        var originMenuName = this.store.getMenu(menu.getAttribute("id"))[0].name;
        var editMenuName = prompt("수정할 이름을 입력하세요", originMenuName);

        this.store.onEditMenuName(menu.getAttribute("id"), (editMenuName === null || editMenuName.trim(" ").length === 0) ? originMenuName : editMenuName);
        this.$menuList.innerHTML = "";
        this.store.getShowMenuList().forEach(menu => {
            this.$menuList.append(this.menu.getMenuForm(menu));
        });
    }

    onRemoveMenu(menu) {
        if(confirm("메뉴를 삭제하시겠습니까?")) {
            menu.remove();
            this.setMenuCount();
            this.store.removeMenu(menu);
        }
    }

    onSelectCategory(event) {
        var menuItems = [];

        this.store.setSelecedCategory(event.getAttribute("data-category-name"));
        menuItems = this.store.getShowMenuList();

        this.$menuTitle.innerHTML = event.innerHTML + " 메뉴 관리";
        this.$menuList.innerHTML = "";
        
        menuItems.forEach(menu => {
            this.$menuList.append(this.menu.getMenuForm(menu));
        })        

        this.setMenuCount();
    }

    setMenuCount() {
        var count = this.store.getShowMenuList().length;

        this.$menuCount.innerText = `총 ${count}개`;
    }
}
