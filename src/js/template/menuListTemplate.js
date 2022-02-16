export const menuListTemplate = (koreanName, englishName, symbol) => {
	return `
        <div class="wrapper bg-white p-10">
          <div class="heading d-flex justify-between">
            <h2 class="mt-1">${symbol} ${koreanName} 메뉴 관리</h2>
            <span class="mr-2 mt-4 menu-count">총 0개</span>
          </div>
          <form id="${englishName}-menu-form">
            <div class="d-flex w-100">
              <label for="${englishName}-menu-name" class="input-label" hidden>
                ${koreanName} 메뉴 이름
              </label>
              <input
                      type="text"
                      id="${englishName}-menu-name"
                      name="${englishName}MenuName"
                      class="input-field"
                      placeholder="${koreanName} 메뉴 이름"
                      autocomplete="off"
              />
              <button
                      type="button"
                      name="submit"
                      id="${englishName}-menu-submit-button"
                      class="input-submit bg-green-600 ml-2"
              >
                확인
              </button>
            </div>
          </form>
          <ul id="${englishName}-menu-list" class="mt-3 pl-0"></ul>
        </div>`;
};