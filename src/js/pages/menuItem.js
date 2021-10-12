export default class MenuItem {
    constructor(_app, _onMenuClick) {
        this._app = _app;
        this._onMenuClick = _onMenuClick;
        this.setEvent();
    }

    render(_items) {
        const result = _items.map((name, index) => {
            return `
            <li class="menu-list-item d-flex items-center py-2" data-menu-id="${index}">
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
            </li>
            `
        }).join('');

        this._app.innerHTML = result;
    }

    setEvent() {
        this._app.addEventListener('click', (e) => {
            const isEditButton = e.target.classList.contains('menu-edit-button');
            const menuId = e.target.closest('li').dataset.menuId;
            const result = (isEditButton) ? 
            prompt('메뉴명을 수정하세요', e.target.closest('li.menu-name')) : 
            confirm('정말 삭제하시겠습니까?');
            this._onMenuClick({result: result, menuId: menuId});
        })
    }
}