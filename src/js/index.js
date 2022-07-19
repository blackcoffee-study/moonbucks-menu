/**
 * @typedef {Object} MenuObject
 * @property {String} name
 * @property {boolean} isAdded
 * @property {boolean} isSoldOut
 */

/**
 * @typedef {Object} UseMenuReturn
 * @property {Object} MenuState
 * @property {Function} AddMenu
 */

/**
 * Markup ID prefix
 */

const elementIdObject = {
  espressoMenuListId: "espresso-menu-list",
  removeButtonId: "removeButton",
  updateButtonId: "updateButton",
  soldOutButtonId: "soldOutButton",
  menuNameId: "menuName",
  menuWrapperId: "menuWrapper",
};

const menus = {
  espresso: useMenu(),
  frappuccino: useMenu(),
  blended: useMenu(),
  tibana: useMenu(),
  dessert: useMenu(),
};

/**
 * it creates state of menu.
 * @returns {UseMenuReturn} it returns menu state and function to add menu.
 */
function useMenu() {
  let id = 0;
  let state = {};

  function renderMenu() {
    for (const [id, menu] of Object.entries(state)) {
      if (menu.isAdded) {
        continue;
      }

      appendMenu(id, menu.name, {
        onClickRemove: () => remove(id),
        onClickUpdate: () => update(id),
        onClickSoldOut: () => soldOut(id),
      });

      menu.isAdded = true;
    }

    showCount(Object.keys(state).length);
  }

  function setState(param) {
    console.log("state", state);
    console.log("param", param);

    state = param;
    renderMenu();
  }

  function remove(id) {
    if (confirm("정말로 삭제하시겠습니까?")) {
      getById(`menuWrapper${id}`).remove();
      delete state[id];
    }

    renderMenu();
  }

  function soldOut(id) {
    state[id].isSoldOut = !state[id].isSoldOut;
    toggleSoldOut(id, state[id].isSoldOut);
  }

  function update(id) {
    const newName = prompt("수정하고 싶은 이름을 입력해주세요.");

    if (newName) {
      getById(`menuName${id}`).textContent = newName;
      state[id].name = newName;
    }
  }

  function showCount(count) {
    getById("count").textContent = count;
  }

  function incrementId() {
    return ++id;
  }

  function getState() {
    return state;
  }

  return [getState, setState, incrementId];
}

/**
 * toggle sold out state using isSoldOut value.
 * @param {number} id
 * @param {boolean} isSoldOut
 */
function toggleSoldOut(id, isSoldOut) {
  const { menuNameId } = elementIdObject;
  const menuName = getById(`${menuNameId}${id}`);

  if (isSoldOut && !menuName.classList.contains("sold-out")) {
    menuName.classList.add("sold-out");
  }

  if (!isSoldOut && menuName.classList.contains("sold-out")) {
    menuName.classList.remove("sold-out");
  }
}

/**
 * @typedef {Object} AppendMenuOnClickCallbackObject
 * @property {Function} onClickSoldOut
 * @property {Function} onClickUpdate
 * @property {Function} onClickRemove
 */

/**
 * Append one menu.
 * @param {number} id
 * @param {String} name
 * @param {AppendMenuOnClickCallbackObject} callbackObject
 */
function appendMenu(
  id,
  name,
  { onClickSoldOut, onClickUpdate, onClickRemove }
) {
  const { espressoMenuListId, menuWrapperId } = elementIdObject;

  appendHtml(espressoMenuListId, $menuWrapper(id));
  appendHtml(`${menuWrapperId}${id}`, $menuName(id, name));
  appendHtml(`${menuWrapperId}${id}`, $soldOutButton(id), {
    eventName: "onclick",
    callback: onClickSoldOut,
  });
  appendHtml(`${menuWrapperId}${id}`, $updateButton(id), {
    eventName: "onclick",
    callback: onClickUpdate,
  });
  appendHtml(`${menuWrapperId}${id}`, $removeButton(id), {
    eventName: "onclick",
    callback: onClickRemove,
  });
}

/**
 * When DOMContentLoaded
 */

/**
 * @type {"espresso" | "frappuccino" | "blended" | "tibana" | "dessert"}
 */
let currentMenuType = "espresso";

/**
 * @param {SubmitEvent} e
 */
const onSubmit = (e) => {
  /**
   * @type {HTMLFormElement}
   */
  const submitForm = e.target;
  e.preventDefault();

  const name = getById("espresso-menu-name").value;

  if (!name) {
    return;
  }

  const [getState, setState, incrementId] = menus[currentMenuType];

  console.log("state", getState());

  setState({
    ...getState(),
    [incrementId()]: {
      name,
      isSoldOut: false,
      isAdded: false,
    },
  });

  submitForm.reset();
};

function bindOnClickSubmit() {
  getById("espresso-menu-form").onsubmit = onSubmit;
}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    bindOnClickSubmit();
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

/**
 * Templates
 */

function $removeButton(id) {
  const { removeButtonId } = elementIdObject;
  return `<button type="button" id="${removeButtonId}${id}" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>`;
}

function $updateButton(id) {
  const { updateButtonId } = elementIdObject;
  return `<button type="button" id="${updateButtonId}${id}" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>`;
}

function $soldOutButton(id) {
  const { soldOutButtonId } = elementIdObject;
  return `<button id="${soldOutButtonId}${id}" type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button">
          품절
        </button>`;
}

function $menuName(id, name) {
  const { menuNameId } = elementIdObject;
  return `<span id="${menuNameId}${id}" class="w-100 pl-2 menu-name">${name}</span>`;
}

function $menuWrapper(id) {
  const { menuWrapperId } = elementIdObject;
  return `<li data-menu-id="${id}" id="${menuWrapperId}${id}" class="menu-list-item d-flex items-center py-2"></li>`;
}
