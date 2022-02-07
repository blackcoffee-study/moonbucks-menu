import View from "./View.js";

export default class Nav extends View {
  constructor() {
    super(document.querySelector("nav"));
    this.eventBind();
  }

  eventBind() {
    this.target.addEventListener("click", (e) => {
      if (e.target.dataset.categoryName) {
        this.emit("@changeCategory", e.target.dataset.categoryName);
      }
    });
  }
}
