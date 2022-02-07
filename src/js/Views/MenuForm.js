import View from "./View.js";

export default class MenuForm extends View {
  constructor() {
    super(document.querySelector("#menu-form"));
    this.$menuInput = this.$("input");
    this.$submitBtn = this.$("#menu-submit-button");
    this.bindEvent();
  }

  bindEvent() {
    this.target.addEventListener("submit", this.submitHandler.bind(this));
    this.$submitBtn.addEventListener("click", this.submitHandler.bind(this));
  }

  submitHandler(e) {
    e.preventDefault();
    if (!this.$menuInput.value) {
      return;
    }
    this.emit("@postMenu", this.$menuInput.value);
    this.$menuInput.value = "";
  }
}
