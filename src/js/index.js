"use strict";

window.addEventListener("DOMContentLoaded", () => {
  new App();
});

class App {
  constructor() {
    this.$menuInput = document.querySelector("#espresso-menu-name");
    this.$submitBtn = document.querySelector(".input-submit");
    this.$menuForm = document.querySelector("#espresso-menu-form");
    this.$menuList = document.querySelector("#espresso-menu-list");
    this.eventBind();
  }

  eventBind() {
    this.$menuForm.addEventListener("submit", this.submitHandler.bind(this));
    this.$submitBtn.addEventListener("click", this.submitHandler.bind(this));
    this.$menuList.addEventListener("click", this.listClickHandler.bind(this));
  }

  submitHandler(e) {
    e.preventDefault();
    if (this.isInputEmpty(this.$menuInput)) return;

    const menuName = this.$menuInput.value;
    this.$menuList.insertAdjacentHTML("beforeend", this.listTemplate(menuName));
    this.setInputEmpty(this.$menuInput);
  }

  listClickHandler(e) {
    if (this.isEditBtn(e)) {
      const $li = e.target.closest("li");
      const result = window.prompt("수정하시겠습니까?");
      $li.querySelector(".menu-name").textContent = result;
    } else if (this.isDeleteBtn(e)) {
      const $li = e.target.closest("li");
      this.deleteList($li);
    }
  }

  isInputEmpty = ($input) => {
    return $input.value.length === 0;
  };

  setInputEmpty = ($input) => {
    $input.value = "";
    return;
  };

  deleteList = ($li) => {
    if (window.confirm("삭제하시겠습니까?")) {
      this.$menuList.removeChild($li);
    }
  };

  isDeleteBtn = (e) => {
    return e.target.classList.contains("menu-remove-button");
  };

  isEditBtn = (e) => {
    return e.target.classList.contains("menu-edit-button");
  };

  listTemplate = (name) => {
    return `<li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${name}</span>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      >
        수정
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      >
        삭제
      </button>
    </li>`;
  };
}
