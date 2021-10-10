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
            onEditMenu: (menu => {this.onEditMenu(menu)}),
            onRemoveMenu: (menu => {this.onRemoveMenu(menu)})
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
        this.setMenuCount();
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

    setMenuCount() {
        var count = this.$menuList.querySelectorAll('.menu-list-item').length;

        this.$menuCount[0].innerText = `총 ${count}개`
    }
}