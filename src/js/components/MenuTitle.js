import { addCustomEventListener } from "../util";
import { EVENTS } from "../constant";

export function MenuTitle($container, { stateManager }) {
  function setTitle() {
    const name = stateManager.currentCafeName();

    $container.textContent = `${name} 메뉴 관리`;
  }

  addCustomEventListener(EVENTS.CHANGE_CATEGORY, setTitle);
}
