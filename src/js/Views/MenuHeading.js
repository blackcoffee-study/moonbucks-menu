import View from "./View.js";

export default class MenuHeading extends View {
  constructor() {
    super(document.querySelector(".heading"));
    this.categoryTitle = this.$("h2");
    this.menuCount = this.$(".menu-count");
  }

  render({ category = "espresso", menuLength = 0 }) {
    switch (category) {
      case "espresso":
        this.renderCategoryTitle("☕ 에스프레소");
        break;
      case "frappuccino":
        this.renderCategoryTitle("🥤 프라푸치노");
        break;
      case "blended":
        this.renderCategoryTitle("🍹 블렌디드");
        break;
      case "teavana":
        this.renderCategoryTitle("🫖 티바나");
        break;
      case "desert":
        this.renderCategoryTitle("🍰 디저트");
        break;
      default:
        break;
    }
    this.renderMenuCount(menuLength);
  }

  renderCategoryTitle(category) {
    this.categoryTitle.textContent = `${category} 메뉴 관리`;
  }

  renderMenuCount(menuLength) {
    this.menuCount.textContent = `총 ${menuLength}개`;
  }
}
