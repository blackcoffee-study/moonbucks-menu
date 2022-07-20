import { EVENTS } from "../constant";
import { addCustomEventListener } from "../util";

export function MenuCount($container, { stateManager }) {
  function setCount(count) {
    $container.textContent = `총 ${count}개`;
  }

  function setCountFromState() {
    setTimeout(() => setCount(stateManager.currentCafeItemsSize()));
  }

  addCustomEventListener(EVENTS.CHANGE_CATEGORY, setCountFromState);
  addCustomEventListener(EVENTS.ADD_MENU, setCountFromState);
  addCustomEventListener(EVENTS.REMOVE_MENU, setCountFromState);
}
