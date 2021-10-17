import { CATEGORY } from '../lib/constant.js';

function MenuCategoryTitle({ $target, state }) {
  this.$target = $target;
  this.state = state;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `${
      CATEGORY[this.state.currentCategory]
    } 메뉴 관리`;
  };
}

export default MenuCategoryTitle;
