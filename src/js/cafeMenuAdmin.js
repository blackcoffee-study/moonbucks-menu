export default class CafeMenuAdmin {
    constructor($, menuNameInputArea, menuListWrapperArea) {
        this.$ = $;
        this.menuNameInputArea = menuNameInputArea;
        this.menuListWrapperArea = menuListWrapperArea;
    }
    addMenuItem() {
        if (!this.menuNameInputArea.value) return;
        const menuNameInput = this.menuNameInputArea.value;
        this.menuListWrapperArea.insertAdjacentHTML('beforeend', this._menuItemTemplate(menuNameInput));
        this.initMenuNameInput();
    }

    _menuItemTemplate(menuNameInput) {
        return `<li data-menu-id="0" class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name  ">${menuNameInput}</span>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button">
            품절
        </button>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">
          수정
        </button>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">
          삭제
        </button>
      </li>`
    }

    initMenuNameInput() {
        this.menuNameInputArea.value = "";
    }
}