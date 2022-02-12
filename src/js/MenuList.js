export default function MenuList(initialState) {
  this.$menuList = document.querySelector("#espresso-menu-list");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    console.log(this.state);
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

  this.render();
}
