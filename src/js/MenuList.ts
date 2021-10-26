import Component from "./Core/Component";
import { store } from "./MenuStore";
import { action } from "./Core/Constants";

export default class MenuList extends Component {
  template() {
    const { selected, menuList } = store.state;
    return menuList.map((menu) =>
      `<li class="menu-list-item d-flex items-center py-2" data-id=${menu.id}>
        <span class="w-100 pl-2 menu-name ${
          menu.isSoldOut ? `sold-out` : null
        }">${menu.name}</span>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
  >
    품절
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
</li>`.join("")
    );
  }

  setEvent() {
    this.addEvent("click", "button.menu-edit-button", (e) => {
      const li = e.target.closest("li");
      let newText = window.prompt("메뉴명을 입력하세요");
      if (!newText.trim() || newText.trim() === "") return false;
      store.dispatch(action.EDIT, {
        category: store.state.selected,
        menuId: li.dataset.id,
        name: newText,
      });
    });
    this.addEvent("click", "button.menu-remove-button", (e) => {
      const li = e.target.closest("li");
      if (window.confirm("정말 삭제하시겠습니까?")) {
        store.dispatch(action.DELETE, {
          category: store.state.selected,
          menuId: li.dataset.id,
        });
      } else return false;
    });
    this.addEvent("click", "button.menu-sold-out-button", (e) => {
      const li = e.target.closest("li");
      store.dispatch(action.TOGGLE, {
        category: store.state.selected,
        menuId: li.dataset.id,
      });
    });
  }
}
