import { DefaultMenuListItem } from "./MenuListItem";
import { EVENTS } from "../constant";
import { addCustomEventListener } from "../util";

export const MenuList = ($container) => {
  const addMenu = (menuName) => {
    const { $container: $menuListItem } = DefaultMenuListItem(menuName);

    $container.insertAdjacentElement("afterbegin", $menuListItem);
  };

  addCustomEventListener(EVENTS.ADD_MENU, ({ menuName }) => addMenu(menuName));
};
