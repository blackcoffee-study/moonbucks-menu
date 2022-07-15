import { EVENTS } from "../constant";
import {
  addCustomEventListener,
  dispatchCustomEvent,
  validateMenuName,
} from "../util";

export function MenuInput($container) {
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

    setValue("");
    focus();

    dispatchCustomEvent(EVENTS.ADD_MENU, { menuName });
  }

  addEventListener("load", focus);

  addCustomEventListener(EVENTS.MENU_FORM_SUBMIT, addMenu);
}
