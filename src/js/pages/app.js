import MenuItem from './menuItem.js';
import MenuCount from './menuCount.js';

export default class App {
    constructor(_app, _count, _list) {
        this._app = _app;
        this._count = _count;
        this._list = _list;
        this._items = [];
        this.init();
        this.setEvent();
    }

    init() {
        this.menuItem = new MenuItem(this._list, this.onMenuClick);
        this.menuCount = new MenuCount(this._count);
    }

    render() {
        this.menuItem.render(this._items);
        this.menuCount.render(this._items);
    }

    setEvent() {
        this._app.addEventListener('click', (e) => {
            const newMenu = e.target.previousElementSibling;
            if(newMenu.value !== undefined && newMenu.value !== '') this._items.push(newMenu.value);
            newMenu.value = '';
            this.render();
        });
    }

    onMenuClick = (action) => {
        const result = (action.isEditButton) ? 
            prompt('메뉴명을 수정하세요', this._items[action.menuId]) : 
            confirm('정말 삭제하시겠습니까?');
        if(typeof(result) === 'string') {
            this._items[action.menuId] = result;
        }
        else if(result){
            this._items.splice(action.menuId, 1);
        }
        this.render();
    }
}