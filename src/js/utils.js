export const isInputEmpty = ($input) => {
  return $input.value.length === 0;
};

export const setInputEmpty = ($input) => {
  $input.value = "";
  return;
};

export const deleteList = ($li) => {
  if (window.confirm("삭제하시겠습니까?")) {
    this.$menuList.removeChild($li);
  }
};

export const isDeleteBtn = (e) => {
  return e.target.classList.contains("menu-remove-button");
};

export const isEditBtn = (e) => {
  return e.target.classList.contains("menu-edit-button");
};

export const listTemplate = (name) => {
  return `<li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${name}</span>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      >
        수정
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      >
        삭제
      </button>
    </li>`;
};

export const $ = (selector, $target = document) =>
  $target.querySelector(`${selector}`);
