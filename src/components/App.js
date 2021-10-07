import MenuInput from './MenuInput.js';
import MenuList from './MenuList.js';

function App($target) {
  this.$target = $target;
  this.state = {
    menu: [
      { id: 0, name: '아메리카노' },
      { id: 1, name: '카페라떼' },
      { id: 2, name: '오렌지주스' },
    ],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.menuList.setState(nextState);
  };

  this.onAddMenu = (menu) => {
    const newMenu = {
      id: this.state.menu[this.state.menu.length - 1].id + 1,
      name: menu,
    };
    const nextState = { menu: [...this.state.menu, newMenu] };
    this.setState(nextState);
  };

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
