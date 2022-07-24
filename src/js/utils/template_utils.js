import { elementIdMap } from "./constant_utils.js";

export function $removeButton(seq) {
  const { removeButton } = elementIdMap;
  return `<button type="button" id="${removeButton}${seq}" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>`;
}

export function $updateButton(seq) {
  const { updateButton } = elementIdMap;
  return `<button type="button" id="${updateButton}${seq}" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>`;
}

export function $soldOutButton(seq) {
  const { soldOutButton } = elementIdMap;
  return `<button id="${soldOutButton}${seq}" type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button">
          품절
        </button>`;
}

export function $menuName(seq, name, isSoldOut) {
  const { menuName } = elementIdMap;
  return `<span id="${menuName}${seq}" class="w-100 pl-2 menu-name ${
    isSoldOut ? "sold-out" : ""
  }">${name}</span>`;
}

export function $menuWrapper(menuWrapperId) {
  return `<li data-menu-id="${menuWrapperId}" id="${menuWrapperId}" class="menu-list-item d-flex items-center py-2"></li>`;
}
