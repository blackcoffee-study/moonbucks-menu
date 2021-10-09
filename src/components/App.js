import MenuInput from './MenuInput.js';
import MenuList from './MenuList.js';

function App($target) {
  this.$target = $target;
  this.state = {
    menu: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.menuList.setState(nextState);
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

  this.menuInput = new MenuInput({
    $target: this.$target.querySelector('.input-field'),
    onAddMenu: this.onAddMenu,
  });

  this.menuList = new MenuList({
    $target: this.$target.querySelector('#espresso-menu-list'),
    state: this.state,
  });
  this.menuList.render();
}

export default App;
