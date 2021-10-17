import MenuInput from './MenuInput.js';
import MenuAddButton from './MenuAddButton.js';
import MenuCount from './MenuCount.js';
import MenuList from './MenuList.js';
import MenuNavigation from './MenuNavigation.js';
import MenuCategoryTitle from './MenuCategoryTitle.js';
import { $, $all } from '../lib/utils.js';

function App($target) {
  this.$ = $($target);
  this.$all = $all($target);
  this.state = {};

  this.init = () => {
    const categories = this.$all('header button');
    const newState = [];
    categories.forEach(
      (category) =>
        (newState[category.attributes['data-category-name'].value] = [])
    );
    this.setState({ menu: newState, currentCategory: 'espresso' });
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.menuList.setState(this.state);
    this.menuCount.setState(this.state);
    this.menuNavigation.setState(this.state);
    this.menuCategoryTitle.setState(this.state);
  };

  this.onSelectCategory = (nextCategory) => {
    const nextState = {
      ...this.state,
      currentCategory: nextCategory,
    };

    this.setState(nextState);
    console.log(this.state);
  };

  this.onAddMenu = (menu) => {
    const newMenuItem = {
      id: String(new Date()).replaceAll(' ', ''),
      name: menu,
    };

    const nextState = {
      ...this.state,
      menu: {
        ...this.state.menu,
        [this.state.currentCategory]: [
          ...this.state.menu[this.state.currentCategory],
          newMenuItem,
        ],
      },
    };
    this.setState(nextState);
  };

  this.onEditMenu = (menuId) => {
    const editName = prompt('변경할 메뉴를 입력하세요');
    const nextState = {
      ...this.state,
      menu: {
        ...this.state.menu,
        [this.state.currentCategory]: this.state.menu[
          this.state.currentCategory
        ].map((menu) =>
          menu.id === menuId
            ? {
                ...menu,
                name: editName,
              }
            : menu
        ),
      },
    };
    this.setState(nextState);
  };

  this.onRemoveMenu = (menuId) => {
    if (confirm('선택한 메뉴를 삭제하시겠습니까?')) {
      const nextState = {
        ...this.state,
        menu: {
          ...this.state.menu,
          [this.state.currentCategory]: this.state.menu[
            this.state.currentCategory
          ].filter((menu) => menu.id !== menuId),
        },
      };
      this.setState(nextState);
    }
  };
  this.menuCategoryTitle = new MenuCategoryTitle({
    $target: this.$('.heading h2'),
    state: this.state,
  });

  this.menuNavigation = new MenuNavigation({
    $target: this.$('nav'),
    state: this.state,
    onSelectCategory: this.onSelectCategory,
  });

  this.menuInput = new MenuInput({
    $target: this.$('.input-field'),
    onAddMenu: this.onAddMenu,
  });

  this.menuAddButton = new MenuAddButton({
    $target: this.$('.input-submit'),
    $menuInput: this.$('.input-field'),
    onAddMenu: this.onAddMenu,
  });

  this.menuCount = new MenuCount({
    $target: this.$('.menu-count'),
    state: this.state,
  });

  this.menuList = new MenuList({
    $target: this.$('#menu-list'),
    state: this.state,
    onEditMenu: this.onEditMenu,
    onRemoveMenu: this.onRemoveMenu,
  });
}

export default App;
