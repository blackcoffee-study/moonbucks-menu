import { EVENTS } from "../constant";
import {
  addCustomEventListener,
  dispatchCustomEvent,
  validateMenuName,
} from "../util";

export function MenuInput($container, { api, stateManager }) {
  function setValue(value) {
    $container.value = value;
  }

  function focus() {
    $container.focus();
  }

  async function addMenu() {
    const { value: menuName } = $container;

    try {
      validateMenuName(menuName);
    } catch (e) {
      return alert(e.message);
    }

    setValue("");
    focus();

    api
      .createMenu({
        categoryName: stateManager.currentCategory(),
        name: menuName,
      })
      .then(({ id }) => {
        const menuId = id;
        dispatchCustomEvent(EVENTS.ADD_MENU, { menuId, menuName });
      })
      .catch((e) => alert(e.message));
  }

  addEventListener("load", focus);

  addCustomEventListener(EVENTS.MENU_FORM_SUBMIT, addMenu);
}
