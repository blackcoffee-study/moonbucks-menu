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
        if(typeof(action.result) === 'string') {
            this._items[action.menuId] = action.result;
        }
        else if(action.result){
            this._items.splice(action.menuId, 1);
        }
        this.render();
    }
}