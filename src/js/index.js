import {
  MenuTitle,
  MenuCategory,
  MenuCount,
  MenuForm,
  MenuInput,
  MenuList,
} from "./components";
import { $, CafeStorage, StateListener, StateManager } from "./util";
import { createCafe } from "./util";

const cafeStorage = new CafeStorage();
const cafe = createCafe({ cafeStorage });

const state = { cafe, currentCafe: "espresso" };
const stateManager = new StateManager(state);

new StateListener({ cafe, stateManager, cafeStorage });

document.addEventListener("DOMContentLoaded", () => {
  const props = { cafe, stateManager };

  MenuForm($("#espresso-menu-form"), props);

  MenuInput($("#espresso-menu-name"), props);

  MenuList($("#espresso-menu-list"), props);

  MenuCount($(".menu-count"), props);

  MenuCategory(null, props);

  MenuTitle($(".heading h2"), props);
});
