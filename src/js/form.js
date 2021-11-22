import $ from './module/getDom';
import addMenuList from './module/addMenuList';

class Form {
    constructor() {
        this.menu = '';
        this.$ = $('#espresso-menu-name');
    }

    initMenu() {
        this.$.value = '';
        this.menu = '';
    }

    addListToMenu(menuList) {
        // 입력 값 추가에 대한 공통적인 로직
        menuList.push(this.menu);
        addMenuList(menuList);
        this.initMenu();
    }

    input(menuList) {
        this.$.addEventListener('keypress', e => {
            this.menu = e.target.value;
            // 입력값이 공백이 아니고 엔터 키가 눌렸을 때
            if (e.key === 'Enter' && this.menu !== '') this.addListToMenu(menuList);
        });
    }

    button(menuList) {
        $('#espresso-menu-submit-button').addEventListener('click', () => {
            this.menu = this.$.value;
            // 버튼 클릭 이벤트가 발생했고, 입력값이 공백이 아닐때
            if (this.menu !== '') this.addListToMenu(menuList);
        });
    }

    submit(menuList) {
        this.input(menuList);
        this.button(menuList);
    }
}

export default Form;
