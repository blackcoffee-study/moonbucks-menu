import { $ } from "./util/helper.js";
import menuApi from "./util/api/menuApi.js";

class App {
  constructor() {
    this.currentCategory = "espresso";
    this.menuListCount = 0;

    this.$menuCount = $(".menu-count");
    this.$menuList = $("#menu-list");
    this.$menuNameInput = $("#menu-name");
    this.$menuForm = $("#menu-form");
    this.$nav = $("nav");
    this.$categoryTitle = $("#category-title");

    this.setEvent();
    this.render();
  }

  setEvent() {
    this.$menuForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addMenu();
    });

    this.$menuList.addEventListener("click", (e) => {
      if (e.target && e.target.innerText == "품절") {
        this.soldOutMenu(e);
        return;
      }

      if (e.target && e.target.innerText == "수정") {
        this.editMenu(e);
        return;
      }

      if (e.target && e.target.innerText == "삭제") {
        this.deleteMenu(e);
        return;
      }
    });

    this.$nav.addEventListener("click", (e) => {
      this.getCategory(e);
    });
  }

  async addMenu() {
    if (!this.$menuNameInput.value) {
      alert("값을 입력하세요.");
      return;
    }
    await menuApi.addMenu(this.currentCategory, this.$menuNameInput);
    this.render();
  }

  async soldOutMenu(e) {
    const menuId = e.target.closest("li").dataset.menuId;
    const menuName = e.target.parentNode.firstElementChild;

    // fixme: 첫번째 클릭때 품절이 작동하지 않는다.
    const res = await menuApi.soldOutMenu(this.currentCategory, menuId);
    if (res.isSoldOut) {
      menuName.classList.add("sold-out");
      return;
    }
    if (!res.isSoldOut) {
      menuName.classList.remove("sold-out");
      return;
    }
  }

  async editMenu(e) {
    const result = window.prompt("메뉴명을 수정하세요.");
    if (!result) return;

    const menuId = e.target.closest("li").dataset.menuId;
    await menuApi.editMenu(this.currentCategory, menuId, result);
    this.render();
  }

  async deleteMenu(e) {
    if (confirm("정말 삭제하시겠습니까?")) {
      const menuId = e.target.parentNode.dataset.menuId;

      await menuApi.deleteMenu(this.currentCategory, menuId);
      this.render();
      this.countMenu();
    }
  }

  countMenu() {
    this.$menuCount.innerHTML = `총 ${this.menuListCount}개`;
  }

  getCategory(e) {
    const isCategoryButton = e.target.classList.contains("cafe-category-name");
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName;
      this.currentCategory = categoryName;
      this.$categoryTitle.innerText = `${e.target.innerText} 메뉴 관리`;
    }
    this.render();
  }

  async render() {
    const data = await menuApi.getMenu(this.currentCategory);
    this.menuListCount = data.length;
    this.countMenu();

    const template = data
      ? data
          .map((item) => {
            return `
          <li data-menu-id="${item.id}" class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">
              ${item.name}
            </span>
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
          </li>
        `;
          })
          .join("")
      : "<h2>데이터를 불러오는데 실패했습니다.</h2>";

    this.$menuList.innerHTML = template;
  }
}

const app = new App();
