import { elementIdMap } from "./utils/constant_utils.js";
import { useState } from "./utils/state_utils.js";
import { getById } from "./utils/control_dom_utils.js";
import {
  loadMenuApi,
  setApiCategoryName,
  addMenuApi,
  removeMenuApi,
  updateMenuApi,
  soldOutMenuApi,
} from "./utils/api_utils.js";

export default function useMenu(
  renderingFunction,
  initCategoryName = "espresso"
) {
  /**
   * Members of useMenu
   */
  let getMenuState;
  let setMenuState;

  setCategoryName(initCategoryName);

  /**
   * Data Mutation Functions
   */
  async function setCategoryName(categoryName) {
    setApiCategoryName(categoryName);
    const state = await loadMenuApi(categoryName);

    [getMenuState, setMenuState] = useState(state, renderingFunction, {
      removeMenu,
      updateMenu,
      soldOutMenu,
    });

    const { espressoMenuList } = elementIdMap;
    getById(espressoMenuList).innerHTML = "";

    renderingFunction(getMenuState(), { removeMenu, updateMenu, soldOutMenu });
  }

  function addMenu(name) {
    addMenuApi(name).then((response) => {
      const { data: menu } = response;

      if (menu) {
        setMenuState({
          ...getMenuState(),
          [menu.id]: menu,
        });
      }
    });
  }

  function removeMenu(menuId) {
    if (confirm("정말로 삭제하시겠습니까?")) {
      removeMenuApi(menuId).then((response) => {
        if (response.status === 200) {
          const { [menuId]: removeMenu, ...rest } = getMenuState();

          setMenuState({
            ...rest,
          });
        }
      });
    }
  }

  function soldOutMenu(menuId) {
    soldOutMenuApi(menuId).then((response) => {
      if (response.status === 200) {
        const { [menuId]: soldOutMenu, ...rest } = getMenuState();
        soldOutMenu.isSoldOut = !soldOutMenu.isSoldOut;

        setMenuState({
          [menuId]: soldOutMenu,
          ...rest,
        });
      }
    });
  }

  function updateMenu(menuId) {
    const newName = prompt("수정하고 싶은 이름을 입력해주세요.");

    if (newName) {
      updateMenuApi(menuId, newName).then((response) => {
        const { data: updatedMenu } = response;
        const { [menuId]: oldMenu, ...rest } = getMenuState();

        setMenuState({
          [menuId]: updatedMenu,
          ...rest,
        });
      });
    }
  }

  function getMenuNextSeq() {
    if (Object.keys(getMenuState()).length > 0) {
      return Math.max(...Object.keys(getMenuState())) + 1;
    }

    return 1;
  }

  return [setCategoryName, addMenu, removeMenu, updateMenu, soldOutMenu];
}

// TODO : 타입 정의의 적절한 위치 찾아보기

/**
 * JS doc 타입 정의
 */

/**
 * @typedef {"espresso" | "frappuccino" | "blended" | "teavana" | "dessert"} MenuCategory
 */

/**
 * @typedef {Object} MenuObject
 * @property {String} name
 * @property {boolean} isSoldOut
 */

/**
 * @typedef {Object} UseMenuReturn
 * @property {Object} MenuState
 * @property {Function} AddMenu
 */

/**
 * @typedef {Object} AppendMenuOnClickCallbackObject
 * @property {Function} onClickSoldOut
 * @property {Function} onClickUpdate
 * @property {Function} onClickRemove
 */
