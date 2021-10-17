import { $all } from '../lib/utils.js';
import { isNodeNameButton } from '../lib/checkCondition.js';

function MenuNavigation({ $target, state, onSelectCategory }) {
  this.$target = $target;
  this.$all = $all(this.$target);
  this.state = state;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.clickEventHandler = (e) => {
    if (!isNodeNameButton(e.target.nodeName)) return;
    onSelectCategory(e.target.attributes['data-category-name'].value);
  };

  this.render = () => {
    const $categories = this.$all('button');
    $categories.forEach((category) => {
      if (
        category.attributes['data-category-name'].value ===
        this.state.currentCategory
      ) {
        category.classList.remove('bg-white');
        category.classList.add('bg-gray');
      } else {
        category.classList.add('bg-white');
      }
    });
  };

  this.$target.addEventListener('click', this.clickEventHandler);
}

export default MenuNavigation;
