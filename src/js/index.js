import { menuListStore } from "./store/store/index.js";
import { generateId } from "./utils/index.js";

const menuName = document.querySelector("#espresso-menu-name");
const menuForm = document.querySelector("#espresso-menu-form");

const menuListId = generateId();

const onSubmit = (event) => {
  event.preventDefault();
  const [_, setMenuList] = menuListStore();
  const name = menuName.value;
  setMenuList((prev) => [...prev, { id: menuListId(), name }]);
  menuName.value = "";
};

menuForm.addEventListener("submit", onSubmit);
