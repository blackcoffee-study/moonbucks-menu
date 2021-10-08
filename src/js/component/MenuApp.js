import Common from "./Common.js";
import MenuForm from "./MenuForm.js";
import Menu from "./Menu.js";

export default class MenuApp {
    $menuForm = document.getElementById('espresso-menu-form');
    menuForm = null;
    menu = null;
    common = null;

    constructor() {
        this.menu = new Menu();
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
        
    }
}