export default class MenuForm {
    $menuForm = null;
    $menuInput = null;

    onAdd = null;;

    constructor({target, onAdd}) {
        this.$menuForm = target;
        this.$menuInput = document.getElementById("espresso-menu-name");

        this.$menuForm.addEventListener("submit", (event) => this.onSubmit(event));
        this.onAdd = onAdd;
    }

    onSubmit(event) {
        var menuName = this.$menuInput.value;
        var returnValue = this.dataCheck(menuName);

        if(returnValue.value) {
            this.onAdd({name: menuName, isSoldOut: false});
            this.$menuInput.value = "";
        } else {
            alert(returnValue.reason);
        }
        event.preventDefault();
    }

    dataCheck(data) {
        var returnValue = {reason:"", value:true};

        if(data.trim() === "") {
            returnValue.reason = "메뉴 이름을 입력하세요.";
            returnValue.value = false;
        }

        return returnValue;
    }
}
