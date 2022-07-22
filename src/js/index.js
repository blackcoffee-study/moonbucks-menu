import MenuList from "./components/MenuList.js";

// 페이지에 최초로 접근할 때는 에스프레소 메뉴가 먼저 보이게 한다
const state = { menuCategory: "espresso", menuData: [] };

document.addEventListener("DOMContentLoaded", () => {
  MenuList(state.menuCategory, state.menuData);
});
