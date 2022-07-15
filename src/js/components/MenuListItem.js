import { EVENTS, MESSAGE } from "../constant";
import {
  $,
  createElement,
  dispatchCustomEvent,
  validateMenuName,
} from "../util";

export function MenuListItem($container, { menuName }) {
  const $menuName = $(".menu-name", $container);
  const $removeButton = $(".menu-remove-button", $container);
  const $editButton = $(".menu-edit-button", $container);

  const ref = { menuName };

  function setMenuName(name) {
    ref.menuName = name;
    $menuName.textContent = name;
  }

  function removeMenu() {
    if (!confirm(MESSAGE.CONFIRM_DELETE)) {
      return;
    }

    $container.remove();

    dispatchCustomEvent(EVENTS.REMOVE_MENU);
  }

  function editMenuName() {
    const newName = prompt(MESSAGE.PROMPT_MENU_NAME, ref.menuName);

    try {
      validateMenuName(newName);
    } catch (e) {
      return;
    }

    setMenuName(newName);
  }

  $editButton.addEventListener("click", editMenuName);
  $removeButton.addEventListener("click", removeMenu);

  return { $container };
}

export function DefaultMenuListItem(menuName) {
  const template = `
  <li class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name">${menuName}</span>
    <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
    <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
  </li>`;

  const $container = createElement(template);

  return MenuListItem($container, { menuName });
}
