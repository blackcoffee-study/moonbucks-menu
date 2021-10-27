import { $, $All } from "../util/util.js";

export default function Render($target, initialState) {
  this.$target = $target;
  this.state = initialState;

  const { menu } = this.state;
  const { soldOut } = this.state;

  this.$target.innerHTML = menu
    .map(
      (menu, index) =>
        `<li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name" >${menu}</span>
        <button data-index=${index} class="espresso-menu-soldout-btn">품절</button>
        <button data-index=${index} class="espresso-menu-update-btn">수정</button>
        <button data-index=${index} class="espresso-menu-delete-btn">삭제</button>
      </li>`
    )
    .join("");

  for (let i = 0; i < $target.childNodes.length; i++) {
    if (soldOut[i]) {
      $All(".menu-name")[i].style.textDecoration = "line-through";
      $All(".espresso-menu-soldout-btn")[i].style.color = "red";
    }
  }
  $(".menu-count").textContent = `총 ${this.state.menu.length}개`;
}
