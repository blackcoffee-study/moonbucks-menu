import MenuInput from './MenuInput.js';
import MenuCount from './MenuCount.js';
import MenuList from './MenuList.js';

function App($target) {
  this.$target = $target;
  this.state = {
    menu: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.menuList.setState(nextState);
    this.menuCount.setState(nextState);
  };

  this.onAddMenu = (menu) => {
    const newMenu = {
      id: this.state.menu[this.state.menu.length - 1]?.id + 1 || 1,
      name: menu,
    };
    const nextState = { menu: [...this.state.menu, newMenu] };
    this.setState(nextState);
  };

  this.onEditMenu = (menuId) => {};
  this.onRemoveMenu = (menuId) => {};

  this.menuInput = new MenuInput({
    $target: this.$target.querySelector('.input-field'),
    onAddMenu: this.onAddMenu,
  });

  this.menuCount = new MenuCount({
    $target: this.$target.querySelector('.menu-count'),
    state: this.state,
  });

  this.menuList = new MenuList({
    $target: this.$target.querySelector('#espresso-menu-list'),
    state: this.state,
  });
}

export default App;
