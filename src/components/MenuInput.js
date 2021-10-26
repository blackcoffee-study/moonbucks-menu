import { $ } from '../Utils.js';

export class MenuInput {
    constructor({ onMenuItemAdd }) {
        this.$menuForm = $('#menu-form');
        this.$menuSubmitBtn = $('#menu-submit-button');
        this.$menuName = $('#menu-name');
        this.onMenuItemAdd = onMenuItemAdd;

        this.$menuForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.handleMenuItemAdd();
        });

        this.$menuSubmitBtn.addEventListener('click', () => {
            this.handleMenuItemAdd();
        });
    }

    handleMenuItemAdd = () => {
        const name = this.$menuName.value;
        if (!name) {
            alert('값을 입력해주세요.');
            return;
        }
        this.$menuName.value = '';
        this.onMenuItemAdd(name);
    };
}
