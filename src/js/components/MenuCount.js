export default function MenuCount({ initialState }) {
  this.$MenuCount = document.querySelector(".menu-count");
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    this.$MenuCount.innerText = `총 ${this.state.length}개`;
  };

  this.render();
}
