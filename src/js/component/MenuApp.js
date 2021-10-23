import MenuForm from "./MenuForm.js";
import Menu from "./Menu.js";
import MenuCategory from "./MenuCategory.js";
import { SELECTORS, CATEGORY } from "../constant/element.js";
import Store from "./store.js";
import { $ } from "../utils/index.js";
import {http} from "../api/index.js"

export default class MenuApp {
    constructor() {
        this.$menuForm = $(SELECTORS.ID.ESPRESS_MENU_FROM);
        this.$menuList = $(SELECTORS.ID.ESPRESSO_MENU_LIST);
        this.$menuCount = $(SELECTORS.CLASS.MENU_COUNT);
        this.$menuCategory = $(SELECTORS.CLASS.CAFE_CATEGORY_LIST);
        this.$menuTitle = $(SELECTORS.CLASS.MENU_TITLE);
        this.menu = new Menu({
            onSoldOutMenu: (menu => this.onSoldOutMenu(menu)),
            onEditMenu: (menu => this.onEditMenu(menu)),
            onRemoveMenu: (menu => this.onRemoveMenu(menu))
        });

        this.store = new Store();  
        http.get(`/category/${this.store.getSelectedCategory()}/menu`).then(result => {
            this.store.setMenuList(result);
            this.store.getMenuList(this.store.getSelectedCategory()).forEach(menu => {
                this.$menuList.append(this.menu.getMenuForm(menu));
            });
            this.setMenuCount();
        });
        

        this.menuForm = new MenuForm({
            target: this.$menuForm,
            onAdd: (value => {
                var data = {
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
        http.post(`category/${menu.category}/menu`, {category: this.store.getSelectedCategory(), name: menu.name}).then(result => {
            this.store.addMenu(result);
            this.$menuList.append(this.menu.getMenuForm(result));
            this.setMenuCount();
        });
    }

    onSoldOutMenu(menu) {
        this.store.setMenuSoldOutState(menu);
        this.$menuList.innerHTML = "";
        http.put(`/category/${this.store.getSelectedCategory()}/menu/${menu.getAttribute("id")}/soldout`, {isSoldOut: menu.isSoldOut}).then(res => {
            http.get(`/category/${this.store.getSelectedCategory()}/menu`).then(result => {
                this.store.setMenuList(result);
                this.setMenuList();
            });
        });
    }

    onEditMenu(menu) {
        const editMenuName = prompt("수정할 이름을 입력하세요", menu.querySelector(".menu-name").innerHTML);

        http.put(`/category/${this.store.getSelectedCategory()}/menu/${menu.getAttribute("id")}`, {name: editMenuName}).then(res => {
            http.get(`/category/${this.store.getSelectedCategory()}/menu`).then(result => {
                this.store.setMenuList(result);
                this.setMenuList();
            });   
        });             
    }

    onRemoveMenu(menu) {
        if(confirm("메뉴를 삭제하시겠습니까?")) {
            http.delete(`/category/${this.store.getSelectedCategory()}/menu/${menu.getAttribute("id")}`).then(() => {
                http.get(`/category/${this.store.getSelectedCategory()}/menu`).then(result => {
                    this.store.setMenuList(result);
                    this.setMenuList();
                    this.setMenuCount();
                });   
            });           
            
        }
    }

    onSelectCategory(event) {
        this.store.setSelecedCategory(event.getAttribute("data-category-name"));
        http.get(`/category/${this.store.getSelectedCategory()}/menu`).then(result => {
            this.store.setMenuList(result);
            this.setMenuList();
        });   
    }

    setMenuCount() {
        var count = this.store.getMenuList().length;

        this.$menuCount.innerText = `총 ${count}개`;
    }

    setMenuList(event) {
        this.$menuList.innerHTML = "";
        this.$menuTitle.innerHTML = CATEGORY[this.store.selectedCategory] + " 메뉴 관리";

        this.store.getMenuList().forEach(menu => {
            this.$menuList.append(this.menu.getMenuForm(menu));
        });
        this.setMenuCount();
    }
}
