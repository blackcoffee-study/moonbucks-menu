import { Menu } from "../components/index.js";
import { menuListStore } from "../store/store/menuListStore.js";
import { render } from "../utils/index.js";

const menuCount = document.querySelector(".menu-count");

export function MenuList() {
  const [menuList] = menuListStore();
  const component = menuList.map((menu) => Menu(menu.id, menu.name)).join("");
  render(component, document.querySelector("#espresso-menu-list"));
  menuCount.innerText = `총 ${menuList.length}개`;
}
