import { EVENTS } from "../constant";
import {
  addCustomEventListener,
  dispatchCustomEvent,
  handleError,
  validateMenuName,
} from "../util";

export function MenuInput($container, { api, stateManager }) {
  function setValue(value) {
    $container.value = value;
  }

  function focus() {
    $container.focus();
  }

  function addMenu() {
    const { value: menuName } = $container;

    try {
      validateMenuName(menuName);
    } catch (e) {
      return alert(e.message);
    }

    function onAddMenu({ id: menuId }) {
      setValue("");
      focus();

      dispatchCustomEvent(EVENTS.ADD_MENU, { menuId, menuName });
    }

    const categoryName = stateManager.currentCategory();
    const params = { categoryName, name: menuName };

    api.createMenu(params).then(onAddMenu).catch(handleError);
  }

  addEventListener("load", focus);

  addCustomEventListener(EVENTS.MENU_FORM_SUBMIT, addMenu);
}
