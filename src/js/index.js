import useMenu from "./useMenu.js";
import { elementIdMap } from "./utils/constant_utils.js";
import { getById, appendHtml } from "./utils/control_dom_utils.js";
import {
  $menuName,
  $menuWrapper,
  $removeButton,
  $soldOutButton,
  $updateButton,
} from "./utils/template_utils.js";

const [setCategoryName, addMenu, removeMenu, updateMenu, soldOutMenu] =
  useMenu(renderMenu);

const onSubmit = (e) => {
  e.preventDefault();

  const { espressoMenuNameInput } = elementIdMap;
  const name = getById(espressoMenuNameInput).value;

  if (!name) {
    return;
  }

  addMenu(name);

  const submitForm = e.target;
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

document.addEventListener(
  "DOMContentLoaded",
  () => {
    bindOnSubmitMenu();
    bindOnClickMenuCategory();
  },
  false
);

/**
 * UI Control Functions
 */

// TODO: 메뉴를 렌더링하는 부분은 나중에 분리하면 좋을 것 같다. 상태를 관리하는 곳에서는 상태를 관리하는 것만...

function getMenuWrapperId(seq) {
  const { menuWrapper } = elementIdMap;
  return `${menuWrapper}-${seq}`;
}

function renderMenu(menuState) {
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
        onClickRemove: () => removeMenu(seq),
        onClickUpdate: () => updateMenu(seq),
        onClickSoldOut: () => soldOutMenu(seq),
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
  if (getById(getMenuWrapperId(seq))) {
    getById(getMenuWrapperId(seq)).remove();
  }
}

function stashMenu(menuState) {
  for (const [seq, _] of Object.entries(menuState)) {
    removeMenuWrapper(seq);
  }
}
