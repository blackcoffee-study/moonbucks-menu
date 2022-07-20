import { addCustomEventListener } from "./helper";
import { EVENTS } from "../constant";

export function createCafe({ cafeStorage }) {
  return Object.assign(
    {
      espresso: {
        name: "☕ 에스프레소",
        items: [],
      },
      frappuccino: {
        name: "🥤 프라푸치노",
        items: [],
      },
      blended: {
        name: " 🍹 블렌디드",
        items: [],
      },
      teavana: {
        name: "🫖 티바나",
        items: [],
      },
      desert: {
        name: "🍰 디저트",
        items: [],
      },
    },
    cafeStorage.get()
  );
}

export function StateManager(state) {
  function currentCafe() {
    return state.cafe[state.currentCafe];
  }

  function currentCafeName() {
    return currentCafe().name;
  }

  function currentCafeItems() {
    return currentCafe().items;
  }

  function currentCafeItemsSize() {
    return currentCafeItems().length;
  }

  function setCafeItems(items) {
    currentCafe().items = items;
  }

  function addMenu(menu) {
    setCafeItems([...currentCafeItems(), menu]);
  }

  function removeMenu(menuId) {
    setCafeItems(currentCafeItems().filter((item) => item.menuId !== menuId));
  }

  function editMenu({ menuId, menuName, soldout }) {
    const menu = getMenuById(menuId);

    menu.menuName = menuName;
    menu.soldout = soldout;
  }

  function getMenuById(menuId) {
    return currentCafeItems().find((item) => item.menuId === menuId);
  }

  function setCurrentCafe(categoryName) {
    state.currentCafe = categoryName;
  }

  return {
    currentCafe,
    currentCafeName,
    setCurrentCafe,
    currentCafeItems,
    currentCafeItemsSize,
    getMenuById,
    addMenu,
    editMenu,
    removeMenu,
  };
}

export function StateListener({ cafe, stateManager, cafeStorage }) {
  function editMenu(menu) {
    const { menuId } = menu;

    const originalMenu = stateManager.getMenuById(menuId);
    const newMenu = Object.assign(originalMenu, menu);

    stateManager.editMenu(newMenu);

    cafeStorage.save(cafe);
  }

  function addMenu(menu) {
    stateManager.addMenu(menu);

    cafeStorage.save(cafe);
  }

  function removeMenu({ menuId }) {
    stateManager.removeMenu(menuId);

    cafeStorage.save(cafe);
  }

  addCustomEventListener(EVENTS.CHANGE_MENU, editMenu);
  addCustomEventListener(EVENTS.ADD_MENU, addMenu);
  addCustomEventListener(EVENTS.REMOVE_MENU, removeMenu);
}
