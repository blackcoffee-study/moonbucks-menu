import MenuItem from './menuItem.js';
import MenuCount from './menuCount.js';

export default class App {
    constructor(_main, _count, _list) {
        this._main = _main;
        this._count = _count;
        this._list = _list;
        this.state = [];
        this.init();
        this.setState();
        this.setEventListener();
    }

    init() {
        this.menuItem = new MenuItem(this._list, this.onMenuClick);
        this.menuCount = new MenuCount(this._count);
    }

    setState() {
        this.menuItem.setState(this.state);
        this.menuCount.setState(this.state);
        this.render();
    }

    render() {
        this.menuItem.render();
        this.menuCount.render();
    }

    setEventListener() {
        this._main.addEventListener('click', (e) => {
            const newMenuInput = e.target.previousElementSibling;
            if(newMenuInput.value !== undefined && newMenuInput.value !== '') {
                this.state.push({name: newMenuInput.value, soldOut: false});
            }
            newMenuInput.value = '';
            this.setState();
        });
    }

    onMenuClick = (action) => {
        if (action.menuItemClassList.contains('menu-edit-button')) {
            this.clickEditBtn(action.menuId);
        }
        else if (action.menuItemClassList.contains('menu-remove-button')) {
            this.clickDeleteBtn(action.menuId);
        }
        else if (action.menuItemClassList.contains('menu-sold-out-button')) {
            this.clickSoldOutBtn(action.menuId);
        }
        this.setState();
    }

    clickEditBtn(menuId) {
        const result = prompt('메뉴명을 수정하세요', this.state[menuId].name);
        this.state[menuId].name = result;
    }

    clickDeleteBtn(menuId) {
        const result = confirm('정말 삭제하시겠습니까?');
        if (result) this.state.splice(menuId, 1);
    }

    clickSoldOutBtn(menuId) {
        this.state[menuId].soldOut = !this.state[menuId].soldOut;
        this.setState();
    }


}