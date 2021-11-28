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

export const listTemplate = (menu) => {
  return `<li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name ${menu.soldOut ? "sold-out" : ""}">${
    menu.menuName
  }</span>
      <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
      >
        품절
      </button>
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

export const CATEGORIES = {
  teavana: "🫖 티바나",
  desert: "🍰 디저트",
  blended: "🍹 블렌디드",
  frappuccino: "🥤 프라푸치노",
  espresso: "☕ 에스프레소",
};

export const isSoldOutBtn = (e) => {
  return e.target.classList.contains("menu-sold-out-button");
};
