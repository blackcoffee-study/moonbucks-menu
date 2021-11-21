// class App {
//   constructor() {
//     const menuItem = "";
//   }
// }
const $ = (selector) => document.querySelector(selector);
class App {
  constructor() {
    this.menuList = [];
    this.menuCount = 0;

    this.initSetting();
  }

  // init setting
  initSetting() {
    // click event prevent
    $("#espresso-menu-form").addEventListener("submit", (e) => {
      e.preventDefault();
    });

    // enter event -> add a menu
    $("#espresso-menu-name").addEventListener("keypress", (e) => {
      if (e.key != "Enter") return;
      this.addMenu();
    });
    // 확인 event -> add a menu
    $("#espresso-menu-submit-button").addEventListener("click", () => {
      this.addMenu();
    });

    // 각 list 마다 수정/삭제 event 추가
    $("#espresso-menu-list").addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-edit-button")) {
        this.updateMenuName(e);
      }
      if (e.target.classList.contains("menu-remove-button")) {
        this.deleteMenu(e);
      }
    });
  }

  // menu 추가
  addMenu() {
    const menuName = $("#espresso-menu-name").value;
    if (!menuName) {
      alert("메뉴 입력");
      return;
    }

    const menu = {
      id: this.menuList.length + 1,
      soldOut: false,
      name: menuName,
    };
    this.menuList.push(menu);
    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      this.menuItemTemplate(menu)
    );
    this.updateMenuCount(true);
    $("#espresso-menu-name").value = "";
  }
  // menu count update
  updateMenuCount(type) {
    type ? this.menuCount++ : this.menuCount--;
    $("#menuCount").innerText = `총 ${this.menuCount}개`;
  }

  // menu update
  updateMenuName(e) {
    const menuItem =
      e.target.parentElement.getElementsByClassName("menu-name")[0];
    const newMenuName = prompt("메뉴 수정", menuItem.innerText);
    if (newMenuName) {
      menuItem.innerText = newMenuName;
    }
  }
  // menu delete
  deleteMenu(e) {
    const menuItem = e.target.parentElement;
    if (confirm("메뉴 삭제")) {
      menuItem.remove();
      this.updateMenuCount(false);
    }
  }
  // menu template
  menuItemTemplate(menu) {
    const { id, soldOut, name } = menu;
    return `
        <li class="menu-list-item d-flex items-center py-2"
            id="${id}"
            data-soldOut="${soldOut}">
        <span class="w-100 pl-2 menu-name ${
          soldOut ? "sold-out" : ""
        }">${name}</span>
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
  }
}

new App();
