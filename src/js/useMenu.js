import { elementIdMap } from "./utils/constant_utils.js";
import { useState } from "./utils/state_utils.js";
import { getById } from "./utils/control_dom_utils.js";

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
    const state = await loadState(categoryName);

    [getMenuState, setMenuState] = useState(state, renderingFunction, {
      removeMenu,
      updateMenu,
      soldOutMenu,
    });

    setMenuState = (menuState) => {
      setMenuState(menuState);
    };

    const { espressoMenuList } = elementIdMap;
    getById(espressoMenuList).innerHTML = "";

    renderingFunction(getMenuState(), { removeMenu, updateMenu, soldOutMenu });
  }

  async function loadState(categoryName) {
    const { data: menus } = await axios.get(
      `http://localhost:3000/api/category/${categoryName}/menu`
    );

    if (!menus || menus.length === 0) {
      return {};
    }

    const state = menus.reduce((acc, menu, index) => {
      acc[menu.id] = {
        ...menu,
        index,
      };

      return acc;
    }, {});

    return state;
  }

  function addMenu(name) {
    if (name) {
      setMenuState({
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

      setMenuState({
        ...rest,
      });
    }
  }

  function soldOutMenu(seq) {
    const { [seq]: soldOutMenu, ...rest } = getMenuState();
    soldOutMenu.isSoldOut = !soldOutMenu.isSoldOut;

    setMenuState({
      [seq]: soldOutMenu,
      ...rest,
    });
  }

  function updateMenu(seq) {
    const newName = prompt("수정하고 싶은 이름을 입력해주세요.");

    if (newName) {
      const { [seq]: updateMenu, ...rest } = getMenuState();
      updateMenu.name = newName;

      setMenuState({
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
