export const $menuListTemplate = (category) => {
	return `
        <div class="wrapper bg-white p-10">
          <div class="heading d-flex justify-between">
            <h2 class="mt-1">${category.getSymbol()} ${category.getKoreanName()} 메뉴 관리</h2>
            <span class="mr-2 mt-4 menu-count">총 0개</span>
          </div>
          <form id="${category.getEnglishName()}-menu-form">
            <div class="d-flex w-100">
              <label for="${category.getEnglishName()}-menu-name" class="input-label" hidden>
                ${category.getKoreanName()} 메뉴 이름
              </label>
              <input
                      type="text"
                      id="${category.getEnglishName()}-menu-name"
                      name="${category.getEnglishName()}MenuName"
                      class="input-field"
                      placeholder="${category.getKoreanName()} 메뉴 이름"
                      autocomplete="off"
              />
              <button
                      type="button"
                      name="submit"
                      id="${category.getEnglishName()}-menu-submit-button"
                      class="input-submit bg-green-600 ml-2"
              >
                확인
              </button>
            </div>
          </form>
          <ul id="${category.getEnglishName()}-menu-list" class="mt-3 pl-0"></ul>
        </div>`;
};