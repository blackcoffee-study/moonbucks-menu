export default class MenuForm {
    $menuForm = null;
    $menuInput = null;

    onAdd = null;;

    constructor({target, onAdd}) {
        this.$menuForm = target;
        this.$menuInput = document.getElementById("espresso-menu-name");

        this.$menuForm.addEventListener("submit", () => this.onSubmit());
        this.onAdd = onAdd;
    }

    onSubmit() {
        var menuName = this.$menuInput.value;
        var returnValue = this.onDataCheck(menuName);

        if(returnValue.value) {
            this.onAdd(menuName);
            this.$menuInput.value = "";
        } else {
            alert(returnValue.reason);
        }
    }

    onDataCheck(data) {
        var returnValue = {reason:"", value:true};

        if(data.trim() === "") {
            returnValue.reason = "메뉴 이름을 입력하세요.";
            returnValue.value = false;
        }

        return returnValue;
    }
}