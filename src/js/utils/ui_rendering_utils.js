import { elementIdMap } from "./constant_utils.js";
import { appendHtml, getById } from "./control_dom_utils.js";
import {
  $menuName,
  $menuWrapper,
  $removeButton,
  $soldOutButton,
  $updateButton,
} from "./template_utils.js";

function getMenuWrapperId(seq) {
  const { menuWrapper } = elementIdMap;
  return `${menuWrapper}-${seq}`;
}

export function renderMenu(menuState, callbacks) {
  renderAppendMenu(menuState, callbacks);
  renderSoldOutMenu(menuState);
  renderUpdateMenu(menuState);
  renderRemoveMenu(menuState);
  renderCount(Object.keys(menuState).length);
}

function renderAppendMenu(menuState, callbacks) {
  const { removeMenu, updateMenu, soldOutMenu } = callbacks;

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
