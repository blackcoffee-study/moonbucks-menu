export default function MenuInput({ addMenu }) {
  this.$menuInput = document.querySelector("#espresso-menu-form");

  this.setEvent = () => {
    this.$menuInput.addEventListener("submit", (e) => {
      e.preventDefault();
      this.$input = this.$menuInput.querySelector(".input-field");

      if (this.$input.value !== "") {
        addMenu(this.$input.value);
        this.$input.value = "";
      }
    });
  };

  this.setEvent();
}
