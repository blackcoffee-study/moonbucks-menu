/**
 * @typedef {Object} Menu
 * @property {String} name
 * @property {boolean} isAdded
 */

/**
 * it creates state of menu.
 * @returns {[Object, Function]} it returns menu state and function to add menu.
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

  /**
   * @param {Menu} menu
   */
  function add(menu) {
    id = id + 1;

    state = {
      ...state,
      [id]: menu,
    };

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

  return [state, add];
}

/**
 * toggle sold out state using isSoldOut value.
 * @param {number} id
 * @param {boolean} isSoldOut
 */
function toggleSoldOut(id, isSoldOut) {
  const menuName = getById(`menuName${id}`);

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
  getById("espresso-menu-list").insertAdjacentHTML(
    "beforeend",
    $menuWrapper(id)
  );

  getById(`menuWrapper${id}`).insertAdjacentHTML(
    "beforeend",
    $menuName(id, name)
  );

  getById(`menuWrapper${id}`).insertAdjacentHTML(
    "beforeend",
    $soldOutButton(id)
  );
  getById(`soldOutButton${id}`).onclick = onClickSoldOut;

  getById(`menuWrapper${id}`).insertAdjacentHTML(
    "beforeend",
    $updateButton(id)
  );
  getById(`updateButton${id}`).onclick = onClickUpdate;

  getById(`menuWrapper${id}`).insertAdjacentHTML(
    "beforeend",
    $removeButton(id)
  );
  getById(`removeButton${id}`).onclick = onClickRemove;
}

/**
 * When DOMContentLoaded
 */

const [state, add] = useMenu();

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

  add({
    name,
    isSoldOut: false,
    isAdded: false,
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

/**
 * Templates
 */

function $removeButton(id) {
  return `<button type="button" id="removeButton${id}" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>`;
}

function $updateButton(id) {
  return `<button type="button" id="updateButton${id}" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>`;
}

function $soldOutButton(id) {
  return `<button id="soldOutButton${id}" type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button">
          품절
        </button>`;
}

function $menuName(id, name) {
  return `<span id="menuName${id}" class="w-100 pl-2 menu-name">${name}</span>`;
}

function $menuWrapper(id) {
  return `<li data-menu-id="${id}" id="menuWrapper${id}" class="menu-list-item d-flex items-center py-2"></li>`;
}
