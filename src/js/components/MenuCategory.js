import { $all, dispatchCustomEvent } from "../util";
import { EVENTS } from "../constant";

export function MenuCategory($container, { stateManager }) {
  function changeCategory(e) {
    const $button = e.target;

    const { categoryName } = $button.dataset;

    stateManager.setCurrentCafe(categoryName);

    dispatchCustomEvent(EVENTS.CHANGE_CATEGORY, { categoryName });
  }

  const $buttons = $all(".cafe-category-name");

  $buttons.forEach((btn) => btn.addEventListener("click", changeCategory));

  setTimeout(() => $buttons[0].click());
}
