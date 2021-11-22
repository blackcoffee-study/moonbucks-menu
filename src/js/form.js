import $ from './module/getDom';
import addMenuList from './module/addMenuList';

class Form {
    constructor() {
        this.menu = '';
    }

    initMenu(e) {
        e.target.value = '';
        this.menu = '';
    }

    input(menuList) {
        $('#espresso-menu-name').addEventListener('keypress', e => {
            this.menu = e.target.value;

            if (e.key === 'Enter') {
                menuList.push(this.menu);
                addMenuList(menuList);
            }
        });
    }

    button(menuList) {
        $('#espresso-menu-submit-button').addEventListener('click', () => {
            if (this.menu !== '') {
                menuList.push(this.menu);
                addMenuList(menuList);
            }
        });
    }

    submit(menuList) {
        this.input(menuList);
        this.button(menuList);
    }
}

export default Form;
