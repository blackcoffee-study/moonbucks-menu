import { CATEGORY_INFO } from '../commons/constants.js';

export default function MenuInfo({ initialState }) {
  this.$categoryInfo = document.querySelector('.mt-1');
  this.$menuCount = document.querySelector('.menu-count');
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$categoryInfo.innerText = CATEGORY_INFO[this.state.currentCategory];

    //this.$menuCount.innerText = `총 ${this.state.menus.length}개`;
  };

  this.render();
}
