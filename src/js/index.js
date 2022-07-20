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

/**
 * Global Constants
 */

const elementIdMap = {
  espressoMenuForm: "espresso-menu-form",
  espressoMenuList: "espresso-menu-list",
  espressoMenuNameInput: "espresso-menu-name",
  removeButton: "removeButton",
  updateButton: "updateButton",
  soldOutButton: "soldOutButton",
  menuName: "menuName",
  menuWrapper: "menuWrapper",
  menuCategoryButtonWrapper: "menuCategoryButtonWrapper",
  menuTitleName: "menuTitleName",
};

const localStorageKey = {
  categoryState: "moonbucksState.categoryState",
  categorySeqState: "moonbucksState.categorySeqState",
};

const localCategoryState = JSON.parse(
  localStorage.getItem(localStorageKey.categoryState)
);

const localCategorySeqState = JSON.parse(
  localStorage.getItem(localStorageKey.categorySeqState)
);

const saveInLocalStorageHandler = (localStorageKey) => ({
  set(target, prop, val, receiver) {
    Reflect.set(target, prop, val, receiver);
    localStorage.setItem(localStorageKey, JSON.stringify(target));
    return true;
  },
});

const categoryState = new Proxy(
  localCategoryState || {
    espresso: {},
    frappuccino: {},
    blended: {},
    teavana: {},
    dessert: {},
  },
  saveInLocalStorageHandler(localStorageKey.categoryState)
);

const categorySeqState = new Proxy(
  localCategorySeqState || {
    espresso: 0,
    frappuccino: 0,
    blended: 0,
    teavana: 0,
    dessert: 0,
  },
  saveInLocalStorageHandler(localStorageKey.categorySeqState)
);

const [getState, setState, incrementId, setCategoryName] = useMenu();

/**
 * 메뉴의 상태를 만들고 관리한다.
 * @param {MenuCategory} initCategoryName
 * @returns {UseMenuReturn} it returns menu state and function to add menu.
 */
function useMenu(initCategoryName = "espresso") {
  /**
   * Init
   */
  let categoryNameState;
  let menuState;

  setCategoryName(initCategoryName);

  /**
   * Mutation Functions
   */

  function setCategoryName(categoryName) {
    if (menuState) {
      stashMenu();
    }

    categoryNameState = categoryName;
    menuState = categoryState[categoryName];

    renderMenu();
  }

  function setMenuState(param) {
    menuState = param;
    categoryState[categoryNameState] = menuState;
    renderMenu();
  }

  function remove(seq) {
    if (confirm("정말로 삭제하시겠습니까?")) {
      $removeElement(seq);

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

    toggleSoldOutUI(seq, menuState[seq].isSoldOut);
  }

  function update(seq) {
    const { menuName } = elementIdMap;
    const newName = prompt("수정하고 싶은 이름을 입력해주세요.");

    if (newName) {
      const { [seq]: updateMenu, ...rest } = menuState;
      updateMenu.name = newName;

      setMenuState({
        [seq]: updateMenu,
        ...rest,
      });

      getById(`${menuName}${seq}`).textContent = newName;
    }
  }

  /**
   * Get Functions
   */

  function getMenuSeq() {
    return ++categorySeqState[categoryNameState];
  }

  function getMenuState() {
    return categoryState[categoryNameState];
  }

  function getMenuWrapperId(seq) {
    const { menuWrapper } = elementIdMap;
    return `${categoryState}-${menuWrapper}-${seq}`;
  }

  /**
   * UI Control Functions
   */

  function renderMenu() {
    renderAppendMenu(menuState);
    showCount(Object.keys(menuState).length);
  }

  function stashMenu() {
    for (const [seq, _] of Object.entries(menuState)) {
      $removeElement(seq);
    }
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

  function showCount(count) {
    getById("count").textContent = count;
  }

  function $removeElement(seq) {
    getById(getMenuWrapperId(seq)).remove();
  }

  function toggleSoldOutUI(seq, isSoldOut) {
    const { menuName } = elementIdMap;
    const $menuName = getById(`${menuName}${seq}`);

    if (isSoldOut && !$menuName.classList.contains("sold-out")) {
      $menuName.classList.add("sold-out");
    }

    if (!isSoldOut && $menuName.classList.contains("sold-out")) {
      $menuName.classList.remove("sold-out");
    }
  }

  /**
   * Get html template functions
   */

  function $removeButton(seq) {
    const { removeButton } = elementIdMap;
    return `<button type="button" id="${removeButton}${seq}" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>`;
  }

  function $updateButton(seq) {
    const { updateButton } = elementIdMap;
    return `<button type="button" id="${updateButton}${seq}" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>`;
  }

  function $soldOutButton(seq) {
    const { soldOutButton } = elementIdMap;
    return `<button id="${soldOutButton}${seq}" type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button">
          품절
        </button>`;
  }

  function $menuName(seq, name, isSoldOut) {
    const { menuName } = elementIdMap;
    return `<span id="${menuName}${seq}" class="w-100 pl-2 menu-name ${
      isSoldOut ? "sold-out" : ""
    }">${name}</span>`;
  }

  function $menuWrapper(menuWrapperId) {
    return `<li data-menu-id="${menuWrapperId}" id="${menuWrapperId}" class="menu-list-item d-flex items-center py-2"></li>`;
  }

  return [getMenuState, setMenuState, getMenuSeq, setCategoryName];
}

const onSubmit = (e) => {
  const submitForm = e.target;
  e.preventDefault();

  const name = getById("espresso-menu-name").value;

  if (!name) {
    return;
  }

  setState({
    ...getState(),
    [incrementId()]: {
      name,
      isSoldOut: false,
    },
  });

  submitForm.reset();
};

function bindOnSubmitMenu() {
  const { espressoMenuForm: espressoMenuFormId } = elementIdMap;
  getById(espressoMenuFormId).onsubmit = onSubmit;
}

function bindOnClickMenuCategory() {
  const { menuCategoryButtonWrapper } = elementIdMap;
  const buttons = getById(menuCategoryButtonWrapper).children;
  for (const $button of buttons) {
    const categoryName = $button.getAttribute("data-category-name");

    $button.onclick = (e) => {
      const { menuTitleName, espressoMenuNameInput } = elementIdMap;
      getById(menuTitleName).textContent = e.target.textContent;
      getById(
        espressoMenuNameInput
      ).placeholder = `${e.target.textContent.trim()} 메뉴 이름`;
      setCategoryName(categoryName);
    };
  }
}

/**
 * When DOMContentLoaded
 */

document.addEventListener(
  "DOMContentLoaded",
  () => {
    bindOnSubmitMenu();
    bindOnClickMenuCategory();
  },
  false
);

/**
 * Utils
 */

function getById(id) {
  return document.getElementById(id);
}

function appendHtml(parentId, htmlTemplate, event) {
  const $ = getById(`${parentId}`);
  $.insertAdjacentHTML("beforeend", htmlTemplate);

  if (event) {
    const { eventName, callback } = event;
    $.lastChild[eventName] = callback;
  }
}
