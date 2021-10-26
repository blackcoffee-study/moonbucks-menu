import { MENU_CATEGORIES } from './constants.js';

export const menuTemplate = (category) => {
    const foundCategory = MENU_CATEGORIES.find(
        (categoryConst) => categoryConst.category === category,
    );

    return `
<div class="wrapper bg-white p-10">
  <div class="heading d-flex justify-between">
    <h2 class="mt-1">${foundCategory.emoji} ${foundCategory.name} 메뉴 관리</h2>
    <span class="mr-2 mt-4 menu-count">총 0개</span>
  </div>
  <form id="${foundCategory.category}-menu-form">
    <div class="d-flex w-100">
      <label for="${foundCategory.category}-menu-name" class="input-label" hidden>
        ${foundCategory.name} 메뉴 이름
      </label>
      <input
              type="text"
              id="${foundCategory.category}-menu-name"
              name="${foundCategory.category}MenuName"
              class="input-field"
              placeholder="${foundCategory.name} 메뉴 이름"
              autocomplete="off"
      />
      <button
              type="button"
              name="submit"
              id="${foundCategory.category}-menu-submit-button"
              class="input-submit bg-green-600 ml-2"
      >
        확인
      </button>
    </div>
  </form>
  <ul id="${foundCategory.category}-menu-list" class="mt-3 pl-0"></ul>
</div>`;
};
