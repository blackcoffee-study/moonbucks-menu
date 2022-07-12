import { EVENTS } from "../constant";
import { dispatchCustomEvent } from "../util";

export const MenuForm = ($container) => {
  $container.addEventListener("submit", (e) => {
    e.preventDefault();

    dispatchCustomEvent(EVENTS.MENU_FORM_SUBMIT);
  });
};
