import { EVENTS } from "../constant";
import { addCustomEventListener } from "../util";

export const MenuCount = ($container, { state }) => {
  const setCount = (count) => {
    $container.textContent = `총 ${count}개`;
  };

  addCustomEventListener(EVENTS.ADD_MENU, () => setCount(++state.count));
  addCustomEventListener(EVENTS.REMOVE_MENU, () => setCount(--state.count));
};
