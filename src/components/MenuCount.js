function MenuCount({ $target, state }) {
  this.$target = $target;
  this.state = state;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const count = this.state.menu.length;
    const countHtml = `총 ${count}개`;

    this.$target.innerHTML = countHtml;
  };
}

export default MenuCount;
