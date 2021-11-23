import $ from './module/getDom';
import addMenuList from './module/addMenuList';
import setMenuCount from './module/setMenuCount';

class Form {
    constructor() {
        this.menu = '';
        this.$ = $('#espresso-menu-name');
    }

    initMenuToBlock() {
        this.$.value = '';
        this.menu = '';
    }

    addListToMenu(menuList) {
        // 입력 값 추가에 대한 공통적인 로직
        menuList.push(this.menu);
        addMenuList(menuList);
        this.initMenuToBlock();
        setMenuCount(menuList);
    }

    input(menuList) {
        this.$.addEventListener('keypress', e => {
            this.menu = e.target.value;
            // 입력값이 공백이 아니고 엔터 키가 눌렸을 때
            if (e.key === 'Enter' && this.menu.trim()) this.addListToMenu(menuList);
        });
    }

    button(menuList) {
        $('#espresso-menu-submit-button').addEventListener('click', () => {
            this.menu = this.$.value;
            // 버튼 클릭 이벤트가 발생했고, 입력값이 공백이 아닐때
            if (this.menu.trim()) this.addListToMenu(menuList);
        });
    }

    submit(menuList) {
        this.input(menuList);
        this.button(menuList);
    }
}

export default Form;
