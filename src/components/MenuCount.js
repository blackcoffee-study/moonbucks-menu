function MenuCount({ $target, state }) {
  this.$target = $target;
  this.state = state;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const currentMenu = this.state.menu;
    const count = currentMenu.length;
    const countHtml = `총 ${count}개`;

    this.$target.innerHTML = countHtml;
  };
}

export default MenuCount;
