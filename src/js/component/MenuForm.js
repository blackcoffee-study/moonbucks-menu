import { $ } from "../utils/index.js";
import { SELECTORS } from "../constant/element.js";

export default class MenuForm {
    constructor({target, onAdd}) {
        this.$menuForm = target;
        this.$menuInput = $(SELECTORS.ID.ESPRESSO_MENU_NAME);
        this.$submitButton = $(SELECTORS.ID.ESPRESSO_MENU_SUBMIT_BUTTON);

        this.$menuForm.addEventListener("submit", (event) => this.onSubmit(event));
        this.$submitButton.addEventListener("click", (event) => this.onSubmit(event));
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
