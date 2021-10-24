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
        http.get(`category/${this.store.getSelectedCategory()}/menu`).then(res => {
            this.store.setMenuList(res);
            this.store.getMenuList(this.store.getSelectedCategory()).forEach(menu => {
                this.$menuList.append(this.menu.getMenuForm(menu).content);
            });
            this.setMenuCount();
        });

        this.$menuList.addEventListener("click", (event) => {
            console.log(event);
            if(event.target.classList.contains(SELECTORS.CLASS.MENU_SOLD_OUT_BUTTON.replace(".", ""))) {
                this.onSoldOutMenu(event.target.closest(SELECTORS.CLASS.MENU_LIST_ITEM));
            }

            if(event.target.classList.contains(SELECTORS.CLASS.MENU_EDIT_BUTTON.replace(".", ""))) {
                this.onEditMenu(event.target.closest(SELECTORS.CLASS.MENU_LIST_ITEM));
            }

            if(event.target.classList.contains(SELECTORS.CLASS.MENU_REMOVE_BUTTON.replace(".", ""))) {
                this.onRemoveMenu(event.target.closest(SELECTORS.CLASS.MENU_LIST_ITEM));
            }
        })
        

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
        http.post(`category/${menu.category}/menu`, {category: this.store.getSelectedCategory(), name: menu.name}).then(res => {
            if(res) {
                this.store.addMenu(res);
                this.$menuList.append(this.menu.getMenuForm(res).content);
                this.setMenuCount();
            }            
        });
    }

    onSoldOutMenu(menu) {
        this.$menuList.innerHTML = "";
        http.put(`category/${this.store.getSelectedCategory()}/menu/${menu.getAttribute("id")}/soldout`, {isSoldOut: menu.isSoldOut}).then(res => {
            http.get(`category/${this.store.getSelectedCategory()}/menu`).then(res => {
                this.store.setMenuList(res);
                this.setMenuList();
            });
        });
    }

    onEditMenu(menu) {
        const editMenuName = prompt("수정할 이름을 입력하세요", $(".menu-name", menu).innerHTML);

        http.put(`category/${this.store.getSelectedCategory()}/menu/${menu.getAttribute("id")}`, {name: editMenuName}).then(() => {
            http.get(`category/${this.store.getSelectedCategory()}/menu`).then(res => {
                console.log(res);
                this.store.setMenuList(res);
                this.setMenuList();
            });   
        });             
    }

    onRemoveMenu(menu) {
        if(confirm("메뉴를 삭제하시겠습니까?")) {
            http.delete(`category/${this.store.getSelectedCategory()}/menu/${menu.getAttribute("id")}`).then(() => {
                http.get(`category/${this.store.getSelectedCategory()}/menu`).then(res => {
                    this.store.setMenuList(res);
                    this.setMenuList();
                    this.setMenuCount();
                });   
            });           
            
        }
    }

    onSelectCategory(event) {
        this.store.setSelecedCategory(event.getAttribute("data-category-name"));
        http.get(`category/${this.store.getSelectedCategory()}/menu`).then(res => {
            this.store.setMenuList(res);
            this.setMenuList();
        });   
    }

    setMenuCount() {
        var count = this.store.getMenuList().length;

        this.$menuCount.innerText = `총 ${count}개`;
    }

    setMenuList() {
        this.$menuList.innerHTML = "";
        this.$menuTitle.innerHTML = `${CATEGORY[this.store.selectedCategory]} 메뉴 관리`;

        this.store.getMenuList().forEach(menu => {
            this.$menuList.append(this.menu.getMenuForm(menu).content);
        });
        this.setMenuCount();
    }
}
