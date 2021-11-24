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
    this.$menuInput = $("#espresso-menu-name");
    this.$submitBtn = $(".input-submit");
    this.$menuForm = $("#espresso-menu-form");
    this.$menuList = $("#espresso-menu-list");
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
    setInputEmpty(this.$menuInput);
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

  editList = ($li) => {
    const content = window.prompt("수정하시겠습니까?");
    $li.querySelector(".menu-name").textContent = content;
  };
  deleteList = ($li) => {
    if (window.confirm("삭제하시겠습니까?")) {
      this.$menuList.removeChild($li);
    }
  };
}
