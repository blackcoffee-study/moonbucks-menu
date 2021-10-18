import component from '../core/component.js';

export default class MenuNav extends component {
  setup() {
    this.$state = this.$props.$state;
  }
  template() {
    return `
            <nav id="menu-nav" class="d-flex justify-center flex-wrap">
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
            </nav>`;
  }
}
