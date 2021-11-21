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

    input() {
        $('#espresso-menu-name').addEventListener('keydown', e => {
            this.menu = $('#espresso-menu-name').value;

            if (e.key === 'Enter' && this.menu !== '') {
                addMenuList(this.menu);
                // this.initMenu(e);
            }
        });
    }

    button() {
        $('#espresso-menu-submit-button').addEventListener('click', () => {
            if (this.menu !== '') {
                addMenuList(this.menu);
                // this.initMenu();
            }
        });
    }

    submit() {
        this.input();
        this.button();
    }
}

export default Form;
