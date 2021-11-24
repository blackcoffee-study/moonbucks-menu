import {
  isInputEmpty,
  setInputEmpty,
  isDeleteBtn,
  isEditBtn,
  listTemplate,
  $,
} from "./utils.js";

window.addEventListener("DOMContentLoaded", () => {
  new App();
});

class App {
  constructor() {
    this.count = 0;
    this.$menuInput = $("#espresso-menu-name");
    this.$submitBtn = $(".input-submit");
    this.$menuForm = $("#espresso-menu-form");
    this.$menuList = $("#espresso-menu-list");
    this.$menuCount = $(".menu-count");
    this.eventBind();
  }

  eventBind() {
    this.$menuForm.addEventListener("submit", this.submitHandler.bind(this));
    this.$submitBtn.addEventListener("click", this.submitHandler.bind(this));
    this.$menuList.addEventListener("click", this.listClickHandler.bind(this));
  }

  submitHandler(e) {
    e.preventDefault();
    if (isInputEmpty(this.$menuInput)) return;
    this.addList(this.$menuInput.value);
    this.plusCount();
    setInputEmpty(this.$menuInput);
  }

  plusCount() {
    this.count += 1;
    this.$menuCount.textContent = `총 ${this.count}개`;
  }

  minusCount() {
    this.count -= 1;
    this.$menuCount.textContent = `총 ${this.count}개`;
  }

  addList(menuName) {
    this.$menuList.insertAdjacentHTML("beforeend", listTemplate(menuName));
  }

  listClickHandler(e) {
    if (isEditBtn(e)) {
      const $li = e.target.closest("li");
      this.editList($li);
    } else if (isDeleteBtn(e)) {
      const $li = e.target.closest("li");
      this.deleteList($li);
    }
  }

  editList($li) {
    const content = window.prompt("수정하시겠습니까?");
    $li.querySelector(".menu-name").textContent = content;
  }
  deleteList($li) {
    if (window.confirm("삭제하시겠습니까?")) {
      this.$menuList.removeChild($li);
      this.minusCount();
    }
  }
}
