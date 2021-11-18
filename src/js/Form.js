import { $ } from "./utils/selector.js";

export default function Form({ $app, onSubmit }) {
  this.$form = document.createElement("form");
  this.$form.id = "espresso-menu-form";

  $app.appendChild(this.$form);

  this.template = () => `
    <div class="d-flex w-100">
      <label for="espresso-menu-name" class="input-label" hidden>
        에스프레소 메뉴 이름
      </label>
      <input
        type="text"
        id="espresso-menu-name"
        name="espressoMenuName"
        class="input-field"
        placeholder="에스프레소 메뉴 이름"
        autocomplete="off"
      />
      <button
        type="submit"
        name="submit"
        id="espresso-menu-submit-button"
        class="input-submit bg-green-600 ml-2"
      >
        확인
      </button>
    </div>
  `;

  this.render = () => {
    this.$form.innerHTML = this.template();
  };

  this.setEvent = () => {
    this.$form.addEventListener("submit", (event) => {
      const inputValue = $("#espresso-menu-name").value;

      event.preventDefault();

      if (!Boolean(inputValue)) {
        return;
      }

      onSubmit({ name: $("#espresso-menu-name").value });

      $("#espresso-menu-name").value = "";
    });
  };

  this.render();
  this.setEvent();
}
