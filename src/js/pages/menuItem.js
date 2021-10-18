export default class MenuItem {
    constructor(_app, _onMenuClick) {
        this._app = _app;
        this._onMenuClick = _onMenuClick;
        this._state = [];
        this.setEventListener();
    }

    setState(newState) {
        this._state = newState;
        this.render();
    }

    render() {
        const result = this._state.map((item, index) => {
            const isSoldOut = item.soldOut ? 'sold-out' : '';
            return `
            <li class="menu-list-item d-flex items-center py-2" data-menu-id="${index}">
                <span class="w-100 pl-2 menu-name ${isSoldOut}">${item.name}</span>
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
            </li>
            `
        }).join('');

        this._app.innerHTML = result;
    }

    setEventListener() {
        this._app.addEventListener('click', (e) => {
            const menuItemClassList = e.target.classList;
            const menuId = e.target.closest('li').dataset.menuId;
            
            this._onMenuClick({menuItemClassList: menuItemClassList, menuId: menuId});
        })
    }
}