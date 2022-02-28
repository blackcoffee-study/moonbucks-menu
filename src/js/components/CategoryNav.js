import { CATEGORY_NAMES, CATEGORY_INFO } from '../commons/constants.js';

export default function CategoryNav({ initialState, changeCategory }) {
  this.$categoryNav = document.querySelector('.category-nav');

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
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
  };

  this.setEvent = () => {
    this.$categoryNav.addEventListener('click', (e) => {
      if (e.target.closest('button')) {
        changeCategory(e.target.closest('button').dataset.categoryName);
      }
    });
  };

  this.render();
  this.setEvent();
}
