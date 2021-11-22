import $ from './module/getDom';
import addMenuList from './module/addMenuList';

class Form {
    constructor() {
        this.menu = '';
    }

    initMenu() {
        $('#espresso-menu-name').value = '';
        this.menu = '';
    }

    input(menuList) {
        $('#espresso-menu-name').addEventListener('keypress', e => {
            this.menu = e.target.value;

            if (e.key === 'Enter') {
                menuList.push(this.menu);
                addMenuList(menuList);
                this.initMenu();
            }
        });
    }

    button(menuList) {
        $('#espresso-menu-submit-button').addEventListener('click', () => {
            if (this.menu !== '') {
                console.log('hoho');
                menuList.push(this.menu);
                addMenuList(menuList);
                this.initMenu();
            }
        });
    }

    submit(menuList) {
        this.input(menuList);
        this.button(menuList);
    }
}

export default Form;
