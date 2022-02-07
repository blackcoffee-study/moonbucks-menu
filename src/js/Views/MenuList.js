import View from "./View.js";

export default class MenuList extends View {
  constructor() {
    super(document.querySelector("#menu-list"));
    this.bindEvent();
  }

  bindEvent() {
    this.target.addEventListener("click", (e) => {
      // 품절
      if (e.target.classList.contains("menu-sold-out-button")) {
        this.emit("@toggleSoldOut", {
          menuId: e.target.closest("li").dataset.id,
        });
        return;
      }

      // 수정
      if (e.target.classList.contains("menu-edit-button")) {
        const result = prompt("수정할 메뉴이름을 입력하세요");
        if (result) {
          this.emit("@updateMenuName", {
            menuId: e.target.closest("li").dataset.id,
            newMenuName: result,
          });
        }
        return;
      }

      // 삭제
      if (e.target.classList.contains("menu-remove-button")) {
        if (confirm("정말 삭제하시겠습니까?")) {
          this.emit("@deleteMenu", {
            menuId: e.target.closest("li").dataset.id,
          });
        }
        return;
      }
    });
  }

  render({ menuList }) {
    const menuListTemplate = menuList
      .map((menu) => this.listTemplate(menu))
      .join("");
    this.target.innerHTML = menuListTemplate;
  }

  listTemplate = (menu) => {
    return `
    <li class="menu-list-item d-flex items-center py-2" data-id=${menu.id}>
            <span class="w-100 pl-2 menu-name ${
              menu.isSoldOut ? "sold-out" : ""
            }">${menu.name}</span>
            <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
            >
              품절
            </button>
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
