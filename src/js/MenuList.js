export default function MenuList({ initialState, editMenu, removeMenu }) {
  this.$menuList = document.querySelector("#espresso-menu-list");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$menuList.innerHTML = Array.isArray(this.state)
      ? `${this.state
          .map(
            (
              name,
              index
            ) => `<li class="menu-list-item d-flex items-center py-2" index=${index}>
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
  </li>`
          )
          .join("")}`
      : "";
  };

  this.setEvent = () => {
    this.$menuList.addEventListener("click", (e) => {
      // Event delegate
      if (e.target.classList.contains("menu-edit-button")) {
        const editedMenu = prompt("수정할 메뉴 이름을 입력해주세요.");
        editMenu(e.target.closest("li").getAttribute("index"), editedMenu);
      }
      if (e.target.classList.contains("menu-remove-button")) {
        if (confirm("메뉴를 삭제하시겠습니까?")) {
          removeMenu(Number(e.target.closest("li").getAttribute("index")));
        }
      }
    });
  };

  this.render();
  this.setEvent();
}
