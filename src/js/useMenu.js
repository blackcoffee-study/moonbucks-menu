import { elementIdMap, getLocalStorageKey } from "./utils/constant_utils.js";
import { useState } from "./utils/state_utils.js";
import { getById } from "./utils/control_dom_utils.js";

export default function useMenu(renderingFunction) {
  /**
   * Members of useMenu
   */
  const initCategoryName = "espresso";
  let getMenuState;
  let setMenuState;
  let proxySetMenuState;

  setCategoryName(initCategoryName);

  /**
   * Data Mutation Functions
   */
  function setCategoryName(categoryName) {
    const localStorageKey = getLocalStorageKey(categoryName); // TODO: 제거
    const localStorageValue = JSON.parse(localStorage.getItem(localStorageKey)); // TODO: API 호출로 불러오도록 변경

    [getMenuState, setMenuState] = useState({}, renderingFunction, {
      removeMenu,
      updateMenu,
      soldOutMenu,
    });

    proxySetMenuState = (menuState) => {
      setMenuState(menuState);
      localStorage.setItem(localStorageKey, JSON.stringify(getMenuState()));
    };

    if (localStorageValue) {
      proxySetMenuState(localStorageValue);
    }

    const { espressoMenuList } = elementIdMap;
    getById(espressoMenuList).innerHTML = "";

    renderingFunction(getMenuState(), { removeMenu, updateMenu, soldOutMenu });
  }

  function addMenu(name) {
    if (name) {
      proxySetMenuState({
        ...getMenuState(),
        [getMenuNextSeq()]: {
          name,
          isSoldOut: false,
        },
      });
    }
  }

  function removeMenu(seq) {
    if (confirm("정말로 삭제하시겠습니까?")) {
      const { [seq]: removeMenu, ...rest } = getMenuState();

      proxySetMenuState({
        ...rest,
      });
    }
  }

  function soldOutMenu(seq) {
    const { [seq]: soldOutMenu, ...rest } = getMenuState();
    soldOutMenu.isSoldOut = !soldOutMenu.isSoldOut;

    proxySetMenuState({
      [seq]: soldOutMenu,
      ...rest,
    });
  }

  function updateMenu(seq) {
    const newName = prompt("수정하고 싶은 이름을 입력해주세요.");

    if (newName) {
      const { [seq]: updateMenu, ...rest } = getMenuState();
      updateMenu.name = newName;

      proxySetMenuState({
        [seq]: updateMenu,
        ...rest,
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
