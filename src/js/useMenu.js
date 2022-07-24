import { elementIdMap } from "./utils/constant_utils.js";
import { getById, appendHtml } from "./utils/control_dom_utils.js";
import {
  categoryState,
  categorySeqState,
} from "./utils/local_storage_utils.js";
import {
  $menuName,
  $menuWrapper,
  $removeButton,
  $soldOutButton,
  $updateButton,
} from "./utils/template_utils.js";

/**
 * 메뉴의 상태를 만들고 관리한다.
 * @param {MenuCategory} initCategoryName
 * @returns {UseMenuReturn} it returns menu state and function to add menu.
 */
export default function useMenu(initCategoryName = "espresso") {
  /**
   * Members of useMenu
   */
  let categoryNameState;
  let menuState;

  setCategoryName(initCategoryName);

  /**
   * Data Mutation Functions
   */

  function setCategoryName(categoryName) {
    if (menuState) {
      stashMenu();
    }

    categoryNameState = categoryName;
    setMenuState(categoryState[categoryName]);
  }

  function setMenuState(param) {
    menuState = param;
    categoryState[categoryNameState] = menuState;

    renderMenu();
  }

  function addMenu(name) {
    if (name) {
      setMenuState({
        ...menuState,
        [getMenuNextSeq()]: {
          name,
          isSoldOut: false,
        },
      });
    }
  }

  function remove(seq) {
    if (confirm("정말로 삭제하시겠습니까?")) {
      const { [seq]: removeMenu, ...rest } = menuState;

      setMenuState({
        ...rest,
      });
    }
  }

  function soldOut(seq) {
    const { [seq]: soldOutMenu, ...rest } = menuState;
    soldOutMenu.isSoldOut = !soldOutMenu.isSoldOut;

    setMenuState({
      [seq]: soldOutMenu,
      ...rest,
    });
  }

  function update(seq) {
    const newName = prompt("수정하고 싶은 이름을 입력해주세요.");

    if (newName) {
      const { [seq]: updateMenu, ...rest } = menuState;
      updateMenu.name = newName;

      setMenuState({
        [seq]: updateMenu,
        ...rest,
      });
    }
  }

  /**
   * Get Util Functions
   */

  function getMenuNextSeq() {
    return ++categorySeqState[categoryNameState];
  }

  function getMenuState() {
    return categoryState[categoryNameState];
  }

  function getMenuWrapperId(seq) {
    const { menuWrapper } = elementIdMap;
    return `${menuWrapper}-${seq}`;
  }

  /**
   * UI Control Functions
   */

  // TODO: 메뉴를 렌더링하는 부분은 나중에 분리하면 좋을 것 같다. 상태를 관리하는 곳에서는 상태를 관리하는 것만...

  function renderMenu() {
    renderAppendMenu(menuState);
    renderSoldOutMenu(menuState);
    renderUpdateMenu(menuState);
    renderRemoveMenu(menuState);
    renderCount(Object.keys(menuState).length);
  }

  function renderAppendMenu(menuState) {
    for (const [seq, menu] of Object.entries(menuState)) {
      const menuWrapperId = getMenuWrapperId(seq);

      if (getById(menuWrapperId)) {
        continue;
      }

      const { name, isSoldOut } = menu;

      appendMenu(
        seq,
        name,
        menuWrapperId,
        {
          onClickRemove: () => remove(seq),
          onClickUpdate: () => update(seq),
          onClickSoldOut: () => soldOut(seq),
        },
        isSoldOut
      );
    }
  }

  function renderSoldOutMenu(menuState) {
    const { menuName } = elementIdMap;

    for (const [seq, menu] of Object.entries(menuState)) {
      const $menuName = getById(`${menuName}${seq}`);
      const { isSoldOut } = menu;

      if (isSoldOut && !$menuName.classList.contains("sold-out")) {
        $menuName.classList.add("sold-out");
      }

      if (!isSoldOut && $menuName.classList.contains("sold-out")) {
        $menuName.classList.remove("sold-out");
      }
    }
  }

  function renderUpdateMenu(menuState) {
    const { menuName } = elementIdMap;

    for (const [seq, menu] of Object.entries(menuState)) {
      const { name } = menu;
      const $menuName = getById(`${menuName}${seq}`);
      if ($menuName.textContent !== name) {
        $menuName.textContent = name;
      }
    }
  }

  function renderRemoveMenu(menuState) {
    const { espressoMenuList } = elementIdMap;

    for (const menu of getById(espressoMenuList).children) {
      const seq = menu.id.replace("menuWrapper-", "");
      if (!menuState[seq]) {
        menu.remove();
      }
    }
  }

  function renderCount(count) {
    getById("count").textContent = count;
  }

  function appendMenu(
    seq,
    name,
    menuWrapperId,
    { onClickSoldOut, onClickUpdate, onClickRemove },
    isSoldOut
  ) {
    const { espressoMenuList: espressoMenuListId } = elementIdMap;

    appendHtml(espressoMenuListId, $menuWrapper(menuWrapperId));
    appendHtml(menuWrapperId, $menuName(seq, name, isSoldOut));
    appendHtml(menuWrapperId, $soldOutButton(seq), {
      eventName: "onclick",
      callback: onClickSoldOut,
    });
    appendHtml(menuWrapperId, $updateButton(seq), {
      eventName: "onclick",
      callback: onClickUpdate,
    });
    appendHtml(menuWrapperId, $removeButton(seq), {
      eventName: "onclick",
      callback: onClickRemove,
    });
  }

  function removeMenuWrapper(seq) {
    getById(getMenuWrapperId(seq)).remove();
  }

  function stashMenu() {
    for (const [seq, _] of Object.entries(menuState)) {
      removeMenuWrapper(seq);
    }
  }

  return [setCategoryName, addMenu];
}

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
