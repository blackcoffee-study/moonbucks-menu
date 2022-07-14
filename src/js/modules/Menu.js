export default class Menu {
  constructor(menu) {
    this.menu = menu;
    this.init();
  }
  create() {
    const newMenu = document.querySelector(".input-field");
    // 사용자 입력값이 빈 값이라면 추가되지 않는다
    if (newMenu.value) {
      this.menu.push({ id: this.menu.length, name: newMenu.value });
      // 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다
      newMenu.value = "";
      this.read();
    } else {
      alert("값을 입력해주세요.");
    }
  }
  read() {
    const menuListContainer = document.querySelector("#espresso-menu-list");
    const res = [];
    this.menu.forEach((e) => {
      res.push(`
        <li class="menu-list-item d-flex items-center py-2" >
            <span class="w-100 pl-2 menu-name">${e.name}</span>
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
        `);
    });
    menuListContainer.innerHTML = res.join("");
    // 총 메뉴 갯수를 count하여 상단에 보여준다
    document.querySelector(
      ".menu-count"
    ).innerHTML = `총 ${this.menu.length} 개`;
  }
  update() {}
  delete() {}
  init() {
    // 에스프레소 메뉴에 새로운 메뉴를 확인 버튼 또는 엔터키 입력으로 추가한다
    document
      .querySelector(".input-submit")
      .addEventListener("click", this.create.bind(this));
    document
      .querySelector("#espresso-menu-name")
      .addEventListener("keypress", (e) => {
        if (e.code === "Enter") {
          e.preventDefault();
          this.create();
        }
      });
    this.read();
  }
}
