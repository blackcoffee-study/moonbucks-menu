export default function MenuCount({ initialState }) {
  this.$menuCount = document.querySelector('.menu-count');
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$menuCount.innerText = `총 ${this.state.length}개`;
  };

  this.render();
}
