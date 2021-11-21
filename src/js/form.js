import getDom from './module/getDom';
import addMenuList from './module/addMenuList';

class Form {
    constructor() {
        this.menu = '';
    }

    initMenu() {
        getDom('#espresso-menu-name').value = '';
        this.menu = '';
    }

    input() {
        getDom('#espresso-menu-name').addEventListener('keydown', e => {
            this.menu = e.target.value;

            if (e.key === 'Enter') {
                addMenuList(this.menu);
                this.initMenu();
            }
        });
    }

    button() {
        getDom('#espresso-menu-submit-button').addEventListener('click', () => {
            addMenuList(this.menu);
            this.initMenu();
        });
    }

    submit() {
        this.input();
        this.button();
    }
}

export default Form;
