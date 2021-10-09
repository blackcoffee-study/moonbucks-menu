import Common from "./Common.js";
import MenuForm from "./MenuForm.js";
import Menu from "./Menu.js";

export default class MenuApp {
    $menuForm = document.getElementById("espresso-menu-form");
    $menuList = document.getElementById("espresso-menu-list");
    $menuItems = document.querySelectorAll(".menu-list-item");
    $menuCount = document.getElementsByClassName("menu-count");

    menuForm = null;
    menu = null;
    common = null;

    constructor() {
        this.menu = new Menu({
            onEditMenu: (event => {this.onEditMenu(event)}),
            onRemoveMenu: (event => {this.onRemoveMenu(event)})
        });
        this.common = new Common();
        this.menuForm = new MenuForm({
            target: this.$menuForm,
            onAdd: (value => {
                var data = {
                    code: this.common.getUUID(),
                    name: value,
                }

                this.onAddMenu(data);
            })
        });
        
    }

    onAddMenu(menu) {
        this.$menuList.append(this.menu.getMenuForm(menu));
        this.setMenuInfo();
    }

    onEditMenu(event) {
        var originMenu = event.target.parentNode;
        var editMenuName = prompt("수정할 이름을 입력하세요", originMenu.firstChild.innerHTML);

        originMenu.firstChild.innerHTML = editMenuName;
    }

    onRemoveMenu(event) {
        if(confirm("메뉴를 삭제하시겠습니까?")) {
            var deleteMenu = event.target.parentNode.getAttribute("id");

            document.getElementById(deleteMenu).remove();
            this.setMenuInfo();
        }
    }

    setMenuInfo() {
        this.setMenuItems();
        this.setMenuCount();
    }

    setMenuItems() {
        this.$menuItems = document.querySelectorAll(".menu-list-item");
    }

    setMenuCount() {
        var count = this.$menuItems.length;
        this.$menuCount[0].innerText = `총 ${count}개`
    }
}