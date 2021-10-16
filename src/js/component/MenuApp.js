import Common from "./Common.js";
import MenuForm from "./MenuForm.js";
import Menu from "./Menu.js";
import MenuCategory from "./MenuCategory.js";
import { SELECTORS } from "../Constants.js";
import Store from "./store.js";
import { $ } from "../DOM.js"

export default class MenuApp {
    $menuForm = $(SELECTORS.ID.ESPRESS_MENU_FROM);
    $menuList = $(SELECTORS.ID.ESPRESSO_MENU_LIST);
    $menuCount = $(SELECTORS.CLASS.MENU_COUNT);
    $menuCategory = $(SELECTORS.CLASS.CAFE_CATEGORY_LIST);
    $menuTitle = $(SELECTORS.CLASS.MENU_TITLE);

    menuForm = null;
    menu = null;
    menuCategory = null;
    common = null;
    selectedCategory = "";
    store = null;

    constructor() {
        console.log();
        this.common = new Common();
        this.menu = new Menu({
            onSoldOutMenu: (menu => {this.onSoldOutMenu(menu)}),
            onEditMenu: (menu => {this.onEditMenu(menu)}),
            onRemoveMenu: (menu => {this.onRemoveMenu(menu)})
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
