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
    this.$categoryInfo.innerHTML = CATEGORY_INFO[this.state.currentCategory];
    console.log(this.state.currentCategory);
    this.$menuCount.innerText = `총 ${
      this.state[this.state.currentCategory]
    }개`;
  };

  this.render();
}
