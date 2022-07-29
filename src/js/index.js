import {
  MenuCategory,
  MenuCount,
  MenuForm,
  MenuInput,
  MenuList,
  MenuTitle,
} from "./components";
import {
  $,
  Api,
  Client,
  createCafe,
  StateListener,
  StateManager,
} from "./util";

document.addEventListener("DOMContentLoaded", async () => {
  const api = Api(Client());
  const cafe = await createCafe({ api });

  const state = { cafe, currentCafe: "espresso" };
  const stateManager = new StateManager(state);

  new StateListener({ cafe, stateManager, api });

  const props = { cafe, stateManager, api };

  MenuForm($("#espresso-menu-form"), props);

  MenuInput($("#espresso-menu-name"), props);

  MenuList($("#espresso-menu-list"), props);

  MenuCount($(".menu-count"), props);

  MenuCategory(null, props);

  MenuTitle($(".heading h2"), props);
});
