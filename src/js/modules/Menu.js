export default class Menu {
  constructor() {
    this.init();
  }
  createMenu(e) {
    const newMenuInput = e.target.querySelector(".input-field");
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
      // 메뉴의 수정 버튼을 눌러 메뉴 이름을 수정할 수 있다
      newMenuUpdateButton.onclick = (e) => this.updateMenu(e);
      newMenuUpdateButton.appendChild(document.createTextNode("수정"));
      const newMenuDeleteButton = document.createElement("button");
      newMenuDeleteButton.className =
        "bg-gray-50 text-gray-500 text-sm menu-remove-button";
      // 메뉴 삭제 버튼을 이용하여 메뉴를 삭제할 수 있다
      newMenuDeleteButton.onclick = (e) => this.deleteMenu(e);
      newMenuDeleteButton.appendChild(document.createTextNode("삭제"));
      newMenu.appendChild(newMenuName);
      newMenu.appendChild(newMenuUpdateButton);
      newMenu.appendChild(newMenuDeleteButton);
      menuList.appendChild(newMenu);
      // 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다
      newMenuInput.value = "";
      this.countMenu();
    } else {
      alert("값을 입력해주세요.");
    }
  }
  updateMenu(e) {
    const name = e.target.closest("li").querySelector(".menu-name");
    // 메뉴 수정시 브라우저에서 제공하는 prompt 인터페이스를 활용한다
    const updateName = prompt("메뉴명을 수정하세요", name.innerHTML);
    if (updateName) name.innerHTML = updateName;
  }
  deleteMenu(e) {
    // 메뉴 삭제시 브라우저에서 제공하는 confirm 인터페이스를 활용한다
    if (window.confirm("정말 삭제하시겠습니까?")) {
      e.target.parentElement.remove();
      this.countMenu();
    }
  }
  countMenu() {
    // 총 메뉴 갯수를 count하여 상단에 보여준다
    const count = document.querySelectorAll(".menu-list-item").length;
    document.querySelector(".menu-count").innerHTML = `총 ${count} 개`;
  }
  init() {
    // 에스프레소 메뉴에 새로운 메뉴를 확인 버튼 또는 엔터키 입력으로 추가한다
    document
      .querySelector("#espresso-menu-form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        this.createMenu(e);
      });
  }
}
