import { addCustomEventListener } from "./helper";
import { EVENTS } from "../constant";

export async function createCafe({ api }) {
  const menus = {
    espresso: {
      name: "☕ 에스프레소",
      items: [],
    },
    frappuccino: {
      name: "🥤 프라푸치노",
      items: [],
    },
    blended: {
      name: "🍹 블렌디드",
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
  };

  for (const categoryName of Object.keys(menus)) {
    api
      .getMenu({ categoryName })
      .then((items) => {
        menus[categoryName].items = items.map((item) => {
          const { id: menuId, name: menuName, isSoldOut: soldout } = item;

          return {
            ...item,
            menuName,
            menuId,
            soldout,
          };
        });
      })
      .catch((e) => alert(e.message));
  }

  return menus;
}

export function StateManager(state) {
  function currentCategory() {
    return state.currentCafe;
  }

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
    currentCategory,
    getMenuById,
    addMenu,
    editMenu,
    removeMenu,
  };
}

export function StateListener({ stateManager, api }) {
  function editMenu(menu) {
    const { menuId } = menu;

    const originalMenu = stateManager.getMenuById(menuId);
    const newMenu = Object.assign(originalMenu, menu);

    stateManager.editMenu(newMenu);

    api
      .editMenu({
        menuId,
        name: newMenu.menuName,
        categoryName: stateManager.currentCategory(),
      })
      .catch((e) => {
        alert(e.message);
      });
  }

  function addMenu(menu) {
    stateManager.addMenu(menu);
  }

  function removeMenu({ menuId }) {
    stateManager.removeMenu(menuId);

    api
      .delMenu({
        categoryName: stateManager.currentCategory(),
        menuId,
      })
      .catch((e) => alert(e.message));
  }

  addCustomEventListener(EVENTS.CHANGE_MENU, editMenu);
  addCustomEventListener(EVENTS.ADD_MENU, addMenu);
  addCustomEventListener(EVENTS.REMOVE_MENU, removeMenu);
}
