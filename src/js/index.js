import { MenuCount, MenuForm, MenuInput, MenuList } from "./components";
import { $ } from "./util";

const state = {
  count: 0,
};

document.addEventListener("DOMContentLoaded", () => {
  MenuForm($("#espresso-menu-form"), { state });

  MenuInput($("#espresso-menu-name"), { state });

  MenuList($("#espresso-menu-list"), { state });

  MenuCount($(".menu-count"), { state });
});
