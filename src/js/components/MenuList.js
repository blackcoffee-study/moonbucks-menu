import { DefaultMenuListItem } from "./MenuListItem";
import { EVENTS } from "../constant";
import { addCustomEventListener } from "../util";

export function MenuList($container) {
  function addMenu({ menuName }) {
    const { $container: $menuListItem } = DefaultMenuListItem(menuName);

    $container.insertAdjacentElement("afterbegin", $menuListItem);
  }

  addCustomEventListener(EVENTS.ADD_MENU, addMenu);
}
