export default class Menu {
  constructor(menu) {
    this.menu = menu;
    this.init();
  }
  post() {
    const newMenu = document.querySelector(".input-field");
    // 사용자 입력값이 빈 값이라면 추가되지 않는다
    if (newMenu.value) {
      this.menu.push(newMenu.value);
      // 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다
      newMenu.value = "";
      this.output();
    } else {
      alert("값을 입력해주세요.");
    }
  }
  output() {
    const menuListContainer = document.querySelector("#espresso-menu-list");
    const res = [];
    res.push(`<ul class="mt-3 pl-0">`);
    this.menu.forEach((name) => {
      res.push(`
        <li class="menu-list-item d-flex items-center py-2">
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
        </li>
        `);
    });
    res.push("</ul>");
    menuListContainer.innerHTML = res.join("");
    // 총 메뉴 갯수를 count하여 상단에 보여준다
    document.querySelector(".menu-count").innerHTML = this.menu.length;
  }
  init() {
    // 에스프레소 메뉴에 새로운 메뉴를 확인 버튼 또는 엔터키 입력으로 추가한다
    document
      .querySelector(".input-submit")
      .addEventListener("click", this.post.bind(this));
    document.addEventListener("keypress", (e) => {
      if (e.code === "Enter") {
        e.preventDefault();
        this.post();
      }
    });
    this.output();
  }
}
