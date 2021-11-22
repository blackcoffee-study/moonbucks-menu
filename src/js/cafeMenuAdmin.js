export default class CafeMenuAdmin {
    constructor(menuNameInputArea, menuListWrapperArea, menuSubmitButton, menuCountArea) {
        this.menuNameInputArea = menuNameInputArea;
        this.menuListWrapperArea = menuListWrapperArea;
        this.menuSubmitButton = menuSubmitButton;
        this.menuCountArea = menuCountArea;
        this._initEventListener();
    }
    addMenuItem() {
        if (!this.menuNameInputArea.value) return;
        const menuNameInput = this.menuNameInputArea.value;
        this.menuListWrapperArea.insertAdjacentHTML('beforeend', this._menuItemTemplate(menuNameInput));
        this.initMenuNameInput();
        this._addMenuEditButton();
        this._addMenuRemoveButton();
        this.initCount();
    }

    initMenuNameInput() {
        this.menuNameInputArea.value = "";
    }

    initCount() {
        console.log('initCout 호출');
        const totalCount = this.menuListWrapperArea.children.length;
        this.menuCountArea.innerText = `총 ${totalCount}개`;
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

    _initEventListener() {
        this.menuSubmitButton.addEventListener('click', e => {
            e.preventDefault();
            this.addMenuItem();
        });
        this.menuNameInputArea.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.addMenuItem();
            };
        });
    } 
    _addMenuEditButton() {
        const menuEditButton = this.menuListWrapperArea.lastChild.querySelector('.menu-edit-button');
        menuEditButton.addEventListener('click', e => {
            const $target = e.target.closest('li').querySelector('.menu-name');
            const currentMenuName = $target.innerText;
            const modifiedMenuName = prompt('메뉴명을 수정하세요', currentMenuName);
            $target.innerText = modifiedMenuName;
        });
    };

    _addMenuRemoveButton() {
        const menuRemoveButton = this.menuListWrapperArea.lastChild.querySelector('.menu-remove-button');
        menuRemoveButton.addEventListener('click', e => {
            e.stopPropagation();
            const $target = e.target.closest('li');
            const isRemove = confirm('정말 삭제하시겠습니까?');
            if (isRemove) {
                $target.remove();
                this.initCount();
            }
        });
    }
}