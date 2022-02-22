import { CATEGORY_NAMES, CATEGORY_INFO } from '../commons/constants.js';

export default function CategoryNav({ initialState, changeCategory }) {
  this.$categoryNav = document.querySelector('.category-nav');

  this.state = initialState;

  this.setState = (nextState) => {
    // document.querySelector();
    // this.state.CategoryNav;
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    console.log(CATEGORY_NAMES.map((el) => el));

    console.log(CATEGORY_NAMES);

    this.$categoryNav.innerHTML = `<nav class="d-flex justify-center flex-wrap category-nav">${CATEGORY_NAMES.map(
      (category) =>
        category === this.state
          ? `<button
      data-category-name="${category}"
      class="cafe-category-name btn bg-green-200 shadow mx-1">
      ${CATEGORY_INFO[category]}
      </button>`
          : `<button
      data-category-name="${category}"
      class="cafe-category-name btn bg-white shadow mx-1">
      ${CATEGORY_INFO[category]}
      </button>`
    ).join('')}</nav>`;

    //this.$categoryNav.querySelectorAll('.cafe-category-name').
    // 카테고리별 css 추가하기
  };
  this.setEvent = () => {
    this.$categoryNav.addEventListener('click', (e) => {
      // 이벤트 위치 확인 필요
      changeCategory(e.target.closest('button').dataset.categoryName);
      // e.target.closest('button').classList.add('.current-category');
    });
  };

  this.render();
  this.setEvent();
}
