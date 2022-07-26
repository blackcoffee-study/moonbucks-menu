import { DefaultMenuListItem } from "./MenuListItem";
import { EVENTS } from "../constant";
import { addCustomEventListener } from "../util";

export function MenuList($container, { stateManager }) {
  function clear() {
    while ($container.hasChildNodes()) {
      $container.removeChild($container.firstChild);
    }
  }

  function addMenu({ menuId, menuName, soldout }) {
    const { $container: $menuListItem } = DefaultMenuListItem({
      menuName,
      soldout,
    });

    $menuListItem.dataset["menuId"] = menuId;

    $container.insertAdjacentElement("afterbegin", $menuListItem);
  }

  function render() {
    stateManager.currentCafeItems().forEach(addMenu);
  }

  function clearAndRender() {
    clear();

    render();
  }

  addCustomEventListener(EVENTS.CHANGE_CATEGORY, clearAndRender);
  addCustomEventListener(EVENTS.ADD_MENU, addMenu);
}
