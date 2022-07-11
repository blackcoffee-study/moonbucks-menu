import Component from '../core/Component.js';
import { $ } from '../utils/dom.js';

export default class MenuNav extends Component {
  template() {
    return `
        <a href="/" class="text-black">
            <h1 class="text-center font-bold">🌝 문벅스 메뉴 관리</h1>
        </a>
        <nav class="d-flex justify-center flex-wrap">
            <button
            type="button"
            data-category-name="espresso"
            class="cafe-category-name btn bg-white shadow mx-1"
            >
            ☕ 에스프레소
            </button>
            <button
            type="button"
            data-category-name="frappuccino"
            class="cafe-category-name btn bg-white shadow mx-1"
            >
            🥤 프라푸치노
            </button>
            <button
            type="button"
            data-category-name="blended"
            class="cafe-category-name btn bg-white shadow mx-1"
            >
            🍹 블렌디드
            </button>
            <button
            type="button"
            data-category-name="teavana"
            class="cafe-category-name btn bg-white shadow mx-1"
            >
            🫖 티바나
            </button>
            <button
            type="button"
            data-category-name="desert"
            class="cafe-category-name btn bg-white shadow mx-1"
            >
            🍰 디저트
            </button>
        </nav>
        `;
  }

  setEvent() {
    const { category, changeCategory } = this.props;

    $('nav').addEventListener('click', ({ target }) => {
      if (target.type !== 'button' || category === target.dataset.categoryName) return;

      changeCategory(target.dataset.categoryName);
    });
  }
}
