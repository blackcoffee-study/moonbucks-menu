import { BUTTON, LOAD_MENUITEMS_SUCCESS } from '../constant/index.js';
import { $ } from '../utils/index.js';
import { store } from '../store/index.js';

export class Category {
    constructor({ onCategoryClick }) {
        this.$categoryTitle = $('#category-title');
        this.$categoryList = $('.cafe-category');

        this.$categoryList.addEventListener('click', (event) => {
            const targetCategory = event.target;
            if (targetCategory.tagName !== BUTTON) {
                return;
            }
            onCategoryClick(targetCategory);
        });

        store.subscribe(LOAD_MENUITEMS_SUCCESS, this.render);
    }

    render = (state) => {
        const categoryList = {
            espresso: '☕️ 에스프레소',
            frappuccino: '🥤 프라푸치노',
            blended: '🍹 블렌디드',
            teavana: '🫖 티바나',
            desert: '🍰 디저트',
        };
        this.$categoryTitle.innerText = `${
            categoryList[state.currentCategory]
        } 메뉴 관리`;
    };
}
