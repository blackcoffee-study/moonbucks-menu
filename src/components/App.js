import MenuInput from './MenuInput.js';
import MenuAddButton from './MenuAddButton.js';
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
    const newMenuItem = {
      id: this.state.menu[this.state.menu.length - 1]?.id + 1 || '1',
      name: menu,
    };
    const nextState = { menu: [...this.state.menu, newMenuItem] };
    this.setState(nextState);
  };

  this.onEditMenu = (menuId) => {
    const editName = prompt('변경할 메뉴를 입력하세요');
    const nextState = {
      menu: this.state.menu.map((menu) =>
        menu.id === menuId
          ? {
              ...menu,
              name: editName,
            }
          : menu
      ),
    };
    this.setState(nextState);
  };

  this.onRemoveMenu = (menuId) => {
    if (confirm('선택한 메뉴를 삭제하시겠습니까?')) {
      const nextState = {
        menu: this.state.menu.filter((menu) => menu.id !== menuId),
      };
      this.setState(nextState);
    }
  };

  this.menuInput = new MenuInput({
    $target: this.$target.querySelector('.input-field'),
    onAddMenu: this.onAddMenu,
  });
  this.MenuAddButton = new MenuAddButton({
    $target: this.$target.querySelector('.input-submit'),
    $menuInput: this.$target.querySelector('.input-field'),
    onAddMenu: this.onAddMenu,
  });

  this.menuCount = new MenuCount({
    $target: this.$target.querySelector('.menu-count'),
    state: this.state,
  });

  this.menuList = new MenuList({
    $target: this.$target.querySelector('#espresso-menu-list'),
    state: this.state,
    onEditMenu: this.onEditMenu,
    onRemoveMenu: this.onRemoveMenu,
  });
}

export default App;
