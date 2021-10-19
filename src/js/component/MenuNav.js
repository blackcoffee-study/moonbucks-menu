import component from '../core/component.js';
import { $ } from '../utils.js';

export default class MenuNav extends component {
  setup() {
    this.$state = this.$props;
    //this.onChangeCategory =this.$props.onChangeCategory;
    console.log(this.$props);
  }
  template() {
    return `
                 <button
                        data-category-name="espresso"
                        class="cafe-category-name btn bg-white shadow mx-1"
                >
                ☕ 에스프레소
                </button>
                <button
                        data-category-name="frappuccino"
                        class="cafe-category-name btn bg-white shadow mx-1"
                >
                🥤 프라푸치노
                </button>
                <button
                        data-category-name="blended"
                        class="cafe-category-name btn bg-white shadow mx-1"
                >
                🍹 블렌디드
                </button>
                <button
                        data-category-name="teavana"
                        class="cafe-category-name btn bg-white shadow mx-1"
                >
                🫖 티바나
                </button>
                <button
                        data-category-name="desert"
                        class="cafe-category-name btn bg-white shadow mx-1"
                >
                🍰 디저트
                </button>
        `;
  }
  mounted(){
        const categoryBtn = $('#menu-nav');
        console.log(categoryBtn);
        categoryBtn.addEventListener('click',(e) =>{
            const clickedCategory = e.target.dataset.categoryName;
            this.$state.onChangeCategory(clickedCategory);
        });
  }
}
