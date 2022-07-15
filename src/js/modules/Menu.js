export default class Menu {
  constructor() {
    this.init();
  }
  create() {
    const newMenuInput = document.querySelector(".input-field");
    // 사용자 입력값이 빈 값이라면 추가되지 않는다
    if (newMenuInput.value) {
      const menuList = document.querySelector("#espresso-menu-list");
      const newMenu = document.createElement("li");
      newMenu.className = "menu-list-item d-flex items-center py-2";
      const newMenuName = document.createElement("span");
      newMenuName.className = "w-100 pl-2 menu-name";
      newMenuName.appendChild(document.createTextNode(`${newMenuInput.value}`));
      const newMenuUpdateButton = document.createElement("button");
      newMenuUpdateButton.className =
        "bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button";
      newMenuUpdateButton.onclick = () => this.update();
      newMenuUpdateButton.appendChild(document.createTextNode("수정"));
      const newMenuDeleteButton = document.createElement("button");
      newMenuDeleteButton.className =
        "bg-gray-50 text-gray-500 text-sm menu-remove-button";
      newMenuDeleteButton.onclick = () => this.delete();
      newMenuDeleteButton.appendChild(document.createTextNode("삭제"));
      newMenu.appendChild(newMenuName);
      newMenu.appendChild(newMenuUpdateButton);
      newMenu.appendChild(newMenuDeleteButton);
      menuList.appendChild(newMenu);
      // 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다
      newMenuInput.value = "";
      this.count();
    } else {
      alert("값을 입력해주세요.");
    }
  }
  update() {
    console.log("수정");
  }
  delete() {
    console.log("삭제");
  }
  count() {
    // 총 메뉴 갯수를 count하여 상단에 보여준다
    const count = document.querySelectorAll(".menu-list-item").length;
    document.querySelector(".menu-count").innerHTML = `총 ${count} 개`;
  }
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
    this.count();
  }
}
