import Component from "./Core/Component";
import { store } from "./MenuStore";
import { getCategories } from "./Core/Constants";
import { Action } from "./Core/types";

export class MenuForm extends Component {
  template() {
    const category = getCategories().find(
      (category) => category.key === store.state.selected
    );
    return `
        <div class="d-flex w-100">
              <label for="espresso-menu-name" class="input-label" hidden>
                ${category?.name} 메뉴 이름
              </label>
              <input
                      type="text"
                      id="espresso-menu-name"
                      name="espressoMenuName"
                      class="input-field"
                      placeholder="에스프레소 메뉴 이름"
                      autocomplete="off"
              />
              <button
                      type="button"
                      name="submit"
                      id="espresso-menu-submit-button"
                      class="input-submit bg-green-600 ml-2"
              >
                확인
              </button>
            </div>`;
  }

  setEvent() {
    this.addEvent("click", "button#espresso-menu-submit-button", (e) => {
      const Input = this.$el.querySelector(
        "input#espresso-menu-name"
      ) as HTMLInputElement;
      const { selected } = store.state;
      if (!Input.value.trim() || Input.value.trim() === "") return false;
      store.dispatch(Action.ADD, { category: selected, name: Input.value });
      Input.value = "";
    });
  }
}
