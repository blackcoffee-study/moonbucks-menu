import { SELECTORS } from "../Constants.js";
import { $ } from "../DOM.js"
export default class MenuForm {
    constructor({target, submit, onAdd}) {
        this.$menuForm = target;
        this.$submit = submit;
        this.$menuInput =  $(SELECTORS.ID.ESPRESSO_MENU_NAME);

        this.$menuForm.addEventListener("submit", (event) => this.onSubmit(event));
        this.$submit.addEventListener("click", (event) => this.onSubmit(event));
        this.onAdd = onAdd;
    }

    onSubmit(event) {
        let menuName = this.$menuInput.value;
        let returnValue = this.dataCheck(menuName);

        if(returnValue.value) {
            this.onAdd({name: menuName, isSoldOut: false});
            this.$menuInput.value = "";
        } else {
            alert(returnValue.reason);
        }
        event.preventDefault();
    }

    dataCheck(data) {
        let returnValue = {reason:"", value:true};

        if(data.trim() === "") {
            returnValue.reason = "메뉴 이름을 입력하세요.";
            returnValue.value = false;
        }

        return returnValue;
    }
}
